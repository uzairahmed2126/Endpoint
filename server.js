// require('dotenv')
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const connection = require('./database/connection')
const port = process.env.PORT || 8001

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set(port)
app.use(express.urlencoded({ extended: false }));
app.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const encryptPassword = await bcrypt.hash(password, 4);
        await connection.query(
            "INSERT INTO data_info(name, password) VALUES(?, ?)",
            [name, encryptPassword]
        )
        res.redirect('/audio')
    } catch (error) {
        console.error(error)
    }
})

app.get('/', (req, res) => res.render('index.ejs'));
app.get('/audio', (req, res) => res.render('aud.ejs'))
app.get('/login', (req, res) => res.render('login.ejs'));
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})