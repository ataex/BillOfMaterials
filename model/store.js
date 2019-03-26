const Part = require('./Part.js');
const model = require('./model.js');
const errorMessages = require('../constants/errorMessages.js');
const store = {};

////////////////// Creating and updating parts/assemblies //////////////////////
store.createPart = (partInfo, callback) => {
  const { id, name, description } = partInfo;
  if (model.nodes[id]) {
    return callback(errorMessages.partAlreadyExists, null);
  }
  model.nodes[id] = new Part(id, name, description);
  model.nodeOrg.allNodes.push(model.nodes[id]);
  model.nodeOrg.orphan.push(model.nodes[id]);
  return callback(null, model.nodes[id]);
};

store.createNewAssembly = (parts, callback) => {
  const { parent, child } = parts,
  parentId = parent.id,
  childId = child.id;
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback(errorMessages.invPartID, null);
  }

  model.nodes[parentId].children.push(model.nodes[childId]);
  store.updateAssemblyParentNodeType.childAdded(parentId, callback);
  store.updateAssemblyChildNodeType.childAdded(childId, callback);
};

store.updateAssembly = (parentId, childId, callback) => {
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback(errorMessages.invPartID, null);
  }

  const parentNode = model.nodes[parentId],
  childNode = model.nodes[childId];

  if (parentNode.children.includes(childNode)) {
    return callback(errorMessages.alreadyChild, null);
  }

  if (parentNode.type === 'orphan') {
    return store.createNewAssembly({'parent': parentNode, 'child': childNode}, callback);
  }

  parentNode.children.push(model.nodes[childId]);
  store.updateAssemblyParentNodeType.childAdded(parentId, callback);
  store.updateAssemblyChildNodeType.childAdded(childId, callback);
};

////////////// Deleting parts entirely or removing parts from parent assemblies ///////////////////
store.deletePart = (id, callback) => {
  if (!model.nodes[id]) {
    return callback(errorMessages.partDoesNotExist, null);
  }
  let containingAssemblies;
  store.getAllContainingAssemblies(id, (err, assemblies) => {
    containingAssemblies = assemblies;
  });
  store.removePartFromAllParentAssemblies(id, containingAssemblies);
  store.removeAllChildrenFromPart(id);
  store.removePartFromModel(id);
  callback(null);
};

store.removeChild = (parentId, childId, callback) => {
  if (!model.nodes[parentId]) {
    return callback(errorMessages.parentDoesNotExist, null);
  }
  if (!model.nodes[childId]) {
    return callback(errorMessages.childDoesNotExist, null);
  }
  let parentChildren;
  store.getTopLevelAssemblyParts(parentId, (err, data) => {
    if (err) {
      parentChildren = [];
      return;
    }
    parentChildren = data.map(child => child.id);
  });
  if (!parentChildren.includes(childId)) {
    return callback(errorMessages.notAChild, null);
  }

  let childContainingAssemblies;
  const parent = model.nodes[parentId];
  parent.children = parent.children.filter(child => child.id !== childId);
  store.getAllContainingAssemblies(childId, (err, data) => {
    if (!data) {
      childContainingAssemblies = [];
      return;
    }
    childContainingAssemblies = data;
  });
  store.updateAssemblyParentNodeType.childRemoved(parentId, parent.children);
  store.updateAssemblyChildNodeType.childRemoved(childId, childContainingAssemblies, callback);
};

/////////////// Utilities for updating parts and assemblies /////////////////////////
store.updateAssemblyParentNodeType = {
  childAdded: (parentId) => {
    let newParentType;
    let currentType = model.nodes[parentId].type;

    if (currentType === 'orphan') {
      newParentType = 'topLvlAssembly';
    } else if (currentType === 'component') {
      newParentType = 'subAssembly';
    }

    if (newParentType) {
      store.updateNodeType(parentId, currentType, newParentType);
    }
  },
  childRemoved: (parentId, children) => {
    let newParentType;
    const currentType = model.nodes[parentId].type;
    const hasChildren = children.length > 0;
    if (currentType === 'topLvlAssembly' && !hasChildren) {
      newParentType = 'orphan';
    } else if (currentType === 'subAssembly' && !hasChildren) {
      newParentType = 'component';
    }
    if (newParentType) {
      store.updateNodeType(parentId, currentType, newParentType);
    }
  },
};

store.updateAssemblyChildNodeType = {
  childAdded: (childId, callback) => {
    let newChildType;
    const currentChildType = model.nodes[childId].type;
    if (currentChildType === 'orphan') {
      newChildType = 'component';
    } else if (currentChildType === 'topLvlAssembly') {
      newChildType = 'subAssembly';
    } else if (currentChildType === 'component' ||
      currentChildType === 'subAssembly') {
      return callback(null, 'created');
    }
    store.updateNodeType(childId, currentChildType, newChildType);
    callback(null, 'created');
  },
  childRemoved: (childId, containingAssemblies, callback) => {
    let newChildType;
    const currentChildType = model.nodes[childId].type;
    const belongsToAssembly = containingAssemblies.length > 0;
    if (currentChildType === 'component' && !belongsToAssembly) {
      newChildType = 'orphan';
    } else if (currentChildType === 'subAssembly' && !belongsToAssembly) {
      newChildType = 'topLvlAssembly';
    }
    if (newChildType) {
      store.updateNodeType(childId, currentChildType, newChildType);
    }
    callback(null);
  },
};

