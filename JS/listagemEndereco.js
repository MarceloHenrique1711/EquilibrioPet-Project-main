const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

async function listarEnderecos() {
    let token = localStorage.getItem('token');

    try {
        const respostaApi = await fetch(urlEndereco, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao obter endereços: ${erroMessage}`);
        }

        const respostaData = await respostaApi.json();
        console.log("Dados da resposta:", respostaData); // Para depuração

        // Acesse a propriedade `data` que contém os endereços
        exibirEnderecos(respostaData.data || []); // Usa um array vazio se não houver endereços

    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao carregar os endereços.");
    }
}

function exibirEnderecos(enderecos) {
    const listaEnderecos = document.getElementById('containerEnderecos');
    listaEnderecos.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

    if (!Array.isArray(enderecos) || enderecos.length === 0) {
        const item = document.createElement('li');
        item.textContent = "Nenhum endereço cadastrado.";
        listaEnderecos.appendChild(item);
        return;
    }

    enderecos.forEach(endereco => {
        const item = document.createElement('li');
        item.textContent = `${endereco.title} - ${endereco.address}, ${endereco.number}, ${endereco.city}, ${endereco.state} - ${endereco.cep} `;

        // Cria o botão de exclusão
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirEndereco(endereco.id); // Passa o ID do endereço para a função de exclusão

        // Cria o botão de alteração
        const botaoAlterar = document.createElement('button');
        botaoAlterar.textContent = 'Alterar';
        botaoAlterar.onclick = () => alterarEndereco(endereco.id); // Passa o ID do endereço para a função de alterar
        
        item.appendChild(botaoExcluir);
        item.appendChild(botaoAlterar); // Adiciona o botão ao item da lista
        listaEnderecos.appendChild(item); // Adiciona o item à lista
    });
}

async function excluirEndereco(id) {
    let token = localStorage.getItem('token');

    try {
        const respostaApi = await fetch(`${urlEndereco}/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao excluir endereço: ${erroMessage}`);
        }

        alert("Endereço excluído com sucesso!");
        
        listarEnderecos(); // Atualiza a lista após a exclusão
    } catch (error) {
        console.error("Erro na exclusão:", error);
        alert("Ocorreu um erro ao excluir o endereço.");
    }
}

async function alterarEndereco(id) {
    let token = localStorage.getItem('token');
    
    try {
        const respostaApi = await fetch(`${urlEndereco}/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!respostaApi.ok) {
            const erroMessage = await respostaApi.text();
            throw new Error(`Erro ao obter endereço: ${erroMessage}`);
        }

        const endereco = await respostaApi.json();
        console.log("Endereço encontrado:", endereco);
        localStorage.setItem('enderecoParaEditar', JSON.stringify(endereco)); // Salva o endereço no localStorage
        

        
    } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        alert("Ocorreu um erro ao carregar o endereço.");
    }
}

document.addEventListener('DOMContentLoaded', listarEnderecos);
