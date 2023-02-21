// Local storage to store the booklist

class Book {
  constructor() {
    this.booksList = JSON.parse(localStorage.getItem('storage-book')) || [];
  }

  // add books
  addBook = (author, title) => {
    const updatedBook = [
      ...this.booksList,
      { id: `${Math.random()}${author.split(' ')[0]}`, author, title },
    ];
    this.updateStorage(updatedBook);
  }

  // remove books
  removeBook = (id) => {
    const updatedBook = this.booksList.filter((it) => it.id !== id);
    this.updateStorage(updatedBook);
  }

  // Get books
  getBook = () => this.booksList

  // update storage
  updateStorage = (data) => {
    localStorage.setItem('storage-book', JSON.stringify(data));
    this.booksList = data;
  }
}

export default Book;