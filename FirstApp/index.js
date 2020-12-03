const express = require("express");

const app = express();

//console.dir(app);
//chrome:   localhost: 3000
app.listen(9999, () => {
    console.log("Listening on port 9999!");
});

// /cats => 'meow'
// /dogs => 'woof'
// '/'

app.get('/', (req, res) => {
    console.log("Home page!");
    res.send("Welcome to the homepage!");
});

//pattern
app.get('/r/:subreddit', (req, res) => {
    //console.log("Subreddit!");
    //console.log(req.params);
    const { subreddit } = req.params;
    //res.send("This is a subreddit!");
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
});

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit, ${postId} postId</h1>`);
});

app.get('/cats', (req, res) => {
    console.log("Cat Request!");
    res.send("Meow!");
});

app.post('/cats', (req, res) => {
    console.log("Post Cat Request!");
    res.send("Post request! Meow!");
});

app.get('/dogs', (req, res) => {
    console.log("Dog Request!");
    res.send("Woof!");
});

//query  localhost:9999/search?q=dogs&color=red
app.get('/search', (req, res) => {
    //console.log(req.query);
    const { q } = req.query;
    if (!q) res.send('Nothing found if nothing searched!');
    res.send(`<h1>Search results for: ${q}</h1>`);
});

//all other, don't put in the front
app.get('*', (req, res) => {
    console.log("Other things!");
    res.send("I don't know that path!");
});

//request, respond
/*
app.use( (req, res) => {
    console.log("We got a new request!");
    //parse in the http information
    //console.dir(req);
    //res.send("Hello, we got your request. This is a response.");
    res.send('<h1>This is my webpage!</h1>');
});
*/

