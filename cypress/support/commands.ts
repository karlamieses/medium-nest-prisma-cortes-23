/// <reference types="cypress" />

import cypress = require("cypress");

declare global {
    namespace Cypress{ 
        interface Chainable<Subject> {
        getRequest(endpoint: string, token?: string): Chainable<Subject>;
        postRequest(endpoint: string, body: unknown, token?: string): Chainable<Subject>;
        putRequest(endpoint: string, body: unknown, token?: string): Chainable<Subject>;
        deleteRequest(endpoint: string, token?: string): Chainable<Subject>;
        }
    }
  }

Cypress.Commands.add("getRequest", (endpoint: string, token?: string) => {
  return cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}${endpoint}`,
      headers: {
          "Content-Type": "application/json", // Add Content-Type header
          "Authorization": `Token ${token}`  // Conditionally add Authorization header
      }
  });
});


Cypress.Commands.add("postRequest", (endpoint, body: any, token) => {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("baseUrl")}${endpoint}`,
      body,
      failOnStatusCode: false,
      ...(token && { headers: { Authorization: `Token ${token}` } }),
    });
  });