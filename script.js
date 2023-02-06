let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBook() {
  for (let book of myLibrary) {
    createBookCard(book);
  }
}

function createBookCard(book) {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')

  bookCard.classList.add('card')

  title.textContent = `${book.title}`
  author.textContent = `By: ${book.author}`
  pages.textContent = `${book.pages} pages`
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 297, true);
displayBook();