store.updateNodeType = (partId, oldType, newType) => {
  model.nodeOrg[oldType] = model.nodeOrg[oldType].filter((node) => {
    return node.id !== partId;
  });
  model.nodeOrg[newType].push(model.nodes[partId]);
  model.nodes[partId].type = newType;
};

store.removePartFromAllParentAssemblies = (partId, containingAssemblies) => {
  for (let i = 0; i < containingAssemblies.length; i++) {
    store.removeChild(containingAssemblies[i].id, partId, () => {});
  }
};

store.removeAllChildrenFromPart = (partId) => {
  const part = model.nodes[partId];
  const children = part.children;
  for (let i = 0; i < children.length; i++) {
    store.removeChild(partId, children[i].id, () => {});
  }
};

store.removePartFromModel = (partId) => {
  const type = model.nodes[partId].type;
  model.nodeOrg[type] = model.nodeOrg[type].filter(currentPart => currentPart.id !== partId);
  model.nodeOrg.allNodes = model.nodeOrg.allNodes.filter(currentPart => currentPart.id !== partId);
  delete model.nodes[partId];
};

////////////////////// Returning part/assembly data /////////////////////////
store.getAllParts = (callback) => {
  if (!model.nodeOrg.allNodes) {
    return callback(errorMessages.cantFindParts, null);
  }
  callback(null, model.nodeOrg.allNodes);
};

store.getPart = (partId, callback) => {
  if (!model.nodes[partId]) {
    return callback(errorMessages.partDoesNotExist);
  }
  callback(null, model.nodes[partId]);
};

store.getAllComponents = (callback) => {
  if (!model.nodeOrg.component) {
    return callback(errorMessages.cantFindComponents, null);
  }
  callback(null, model.nodeOrg.component);
};

store.getAllOrphans = (callback) => {
  if (!model.nodeOrg.orphan) {
    return callback(errorMessages.cantFindOrphans, null);
  }
  callback(null, model.nodeOrg.orphan);
};

store.getAllContainingAssemblies = (partId, callback) => {
  if (!model.nodes[partId]) {
    return callback(errorMessages.partDoesNotExist, null);
  }

  if (model.nodes[partId].type === 'topLvlAssembly' ||
    model.nodes[partId].type === 'orphan') {
    return callback(null, []);
  }

  const containingAssemblies = store.searchforContainingAssemblies(partId);
  callback(null, containingAssemblies);
};

store.getAllAssemblies = (callback) => {
  if (!model.nodeOrg.topLvlAssembly || !model.nodeOrg.subAssembly) {
    return callback(errorMessages.cantFindAssemblies, null);
  }
  const allAssemblies = model.nodeOrg.topLvlAssembly.concat(model.nodeOrg.subAssembly);
  callback(null, allAssemblies);
};

store.getAllTopLevelAssemblies = (callback) => {
  if (!model.nodeOrg.topLvlAssembly) {
    return callback(errorMessages.cantFindTopLevelAssemblies, null);
  }
  callback(null, model.nodeOrg.topLvlAssembly);
};

store.getAllSubAssemblies = (callback) => {
  if (!model.nodeOrg.subAssembly) {
    return callback(errorMessages.cantFindSubAssemblies, null);
  }
  callback(null, model.nodeOrg.subAssembly);
};

store.getAllAssemblyParts = (assemblyId, callback) => {
  if (!model.nodes[assemblyId]) {
    return callback(errorMessages.partDoesNotExist, null);
  }

  if (model.nodes[assemblyId].type !== 'topLvlAssembly' &&
      model.nodes[assemblyId].type !== 'subAssembly') {
    return callback(errorMessages.notAnAssembly, null);
  }

  const listOfChildren = store.iterateThroughAssemblyChildren(assemblyId);
  callback(null, listOfChildren);
};

store.getTopLevelAssemblyParts = (assemblyId, callback) => {
  if (!model.nodes[assemblyId]) {
    return callback(errorMessages.partDoesNotExist, null);
  }

  if (model.nodes[assemblyId].type !== 'topLvlAssembly' &&
    model.nodes[assemblyId].type !== 'subAssembly') {
    return callback(errorMessages.notAnAssembly, null);
  }

  callback(null, model.nodes[assemblyId].children);
};

///////////////////// Utilities for returning part/assembly data ////////////////////
store.searchforContainingAssemblies = (partId) => {
  const containingAssemblies = [];
  const assemblies = model.nodeOrg.topLvlAssembly.concat(model.nodeOrg.subAssembly);
  for (let i = 0; i < assemblies.length; i++) {
    const assembly = assemblies[i];
    let childQueue = assembly.children.slice();
    while (childQueue.length) {
      const child = childQueue.pop();
      if (child.id === partId) {
        const {children, ...partWithNoChildParam} = assembly;
        containingAssemblies.push(partWithNoChildParam);
        childQueue = [];
      } else {
        childQueue.push(...child.children.slice());
      }
    }
  }
  return containingAssemblies;
};

store.iterateThroughAssemblyChildren = (assemblyId) => {
  const childQueue = model.nodes[assemblyId].children.slice();
  const listOfChildren = [];
  while (childQueue.length) {
    const part = childQueue.pop();
    if (part.children) {
      childQueue.push(...part.children.slice());
    }
    const { children, ...partWithNoChildParam } = part;
    listOfChildren.push(partWithNoChildParam);
  }
  return listOfChildren;
};

module.exports = store;