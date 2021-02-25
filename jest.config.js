const {defaults} = require("jest-config");

module.exports = {
  ...defaults,
  roots: ["src","tests"],
  moduleDirectories: ["src", "node_modules"]
}
