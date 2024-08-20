const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
const asyncHandler = require('express-async-handler');

const alphaErr = 'must only contain letters';
const nameLengthErr = 'must be between 1 and 25 characters';
const mssgLengthErr = 'must be between 1 and 150 characters';

const validateMessage = [
    body('name').trim()
    .isAlpha().withMessage('Name ' + alphaErr)
    .isLength({ min: 1, max: 25 }).withMessage('Name ' + nameLengthErr),
    body('msg').trim()
    .isLength({ min: 1, max: 150 }).withMessage('Message ' + mssgLengthErr)
]

const postNewMssg = [
    validateMessage,
    asyncHandler( async (req, res) => {
        const msgObj = {msg: req.body.msg, name: req.body.name, dateAdded: new Date()};
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render('form', {
                errors: errors.array()
            });
        }
        await db.insertMessage(msgObj);
        res.redirect('/');
    })
];

const getMessages = asyncHandler( async (req, res) => {
    const messages = await db.selectAllMessages();
    res.render('index', { title: 'Mini Message Board', messages: messages });
});

const getMessageById = asyncHandler( async (req, res) => {
    const messages = await db.selectMessageById(req.params.mssgId);
    if(messages.length == 0){
        return res.render('message', { 
            message: { msg: '', name: '', dateAdded: '' },
            errors: [{ msg: 'Message not found'}]
        });
    }
    res.render('message', { message: messages[0] });
});

module.exports = { postNewMssg, getMessages, getMessageById };