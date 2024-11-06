const urlLogin = "https://go-wash-api.onrender.com/api/login";

async function loginUsuario() {
    let email = document.getElementById("emailLogin").value;
    let password = document.getElementById("passwordLogin").value;
    const button= document.getElementById("submitLogin")
    button.disabled= true;
    button.innerText= "Carregando..."

    const body = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
            user_type_id: 1,
        }),
    };

    try {
        const response = await fetch(urlLogin, body);
        const data = await response.json();


        console.log("Resposta da API:", data);
        button.disabled = false;
        button.innerText = "Entrar";
    

        if (!response.ok) {
            alert(`Erro ao fazer login: ${data.data.errors}`);
            console.error(data);
        } else {
            alert("Login realizado com sucesso!");
            if (data.access_token) {  
                localStorage.setItem('token', data.access_token); 
                console.log("Token recebido:", data.access_token);
            } else {
                console.warn("Nenhum token encontrado na resposta.");
            }
            localStorage.setItem('user', JSON.stringify(data.user)); 
            location.href = "../HTML/home.html";
        }
    } catch (error) {
        alert(`Erro ao fazer login: ${error.message}`);
        console.error("Erro:", error);
    }
}