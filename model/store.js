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

store.updateAssembly = (parts, callback) => {
  const { parent, child } = parts,
  parentId = parent.id,
  childId = child.id;

  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback('Invalid Part ID', null);
  }

  if (model.nodes[parentId].location === 'orphans') {
    return store.createNewAssembly(parts, callback);
  }
};

store.createNewAssembly = (parts, callback) => {
  const { parent, child } = parts,
  parentId = parent.id,
  childId = child.id;
  if (!model.nodes[parentId] || !model.nodes[childId]) {
    return callback('Invalid Part ID', null);
  }

  model.nodes[parentId].part.children.push(model.nodes[childId]);
  store.updateNodeLocation(parentId, model.nodes[parentId].location, 'topLvlAssemblies');
  store.updateAssemblyChildNode(childId, parentId, callback);
};

store.updateAssemblyChildNode = (childId, parentId, callback) => {
  let newChildLocation;
  if (model.nodes[childId].location === 'orphans') {
    newChildLocation = 'components';
  } else if (model.nodes[childId].location === 'topLvlAssemblies') {
    newChildLocation = 'subAssemblies';
  } else if (model.nodes[childId].location === 'components' ||
            model.nodes[childId].location === 'subAssemblies') {
    return callback(null, [model.nodes[parentId], model.nodes[childId]]);
  }
  store.updateNodeLocation(childId, model.nodes[childId].location, newChildLocation);
  callback(null, [childId, parentId]);
};

store.updateNodeLocation = (partId, oldLocation, newLocation) => {
  console.log(oldLocation, model.nodeOrg[oldLocation]);
  model.nodeOrg[oldLocation] = model.nodeOrg[oldLocation].filter((node) => {
    return node.part.id !== partId;
  });
  model.nodeOrg[newLocation].push(model.nodes[partId]);
  model.nodes[partId].location = newLocation;
};

module.exports = store;