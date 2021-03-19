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


describe("Registration test", () => {
  it("Failed registration with existing username", (done) => {
    const body = {
      username: "username1",
      password: "pass123",
    };
    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({error: "username already in-use"});
        done();
      });
 });
 it("Successful registration with unique username", (done) => {
  const body = {
    username: "lmalhaim",
    password: "pass123",
  };
  chai
    .request(server)
    .post("/register")
    .send(body)
    .end((err, res) => {
      expect(res).have.status(200);
      expect(res.body).to.eql({ success: "user registered" });
      done();
    });
  });
});


describe("Manage Profile test", () => {
  it("Successful manage profile when username is first time logging-in", (done) => {
    const body = {
      username: "username2",
        fullname: "Lia_Johnson",
        add1: "510 richmond avenu",
        add2: "apt 515",
        city: "Houston",
        state: "TX",
        zipcode: 77006
    };
    chai
      .request(server)
      .post("/manageProfile")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ success: "profile input added" });
        done();
    });
  });
  it("Failed to manage profile when username is not first time logging in", (done) => {
    const body = {
      username: "username1",
      fullname: "Lia_Johnson",
      add1: "510 richmond avenu",
      add2: "apt 515",
      city: "Houston",
      state: "TX",
      zipcode: 77006
    };
    chai
      .request(server)
      .post("/manageProfile")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({error: "profile already set up"});
        done();
    });
 });
 
  it("Failed to manage profile when username doesnt exist", (done) => {
    const body = {
      username: "liaJohnson",
      fullname: "Lia_Johnson",
      add1: "510 richmond avenu",
      add2: "apt 515",
      city: "Houston",
      state: "TX",
      zipcode: 77006
    };
    chai
      .request(server)
      .post("/manageProfile")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({error:"username doesnt exist"});
        done();
    });
  });
});