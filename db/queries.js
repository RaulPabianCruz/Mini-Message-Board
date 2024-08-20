const pool = require('./pool');

async function selectAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messageBrd;');
    return rows;
}

async function selectMessageById(id) {
    const { rows } = await pool.query('SELECT * FROM messageBrd WHERE id = $1;', [id]);
    return rows;
}

async function insertMessage(msgObj) {
    await pool.query('INSERT INTO messageBrd (msg, name, dateAdded) VALUES ($1, $2, $3);', [msgObj.msg, msgObj.name, msgObj.dateAdded]);
}

module.exports = { selectAllMessages, selectMessageById, insertMessage };