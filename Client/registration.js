

function register() {
    try{
        let uname = document.querySelector(`#pword`).value
        let password =document.querySelector(`#uname`).value
        
    }
    catch(err){
       alert(err.message)
    }
}



function saveProfile(){
    try{
        
        let errors = 0
        /*let uname = document.querySelector(`#uname`).value
        let password = document.querySelector(`#pword`).value*/


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
        if(errors > 0){
            alert("Please fix highlighted fields")
        }
        else {
            location.href = "quote.html"
        }
    }catch(err){
        alert(err.message)
    }
}