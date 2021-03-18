const localHost = 1285;


async function register() {
    try{
        let uname = document.querySelector(`#pword`).value;
        let password =document.querySelector(`#uname`).value;
        if (uname != "" && password != "") {
            //Check if username already exists
            const body = {"uname": uname, pword: password};
            const res = await fetch(`http:/localhost:${localHost}/register`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            const mssg = await res.json();

            if (!("success" in msg)) {
                alert("Username already in-use, please choose a different one");
            }
            window.location.href = "login.html";

           
        } else {
            alert ("Please enter a Username and Password")
        }
    }
    catch(err){
       alert(err.message)
    }
}

function verifyInput(fullname, add1, city, state, zipcode){
    let errors = 0; 
    if (fullname.length == 1 || fullname.length > 50){
        if(fullname.length > 50){
            document.querySelector(`#fullname-error`).style.display = "block"
        }
        errors = errors + 1
        document.querySelector(`#fname`).style["border"] = "3px solid orange "; 
        document.querySelector(`#lname`).style["border"] = "3px solid orange "; 
    }

    if (add1.length == 0 || add1.length  > 100){
        if(add1.length > 100){
            document.querySelector(`#add1-error`).style.display = "block"
        }
        errors = errors + 1
        document.querySelector(`#address1`).style["border"] = "3px solid orange "; 
    }

    if (city.length == 0 || city.length  > 100){
        if(city.length > 100){
            document.querySelector(`#city-error`).style.display = "block"
        }
        errors = errors + 1
        document.querySelector(`#city`).style["border"] = "3px solid orange "; 
    }

    if (state.length != 2){
        document.querySelector(`#state-error`).style.display = "block"
        errors = errors + 1
        document.querySelector(`#state`).style["border"] = "3px solid orange "; 
    }

    if (zipcode.length < 5 || zipcode.length > 9){
        if(zipcode.length > 9){
            document.querySelector(`#zipcode-error`).style.display = "block"
        }
        errors = errors + 1
        document.querySelector(`#zipcode`).style["border"] = "3px solid orange "; 
    }
    return errors
}


async function saveProfile(){
    try{
        
        let uname = localStorage.getItem("username");

        let fullname = document.querySelector(`#fname`).value + "_" + document.querySelector(`#lname`).value

        let add1 = document.querySelector(`#address1`).value
        
        let add2 = document.querySelector(`#address2`).value

        let city = document.querySelector(`#city`).value
        
        let state = document.querySelector(`#state`).value 

        let zipcode = document.querySelector(`#zipcode`).value

        let errors = verifyInput(fullname, add1, city, state, zipcode); 

        if(errors == 0){
            const body = {"uname": uname, "name": fullname, "add1": add1.value, "add2": add2.value, "city":city.value, "state": state.value, "zipcode":zipcode.value }
            const res = await fetch(`http://localhost:${localHost}/manageProfile`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 
            });

            const msg = await res.json()

            if ("success" in msg){
                window.location.href = "quote.html"

            }
            
        }
        else {
            alert("Please fix highlighted fields")
        }
    }catch(err){
        alert(err.message)
    }
}