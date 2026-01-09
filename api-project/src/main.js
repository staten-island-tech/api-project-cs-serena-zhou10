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

function setupSearch() {
  const form = document.querySelector("#search-form");
  const input = document.querySelector(".search-input2");
  const results = document.querySelector(".api-response");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = input.value.trim().toLowerCase();

    if (!searchTerm) {
      results.innerHTML = "<p>Please enter a book title.</p>";
      return;
    }

    results.innerHTML = "<p>Searching...</p>";

    try {
      const searchURL = `https://openlibrary.org/search.json?author=R.F.+Kuang&title=${searchTerm}`;
      const response = await fetch(searchURL);

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data = await response.json();
      results.innerHTML = "";

      if (data.docs.length === 0) {
        results.innerHTML = "<p>No matching books found.</p>";
        return;
      }

      data.docs.forEach((books) => {
        inject({ title: books.title });
      });
    } catch (error) {
      results.innerHTML =
        "<p>Something went wrong while searching. Please try again.</p>";
      console.error(error);
    }
  });
}

getData(URL);
