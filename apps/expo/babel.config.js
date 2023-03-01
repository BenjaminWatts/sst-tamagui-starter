// const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = function (api) {
  api.cache(true);
  return {
    // resolver: {
    //   blacklistRE:  blacklist(['../next/*'])
    // },
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      require.resolve("expo-router/babel"),
      "inline-dotenv",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["../.."],
          alias: {
            // define aliases to shorten the import paths
            app: "../../packages/app",
            "@my/ui": "../../packages/ui",
          },
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
        },
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === "android"
        ? []
        : [
            [
              "@tamagui/babel-plugin",
              {
                components: ["@my/ui", "tamagui"],
                config: "./tamagui.config.ts",
              },
            ],
          ]),
      [
        "transform-inline-environment-variables",
        {
          include: "TAMAGUI_TARGET",
        },
      ],
    ],
  };
};
