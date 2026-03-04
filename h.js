const express = require('express');
const jwt = require('jsonwebtoken');
const secretkey = "mysecretkey";
const app = express();

app.use(express.json());
const users = [];

function authtoken(req, res, next) {
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, secretkey);
        req.username = decoded.username;
        next()
    }
    catch (err) {
        res.json({ message: "invalid token" });
    }
}








// random generated token
// function generateToken() {
//     let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let token = "";
//     for (let i = 0; i < 32; i++) {
//         // use a simple function here
//         token += options[Math.floor(Math.random() * options.length)];
//     }
//     return token;
// }



app.post('/signingup', (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.json({ message: "user signed up successfully" });
    if (username.length < 5) {
        res.json({ message: "username must be at least 5 characters long" });
        return;
    }
    console.log(users);
});
app.post('/signingin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({
            username: username
        }, secretkey);
        // user.token = token;
        res.json({ message: "user signed in successfully", token });
    } else {
        res.json({ message: "invalid credentials" });
    }
    console.log(users);
});

app.get('/me', authtoken, (req, res) => {
 
    const user = users.find(u => u.username === req.username);
    if (user) {
        res.json({ username: user.username, password: user.password });
    }
})
app.listen(3000);




