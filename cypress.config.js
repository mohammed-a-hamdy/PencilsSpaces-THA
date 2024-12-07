const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,
  video: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  videoCompression: 32,
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on('after:run', (test, runnable) => {
        if (test.state === 'failed') {
          // if you want screenshots only for failed tests
          cy.screenshot()
        } else {
          // if you want screenshots for all tests
          cy.screenshot()
        }
      })
      // implement node event listeners here
    },
  },
});
