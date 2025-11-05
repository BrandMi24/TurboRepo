describe("Agenda, reprograma y cancela una cita", () => {
  it("flujo completo", () => {
    cy.visit("http://localhost:5173");

    // intercept del POST al gateway
    cy.intercept('POST', 'http://localhost:4000/core/appointments').as('createAppointment');

    // Ir a agendar (navbar)
    cy.contains("Agendar").click();

    // Llenar formulario
    cy.get('input[name="name"]').type("Brandon Test");
    cy.get('input[name="email"]').type("brandon@test.com");
    const fecha = new Date(); fecha.setMinutes(fecha.getMinutes() + 90);
    cy.get('input[name="date"]').clear().type(fecha.toISOString().slice(0,16));
    cy.get('textarea[name="notes"]').type("Prueba automatizada E2E");

    // Enviar (submit del form, no el navbar)
    cy.get('form button[type="submit"]').click();

    // Esperar al POST y a la redirección
    cy.wait('@createAppointment', { timeout: 10000 }).then(({ response }) => {
      expect(response?.statusCode).to.eq(201);
    });
    cy.url({ timeout: 10000 }).should('include', '/exito');
    cy.contains("¡Cita agendada!").should("exist");

    // Volver al inicio
    cy.contains("Ir a mis citas").click();

    // Reprogramar
    cy.contains("Reprogramar").first().click();
    const nueva = new Date(); nueva.setHours(nueva.getHours() + 3);
    cy.get('input[type="datetime-local"]').clear().type(nueva.toISOString().slice(0,16));
    cy.contains("Guardar").click();
    cy.contains("Guardando...", { timeout: 300 }).should("not.exist");

    // Cancelar
    cy.contains("Cancelar").first().click();
    cy.on("window:confirm", () => true);

    // Empty state
    cy.contains(/Sin citas/i).should("exist");
  });
});
