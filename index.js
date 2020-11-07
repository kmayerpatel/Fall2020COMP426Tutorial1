const express = require('express');

const app = express();

const Book = require('./Book.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/book', (req, res) => {
    res.json(Book.getAllIDs());
    return;
});

app.get('/book/:id', (req, res) => {
    let b = Book.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Book not found");
        return;
    }
    res.json(b);
} );

app.post('/book', (req, res)=> {
    let {title, price, authors} = req.body;

    let b = Book.create(title, price, authors);
    if (b == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(b);
});

app.put('/book/:id', (req, res) => {
    let b = Book.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Book not found");
        return;
    }

    let {title, price, authors} = req.body;
    b.title = title;
    b.price = price;
    b.authors = authors;
    b.update();

    res.json(b);
});

app.delete('/book/:id', (req, res) => {
    let b = Book.findByID(req.params.id);
    if (b == null) {
        res.status(404).send("Book not found");
        return;
    }
    b.delete();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("Tutorial1 up and running on port " + port);
});



