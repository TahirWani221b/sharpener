const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res, next) => {
    res.send(`
    <form method="POST" action="/login" onsubmit="userlogin(event)">
    <input type ="text" name="username" required>
    <button type="submit">submit</button>
    </form>
    <script>
    function userlogin(e){
        let username = document.querySelector('input[name = "username"]').value;
       if(username.trim() == ""){
        e.preventDefault();
            alert("username can't be empty!!!");
            return false;
        }
        localStorage.setItem('chat_username', username);
    };
    </script>
    `);
});

app.post('/login', (req, res, next) => {
    if (req.body.username == "") {
        return res.redirect('/login');
    }
    res.redirect('/');
})

app.get('/', (req, res, next) => {
    try {
        var showdata = fs.readFileSync('chat.txt', 'utf-8');
        if (showdata == "") {
            showdata = 'No Chats Exists!!';
        }
    } catch (err) {
        fs.writeFileSync("chat.txt", "");
        var showdata = 'No Chats Exists!!'
    }

    res.send(`
    <div class="all-chats">${showdata}</div>
    <form method="POST" action="/chat" onsubmit="loginCheck(event)">
    <input type ="text" name="msg" required>
    <input type = "hidden" name="senderName" value="">
    <button type="submit">Send</button>
    </form>
    <script>
    document.querySelector('input[name="senderName"]').value = localStorage.getItem('chat_username');
    function  loginCheck(e){ 
        let check_login_key = localStorage.getItem('chat_username');
        if(check_login_key == null || check_login_key == ""){ 
            e.preventDefault();
            alert("go to login page and login first");
            location.href = "/login";
        }
    }
    </script>
    `);
});
app.post('/chat', (req, res, next) => {
    var fileContent = req.body.msg;
    fileContent = req.body.senderName + " : " + fileContent;
    if (fileContent == "") {
        return res.redirect('/');
    }
    fileContent += "</br>\n";
    fs.appendFileSync('chat.txt', fileContent);
    res.redirect('/');
});
app.listen(4000, () => {
    console.log('port listening to 4000');
});
