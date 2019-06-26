module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'standard'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    "camelcase": ["error", { "properties": "always" }],
    "unicode-bom": ["off"],
    "brace-style": ["error", "stroustrup"],
    "no-unused-expressions": ["off"],
    "prefer-const": ["error"],
    "new-cap": ["off"]
  }
}
