const server = require("../src/server");
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
  // Positive test case for the login endpoint
  it("positive : /auth/login", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .type("json")
      .send({ email: "test@email.com", password: "123p" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("success");
        done();
      });
  });
  // Negative testcase for the login endpoint (invalid password)
  it("negative : /auth/login", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .type("json")
      .send({ email: "test@email.com", password: "123" })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body.message).to.equals("Invalid username or password");
        done();
      });
  });
});
