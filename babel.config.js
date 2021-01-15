module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          pages: './src/pages',
          routes: './src/routes',
          ui: './src/ui',
        },
      },
    ],
  ],
}
