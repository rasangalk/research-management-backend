const {check, validationResult} = require('express-validator');
exports.validateSignupRequest = [
        check('username')
        .notEmpty()
        .withMessage('Username is required'),
        check('role')
        .notEmpty()
        .withMessage('Role is required'),
        check('email')
        .isEmail()
        .withMessage('Email is required'),
        check('fullName')
        .notEmpty()
        .withMessage('FullName is required'),
        check('sliit_id')
        .notEmpty()
        .withMessage('Sliit Id is required'),
        check('phone')
        .notEmpty()
        .withMessage('Phone number is required'),
        check('password')
        .isLength({min:6})
        .withMessage('password must be at least 6 character long'),
        check('re_hash_password')
        .isLength({min:6})
        .withMessage('password must be at least 6 character long')
    
];


exports.validateSigninRequest = [
    check('username')
    .isEmail()
    .withMessage('Username is required'),
    check('password')
    .isLength({min:6})
    .withMessage('password must be at least 6 character long')

];


exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next();
}