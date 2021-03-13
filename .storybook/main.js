module.exports = {
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    "@storybook/addon-links/register",
  ],
  stories: ["../src/**/*.stories.[tj](s|sx)"],
};
