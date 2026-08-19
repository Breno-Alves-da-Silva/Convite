const btnNo = document.getElementById("btnNo");
const btnConfirmar = document.getElementById("btnConfirmar");
const mensagemErro = document.querySelector(".mensagem-erro");

const selectDia = document.getElementById("dia");
const selectHora = document.getElementById("hora");
const selectLocal = document.getElementById("local");

const resumoDia = document.getElementById("resumoDia");
const resumoHora = document.getElementById("resumoHora");
const resumoLocal = document.getElementById("resumoLocal");
const elementoContador = document.getElementById("contador");

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxNyLBWTaxwWPBvIOK-qeWvYw3_SQRlSQ3WMx_P-CTcK2QE6vfxHdEum0tYeKtYC_ggfw/exec";

// Lógica do botão NÃO fugir (index.html)
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

// Lógica de confirmação da escolha (escolha.html)
if (btnConfirmar) {
    btnConfirmar.addEventListener("click", function () {
        const diaEscolhido = selectDia.value;
        const horaEscolhida = selectHora.value;
        const localEscolhido = selectLocal.value;
        const localEscolhidoTexto = selectLocal.options[selectLocal.selectedIndex].text;

        localStorage.setItem("diaEncontro", diaEscolhido);
        localStorage.setItem("horaEncontro", horaEscolhida);
        localStorage.setItem("localEncontro", localEscolhido);
        localStorage.setItem("localEncontroTexto", localEscolhidoTexto);

        fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                dia: diaEscolhido,
                hora: horaEscolhida,
                local: localEscolhido
            })
        }).catch(err => console.error("Erro ao agendar:", err));

        window.location.href = "confirmacao.html";
    });
}

// Lógica da tela de confirmação (confirmacao.html)
if (resumoDia && resumoHora && resumoLocal) {
    const diaSalvo = localStorage.getItem("diaEncontro");
    const horaSalva = localStorage.getItem("horaEncontro");
    const localSalvo = localStorage.getItem("localEncontro");
    const localSalvoTexto = localStorage.getItem("localEncontroTexto");

    if (diaSalvo && horaSalva && localSalvo) {
        resumoDia.textContent = diaSalvo === "sabado" ? "Próximo Sábado" : "Próximo Domingo";
        resumoHora.textContent = `Às ${horaSalva}`;
        resumoLocal.textContent = localSalvoTexto || localSalvo;

        // Dispara a chuva de confetes/corações assim que a página carrega
        if (typeof confetti === "function") {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // Inicia a Contagem Regressiva
        iniciarContador(diaSalvo, horaSalva);
    }
}

// Função para calcular o tempo restante até o encontro
function iniciarContador(dia, hora) {
    const partesHora = hora.split(":");
    const horas = parseInt(partesHora[0], 10);
    const minutos = parseInt(partesHora[1], 10);

    const hoje = new Date();
    const diaSemanaAtual = hoje.getDay();
    const diaAlvo = (dia === "sabado") ? 6 : 0;

    let diasFaltando = diaAlvo - diaSemanaAtual;
    if (diasFaltando <= 0) {
        diasFaltando += 7;
    }

    const dataAlvo = new Date(hoje.getTime() + (diasFaltando * 24 * 60 * 60 * 1000));
    dataAlvo.setHours(horas, minutos, 0, 0);

    function atualizarTimer() {
        const agora = new Date().getTime();
        const diferenca = dataAlvo.getTime() - agora;

        if (diferenca <= 0) {
            elementoContador.textContent = "É HOJE! 😍🎉";
            return;
        }

        const d = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diferenca % (1000 * 60)) / 1000);

        elementoContador.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }

    atualizarTimer();
    setInterval(atualizarTimer, 1000);
}
