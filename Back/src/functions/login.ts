import userInfo from "../../../Common/users.json";

let userTS: any = userInfo;

export function AuthLogin(username: string, password: string) {
  // If username exists in db
  if (username in userInfo.users) {
    // If password matches in db
    if (userTS.users[username].password == password) {
      // If user already created profile
      if (userTS.users[username].fullname != "") {
        return { success: "quote.html" };
      } else {
        return { success: "ProfileManage.html" };
      }
    } else {
      // error
      return {
        error:
          "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
      };
    }
  } else {
    // error
    return {
      error:
        "Error: Login failed\nUsername does not exist, or password was typed incorrectly.",
    };
  }
}
