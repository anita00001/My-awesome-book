// Add books using form
// import Book from './storage.js';
import hideSections from './hidesection.js';
import displayBooks from './displaybook.js';

const bookTitle = document.getElementById('book-title');
const author = document.getElementById('author');
const error = document.getElementById('error');

const listSection = document.getElementById('list');
const newBookSection = document.getElementById('book-form');
const contactSection = document.getElementById('contact-info');

const addBookForm = (bookListArray, books, displayBookList) => {
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
};

export default addBookForm;