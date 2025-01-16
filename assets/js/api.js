document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://my-json-server.typicode.com/beatrizcabralp/Web-1---prova-3";
    const carCardsContainer = document.querySelector(".car-cards-container");
    const carCardsRow = document.querySelector(".cars-row");

    // Função para criar um card de veículo
    function criarCardCarro(carro) {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        const upper = document.createElement("div");
        upper.classList.add("upper");

        const img = document.createElement("img");
        img.classList.add("carImg");
        img.src = carro.imagem;
        img.alt = `${carro.marca} ${carro.modelo}`;

        const lower = document.createElement("div");
        lower.classList.add("lower");

        const marca = document.createElement("p");
        marca.classList.add("marca");
        marca.textContent = `Marca: ${carro.marca}`;

        const modelo = document.createElement("p");
        modelo.classList.add("modelo");
        modelo.textContent = `Modelo: ${carro.modelo}`;

        const ano = document.createElement("p");
        ano.classList.add("ano");
        ano.textContent = `Ano: ${carro.ano}`;

        const cor = document.createElement("p");
        cor.classList.add("cor");
        cor.textContent = `Cor: ${carro.cor}`;

        const tipo = document.createElement("p");
        tipo.classList.add("tipo");
        tipo.textContent = `Tipo: ${carro.tipo}`;

        const quilometragem = document.createElement("p");
        quilometragem.classList.add("quilometragem");
        quilometragem.textContent = `Quilometragem: ${carro.quilometragem}`;

        const portas = document.createElement("p");
        portas.classList.add("portas");
        portas.textContent = `Portas: ${carro.portas}`;

        upper.appendChild(img);
        lower.appendChild(marca);
        lower.appendChild(modelo);
        lower.appendChild(ano);
        lower.appendChild(cor);
        lower.appendChild(tipo);
        lower.appendChild(quilometragem);
        lower.appendChild(portas);

        carCard.appendChild(upper);
        carCard.appendChild(lower);

        return carCard;
    }

    // Função para popular os cards de veículos na página
    function popularVeiculos(listaCarros) {
        carCardsContainer.innerHTML = ""; // Limpar o container antes de adicionar novos cards

        if (!Array.isArray(listaCarros)) {
            console.error("Os dados recebidos não são uma lista válida de carros.");
            carCardsContainer.innerHTML = "<p>Erro ao carregar os veículos. Dados inválidos recebidos.</p>";
            return;
        }

        listaCarros.forEach(carro => {
            const card = criarCardCarro(carro);
            carCardsContainer.appendChild(card);
        });
    }

    // Consumir a API e popular os veículos
    fetch(`${API_URL}/Carros`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar os dados");
            }
            return response.json();
        })
        .then(listaCarrosAPI => {
            console.log("Dados recebidos da API:", listaCarrosAPI);
            // Salvar os dados da API no localStorage
            localStorage.setItem("carros", JSON.stringify(listaCarrosAPI));
      
            // Carregar os veículos cadastrados
            const listaCarrosCadastrados = JSON.parse(localStorage.getItem("veiculos")) || [];
      
            // Mesclar os dados da API com os cadastrados
            const listaCompleta = [...listaCarrosAPI, ...listaCarrosCadastrados];
      
            // Exibir os veículos
            popularVeiculos(listaCompleta);
          })
        .catch(error => {
            console.error("Erro ao carregar os veículos:", error);
            carCardsContainer.innerHTML = "<p>Erro ao carregar os veículos. Tente novamente mais tarde.</p>";
        });
});

const carrosSalvos = localStorage.getItem("carros");
// const listaCarros = JSON.parse(carrosSalvos);
console.log(listaCompleta)
console.log(listaCarros)
