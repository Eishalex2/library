const content = document.querySelector('.content');
const addBookBtn = document.querySelector('.new-book');
const formDiv = document.querySelector('.add-book-form');
const submitBtn = document.querySelector('button[type=submit]');

let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let currentIndex = 0;

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

//diplays books on the page. Remove every card before adding them all
//back to prevent duplicates.
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
  const titlePara = document.createElement('p')
  const authorPara = document.createElement('p')
  const pagesPara = document.createElement('p')
  const readBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  bookCard.classList.add('card')
  //removeBtn.setAttribute('data-index', currentIndex)
  bookCard.setAttribute('data-index', currentIndex)
  currentIndex += 1;

  titlePara.textContent = `${book.title}`
  authorPara.textContent = `By: ${book.author}`
  pagesPara.textContent = `${book.pages} pages`

  //sets initial readBtn text content and card color
  if (book.read) {
    readBtn.textContent = 'Finished! Mark unread?';
    bookCard.style.backgroundColor = 'pink';
  } else {
    readBtn.textContent = 'Unread. Mark as read?';
    bookCard.style.backgroundColor = '#ddd'
  }

  removeBtn.textContent = 'Remove from Library';
  // removeBtn.addEventListener('click', (e)=> {
  //   const index = e.target.parentNode.data;
  //   console.log(index)
  // })

  //changes book read status on readBtn click
  readBtn.addEventListener('click', (e)=> {
    if (book.read) {
      e.target.textContent = 'Unread. Mark as Read?';
      bookCard.style.backgroundColor = '#ddd';
      book.read = false;
    } else {
      e.target.textContent = 'Finished! Mark unread?';
      bookCard.style.backgroundColor = 'pink';
      book.read = true;
    }
  });

  bookCard.appendChild(titlePara);
  bookCard.appendChild(authorPara);
  bookCard.appendChild(pagesPara);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);

  content.appendChild(bookCard);
}

addBookBtn.addEventListener('click', ()=> {
  formDiv.style.display = 'block';
})

document.addEventListener('click', (e)=> {
  e.stopPropagation()
  if (!addBookBtn.contains(e.target) && !formDiv.contains(e.target)) {
    formDiv.style.display = 'none';
  }
})

submitBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  addBookToLibrary(title.value, author.value, pages.value, read.value);
  formDiv.style.display = 'none';
})

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 297, true);
addBookToLibrary('February', 'March', 300, false);