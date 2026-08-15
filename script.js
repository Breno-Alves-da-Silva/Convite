const btnNo = document.getElementById("btnNo");
const btnSim = document.getElementById("btnSim");
const btnConfirmar = document.getElementById("btnConfirmar");

const tela1 = document.getElementById("tela1");
const tela2 = document.getElementById("tela2");
const tela3 = document.getElementById("tela3");

const mensagemErro = document.querySelector(".mensagem-erro");
const selectDia = document.getElementById("dia");
const inputHora = document.getElementById("hora");

const resumoDia = document.getElementById("resumoDia");
const resumoHora = document.getElementById("resumoHora");

// URL do seu Google Apps Script já configurada:
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxNyLBWTaxwWPBvIOK-qeWvYw3_SQRlSQ3WMx_P-CTcK2QE6vfxHdEum0tYeKtYC_ggfw/exec";

function fugir(e) {
    if (e && e.type === "touchstart") {
        e.preventDefault();
    }

    mensagemErro.style.display = "block";
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

// Quando clica em SIM, abre a tela de seleção
function aceitouSim() {
    tela1.style.display = "none";
    tela2.style.display = "block";
}

// Quando ela escolhe o dia/hora e clica em Confirmar
function confirmarEscolha() {
    const diaEscolhido = selectDia.value; // "sabado" ou "domingo"
    const horaEscolhida = inputHora.value; // ex: "20:00"

    // Atualiza a tela de confirmação visual
    resumoDia.textContent = diaEscolhido === "sabado" ? "Próximo Sábado" : "Próximo Domingo";
    resumoHora.textContent = `Às ${horaEscolhida}`;

    tela2.style.display = "none";
    tela3.style.display = "block";

    // Envia a escolha para o seu Google Apps Script
    fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            dia: diaEscolhido,
            hora: horaEscolhida
        })
    }).catch(err => console.error("Erro ao agendar:", err));
}

btnNo.addEventListener("mouseover", fugir);
btnNo.addEventListener("touchstart", fugir);
btnSim.addEventListener("click", aceitouSim);
btnConfirmar.addEventListener("click", confirmarEscolha);