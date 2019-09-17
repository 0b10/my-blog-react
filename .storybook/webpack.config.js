const assert = require("assert");
const fs = require("fs");

// const eslintrc = JSON.parse(fs.readFileSync(".eslintrc.json", { flag: "r" }));

/**
 * Filter out rules that contain the targetted loaders
 * Assumption: that config.module.rules[n].loader isn't used
 *
 * @param {RegExp} - A regular expression that matches all loader names to be omitted
 * @param {object} config - a webpack config object
 */
const filterLoaders = (re, config) => {
  // TODO: Add support for config.module.rules[n].loader if necessary
  /**
   * Config shape (FYI):
   * {
   *    module: {
   *      rules: [
   *        {
   *          use: [
   *            "loader-name",
   *            {
   *              loader: "loader-name"
   *            }
   *          ]
   *        },
   *        {
   *          use: [
   *            "loader-name",
   *            {
   *              loader: "loader-name"
   *            }
   *          ]
   *        }
   *      ]
   *    }
   * }
   */
  assert(config, `A defined object for the webpack config is necessary, not ${typeof config}`);
  let rules;
  if (config.module && config.module.rules) {
    assert(
      typeof config.module.rules === "object" && config.module.rules.filter,
      `Expecting an array for config.module.rules, got ${typeof config.module.rules} instead`
    );

    rules = config.module.rules.filter((rule) => {
      // e.g. module.rules[]
      if (rule.use) {
        assert(
          typeof rule.use === "object" && rule.use.filter,
          `Expecting an array for rules[].use, got ${typeof rule.use} instead`
        );

        for (let i = 0; i < rule.use.length; i++) {
          // ! Filter rules here - match "loader-name" name against regex
          // e.g. rules.use[ { loader: "loader-name"}, "loader-name" ]
          const item = rule.use[i]; // eslint-disable-line security/detect-object-injection

          if (typeof item === "string") {
            // e.g. "loader-name"
            const isMatch = re.test(item);
            if (isMatch) {
              return false;
            }
          } else if (typeof item === "object") {
            // e.g. { loader: "loader-name" }
            const { loader } = item;
            if (loader) {
              assert(
                typeof loader === "string",
                `Expecting a string for loader name, got ${typeof loader} instead`
              );
              const isMatch = re.test(loader);
              if (isMatch) {
                return false;
              }
            }
          }
        }
        return true; // no matches
      }
    });
    config.module.rules = rules;
  }
  return config;
};

module.exports = ({ config: oldConfig }) => {
  const config = filterLoaders(/eslint-loader/, oldConfig); // Use pre-commit hook instead
  target: "node",
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // Use pre-commit hook instead
            },
          },
          {
            loader: require.resolve("react-docgen-typescript-loader"),
          },
        ],
      }
      // {
      //   // Use a custom eslint config, and ignore React's
      //   enforce: "pre",
      //   test: /\.(ts|tsx|json|js)$/,
      //   exclude: /(node_modules)/,
      //   loader: "eslint-loader",
      //   options: {
      //     ...eslintrc,
      //     failOnWarning: false,
      //     failOnError: false,
      //   },
      // }
    );
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};
