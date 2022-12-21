let books = [];

//adding book to the library
function store(book) {
    books.push(book);
}

//Book object
function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
}
Book.prototype.printInfo = function() {
    return (this.isread) ? 
    `${this.title} by ${this.author}\n${this.pages} pages\nRead` : 
    `${this.title} by ${this.author}\n${this.pages} pages\nNot Read`;
}
Book.prototype.readStatus = function() {
    this.isread = !this.isread;
}

//showing library
const container = document.querySelector('div.container');

function show(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = book.printInfo();
        
    const remove = document.createElement('button');
    remove.innerText = 'REMOVE';

    const read = document.createElement('button');
    read.innerText = 'CHANGE';

    remove.addEventListener('click', (e) => {
        card.style.display = 'none';
        books = books.filter((el) => el===book ? false : true);
        console.log(books);
    });

    read.addEventListener('click', (e) => {
        book.readStatus();
        console.log(books);

        card.innerText = book.printInfo();
        card.appendChild(remove);
        card.appendChild(read);
    });

    card.appendChild(remove);
    card.appendChild(read);
    container.appendChild(card);
}

//submitting a new book
const addbtn = document.querySelector('button#add');
const form = document.querySelector('#form');
form.style.display = 'none';
addbtn.addEventListener('click', (e) => {
    if (form.style.display === 'none') {
        form.style.display = 'flex';
    } else {
        form.style.display = 'none';
    }
});
const submit = document.querySelector('input[type=submit]');
submit.addEventListener('click', (e) => {
    e.preventDefault();

    let title = document.querySelector('input[name=title]').value;
    let author = document.querySelector('input[name=author]').value;
    let pages = document.querySelector('input[name=pages]').value;
    
    let read = false;
    const readBtns = document.getElementById('isread');
    const valueRead = readBtns.options[readBtns.selectedIndex].value;
    if (valueRead === 'Yes') {
        read = true;
    }

    if (title !== ' ' && author !== ' ' && pages !== '0') {
        const book = new Book(title, author, pages, read);
        store(book);
        console.log(books);
        show(book);
    }

    document.getElementById('form').reset();
});