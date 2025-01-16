/*salvarlocalStorage();

function salvarlocalStorage(){

    //salva o objeto no localstorage
      localStorage.setItem("usuario", JSON.stringify({usuario: "beatriz", idade: "22"}));

    //salva o item no localstorage
       // localStorage.setItem("usuario", "beatriz");
       // localStorage.setItem("idade", "22");
       //  console.log("acessou");
   
    //recupera a informação do registro no localsotrage
       var usuario_localstorage = localStorage.getItem("usuario");
       //var idade_localstorage = localStorage.getItem("idade");*
       console.log(usuario_localstorage);
       //console.log(idade_localstorage);

    //converte a string JSON em um objeto javascript
       var dados_usuario = JSON.parse(usuario_localstorage);
       //console.log(dados_usuario);

    //enviar para o html os dados(itens) salvos no localstorage
      //document.getElementById("conteudo").innerHTML = "<br>Nome: " + usuario_localstorage + "<br>Idade: " + idade_localstorage + "<br>";


    //enviar para o html os dados(objetos) salvos no localstorage
    document.getElementById("conteudo").innerHTML = "<br>Nome: " + dados_usuario.usuario+ "<br>Idade: " + dados_usuario.idade + "<br>";
    
}*/

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


        //criando um botao de excluir para cada veículo
        const botao = document.createElement("button");
        botao.textContent = "Excluir";
        //botao.classList.add("car-button");
        //botao.setAttribute("data-id", carro.modelo); // Identificador único

        // Adicionar evento de clique no botão
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

        // Função para salvar os dados no localStorage
        function salvarNoLocalStorage(chave, valor) {
            localStorage.setItem(chave, JSON.stringify(valor));
        }

    // Função para excluir um carro do LocalStorage 
    function excluirCarro(modelo) {
        const carros = JSON.parse(localStorage.getItem("carros")) || [];
        const novosCarros = carros.filter(carro => carro.modelo !== modelo);
        salvarNoLocalStorage("carros", novosCarros);
        console.log(`Carro ${modelo} excluído com sucesso!`);
    }

    const carrosSalvos = JSON.parse(localStorage.getItem("carros"));

    //verificando se já existem carros no local storage
    if (carrosSalvos && carrosSalvos.length > 0) {

        popularVeiculos(carrosSalvos);
    } else {
    // Consumir a API e popular os veículos
    fetch(`${API_URL}/Carros`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar os dados");
        }
        return response.json();
    })
    .then(listaCarros => {
        console.log("Dados recebidos da API:", listaCarros); // Log para inspecionar os dados
        salvarNoLocalStorage("carros", listaCarros); //Salvando dados da API no LocalStorage
        popularVeiculos(listaCarros); // Passa o array diretamente
    })
    .catch(error => {
        console.error("Erro ao carregar os veículos:", error);
        carCardsContainer.innerHTML = "<p>Erro ao carregar os veículos. Tente novamente mais tarde.</p>";
    });
    }
});

// const listaCarros = JSON.parse(carrosSalvos);
console.log(listaCarros)
