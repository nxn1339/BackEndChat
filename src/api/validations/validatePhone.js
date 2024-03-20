function validatePhone(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

module.exports = {
    validatePhone
}