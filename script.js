const conversa = {
    1: {
        pergunta: "Como você está se sentindo hoje?",
        respostas: {
            "Feliz": "Que bom! O que te faz se sentir assim?",
            "Pensativo": "Pensar sobre a vida, às vezes, nos leva a profundas reflexões. O que ocupa seus pensamentos hoje?"
        }
    },
    2: {
        pergunta: "O que te faz feliz em dias assim?",
        respostas: {
            "Natureza": "A natureza tem esse poder incrível de nos revigorar. Você tem um lugar favorito ao ar livre?",
            "Música": "A música é uma bela forma de expressão. Qual estilo musical você mais gosta?",
            "Arte": "A arte toca a alma. Que tipo de arte você mais aprecia?"
        }
    },
    3: {
        pergunta: "E falando em alegria, o que você acha de estrelas?",
        respostas: {
            "Adoro": "As estrelas são como pequenos lembretes de que há beleza na imensidão.",
            "Indiferente": "Entendo, nem todo mundo acha. Mas há beleza em tantas coisas ao nosso redor."
        }
    }
};

let etapaAtual = 1;

function coletarNome() {
    const nome = document.getElementById('nome').value.trim();
    if (nome) {
        localStorage.setItem('nomeUsuario', nome);
        avancarParaEtapa(etapaAtual);
    } else {
        alert('Por favor, digite seu nome para começarmos.');
    }
}

function avancarParaEtapa(etapa) {
    const etapaConversa = conversa[etapa];
    if (etapaConversa) {
        document.getElementById('mensagem').innerHTML = etapaConversa.pergunta;
        document.getElementById('feedback').hidden = false;
        document.getElementById('nomeInput').hidden = true;
        atualizarBotoesEtapa(etapaConversa.respostas);
    }
}

function atualizarBotoesEtapa(respostas) {
    const containerBotoes = document.getElementById('respostas');
    containerBotoes.innerHTML = '';

    Object.entries(respostas).forEach(([texto, mensagem]) => {
        const botao = document.createElement('button');
        botao.textContent = texto;
        botao.onclick = () => responderEtapa(mensagem);
        containerBotoes.appendChild(botao);
    });
}

function responderEtapa(mensagem) {
    document.getElementById('mensagem').innerHTML = mensagem;
    etapaAtual += 1;
    const proximaEtapa = conversa[etapaAtual];
    if (proximaEtapa) {
        atualizarBotoesEtapa(proximaEtapa.respostas);
    } else {
        document.getElementById('respostas').hidden = true;
    }
}

window.onload = function() {
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    if (nomeSalvo) {
        document.getElementById('nome').value = nomeSalvo;
        avancarParaEtapa(etapaAtual);
    }
}
document.getElementById('nao').addEventListener('click', function() {
    const container = document.querySelector('.container');
    const novoX = Math.random() * (window.innerWidth - this.clientWidth);
    const novoY = Math.random() * (window.innerHeight - this.clientHeight);

    this.style.position = 'absolute';
    this.style.left = `${novoX}px`;
    this.style.top = `${novoY}px`;
});

document.getElementById('sim').addEventListener('click', function() {
    window.location.href = 'https://api.whatsapp.com/send?phone=5513981723658&text=vou%20mandar'; // Substitua pela URL do vídeo desejado
});
