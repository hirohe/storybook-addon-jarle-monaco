module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '../src/preset.js'],
  framework: '@storybook/react',
  env: config => ({
    ...config,
    // example to set a custom monaco cdn path
    STORYBOOK_ADDON_MONACO_PATH: 'https://cdn.staticfile.org/monaco-editor/0.33.0/min/vs',
  }),
}
