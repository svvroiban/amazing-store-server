const supertest = require("supertest");
const app = require("../app");

describe("Products testing", () => {
  it("Should return all products", () => {
    supertest(app)
      .get("/products")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
