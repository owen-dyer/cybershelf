// Import server object to get routes
const server = require("../src/server");
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

// If the database is initialized with the categories that we have in init.sql then this will be successful
describe("Inventory Server", () => {
  it("/api/categories", async () => {
    const res = await chai.request(server).get("/api/categories");

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
  });

  // If the database is initialized with the categories that we have in init.sql then this will be successful
  it("positive : /api/categories/by_id", async () => {
    const res = await chai.request(server).post("/api/categories/by_id").send({
      id: 1,
    });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("category");
  });

  // Category 'id' column is of type integer so this should return an error
  it("negative : /api/categories/by_id", async () => {
    const res = await chai.request(server).post("/api/categories/by_id").send({
      id: "abc",
    });

    expect(res).to.have.status(500);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("error");
  });
});
