module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    "react-app",
    "standard",
    "standard-jsx"
  ],
  env: {
    "node": true,
    "browser": true
  }
}
