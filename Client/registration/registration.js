


var fs = require('fs')


function register() {
    try{
        let uname = document.querySelector(`#uname`).value
        let password = document.querySelector(`#pword`).value
        
       
        fs.readFile('./users.json', 'utf-8', 
            function(err, data){
                if (err){
                    alert("err = " + err.message)
                }
                var users_arr = JSON.parse(data)

                if (users_arr[uname] == 0) {
                    users_arr.users.push(
                        {
                            uname : {
                                "password": password, 
                                "full name":"",
                                "address1":"", 
                                "address2":"",
                                "city":"", 
                                "state":"", 
                                "zipcode":""
                            }
                        }
                    )

                    fs.writeFile('./users.json', JSON.stringify(users_arr), 'utf-8',
                        function(err){
                            if (err){
                                alert(err.message)
                            }
                            alert('Done!')
                        }
                    )
                }else{
                    alert("Username already taken.\n Please choose a different one")
                }
            }
        )
    }
    catch(err){
        alert("err = " + err.message)
    }
}



function saveProfile(){
    try{
        let uname = document.querySelector(`#uname`)
        let password = document.querySelector(`#pword`)
        let fullname = document.querySelector(`#fname`) + "_" + document.querySelector(`#lname`)
        let add1 = document.querySelector(`#address1`)
        let add2 = document.querySelector(`#address2`) 
        let city = document.querySelector(`#city`)
        let state = document.querySelector(`#state`)
        let zipcode = document.querySelector(`#zipcode`)
    }catch(err){
        console.log(err.message)
    }
}