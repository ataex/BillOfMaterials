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
  model.nodeOrg.orphans.push(id);
  return callback(null, newPart);
};

module.exports = store;