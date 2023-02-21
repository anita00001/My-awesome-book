import Book from './modules/storage.js';
import displayBooks from './modules/displaybook.js';
import hideSections from './modules/hidesection.js';

const submitButton = document.getElementById('add');
const displayBookList = document.getElementById('table');

const bookTitle = document.getElementById('book-title');
const author = document.getElementById('author');
const error = document.getElementById('error');
const form = document.getElementById('form');

const listSection = document.getElementById('list');
const newBookSection = document.getElementById('book-form');
const contactSection = document.getElementById('contact-info');

const listLink = document.getElementById('list-link');
const addNewLink = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');

// Instantiate book class
const books = new Book();
let bookListArray = books.getBook();

// operations to happen when page loads
const initialize = () => {
  hideSections(listSection, newBookSection, contactSection);
  listSection.style.display = 'block';
  displayBooks(displayBookList, bookListArray);
};

initialize();

// add book from form
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const checkBooks = bookListArray.find((book) => book.title === bookTitle.value);
  const checkAuthor = bookListArray.find((book) => book.author === author.value);
  if (bookTitle.value.length === 0 || author.value.length === 0) {
    error.innerText = 'Fields cannot be empty!';
  } else if (checkBooks && checkAuthor) {
    error.innerText = 'This book already exists!!';
  } else {
    error.innerHTML = '';
    books.addBook(author.value, bookTitle.value);
    bookListArray = books.getBook();
    hideSections(listSection, newBookSection, contactSection);
    listSection.style.display = 'block';
    displayBooks(displayBookList, bookListArray);
  }
  form.reset();
});

// Document listener for removing book
document.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.remove');
  if (deleteButton) {
    books.removeBook(deleteButton.id);
    bookListArray = books.getBook();
    displayBooks(displayBookList, bookListArray);
  }
});

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections(listSection, newBookSection, contactSection);
  listSection.style.display = 'block';
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections(listSection, newBookSection, contactSection);
  contactSection.style.display = 'block';
});

addNewLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections(listSection, newBookSection, contactSection);
  newBookSection.style.display = 'block';
});