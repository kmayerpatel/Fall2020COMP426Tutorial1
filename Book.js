const book_data = require('data-store')({ path: process.cwd() + '/data/book.json' });

class Book {

    constructor (id, title, price, authors) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.authors = authors;
    }

    update () {
        book_data.set(this.id.toString(), this);
    }

    delete () {
        book_data.del(this.id.toString());
    }
}

Book.getAllIDs = () => {
    return Object.keys(book_data.data).map((id => {return parseInt(id);}));
}

Book.findByID = (id) => {
    let bdata = book_data.get(id);
    if (bdata != null) {
        return new Book(bdata.id, bdata.title, bdata.price, bdata.authors);
    }
    return null;
}

Book.next_id = Book.getAllIDs().reduce((max, next_id) => {
    if (max < next_id) {
        return next_id;
    }
    return max;
}, -1) + 1;

Book.create = (title, price, authors) => {
    let id = Book.next_id;
    Book.next_id += 1;
    let b = new Book(id, title, price, authors);
    book_data.set(b.id.toString(), b);
    return b;
}

//let b1 = new Book(0, "My First Book", 10.50, ['Ketan Mayer-Patel', 'Maitray Patel']);
//book_data.set(b1.id.toString(), b1);

module.exports = Book;
