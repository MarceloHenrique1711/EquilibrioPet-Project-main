const urlEndereco = "https://go-wash-api.onrender.com/api/auth/address";

async function cadastroEndereco() {
    const button = document.getElementById('botaoCadastroEndereco');
    button.disabled = true;
    button.innerText = 'Carregando...';

    let title = document.getElementById('title').value;
    let rua = document.getElementById('rua').value;
    let numero = document.getElementById('numero').value;
    let complemento = document.getElementById('complemento').value;
    let cep = document.getElementById('cep').value;



    if (!title || !rua || !numero  || !cep) {
        alert("Preencha todos os campos obrigatórios.");
        button.disabled = false;
        button.innerText = 'Cadastrar Endereço';
        return;
    }

    let dadosEndereco = {
        "title": title,
        "address": rua,
        "number": numero,
        "complement": complemento,
        "cep": cep 
    };

    console.log("Dados do Endereço:", dadosEndereco);
    let token = localStorage.getItem('token');

    let respostaApi = await fetch(urlEndereco, {
        method: "POST",
        body: JSON.stringify(dadosEndereco),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    button.disabled = false;
    button.innerText = 'Cadastrar Endereço';

    if (respostaApi.ok) {
        let resposta = await respostaApi.json();
        console.log(resposta);
        alert("Endereço cadastrado com sucesso!");
        location.href = "../HTML/home.html";
    } 
    else {
        let respostaErro = await respostaApi.json();
        console.log(respostaErro);
        if (respostaApi.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            // Redirecione para a página de login, se necessário
        }else {
        let respostaErro = await respostaApi.json();
        console.log(respostaErro);
        alert("Erro ao cadastrar endereço. Tente novamente.");
        }

    }
}