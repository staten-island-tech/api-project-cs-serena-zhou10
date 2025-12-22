const URL = "https://openlibrary.org/authors/OL23919A/works.json";


function inject(item) {
  const entriesContainer = document.querySelector(".api-response");

  entriesContainer.insertAdjacentHTML("beforeend",
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

getData(URL);
