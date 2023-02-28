const content = document.querySelector('.content');
const addBookBtn = document.querySelector('.new-book');
const formDiv = document.querySelector('.add-book-form');
const submitBtn = document.querySelector('button[type=submit]');

let title = document.getElementById('title');
let author = document.getElementById('author');
let pages = document.getElementById('pages');
let read = document.getElementById('read');
let total = document.getElementById('total');
let completed = document.getElementById('completed');
let unread = document.getElementById('unread');

let totalCount = 0;
let completedCount = 0;
let unreadCount = 0;

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
  bookCard.setAttribute('data-index', myLibrary.indexOf(book))

  removeBtn.classList.add('remove-btn')

  titlePara.textContent = `${book.title}`
  authorPara.textContent = `By: ${book.author}`
  pagesPara.textContent = `${book.pages} pages`

  //sets initial readBtn text content and card color
  if (book.read) {
    readBtn.textContent = 'Finished! Mark unread?';
    readBtn.classList.add('read-btn');
    readBtn.style.backgroundColor = '#86efac';
    bookCard.style.backgroundColor = 'pink';
  } else {
    readBtn.textContent = 'Unread. Mark as read?';
    readBtn.classList.add('unread-btn');
    readBtn.style.backgroundColor = '#fde68a'
    bookCard.style.backgroundColor = '#ddd'
  }

  removeBtn.textContent = 'Remove from Library';

  //changes book read status on readBtn click
  readBtn.addEventListener('click', (e)=> {
    if (book.read) {
      e.target.textContent = 'Unread. Mark as Read?';
      bookCard.style.backgroundColor = '#ddd';
      book.read = false;
      readBtn.setAttribute('class', 'unread-btn');
      readBtn.style.backgroundColor = '#fde68a';
    } else {
      e.target.textContent = 'Finished! Mark unread?';
      bookCard.style.backgroundColor = 'pink';
      book.read = true;
      readBtn.setAttribute('class', 'read-btn');
      readBtn.style.backgroundColor = '#86efac';
    }
    getStats();
  });

  bookCard.appendChild(titlePara);
  bookCard.appendChild(authorPara);
  bookCard.appendChild(pagesPara);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);

  content.appendChild(bookCard);

  removeBtn.addEventListener('click', ()=> {
    myLibrary.splice(bookCard.dataset.index, 1)
    displayBook();
    getStats();
  })

  getStats();
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
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
})

function getStats() {
// reset counters
  totalCount = 0
  completedCount = 0
  unreadCount = 0

//update counters
  totalCount = myLibrary.length
  for (book of myLibrary) {
    if (book.read) {
      completedCount += 1;
    } else {
      unreadCount +=1;
    }
  }

  //add to page
  total.textContent = "Total Books: " + totalCount;
  completed.textContent = "Read: " + completedCount;
  unread.textContent = "Unread: " + unreadCount;
}


addBookToLibrary('The Hobbit', 'Bilbo Baggins', 297, true);