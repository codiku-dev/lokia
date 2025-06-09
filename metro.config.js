const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const { assetExts, sourceExts } = getDefaultConfig(__dirname).resolver;
const config = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    alias: {
      '@': './',
    },
  },
}); 
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), { input: "./global.css" });
