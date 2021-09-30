/* config-overrides.js */

const {
  override,
  adjustStyleLoaders,
  addWebpackAlias,
} = require("customize-cra");

const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = override(
  adjustStyleLoaders(({ use: [, css, postcss, resolve, processor] }) => {
    if (processor) {
      processor.options = {
        ...processor.options,
        sassOptions: {
          includePaths: ["node_modules/compass-mixins/lib", "sass"],
        },
      };
    }
  }),
  addWebpackAlias({
    "@": resolve("src"),
  })
);
