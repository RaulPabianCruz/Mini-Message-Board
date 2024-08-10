let messages = [
    {
        text: 'Hi there!',
        user: 'Amando',
        added: new Date()
    },
    {
        text: 'Hello World!',
        user: 'Charles',
        added: new Date()
    }
];

const postNewMssg = (req, res) => {
    messages.push({text: req.body.text, user: req.body.user, added: new Date()});
    res.redirect('/');
};

const getMessages = (req, res) => {
    res.render('index', { title: 'Mini Message Board', messages: messages });
}

module.exports = { postNewMssg, getMessages };