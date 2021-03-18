import { expect } from "chai";
import "mocha";

import { AuthLogin } from "../functions/login";

describe("Login test", () => {
  it("Successful login to the quote form", () => {
    let username = "username1";
    let password = "pass1";

    let result = AuthLogin(username, password);
    expect(result).to.include({ success: "quote.html" });
  });

  it("Successful login to profile management", () => {
    let username = "username2";
    let password = "pass2";

    let result = AuthLogin(username, password);
    expect(result).to.include({ success: "ProfileManage.html" });
  });

  it("Failed login with existing username", () => {
    let username = "username1";
    let password = "pass12";

    let result = AuthLogin(username, password);
    expect(result).to.include({
      error:
        "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
    });
  });

  it("Failed login with nonexisting username", () => {
    let username = "username3";
    let password = "pass1";

    let result = AuthLogin(username, password);
    expect(result).to.include({
      error:
        "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
    });
  });

  it("Failed login with empty username and password", () => {
    let username = "";
    let password = "";

    let result = AuthLogin(username, password);
    expect(result).to.include({
      error:
        "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
    });
  });
});
