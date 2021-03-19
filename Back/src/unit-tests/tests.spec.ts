import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";

chai.use(chaiHttp);
const expect = chai.expect;

// Run test with: yarn run test

describe("Login test", () => {
  it("Successful login to the quote form", (done) => {
    const body = {
      username: "username1",
      password: "pass1",
    };
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ success: "quote.html" });
        done();
      });
  });

  it("Successful login to profile management", (done) => {
    const body = {
      username: "username2",
      password: "pass2",
    };
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ success: "ProfileManage.html" });
        done();
      });
  });

  it("Failed login with existing username", (done) => {
    const body = {
      username: "username1",
      password: "pass12",
    };
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          error:
            "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
        });
        done();
      });
  });

  it("Failed login with nonexisting username", (done) => {
    const body = {
      username: "username3",
      password: "pass1",
    };
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          error:
            "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
        });
        done();
      });
  });

  it("Failed login with empty username and password", (done) => {
    const body = {
      username: "",
      password: "",
    };
    chai
      .request(server)
      .post("/login")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Invalid Username/Password",
            status: 400,
          },
        });
        done();
      });
  });
});


describe("QuoteLoadTest", () => {
  it("Failed due to no username whatsoever", (done) => {
    const body = {};
    chai
      .request(server)
      .post("/quoteLoad")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid Username",
            status: 400,
          },
        });
        done();
      });
  });



  it("Failed due to empty username", (done) => {
    const body = {
      username: "",
    };
    chai
      .request(server)
      .post("/quoteLoad")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid Username",
            status: 400,
          },
        });
        done();
      });
  });

  it("Error returns due to incorrect username", (done) => {
    const body = {
      username: "DEBUG_incorrect",
    };
    chai
      .request(server)
      .post("/quoteLoad")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "You are in an incorrect account." });
        done();
      });
  });

  it("Loads Successfully do to correct username.", (done) => {
    const body = {
      username: "username1",
    };
    chai
      .request(server)
      .post("/quoteLoad")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ 
          "addr1": "1600 Pennsylvania Avenue, N.W.",
          "addr2": "",
          "city": "Washington",
          "state": "DC",
          "zipCode": "20500"
        });
        done();
      });
  });


});