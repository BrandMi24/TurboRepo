import request from "supertest";
import { app } from "../src/server";

it("crea producto", async () => {
  const res = await request(app)
    .post("/products")
    .set("Authorization", "Bearer FAKE.ADMIN.TOKEN")
    .send({ name: "X", price: 10 });

  expect(res.status).toBe(201);
  expect(res.body).toEqual({ name: "X", price: 10 });
});
