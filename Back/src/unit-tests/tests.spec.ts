import chai from "chai";
import chaiHttp from "chai-http";
import server from "../app";
import userInfo from "../../../Common/users.json";

chai.use(chaiHttp);
const expect = chai.expect;

// Run test with: yarn run test

describe("Login test", () => {
  it("Successful login to the quote form", (done) => {
    const body = {
      username: "user1",
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
      username: "DEBUG_NOFN",
      password: "DEBUG_PASS",
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
      username: "user1",
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
      password: "pass1",
    };
    chai
      .request(server)
      .post("/register")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "username already in-use" });
        done();
      });
  });
  it("Successful registration with unique username", (done) => {
    const body = {
      username: "lmalhaim12",
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
  it("Successful Fetch profile when profile exists", (done) => {
    chai
      .request(server)
      .get(`/manageProfile/${"user1"}`)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.have.property("name");
        done();
      });
  });
  it("Failed Fetch profile when profile not initiated", (done) => {
    chai
      .request(server)
      .get(`/manageProfile/${"lmalhaim"}`)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.have.property("None");
        done();
      });
  });
  it("Failed Fetch profile when profile doesnt exists", (done) => {
    chai
      .request(server)
      .get(`/manageProfile/${"NotUser"}`)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.have.property("None");
        done();
      });
  });
  it("Successful manage profile when username is logged in", (done) => {
    const body = {
      username: "username1",
      fullname: "Lia_Johnson",
      add1: "510 richmond avenu",
      add2: "apt 515",
      city: "Houston",
      state: "TX",
      zipcode: 77006,
    };
    chai
      .request(server)
      .post("/manageProfile")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ success: "Profile Saved" });
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

  it("Loads Successfully due to correct username.", (done) => {
    const body = {
      username: "DEBUG_USER",
    };
    chai
      .request(server)
      .post("/quoteLoad")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          addr1: "DEBUG MAIN ADDRESS",
          addr2: "DEBUG SECOND ADDRESS",
          city: "DEBUG CITY",
          state: "DEBUG STATE",
          zipCode: 1,
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
      deliveryDate: "10-2-2019",
      galsRequested: 12,
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
      deliveryDate: "10-2-2019",
      pricePerGal: 12.03,
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
      galsRequested: 12,
      pricePerGal: 1,
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
      galsRequested: 12,
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
      deliveryDate: "10-2-2019",
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
      priceperGal: 2,
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
      deliveryDate: "eleventeen",
      galsRequested: 10,
      pricePerGal: 10,
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "Error. Wrong date format." });
        done();
      });
  });

  it("Failed due to incorrect gallons requested format", (done) => {
    const body = {
      deliveryDate: "2019-10-10",
      galsRequested: "a",
      pricePerGal: 10,
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
      deliveryDate: "2019-10-10",
      galsRequested: 10,
      pricePerGal: "a",
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
      deliveryDate: "2019-10-10",
      galsRequested: 10,
      pricePerGal: 10,
    };
    chai
      .request(server)
      .post("/request")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ cost: 100 });
        done();
      });
  });
});

describe("QuoteSubmitTest", () => {
  it("Failed due to no parameters", (done) => {
    const body = {};
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to missing parameters (deliveryDate, galsRequested, pricePerGal, cost)", (done) => {
    const body = {
      username: "foo",
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });
  it("Failed due to missing parameters (username, galsRequested, pricePerGal, cost)", (done) => {
    const body = {
      deliveryDate: "foo",
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });
  it("Failed due to missing parameters (username, deliveryDate, pricePerGal, cost)", (done) => {
    const body = {
      galsRequested: 2,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });
  it("Failed due to missing parameters (username, deliveryDate, galsRequested, cost)", (done) => {
    const body = {
      pricePerGal: 2,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });
  it("Failed due to missing parameters (username, deliveryDate, galsRequested, pricePerGal)", (done) => {
    const body = {
      cost: 2,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid input.",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to incorrect username", (done) => {
    const body = {
      username: "DEBUG_incorrect",
      deliveryDate: "2019-10-10",
      galsRequested: 10,
      pricePerGal: 10,
      cost: 100,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "You are in an incorrect account." });
        done();
      });
  });

  it("Failed due to invalid gallons", (done) => {
    const body = {
      username: "DEBUG_USER",
      deliveryDate: "2019-10-10",
      galsRequested: -10,
      pricePerGal: 10,
      cost: 100,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "Gallons must be >0!" });
        done();
      });
  });

  it("Successfully returned new history", (done) => {
    const body = {
      username: "DEBUG_USER",
      deliveryDate: "2019-10-10",
      galsRequested: 10,
      pricePerGal: 10,
      cost: 100,
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          success: "history.html"
        });
        done();
      });
  });
});

describe("HistoryLoadTest", () => {
  it("Failed due to no username whatsoever", (done) => {
    const body = {};
    chai
      .request(server)
      .post("/generateHistory")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(400);
        expect(res.body).to.eql({
          error: {
            message: "Error. Invalid Username!",
            status: 400,
          },
        });
        done();
      });
  });

  it("Failed due to incorrect username", (done) => {
    const body = {
      username: "DEBUG_incorrect",
    };
    chai
      .request(server)
      .post("/generateHistory")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({ error: "You are in an incorrect account." });
        done();
      });
  });

  it("Returned successfully", (done) => {
    const body = {
      username: "DEBUG_USER_RO",
    };
    chai
      .request(server)
      .post("/generateHistory")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          success: "<table style='width:100%'>\n    <tr>\n        <th><b>Delivery Date</b></th>\n        <th><b>Gallons Requested</b></th>\n        <th><b>Price Per Gallon</b></th>\n        <th><b>Total Price</b</th>\n        <th><b>Address</b></th>\n    </tr>\n <tr>\n        <th> Mon Oct 12 1012 00:00:00 GMT-0550 (Central Daylight Time) </th>\n        <th> 0.5 </th>n        <th>$1</th>\n        <th>$0.5</th>\n        <th>DEBUG_RO MAIN ADDRESS<br>        DEBUG_RO SECOND ADDRESS<br>        DEBUG_RO CITY, DEBUG_RO STATE, 4<br><br></th>\n    </tr></table>",
        });
        console.log("shit");
        done();
      });
  });
});
