var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:5000");

// Write all test cases here
//Unit Test begin
describe("MochaTest", function () {
  //User Login
  it("user should login", function (done) {
    server
      .post("/loginUser")
      .send({
        email: "mranaynaik@gmail.com",
        password: "test@123",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});
