const Part = require('./Part.js');
const model = require('./model.js');
const store = {};

store.createPart = (partInfo, callback) => {
  const { id, name, description } = partInfo;
  const newPart = {
    part: new Part(id, name, description),
    location: 'orphan',
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

module.exports = store;