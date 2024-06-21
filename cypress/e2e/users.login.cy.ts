import { login, registerUser } from "../support/user.util";
import { generateUniqueUser } from "../support/generate.users";

describe("Test: validate user login. Test", () => {

  it("should validate a successfull login", () => {
    const user = generateUniqueUser()

    registerUser(user);
    login({
      email: user.email,
      password: user.password,
    }).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.user.username).to.equal(user.username);
      expect(response.body.user.email).to.equal(user.email);
      expect(response.body.user).to.haveOwnProperty("token");
    });
  });

  it("should validate error message when having an empty email", () => {
    
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: `${Cypress.env("prefix")}${Date.now()}`,
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };
    registerUser(user);

    
    login({
      email: "",
      password: user.password,
    }).then(response => {
      
      expect(response.status).to.equal(422);
      expect(response.body.errors.email[0]).to.equal("email should not be empty");
    });
  });

  it("should validate error message when having an empty password", () => {
    
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: `${Cypress.env("prefix")}${Date.now()}@example.com`,
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };
    registerUser(user);

    
    login({
      email: user.email,
      password: "",
    }).then(response => {
      
      expect(response.status).to.equal(422);
      expect(response.body.errors.password[0]).to.equal("password must be longer than or equal to 8 characters");
    });
  });

  it("should validate error message when having an incorrect password", () => {
    
    const user = {
      username: `${Cypress.env("prefix")}${Date.now()}`,
      email: `${Cypress.env("prefix")}${Date.now()}`,
      password: `${Cypress.env("prefix")}${Date.now()}`,
    };
    registerUser(user);

    
    login({
      email: user.email,
      password: "incorrect",
    }).then(response => {
        cy.log(JSON.stringify(response.body))
      
        expect(response.status).to.equal(422);
        expect(response.body.errors.email[0]).to.equal("email must be an email");
    });
  });
});