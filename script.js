const btnNo = document.getElementById("btnNo");
const btnConfirmar = document.getElementById("btnConfirmar");
const mensagemErro = document.querySelector(".mensagem-erro");

const selectDia = document.getElementById("dia");
const selectHora = document.getElementById("hora");

const resumoDia = document.getElementById("resumoDia");
const resumoHora = document.getElementById("resumoHora");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxNyLBWTaxwWPBvIOK-qeWvYw3_SQRlSQ3WMx_P-CTcK2QE6vfxHdEum0tYeKtYC_ggfw/exec";

// Lógica do botão NÃO fugir (executada apenas na index.html)
if (btnNo) {
    function fugir(e) {
        if (e && e.type === "touchstart") {
            e.preventDefault();
        }

        if (mensagemErro) {
            mensagemErro.style.display = "block";
        }

        btnNo.style.position = "fixed";

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = btnNo.offsetWidth;
        const buttonHeight = btnNo.offsetHeight;

        const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth));
        const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight));

        btnNo.style.left = randomX + "px";
        btnNo.style.top = randomY + "px";
    }

    btnNo.addEventListener("mouseover", fugir);
    btnNo.addEventListener("touchstart", fugir);
}

// Lógica de confirmação da escolha (executada na escolha.html)
if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function () {
        const diaEscolhido = selectDia.value;
        const horaEscolhida = selectHora.value;

        // Salva localmente para ler na tela final
        localStorage.setItem("diaEncontro", diaEscolhido);
        localStorage.setItem("horaEncontro", horaEscolhida);

        // Envia requisição para o Google Apps Script
        fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dia: diaEscolhido,
                hora: horaEscolhida
            })
        }).catch(err => console.error("Erro ao agendar:", err));

        // Vai para a tela de confirmação
        window.location.href = "confirmacao.html";
    });
}

// Lógica de exibição do resumo (executada na confirmacao.html)
if (resumoDia && resumoHora) {
    const diaSalvo = localStorage.getItem("diaEncontro");
    const horaSalva = localStorage.getItem("horaEncontro");

    if (diaSalvo && horaSalva) {
        resumoDia.textContent = diaSalvo === "sabado" ? "Próximo Sábado" : "Próximo Domingo";
        resumoHora.textContent = `Às ${horaSalva}`;
    }
}