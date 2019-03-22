let Part = class {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.children = [];
  }
};

module.exports = Part;