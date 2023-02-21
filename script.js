const submitButton = document.getElementById('add');
const bookTitle = document.getElementById('book-title');
const author = document.getElementById('author');
const form = document.getElementById('form');
const error = document.getElementById('error');
const displayBookList = document.getElementById('table');

const listSection = document.getElementById('list');
const newBookSection = document.getElementById('book-form');
const contactSection = document.getElementById('contact-info');

const listLink = document.getElementById('list-link');
const addNewLink = document.getElementById('add-new-link');
const contactLink = document.getElementById('contact-link');

// Book class
class Book {
  constructor() {
    this.booksList = JSON.parse(localStorage.getItem('storage-book')) || [];
  }

  // add books
  addBook(author, title) {
    const updatedBook = [
      ...this.booksList,
      { id: `${Math.random()}${author.split(' ')[0]}`, author, title },
    ];
    this.updateStorage(updatedBook);
  }

  // remove books
  removeBook(id) {
    const updatedBook = this.booksList.filter((it) => it.id !== id);
    this.updateStorage(updatedBook);
  }

  // Get books
  getBook() {
    return this.booksList;
  }

  // update storage
  updateStorage(data) {
    localStorage.setItem('storage-book', JSON.stringify(data));
    this.booksList = data;
  }
}

// Instantiate book class
const books = new Book();
let bookListArray = books.getBook();

const displayBooks = () => {
  displayBookList.innerHTML = '';
  bookListArray.forEach((book) => displayBookList.insertAdjacentHTML(
    'beforeend',
    `<tr>
        <td>${book.title} by ${book.author}</td>
        <td><button class="remove" id=${book.id}>Remove</button></td>
      </tr>`,
  ));
};

// hide sections
const hideSections = () => {
  listSection.style.display = 'none';
  newBookSection.style.display = 'none';
  contactSection.style.display = 'none';
};

// operations to happen when page loads
const initialize = () => {
  hideSections();
  listSection.style.display = 'block';
  displayBooks();
};

initialize();

// add book from form
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value.length === 0 || author.value.length === 0) {
    error.innerText = 'Fields cannot be empty!';
  }
  const checkBooks = bookListArray.find(
    (book) => book.title === bookTitle.value,
  );
  const checkAuthor = bookListArray.find(
    (book) => book.author === author.value,
  );
  if (checkBooks && checkAuthor) {
    error.innerText = 'This book already exists!!';
  } else {
    error.innerHTML = '';
    books.addBook(author.value, bookTitle.value);
    bookListArray = books.getBook();
    hideSections();
    listSection.style.display = 'block';
    displayBooks();
  }
  form.reset();
});

// Document listener for removing book
document.addEventListener('click', (e) => {
  const deleteButton = e.target.closest('.remove');
  if (deleteButton) {
    books.removeBook(deleteButton.id);
    bookListArray = books.getBook();
    displayBooks();
  }
});

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  listSection.style.display = 'block';
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  contactSection.style.display = 'block';
});

addNewLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideSections();
  newBookSection.style.display = 'block';
});
