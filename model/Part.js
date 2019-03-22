let Part = class {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = 'orphan';
    this.children = [];
  }
};

module.exports = Part;