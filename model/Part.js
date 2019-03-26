let Part = class {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.type = 'orphan';
    this.children = [];
  }
};

module.exports = Part;