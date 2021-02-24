

function register() {
    try{
        let uname = document.querySelector(`#pword`).value
        let password =document.querySelector(`#uname`).value
        
    }
    catch(err){
       alert("err1 = " + err.message)
    }
}



function saveProfile(){
    try{
        let errors = 0
        /*let uname = document.querySelector(`#uname`).value
        let password = document.querySelector(`#pword`).value*/


        let fullname = document.querySelector(`#fname`).value + "_" + document.querySelector(`#lname`).value
        if (fullname.length == 1 || fullname.length > 50){
            errors = errors + 1
            alert("Please enter a valid name")
        }

        let add1 = document.querySelector(`#address1`).value
        if (add1.length == 0 || add1.length  > 100){
            errors = errors + 1
            alert("Please enter a valid first address")
        }

        let add2 = document.querySelector(`#address2`).value

        let city = document.querySelector(`#city`).value
        if (city.length == 0 || city.length  > 100){
            errors = errors + 1
            alert("Please enter a valid city")
        }

        let state = document.querySelector(`#state`).value
        if (state.length != 2){
            errors = errors + 1
            alert("Please select a state")
        }


        let zipcode = document.querySelector(`#zipcode`).value
        if (zipcode.length < 5 || zipcode.length > 9){
            errors = errors + 1
            alert("zipcode must be between 5 and  7 characters")
        }

        
    }catch(err){
        alert(err.message)
    }
}