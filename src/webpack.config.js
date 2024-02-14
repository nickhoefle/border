const path = require('path');

module.exports = {
  // ... other webpack configurations
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
    },
  },
};
