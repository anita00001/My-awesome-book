// Display Book List
const displayBooks = (displayBookList, bookListArray) => {
  displayBookList.innerHTML = '';
  bookListArray.forEach((book) => displayBookList.insertAdjacentHTML(
    'beforeend',
    `<tr>
        <td>${book.title} by ${book.author}</td>
        <td><button class="remove" id=${book.id}>Remove</button></td>
      </tr>`,
  ));
};

export default displayBooks;