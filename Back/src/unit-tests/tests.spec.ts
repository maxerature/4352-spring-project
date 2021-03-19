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
      username: "foo"
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
      deliveryDate: "foo"
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
      galsRequested: 2
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
      pricePerGal: 2
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
      cost: 2
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
      deliveryDate: "10-10-2019",
      galsRequested: 10,
      pricePerGal: 10,
      cost: 100
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({failure: "You are not logged in."});
        done();
      });
  });

  it("Failed due to invalid gallons", (done) => {
    const body = {
      username: "username1",
      deliveryDate: "10-10-2019",
      galsRequested: -10,
      pricePerGal: 10,
      cost: 100
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({error: "Gallons must be >0!"});
        done();
      });
  });

  it("Successfully returned new history", (done) => {
    const body = {
      username: "username1",
      deliveryDate: "10-10-2019",
      galsRequested: 10,
      pricePerGal: 10,
      cost: 100
    };
    chai
      .request(server)
      .post("/submit")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          success: "history.html",
          string: JSON.stringify(userInfo)
          // string: `{"users":{"username1":{"password":"pass1","fullname":"fname1","address1":"1600 Pennsylvania Avenue, N.W.","address2":"","city":"Washington","state":"DC","zipcode":"20500","history":[{"requested":1.08,"delivery_address1":"The al'Thor Farm","delivery_address2":"","city":"Emond's Field","state":"Two Rivers","zipcode":"00000","delivery_date":"1245-06-22","suggested_ppg":1,"total":1.08},{"requested":420,"delivery_address1":"1600 Pennsylvania Avenue, N.W.","delivery_address2":"","city":"Washington","state":"DC","zipcode":"20500","delivery_date":"4-20-395","suggested_ppg":2,"total":840},{"requested":23,"delivery_address1":"1600 Pennsylvania Avenue, N.W.","delivery_address2":"","city":"Washington","state":"DC","zipcode":"20500","delivery_date":"2021-03-01","suggested_ppg":0.245,"total":5.635},{"requested":21,"delivery_address1":"1600 Pennsylvania Avenue, N.W.","delivery_address2":"","city":"Washington","state":"DC","zipcode":"20500","delivery_date":"2021-03-02","suggested_ppg":0.763,"total":16.023},{"requested":10,"delivery_address1":"1600 Pennsylvania Avenue, N.W.","delivery_address2":"","city":"Washington","state":"DC","zipcode":"20500","delivery_date":"10-10-2019","suggested_ppg":10,"total":100}]},"username2":{"password":"pass2","fullname":"","address1":"","address2":"","city":"","state":"","zipcode":""}}}`
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
      username: "DEBUG_incorrect"
    };
    chai
      .request(server)
      .post("/generateHistory")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({failure: "You are not logged in."});
        done();
      });
  });

  it("Returned successfully", (done) => {
    const body = {
      username: "username1"
    };
    chai
      .request(server)
      .post("/generateHistory")
      .send(body)
      .end((err, res) => {
        expect(res).have.status(200);
        expect(res.body).to.eql({
          success:"<h3>Quote #1</h3><b>requested:</b> 1.08<br><b>delivery_address1:</b> The al'Thor Farm<br><b>delivery_address2:</b> <br><b>city:</b> Emond's Field<br><b>state:</b> Two Rivers<br><b>zipcode:</b> 00000<br><b>delivery_date:</b> 1245-06-22<br><b>suggested_ppg:</b> 1<br><b>total:</b> 1.08<br><h3>Quote #2</h3><b>requested:</b> 420<br><b>delivery_address1:</b> 1600 Pennsylvania Avenue, N.W.<br><b>delivery_address2:</b> <br><b>city:</b> Washington<br><b>state:</b> DC<br><b>zipcode:</b> 20500<br><b>delivery_date:</b> 4-20-395<br><b>suggested_ppg:</b> 2<br><b>total:</b> 840<br><h3>Quote #3</h3><b>requested:</b> 23<br><b>delivery_address1:</b> 1600 Pennsylvania Avenue, N.W.<br><b>delivery_address2:</b> <br><b>city:</b> Washington<br><b>state:</b> DC<br><b>zipcode:</b> 20500<br><b>delivery_date:</b> 2021-03-01<br><b>suggested_ppg:</b> 0.245<br><b>total:</b> 5.635<br><h3>Quote #4</h3><b>requested:</b> 21<br><b>delivery_address1:</b> 1600 Pennsylvania Avenue, N.W.<br><b>delivery_address2:</b> <br><b>city:</b> Washington<br><b>state:</b> DC<br><b>zipcode:</b> 20500<br><b>delivery_date:</b> 2021-03-02<br><b>suggested_ppg:</b> 0.763<br><b>total:</b> 16.023<br><h3>Quote #5</h3><b>requested:</b> 10<br><b>delivery_address1:</b> 1600 Pennsylvania Avenue, N.W.<br><b>delivery_address2:</b> <br><b>city:</b> Washington<br><b>state:</b> DC<br><b>zipcode:</b> 20500<br><b>delivery_date:</b> 10-10-2019<br><b>suggested_ppg:</b> 10<br><b>total:</b> 100<br>"
        });
        done();
      });

  });
});