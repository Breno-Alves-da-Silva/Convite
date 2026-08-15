// Captura os elementos da página HTML
const btnNo = document.getElementById("btnNo");
const btnSim = document.getElementById("btnSim");
const tela1 = document.getElementById("tela1");
const tela2 = document.getElementById("tela2");
const mensagemErro = document.querySelector(".mensagem-erro");

// Cole aqui a URL do seu Web App do Google Apps Script
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

function aceitou() {
    // Muda a tela imediatamente para a pessoa ver que deu certo
    tela1.style.display = "none";
    tela2.style.display = "block";

    // Envia o aviso e agenda o evento no Google Agenda em segundo plano
    if (WEB_APP_URL && WEB_APP_URL !== "https://script.google.com/macros/s/AKfycbxNyLBWTaxwWPBvIOK-qeWvYw3_SQRlSQ3WMx_P-CTcK2QE6vfxHdEum0tYeKtYC_ggfw/exec") {
        fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors"
        }).catch(err => console.error("Erro ao agendar:", err));
    }
}

btnNo.addEventListener("mouseover", fugir);
btnNo.addEventListener("touchstart", fugir);
btnSim.addEventListener("click", aceitou);