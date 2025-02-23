const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

// ✅ Default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// ✅ Custom configuration additions
const customConfig = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'], // 🛠 Ensure Metro compiles TypeScript & JS properly
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
};

// ✅ Merge and export the final configuration
module.exports = mergeConfig(defaultConfig, customConfig);

