module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugin: [
      "module-resolver",
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@components': './src/components',
          '@storage': './src/storage',
          '@utils': './src/utils',
        }
      }
    ]
  };
};
