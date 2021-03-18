import chai from "chai";
import chaiHttp from "chai-http";
import { startServer } from "../app";
import "mocha";

chai.use(chaiHttp);

describe("Login test", () => {
  it("Should be a successful login to the quote form", async () => {
    let user = {
      username: "username1",
      password: "pass1",
    };
    await chai
      .request(startServer)
      .post("/login")
      .send(JSON.stringify(user))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.equal({ success: "quote.html" });
      });
  });
});
