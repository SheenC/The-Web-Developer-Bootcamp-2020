const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
//console.log(redditData);

app.set('view engine', 'ejs');
// __dirname is where index.js is located
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    //res.send("HI");
    // /views/home.ejs
    res.render('home');
});

app.get('/cats', (req, res) => {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
    res.render('cats', { cats });
});


app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    //console.log(data);
    // /views/subreddit.ejs
    // res.render('subreddit', { subreddit });
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit })
    }
    
});

app.get('/rand', (req, res) => {
    // /views/random.ejs
    const num = Math.floor(Math.random()*10)+1;
    res.render('random', { rand_num: num});
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});