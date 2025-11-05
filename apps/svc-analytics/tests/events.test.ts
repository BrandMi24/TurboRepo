import request from "supertest";
import { app } from "../src/index";

it("ingesta de eventos y métricas", async () => {
  const ev = await request(app)
    .post("/events")
    .send({ type: "test.event", app: "citas", payload: { x: 1 } })
    .expect(201);

  expect(ev.body).toHaveProperty("id");

  const metrics = await request(app).get("/metrics").expect(200);
  expect(metrics.body.total).toBeGreaterThan(0);
});
