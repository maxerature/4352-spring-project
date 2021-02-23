function register() {
    try{
        let uname = document.querySelector(`#uname`)
        let password = document.querySelector(`#pword`)
        let fullname = document.querySelector(`#fname`) + "_" + document.querySelector(`#lname`)
        let add1 = document.querySelector(`#address1`)
        let add2 = document.querySelector(`#address2`) 
        let city = document.querySelector(`#city`)
        let state = document.querySelector(`#state`)
        let zipcode = document.querySelector(`#zipcode`)
    }
    catch(err){
        console.log(err.message)
    }
}