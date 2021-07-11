const express = require('express');
const cors = require('cors'); //npm package which is an express middleware. if you are in control of the server you can install the cors
const app = express();

//body parser/
app.use(cors()); //gets rid of CORS error. CORS is the browser attemepting to protect itself from JS have access to the FS
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'meower'
    });
});

//validate what the client is sending has a name and a content
function isValidMew(mew) {// must be a string and not empty
    return mew.name && mew.name.toString().trim() !== '' && mew.content && mew.content.toString().trim() !== '';
}

app.post('/mews', (req, res) => {
    if(isValidMew(req.body)) {
        //insert into db...
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
        };
        console.log(mew)
    } else {
        res.status(422);
        res.json({
            message: "Hey! Name and Content are required"
        })
    }
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000')
})