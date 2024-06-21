import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "x6itw9",
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      baseUrl: 'http://localhost:3333',
      prefix: "test"
    }
  },
});
