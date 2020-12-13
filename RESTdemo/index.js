const express = require('express');
const app = express();
//ejs
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

//express
app.use(express.urlencoded({ entended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
//ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching!'
    },
    {
        id: uuid(),
        username: 'sk2332',
        comment: 'Plz delete your account, Todd!'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'wooof woof woof!'
    }
]

// GET /comments - list all comments
// POST /comments - create a new comment
// GET /comments/:id - get one comment (using ID)
// PATCH /comments/:id - update one comment
// DELETE /comments/:id - destory one comment
app.get('/comments', (req, res) => {
    // comments/index.ejs
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    //res.send("It worked!");
    //refresh the page, redirect
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    //request params;
    const { id } = req.params;
    //const comment = comments.find(c => c.id === parseInt(id));
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});

//浏览器的form只能get或者post,需要用patch,delete要借助override
//cannot send these requests
//use a form to fake it
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    //console.log(req.body.comment);
    //res.send("All good!");
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    //filter returns a new array
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    res.render('comments/edit', { foundComment });
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`POST /tacos Here's your ${qty} ${meat}`);
});

app.listen(3000, () => {
    console.log("ON PORT 3000!");
});

