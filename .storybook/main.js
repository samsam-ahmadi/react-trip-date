module.exports = {
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-storysource',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
  ],
  stories: ['../src/**/*.stories.[tj](s|sx)'],
};
