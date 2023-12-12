// Import server object to get routes
const server = require("../src/server");
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require("chai");
const chaiHttp = require("chai-http");
const { post } = require("../src/routes/signin");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Account Server", () => {
  // Positive test case for registering
  it("positive : /api/register", async () => {
    const res = await chai.request(server).post("/api/register").send({
      name: "John Doe",
      email: "john@doe.com",
      password: "password",
      confirmpassword: "password",
    });

    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("email");
  });

  // Negative test case for registering
  it("negative : /api/register", async () => {
    const res = await chai.request(server).post("/api/register").send({
      name: "John Doe",
      email: "john@doe.com",
      password: "password",
      confirmpassword: "pass",
    });

    expect(res).to.have.status(401);
    expect(res.body).to.be.an("object");
  });

  // Positive test case for signing in
  it("positive : /api/signin", async () => {
    const res = await chai.request(server).post("/api/signin").send({
      email: "john@doe.com",
      password: "password",
    });

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("id_token");
  });

  // Negative test case for signing in
  it("negative : /api/signin", async () => {
    const res = await chai.request(server).post("/api/signin").send({
      email: "john",
      password: "password",
    });

    expect(res).to.have.status(401);
    expect(res.body).to.be.an("object");
  });
});
