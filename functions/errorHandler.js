const errorHandler = (err) => {
    const error = {
        name: '',
        phoneNumber: '',
        email: ''
    }    
    if(err.code === 11000){
        if(err.keyValue.phoneNumber){
            error.phoneNumber = "This phone number is already added!"
        }
        if(err.keyValue.email){
            error.email = "This email is already added!"
        }
        console.log(error);
        return error;
    }

    Object.values(err.errors).forEach(({properties}) => {
        error[properties.path] = properties.message;
    });
    console.log(error);
    return error;
}

module.exports = errorHandler;
