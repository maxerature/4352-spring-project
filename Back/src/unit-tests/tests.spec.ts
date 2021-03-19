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

describe("QuoteCalPriceTest", () => {
  it("Failed due to no parameters", (done) => {
    const body = {};
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (pricePerGal)", (done) => {
    const body = {
      deliveryDate:"10-2-2019", 
      galsRequested:12
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (galsRequested)", (done) => {
    const body = {
      deliveryDate:"10-2-2019", 
      pricePerGal: 12.03
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (deliveryDate)", (done) => {
    const body = {
      galsRequested:12,
      pricePerGal: 1
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (deliveryDate, pricePerGal)", (done) => {
    const body = {
      galsRequested:12
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (galsRequested, pricePerGal)", (done) => {
    const body = {
      deliveryDate:"10-2-2019", 
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (deliveryDate, galsRequested)", (done) => {
    const body = {
      priceperGal: 2
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to incorrect deliveryDate format", (done) => {
    const body = {
      deliveryDate:"eleventeen", 
      galsRequested: 10,
      pricePerGal: 10
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({error: "Error. Wrong date format."});
        done();
      });
  });

  it("Failed due to incorrect gallons requested format", (done) => {
    const body = {
      deliveryDate:"10-10-2019", 
      galsRequested: "a",
      pricePerGal: 10
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to incorrect price per gallon format", (done) => {
    const body = {
      deliveryDate:"10-10-2019", 
      galsRequested: 10,
      pricePerGal: "a"
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Successfully returned a price", (done) => {
    const body = {
      deliveryDate:"10-10-2019", 
      galsRequested: 10,
      pricePerGal: 10
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({cost:100});
        done();
      });
  });
});