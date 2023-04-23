const { defineConfig } = require("cypress");
const webpack = require('@cypress/webpack-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');

async function setupNodeEvents (on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    webpack({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
          fallback: { path: require.resolve('path-browserify') }
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config
                }
              ]
            }
          ]
        }
      }
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/TEST-[hash].xml',
    toConsole: true,
    attachments: true
  },
  retries: {
    runMode: 2
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
