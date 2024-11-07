const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

document.addEventListener('DOMContentLoaded', () => {
  const endereco = JSON.parse(localStorage.getItem('enderecoParaEditar')).data;

  if (endereco) {
      console.log("Endereço recuperado do localStorage:", endereco); // Verifica se os dados estão corretos
      document.getElementById('title').value = endereco.title || '';
      document.getElementById('cep').value = endereco.cep || '';
      document.getElementById('rua').value = endereco.address || '';
      document.getElementById('numero').value = endereco.number || '';
      document.getElementById('complemento').value = endereco.complement || '';

  }
});

async function atualizarEndereco() {
  const token = localStorage.getItem('token');
  const endereco = JSON.parse(localStorage.getItem('enderecoParaEditar'));
  const enderecoId = endereco && endereco.data ? endereco.data.id : null;

  console.log("enderecoId:", enderecoId); // Verifique o valor do ID

  if (!enderecoId) {
      alert("ID do endereço não encontrado.");
      return;  // Retorna para evitar fazer a requisição com ID indefinido
  }

  const enderecoAtualizado = {
    title: document.getElementById('title').value,
    cep: document.getElementById('cep').value,
    address: document.getElementById('rua').value,
    number: document.getElementById('numero').value,
    complement: document.getElementById('complemento').value,

};

 
  try {
      const respostaApi = await fetch(`${urlEndereco}/${enderecoId}`, {
          method: "POST", 
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(enderecoAtualizado)
      });

      if (!respostaApi.ok) {
          const erroMessage = await respostaApi.text();
          console.log("Erro ao editar endereço:", erroMessage); // Adicionando o log da resposta de erro
          throw new Error(`Erro ao editar endereço: ${erroMessage}`);
      }
      

      alert("Endereço atualizado com sucesso!");
      location.href = "home.html"; // Redireciona para a página inicial após sucesso
  } catch (error) {
      console.log("Dados que serão enviados para atualização:", enderecoAtualizado);

      console.error("Erro ao editar endereço:", error);
      alert("Ocorreu um erro ao editar o endereço.");
  }
}

