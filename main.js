const myLibrary = [];

function Book(title, author, published, pages, ifRead) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.pages = pages;
  this.ifRead = ifRead;
}

Book.prototype.changeReadStatus = function() {
  if (this.ifRead) {
    return this.ifRead = false;
  } else {
    return this.ifRead = true;
  }
}

function refreshLibrary() {

  const shelf = document.querySelector("#shelf");

  while (shelf.hasChildNodes()) {
    shelf.removeChild(shelf.firstChild);
  }

  myLibrary.map((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
  
    const removeBook = document.createElement("img");
    removeBook.classList.add("remove-book")
    removeBook.setAttribute("src", "close.svg");
    removeBook.setAttribute("data-", index);
    removeBook.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      refreshLibrary();
    });

    card.appendChild(removeBook)

    const bookInfo = document.createElement("div");
    const title = bookInfo.appendChild(document.createElement("h2"));
    const author = bookInfo.appendChild(document.createElement("p"));
    const published = bookInfo.appendChild(document.createElement("p"));
  
    title.textContent = book.title;
    author.textContent = book.author;
    published.textContent = book.published;
  
    card.appendChild(bookInfo);
  
    const bottomContainer = card.appendChild(document.createElement("div"));

    const pages = bottomContainer.appendChild(document.createElement("p"));
    pages.textContent = `${book.pages} pages`;
  
    const readInfo = bottomContainer.appendChild(document.createElement("div"));

    const changeRead = readInfo.appendChild(document.createElement("img"));
    changeRead.setAttribute("src", "circle-medium.svg")
    changeRead.setAttribute("data-", index);
    changeRead.textContent = "Change";

    changeRead.addEventListener("click", () => {
      myLibrary[index].changeReadStatus();
      refreshLibrary();
    });

    const ifRead = readInfo.appendChild(document.createElement("h3"));

    if (book.ifRead) {
      ifRead.textContent = "Already read";
    } else {
      ifRead.textContent = "Unread"
    }

    document.querySelector("#shelf").appendChild(card);
  });
}

function addBook(title, author, published, pages, ifRead) {
 
  myLibrary.push(new Book(title, author, published, pages, ifRead));

  refreshLibrary(myLibrary);
}

const addBookBtn = document.querySelector("#new-book");
const form = document.querySelector("form");
const exitForm = document.querySelector("#exit-form");
const submitForm = document.querySelector("#submit");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const publishedInput = document.querySelector("#published");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

addBookBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

exitForm.addEventListener("click", () => {
  form.style.display = "none";
});

submitForm.addEventListener("click", (e) => {
  if (titleInput.value && authorInput.value && publishedInput.value && pagesInput.value) {
    let title = titleInput.value;
    let author = authorInput.value;
    let published = publishedInput.value;
    let pages = pagesInput.value;
    let ifRead = readInput.checked

    addBook(title, author, published, pages, ifRead)

    titleInput.value = null;
    authorInput.value = null;
    publishedInput.value = null;
    pagesInput.value = null;
    readInput.checked = false;
  }

  e.preventDefault();
});