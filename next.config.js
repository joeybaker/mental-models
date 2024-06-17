module.exports = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    reactStrictMode: true,
    compiler: {
      styledComponents: true,
    },
  }
}
