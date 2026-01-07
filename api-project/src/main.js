import "./style.css";

const URL = "https://openlibrary.org/authors/OL7486601A/works.json";
let books = [];

function inject(item) {
  const entriesContainer = document.querySelector(".api-response");

  entriesContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
      <h1>${item.title}</h1>
    </div>`
  );
}

async function getData(URL) {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    books = data.entries;

    document.querySelector(".api-response").innerHTML = "";
    books.forEach(inject);

    setupSearch(books);
  } catch (error) {
    console.log("Failed to Load", error);
  }
}

function setupSearch(books) {
  const form = document.querySelector("#search-form");
  const input = document.querySelector(".search-input2");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = input.value;
    console.log(input.value);
    document.querySelector(".api-response").innerHTML = "";

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    if (filteredBooks.length === 0) {
      document.querySelector(".api-response").innerHTML =
        "<p>No matching books found.</p>";
      return;
    }

    filteredBooks.forEach(inject);
  });
}

getData(URL);
