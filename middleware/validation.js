//returns false in case data in body is empty
const isValidbody = function (x) {
    return Object.keys(x).length > 0
}

const mongoose = require("mongoose")

//check if type string and length greater then zero after trim
const isValid = function (value) {
    if (typeof value !== "string") return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};

//String Validation
const isValidString = function(value){
    if(typeof value ==='string' && value.trim().length ===0)return false
    return true
}

//password validation
const isValidPassword = function (password) {
    password = password.trim()
    if (password.length < 8 || password.length > 15) {
        return false
    } return true
}

//ObjectId Validation
const  isValidObjectId =function(id){
    var ObjectId = mongoose.Types.ObjectId;
    return ObjectId.isValid(id)
}

//password validation
const isValidPincode = function (pincode) {
    if (pincode.toString().length != 6) {
        return false
    } return true
}

//ISBN Validation
const isValidISBN =function(ISBN){
    const  dateRegex =/^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/
    return dateRegex.test(ISBN)
}
//Date Validation
const isValidDate =function(date){
    const  dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return dateRegex.test(date)
}

//Ragex
const nameRegex =  /^[ a-z ]+$/i
const emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
const phoneRegex = /^[6-9]\d{9}$/
const objectid = /^[0-9a-fA-F]{24}$/

module.exports = { isValid, isValidPassword,isValidString,isValidObjectId,isValidDate, isValidbody, isValidISBN,nameRegex, emailRegex, objectid, phoneRegex, isValidPincode} 