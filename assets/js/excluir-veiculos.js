document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://my-json-server.typicode.com/beatrizcabralp/Web-1---prova-3";
    const carCardsContainer = document.querySelector(".car-cards-container");

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

        const botao = document.createElement("button");
        botao.textContent = "Excluir";
        botao.addEventListener("click", () => {
            alert(`Você excluiu o carro da marca ${carro.marca} e modelo ${carro.modelo}`);
            excluirCarro(carro.modelo);
            carCard.remove();
        });

        upper.appendChild(img);
        lower.appendChild(marca);
        lower.appendChild(modelo);
        lower.appendChild(ano);
        lower.appendChild(cor);
        lower.appendChild(tipo);
        lower.appendChild(quilometragem);
        lower.appendChild(portas);
        lower.appendChild(botao);

        carCard.appendChild(upper);
        carCard.appendChild(lower);

        return carCard;
    }

    function popularVeiculos(listaCarros) {
        carCardsContainer.innerHTML = "";
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

    function salvarNoLocalStorage(chave, valor) {
        localStorage.setItem(chave, JSON.stringify(valor));
    }

    function excluirCarro(modelo) {
        const carros = JSON.parse(localStorage.getItem("carros")) || [];
        const veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

        const novosCarros = carros.filter(carro => carro.modelo !== modelo);
        const novosVeiculos = veiculos.filter(veiculo => veiculo.modelo !== modelo);

        salvarNoLocalStorage("carros", novosCarros);
        salvarNoLocalStorage("veiculos", novosVeiculos);

        console.log(`Carro ${modelo} excluído com sucesso!`);
    }

    const carrosSalvos = JSON.parse(localStorage.getItem("carros")) || [];
    const veiculosSalvos = JSON.parse(localStorage.getItem("veiculos")) || [];

    const todosVeiculos = [...carrosSalvos, ...veiculosSalvos];

    if (todosVeiculos.length > 0) {
        popularVeiculos(todosVeiculos);
    } else {
        fetch(`${API_URL}/Carros`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao carregar os dados");
                }
                return response.json();
            })
            .then(listaCarros => {
                salvarNoLocalStorage("carros", listaCarros);
                popularVeiculos(listaCarros);
            })
            .catch(error => {
                console.error("Erro ao carregar os veículos:", error);
                carCardsContainer.innerHTML = "<p>Erro ao carregar os veículos. Tente novamente mais tarde.</p>";
            });
    }
});
