import { registerUser } from "../support/user.util";
import { generateUniqueUser } from "../support/generate.users";

describe("Test: validate user registration.", () => {


  it("should validate that a user can be registered and the properties returned in the response", () => {
    const user = generateUniqueUser();

    registerUser(user).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.user.username).to.equal(user.username);
      expect(response.body.user.email).to.equal(user.email);
      expect(response.body.user).to.haveOwnProperty("email");
      expect(response.body.user).to.haveOwnProperty("username");
      expect(response.body.user).to.haveOwnProperty("bio");
      expect(response.body.user).to.haveOwnProperty("image");
    });
  });

  it("should validate error when empty username", () => {
    const user = {
      username: "",
      email: `${Cypress.env("prefix")}${Date.now()}`,
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };

    registerUser(user).then((response: Cypress.Response<{ errors: { username: string[] } }>) => {
      expect(response.status).to.equal(422);
      expect(response.body.errors.username[0]).to.equal("username should not be empty");
    });
  });

  it("should validate error when empty email", () => {
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: "",
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };

    registerUser(user).then((response: Cypress.Response<{ errors: { email: string[] } }>) => {
      expect(response.status).to.equal(422);
      expect(response.body.errors.email[0]).to.equal("email should not be empty");
    });
  });

  it("should validate error when empty password", () => {
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: `${Cypress.env("prefix")}${Date.now()}@example.com`,
      password: "",
    };

    registerUser(user).then((response: Cypress.Response<{ errors: { password: string[] } }>) => {
      cy.log(JSON.stringify(response.body))
      expect(response.status).to.equal(422);
      expect(response.body.errors.password[0]).to.equal("password must be longer than or equal to 8 characters");
    });
  });

  it("should validate error message when sending attempting to create a user that already exist", () => {
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: `${Cypress.env("prefix")}${Date.now()}@example.com`,
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };
    registerUser(user);
    registerUser(user).then(
      (response: Cypress.Response<{ errors: { username: string[]; email: string[] } }>) => {
        expect(response.status).to.equal(422);
        expect(response.body.errors["Error: "]).to.equal("Email or username are taken");
      },
    );
  });
});