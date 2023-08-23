import chai from "chai";
import chaiHttp from "chai-http";

import { app } from "../index.js";
chai.use(chaiHttp);
chai.should();

// Test the /reverse POST endpoint
describe("Reverse Message API", () => {
  it("should reverse the provided message", (done) => {
    const message = "Hello, world!";
    const reversedMessage = "!dlrow ,olleH";

    chai
      .request(app)
      .post("/reverse")
      .send({ message })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("reversedMessage");
        res.body.reversedMessage.should.equal(reversedMessage);
        done();
      });
  });

  it("should check the type of data", (done) => {
    const message = "Hello, world!";
    const reversedMessage = "!dlrow ,olleH";

    chai
      .request(app)
      .post("/reverse")
      .send(message)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.equal(
          "Invalid Content-Type. Expected application/json."
        );
        done();
      });
  });

  it('should handle missing "message" field', (done) => {
    chai
      .request(app)
      .post("/reverse")
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.equal(
          "Missing message field in the request body"
        );
        done();
      });
  });
});
