const content = document.querySelector('.content');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

//Adds books to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBook();
}

//diplays books on the page. Remove every card 
function displayBook() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => content.removeChild(card));

  for (let book of myLibrary) {
    createBookCard(book);
  }
}

//Attaches books to the DOM
function createBookCard(book) {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')

  bookCard.classList.add('card')

  title.textContent = `${book.title}`
  author.textContent = `By: ${book.author}`
  pages.textContent = `${book.pages} pages`

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);

  content.appendChild(bookCard);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 297, true);
addBookToLibrary('February', 'March', 300, false);