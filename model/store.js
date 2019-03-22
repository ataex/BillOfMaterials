const Part = require('./Part.js');
const model = require('./model.js');
const store = {};

store.createPart = (partInfo, callback) => {
  const { id, name, description } = partInfo;
  const newPart = {
    part: new Part(id, name, description),
    location: 'orphans',
  };
  if (model.nodes[id]) {
    return callback('node already exists', null);
  }
  model.nodes[id] = newPart;
  model.nodeOrg.allNodes.push(model.nodes[id]);
  model.nodeOrg.orphans.push(model.nodes[id]);
  return callback(null, newPart);
};

store.getAllParts = (callback) => {
  if (!model.nodeOrg.allNodes) {
    return callback('No parts storage found', null);
  }
  callback(null, model.nodeOrg.allNodes);
};

store.createNewAssembly = (parts, callback) => {
  const { parent, child } = parts,
  parentId = parent.id,
  childId = child.id;
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback('Invalid Part ID', null);
  }

  model.nodes[parentId].part.children.push(model.nodes[childId]);
  store.updateAssemblyParentNode(parentId, callback);
  store.updateAssemblyChildNode(childId, callback);
};

store.updateAssembly = (parentId, childId, callback) => {
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback('Invalid Part ID', null);
  }

  const parentNode = model.nodes[parentId],
  childNode = model.nodes[childId];

  if (parentNode.children.includes(childNode)) {
    return callback('Child already exists as component on parent assembly', null);
  }

  if (parentNode.location === 'orphans') {
    return store.createNewAssembly({'parent': parentNode, 'child': childNode}, callback);
  }

  parentNode.children.push(model.node[childId]);
  store.updateAssemblyParentNode(parentId, callback);
  store.updateAssemblyChildNode(childId, callback);
};

store.updateAssemblyParentNode = (parentId, callback) => {
  let newParentLocation;
  const currentLocation = model.nodes[parentId].location;

  if (currentLocation === 'orphans') {
    newParentLocation = 'topLvlAssemblies';
  } else if (currentLocation === 'components') {
    newParentLocation = 'subAssemblies';
  }

  if (newParentLocation) {
    store.updateNodeLocation(parentId, currentLocation, newParentLocation);
  }
};

store.updateAssemblyChildNode = (childId, callback) => {
  let newChildLocation;
  if (model.nodes[childId].location === 'orphans') {
    newChildLocation = 'components';
  } else if (model.nodes[childId].location === 'topLvlAssemblies') {
    newChildLocation = 'subAssemblies';
  } else if (model.nodes[childId].location === 'components' ||
            model.nodes[childId].location === 'subAssemblies') {
    return callback(null, 'created');
  }
  store.updateNodeLocation(childId, model.nodes[childId].location, newChildLocation);
  callback(null, 'created');
};

store.updateNodeLocation = (partId, oldLocation, newLocation) => {
  model.nodeOrg[oldLocation] = model.nodeOrg[oldLocation].filter((node) => {
    return node.part.id !== partId;
  });
  model.nodeOrg[newLocation].push(model.nodes[partId]);
  model.nodes[partId].location = newLocation;
};

module.exports = store;