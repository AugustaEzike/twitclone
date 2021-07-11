const express = require('express');
const cors = require('cors'); //npm package which is an express middleware. if you are in control of the server you can install the cors
const filter = require('bad-words');
const rateLimit = require('express-rate-limit')
const monk = require('monk'); //for db


const app = express();

const db = monk('localhost/meower')//connect to the mongodb on my machine to a database called meower
//think of a mongocollection as an array that you are just pushing data into. even if the serve gos down, the data is all still there
const mews = db.get('mews'); //in mongo, if the database or the collection does not exist, this will automatically create it
//right now mews is a collection inside our database

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

//req, res means it is querying the database
app.get('/mews', (req, res) => {
    mews
        .find()
        .then(mews => {
            res.json(mews);
        });
    })

    app.use(rateLimit({
        windowMs: 30 * 1000, // 30 seconds
        max: 1 // limit each IP to 1 requests per windowMs
    }))

    app.post('/mews', (req, res) => {
    if(isValidMew(req.body)) {
        //insert into db...
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };

        
        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew);
            });

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