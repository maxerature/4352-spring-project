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

            if ("error" in msg) {
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



async function saveProfile(){
    try{
        
        let errors = 0;
        let uname = localStorage.getItem("username");

        //Input validation
        let fullname = document.querySelector(`#fname`).value + "_" + document.querySelector(`#lname`).value
       
        if (fullname.length == 1 || fullname.length > 50){
            if(fullname.length > 50){
                document.querySelector(`#fullname-error`).style.display = "block"
            }
            errors = errors + 1
            document.querySelector(`#fname`).style["border"] = "3px solid orange "; 
            document.querySelector(`#lname`).style["border"] = "3px solid orange "; 
        }

        let add1 = document.querySelector(`#address1`)
        if (add1.value.length == 0 || add1.value.length  > 100){
            if(add1.value.length > 100){
                document.querySelector(`#add1-error`).style.display = "block"
            }
            errors = errors + 1
            add1.style["border"] = "3px solid orange "; 
        }

        let add2 = document.querySelector(`#address2`).value

        let city = document.querySelector(`#city`)
        if (city.value.length == 0 || city.value.length  > 100){
            if(city.value.length > 100){
                document.querySelector(`#city-error`).style.display = "block"
            }
            errors = errors + 1
            city.style["border"] = "3px solid orange "; 
        }

        let state = document.querySelector(`#state`)
        if (state.value.length != 2){
            document.querySelector(`#state-error`).style.display = "block"
            errors = errors + 1
            state.style["border"] = "3px solid orange "; 
        }


        let zipcode = document.querySelector(`#zipcode`)
        if (zipcode.value.length < 5 || zipcode.value.length > 9){
            if(zipcode.value.length > 9){
                document.querySelector(`#zipcode-error`).style.display = "block"
            }
            errors = errors + 1
            zipcode.style["border"] = "3px solid orange "; 
        }
        if(errors == 0){
            const body = {"name": fullname, "add1": add1.value, "add2": add2.value, "city":city.value, "state": state.value, "zipcode":zipcode.value }
            const res = await fetch(`http://localhost:${localHost}/manageProfile/${uname}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body) 
            });

            const msg = await res.json()


            window.location.href = "quote.html"
            
        }
        else {

            alert("Please fix highlighted fields")
            
        }
    }catch(err){
        alert(err.message)
    }
}