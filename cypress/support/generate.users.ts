export function generateUniqueUser() {
    const timestamp = Date.now();
    const prefix = Cypress.env("prefix");
    
    return {
        username: `${prefix}${timestamp}`,
        email: `${prefix}${timestamp}@example.com`,
        password: `${prefix}${timestamp}`,
    };
}
