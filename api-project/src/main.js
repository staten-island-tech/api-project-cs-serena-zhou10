const query = "key:(/authors/OL7484395A OR /authors/OL10294608A)";
const URL =
  "https://openlibrary.org/search/authors.json?q=" +
  encodeURIComponent(query);

async function getData(URL) {
  try {
    const response = await fetch(URL);

    if (response.status != 200) {
      throw new Error(response);
    }

    const data = await response.json();
    console.log(data);

    document.getElementById("api-response").textContent =
      data.docs?.[0]?.name || "No authors found";

  } catch (error) {
    console.error(error);
    document.getElementById("api-response").textContent =
      "API failed to load";
  }
}

getData(URL);