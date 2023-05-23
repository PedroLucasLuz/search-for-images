// Chave de API da Custom Search do Google
const apiKey = "AIzaSyASp_XdzMqQ9NpLm4HZvbkPosyA0wyMzm8";

// ID do mecanismo de pesquisa personalizado
const searchEngineId = "c2845fc49506a47b3";


const numResults = 10;


const imageContainer = document.getElementById("image-container");

const searchForm = document.getElementById("search-form");


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  imageContainer.innerHTML = "";

  const searchTerm = document.getElementById("search-term").value;

  // Chamar a função para buscar e exibir as imagens relacionadas
  fetchImages(searchTerm);
});

// Função para capturar e exibir as imagens relacionadas
async function fetchImages(searchTerm) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=${searchTerm}&num=${numResults}`
    );
    const data = await response.json();
    const images = data.items;

    // Exibir as imagens
    images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.link;
      imageContainer.appendChild(imgElement);
    });
  } catch (error) {
    console.log("Ocorreu um erro:", error);
  }
}
