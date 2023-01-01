module.exports = {
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-knobs",
    "@storybook/addon-storysource",
    "@storybook/addon-links/register",
    "@storybook/addon-docs",
  ],
  stories: ["../src/**/*.stories.[tj]@(s|sx)", "../src/**/*.stories.mdx"],
  core: {
    builder: "webpack5",
  },
};
