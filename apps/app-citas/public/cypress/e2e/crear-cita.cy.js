it("flujo: agendar cita", () => {
  cy.visit("http://localhost:5175");        // cambia si tu dev server usa otro puerto
  cy.contains("Agendar").click();
  cy.get('input[name="name"]').type("Yuliet");
  cy.get('input[name="email"]').type("yuli@example.com");
  // ahora +30min desde ahora para el datetime-local
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  const iso = now.toISOString().slice(0,16);
  cy.get('input[name="date"]').type(iso);
  cy.get('textarea[name="notes"]').type("Prueba e2e");
  cy.contains("Agendar").click();
  cy.contains("¡Cita agendada!");
});
