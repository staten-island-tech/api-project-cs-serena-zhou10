import "./style.css";
const URL = "https://openlibrary.org/authors/OL7486601A/works.json";

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

    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);

      data.entries.forEach(inject);
    }
  } catch (error) {
    console.log(error);
    console.log("Failed to Load");
  }
}

function setupSearch(books) {
  const form = document.querySelector(".search-form");
  const input = document.querySelector(".search-input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = input.value.toLowerCase();

    document.querySelector(".api-response").innerHTML = "";

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm)
    );

    if (filteredBooks.length === 0) {
      document.querySelector(
        ".api-response"
      ).innerHTML = `<p>No matching books found.</p>`;
      return;
    }

    filteredBooks.forEach((book) => inject(book));
  });
}

getData(URL);
setupSearch();
