    // Inicializar o vetor para armazenar os veículos
    let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];
  
    // Capturar o formulário
    const form = document.getElementById("form-veiculo");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Capturar os valores dos campos do formulário
      const veiculo = {
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        ano: document.getElementById("ano").value,
        cor: document.getElementById("cor").value,
        tipo: document.getElementById("tipo").value,
        quilometragem: document.getElementById("quilometragem").value,
        portas: document.getElementById("portas").value,
        url: document.getElementById("url").value,
      };
  
      // Adicionar o veículo ao vetor
      veiculos.push(veiculo);
  
      // Salvar o vetor no localStorage
      localStorage.setItem("veiculos", JSON.stringify(veiculos));
 
      alert("Veículo cadastrado com sucesso!");
  
      form.reset();
    });