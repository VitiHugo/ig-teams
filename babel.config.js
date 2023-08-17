module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugin: [
      "module-resolver",
      {
        root: ['/src'],
        alias: {
          '@screens': './screens'
        }
     
      }
    ]
  };
};
