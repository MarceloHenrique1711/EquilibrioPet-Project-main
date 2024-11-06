const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

document.addEventListener('DOMContentLoaded', () => {
  // Recupera os dados do endereço a ser editado do localStorage
  const endereco = JSON.parse(localStorage.getItem('enderecoParaEditar'));

  if (endereco) {
      // Preenche os campos com os dados do endereço
      document.getElementById('title').value = endereco.title || '';
      document.getElementById('cep').value = endereco.cep || '';
      document.getElementById('rua').value = endereco.address || '';
      document.getElementById('numero').value = endereco.number || '';
      document.getElementById('complemento').value = endereco.complement || '';
      document.getElementById('bairro').value = endereco.neighborhood || '';
      document.getElementById('cidade').value = endereco.city || '';
      document.getElementById('estado').value = endereco.state || '';
  } else {
      alert("Nenhum endereço encontrado para edição.");
      location.href = "home.html"; // Se não encontrar dados, redireciona para a página inicial
  }
});

async function cadastroEndereco() {
  const token = localStorage.getItem('token');
  const enderecoId = JSON.parse(localStorage.getItem('enderecoParaEditar')).id; // Pega o ID do endereço editado

  const enderecoAtualizado = {
      title: document.getElementById('title').value,
      cep: document.getElementById('cep').value,
      address: document.getElementById('rua').value,
      number: document.getElementById('numero').value,
      complement: document.getElementById('complemento').value,
      neighborhood: document.getElementById('bairro').value,
      city: document.getElementById('cidade').value,
      state: document.getElementById('estado').value
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
          throw new Error(`Erro ao editar endereço: ${erroMessage}`);
      }

      alert("Endereço atualizado com sucesso!");
      location.href = "home.html"; // Redireciona para a página inicial após sucesso
  } catch (error) {
      console.error("Erro ao editar endereço:", error);
      alert("Ocorreu um erro ao editar o endereço.");
  }
}
