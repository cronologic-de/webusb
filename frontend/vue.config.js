module.exports = {
  // The GitHub Pages deployment doesn't use the domain root, but the
  // project name, as its root dir. However, the dev server should use the root.
  publicPath: process.env.NODE_ENV === 'production'
    ? '/webusb/'
    : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
