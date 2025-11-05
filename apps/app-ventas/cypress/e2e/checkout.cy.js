// cypress/e2e/checkout.cy.js
it("verifica la página inicial", () => {
  cy.visit("http://localhost:5173");
  cy.contains("Vite + React"); // esto sí existe en el template base
});
