const localHost = 5000;



function register() {
    try{
        let username = document.querySelector(`#uname`).value;
        let password =document.querySelector(`#pword`).value;
        if (username != "" && password != "") {
            //Check if username already exists

            (async () => {
                const rawResponse = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({ username, password })
                });
                const content = await rawResponse.json();

                if (content.hasOwnProperty("success")) {
                    window.location.href = "login.html";
                } else if (content.hasOwnProperty("error")) {
                    alert("Username already in-use, please choose a different one");
                }
            })();
        }
            

           
    
    }
    catch(err){
       alert("error:" + err.message)
    }
}

function fetchStates(){
    try{
        document.querySelector("#Profile").innerHTML += `
        <div class="input-container">
            <input class = "input-field" id = "fname" type="text" placeholder="First Name*"> 
            <input class = "input-field" id = "lname" type="text" placeholder="Last Name*"> 
            <p class = "error" id = "fullname-error" > (First name and last name cant be more than 50 characters)</p>
        </div>
        <div class = "input-container">
            <input class = "input-field" id = "address1" type = "text" placeholder = "Address 1*"> 
            <p class = "error" id = "add1-error" > (First address cant be more than 100 characters)</p>
            <input class = "input-field" id = "address2" type = "text" placeholder = "Address 2"> 
        </div>
        <div class = "input-container"> 
            <input class = "input-field" id = "city" type = "text" placeholder = "city*"> 
            <p class = "error" id = "city-error" > (City cant be more than 100 characters)</p>
            <select id = "state"> 
                <option> State* </option>
        </select>
            <p class = "error" id = "state-error" > (Choose a state)</p>
            <input class = "input-field" id = "zipcode" type = "number" placeholder = "Zip code*">
            <p class = "error" id = "zipcode-error" > (zipcode cant be more than 100 characters)</p>
        </div>`;
        (async () => {
            const rawResponse = await fetch(`http://localhost:5000/getStates`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            });
            const content = await rawResponse.json();
            if (!content.hasOwnProperty("None")) {
                for (var i = 0; i < content.length;i++){
                    var option = document.createElement("option"); 
                    option.text = `${content[i].state}`; 
                    document.querySelector(`#state`).add(option);
                }
            }
        })();
        fetchProfile();
    }catch(err){
        console.log(err.message);
    }
}

function fetchProfile(){
    let username = localStorage.getItem("username");
   
    (async () => {
        const rawResponse = await fetch(`http://localhost:5000/manageProfile/${username}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const content = await rawResponse.json();
        if (!content.hasOwnProperty("None")) {
            fullname = content.name.split("_");
            alert(content.state); 
            document.querySelector(`#state`).value = content.state;
            document.querySelector(`#fname`).value = fullname[0];
            document.querySelector(`#lname`).value = fullname[1];
            document.querySelector(`#address1`).value = content.add1;
            if(content.add1 != content.add2){
                document.querySelector(`#address2`).value = content.add2;
            }
            document.querySelector(`#city`).value = content.city;
            document.querySelector(`#zipcode`).value = content.zipcode;
        }
    })();

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
        
        let username = localStorage.getItem("username");

        let fullname = document.querySelector(`#fname`).value + "_" + document.querySelector(`#lname`).value

        let add1 = document.querySelector(`#address1`).value
        
        let add2 = document.querySelector(`#address2`).value

        let city = document.querySelector(`#city`).value
        
        let state = document.querySelector(`#state`).value 

        let zipcode = document.querySelector(`#zipcode`).value

        let errors = verifyInput(fullname, add1, city, state, zipcode); 
        if(add2 == ""){
            add2 = add1; 
        }
        if(errors == 0){
            const body = {username, fullname, add1, add2, city, state, zipcode};
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
