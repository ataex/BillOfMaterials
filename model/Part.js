let Part = class {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.children = [];
  }
};

module.exports = Part;