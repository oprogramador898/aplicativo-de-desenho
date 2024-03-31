const canvas = document.getElementById("telaDePintura");
const ctx = canvas.getContext("2d");

const seletorDeCor = document.getElementById("seletorDeCor");
const tamanhosPincel = document.querySelectorAll(".tamanho-pincel");
const ferramentas = document.querySelectorAll(".ferramenta");
const botaoLimpar = document.getElementById("botaoLimpar");

let tamanhoPincel = 20;
let pintando = false;
let ferramentaAtiva = "pincel";
let ultimaPosicaoX = 0;
let ultimaPosicaoY = 0;

seletorDeCor.addEventListener("change", () => {
    ctx.fillStyle = seletorDeCor.value;
    ctx.strokeStyle = seletorDeCor.value;
});

canvas.addEventListener("mousedown", iniciarPintura);
canvas.addEventListener("mousemove", pintar);
canvas.addEventListener("mouseup", () => pintando = false);
canvas.addEventListener("mouseout", () => pintando = false);

function iniciarPintura(e) {
    pintando = true;
    [ultimaPosicaoX, ultimaPosicaoY] = [e.offsetX, e.offsetY];
}

function pintar(e) {
    if (!pintando) return;

    ctx.lineWidth = tamanhoPincel;
    ctx.lineCap = "round";

    if (ferramentaAtiva === "pincel" || ferramentaAtiva === "borracha") {
        ctx.beginPath();
        ctx.moveTo(ultimaPosicaoX, ultimaPosicaoY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (ferramentaAtiva === "linha" || ferramentaAtiva === "retangulo" || ferramentaAtiva === "circulo") {
        const largura = e.offsetX - ultimaPosicaoX;
        const altura = e.offsetY - ultimaPosicaoY;

        if (ferramentaAtiva === "linha") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            desenharLinha(ultimaPosicaoX, ultimaPosicaoY, e.offsetX, e.offsetY);
        } else if (ferramentaAtiva === "retangulo") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            desenharRetangulo(ultimaPosicaoX, ultimaPosicaoY, largura, altura);
        } else if (ferramentaAtiva === "circulo") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            desenharCirculo(ultimaPosicaoX, ultimaPosicaoY, Math.sqrt(largura ** 2 + altura ** 2));
        }
    }

    [ultimaPosicaoX, ultimaPosicaoY] = [e.offsetX, e.offsetY];
}

function desenharLinha(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function desenharRetangulo(x, y, largura, altura) {
    ctx.beginPath();
    ctx.rect(x, y, largura, altura);
    ctx.stroke();
}

function desenharCirculo(x, y, raio) {
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, 2 * Math.PI);
    ctx.stroke();
}

tamanhosPincel.forEach(tamanho => {
    tamanho.addEventListener("click", () => {
        tamanhosPincel.forEach(t => t.classList.remove("ativo"));
        tamanho.classList.add("ativo");
        tamanhoPincel = parseInt(tamanho.dataset.size);
    });
});

ferramentas.forEach(ferramenta => {
    ferramenta.addEventListener("click", () => {
        ferramentas.forEach(f => f.classList.remove("ativo"));
        ferramenta.classList.add("ativo");
        ferramentaAtiva = ferramenta.dataset.action;
    });
});

botaoLimpar.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
