const Part = require('./Part.js');
const model = require('./model.js');
const errorMessages = require('../constants/errorMessages.js');
const store = {};

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

store.getAllParts = (callback) => {
  if (!model.nodeOrg.allNodes) {
    return callback(errorMessages.cantFindParts, null);
  }
  callback(null, model.nodeOrg.allNodes);
};

store.createNewAssembly = (parts, callback) => {
  const { parent, child } = parts,
  parentId = parent.id,
  childId = child.id;
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback(errorMessages.invPartID, null);
  }

  model.nodes[parentId].children.push(model.nodes[childId]);
  store.updateAssemblyParentNode(parentId, callback);
  store.updateAssemblyChildNode(childId, callback);
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
  store.updateAssemblyParentNode(parentId, callback);
  store.updateAssemblyChildNode(childId, callback);
};

store.updateAssemblyParentNode = (parentId, callback) => {
  let newParentType;
  const currentType = model.nodes[parentId].type;

  if (currentType === 'orphan') {
    newParentType = 'topLvlAssembly';
  } else if (currentType === 'component') {
    newParentType = 'subAssembly';
  }

  if (newParentType) {
    store.updateNodeType(parentId, currentType, newParentType);
  }
};

store.updateAssemblyChildNode = (childId, callback) => {
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
};

store.updateNodeType = (partId, oldType, newType) => {
  model.nodeOrg[oldType] = model.nodeOrg[oldType].filter((node) => {
    return node.id !== partId;
  });
  model.nodeOrg[newType].push(model.nodes[partId]);
  model.nodes[partId].type = newType;
};

module.exports = store;