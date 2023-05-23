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
      const aElement = document.createElement("a");

      // Transforma em base64
      imageToBase64(image.link)
        .then((base64Image) => {
          // Verifica se conseguiu transformar em base64
          if (base64Image != null) {
            console.log("Imagem convertida em base64:", base64Image);

            // Só adiciona ao HTML aquelas cujo base64 foi possível ser gerado
            // uma vez que a gente só quer essas
            aElement.href = image.link;
            imgElement.src = image.link;
            aElement.appendChild(imgElement);
            imageContainer.appendChild(aElement);
          }
        })
        .catch((error) => {
          console.error("Erro ao converter imagem em base64:", error);
        });
    });
  } catch (error) {
    console.log("Ocorreu um erro:", error);
  }
}

async function imageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Erro ao converter imagem em base64:", error);
    return null;
  }
}
