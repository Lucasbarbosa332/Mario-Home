const character = document.getElementById('character');
const pipes = document.querySelectorAll('.pipe');
const pipeButton = document.getElementById('pipe-button');
let positionX = window.innerWidth / 2 - 50; // Centraliza na largura da tela
let positionY = 0;

// Função para verificar se Mario coletou uma moeda
function checkCoinCollection() {
    const coins = document.querySelectorAll('.coin'); // Supondo que suas moedas tenham a classe 'coin'
    coins.forEach((coin) => {
        const coinRect = coin.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        // Verifica se Mario colidiu com a moeda
        if (
            characterRect.right > coinRect.left && // Borda direita de Mario além da borda esquerda da moeda
            characterRect.left < coinRect.right && // Borda esquerda de Mario antes da borda direita da moeda
            characterRect.bottom >= coinRect.top && // Parte inferior de Mario ao nível do topo da moeda
            characterRect.top <= coinRect.bottom // Parte superior de Mario abaixo da parte inferior da moeda
        ) {
            coinSound.play(); // Toca o som da moeda
            coin.remove(); // Remove a moeda do DOM
        }
    });
}

// Função para lidar com a coleta de moedas
function handleCoinCollection() {
    checkCoinCollection(); // Chama a função de verificação de coleta de moedas
}

// Chame a função handleCoinCollection dentro do listener de keydown
document.addEventListener('keydown', (event) => {
    // ... seu código existente ...

    handleCoinCollection(); // Verifica a coleta de moedas
});

// Dimensões atualizadas de Mario
const characterWidth = 100;
const characterHeight = 100;

// Caminhos dos GIFs
const runningRightGif = '/test/img/Mario.gif'; // GIF em movimento para a direita
const runningLeftGif = '/test/img/marioleft.gif'; // GIF em movimento para a esquerda

// Caminhos dos GIFs adicionais para troca de teclas
const gifs = [
    '/test/img/mario-luigi.gif', // GIF 1
    '/test/img/wetdino.gif', // GIF 2
    '/test/img/tower-defense-simulator-roblox.gif', // GIF 3
    '/test/img/super-mario-banana.gif', // GIF 4
    '/test/img/super-bad-mario-mario.gif', // GIF 5
    '/test/img/mario-mario-bros.gif', // GIF 6
    '#', // GIF 7
    '#', // GIF 8
    '#', // GIF 9
    // Adicione até o GIF 29 ou mais conforme necessário
];

// Caminho do GIF para a tecla "s"
const specialGif = '/test/img/gira gira.gif'; // GIF especial para a tecla "s"
// Caminho do GIF para o pulo
const jumpGif = '/test/img/Mario.gif'; // GIF especial para o pulo (tecla "W")
// Função para detectar a tecla pressionada
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd': // Mover para a direita
            positionX += 10;
            character.style.backgroundImage = `url('${runningRightGif}')`; // Troca para o GIF de correr à direita
            break;
        case 'a': // Mover para a esquerda
            positionX -= 10;
            character.style.backgroundImage = `url('${runningLeftGif}')`; // Troca para o GIF de correr à esquerda
            break;
        case 'w': // Simular pulo com GIF especial
            positionY = 100; // Altera a posição Y para simular o pulo
            character.style.backgroundImage = `url('${jumpGif}')`; // Troca para o GIF de pulo
            break;
        case 's': // Ativar GIF especial
            character.style.backgroundImage = `url('${specialGif}')`; // Troca para o GIF especial
            break;
        case '1': // Troca para o GIF 1
            character.style.backgroundImage = `url('${gifs[0]}')`;
            break;
        case '2': // Troca para o GIF 2
            character.style.backgroundImage = `url('${gifs[1]}')`;
            break;
        case '3': // Troca para o GIF 3
            character.style.backgroundImage = `url('${gifs[2]}')`;
            break;
        case '4': // Troca para o GIF 4
            character.style.backgroundImage = `url('${gifs[3]}')`;
            break;
        case '5': // Troca para o GIF 5
            character.style.backgroundImage = `url('${gifs[4]}')`;
            break;
        case '6': // Troca para o GIF 6
            character.style.backgroundImage = `url('${gifs[5]}')`;
            break;
        case '#': // Troca para o GIF 7
            character.style.backgroundImage = `url('${gifs[6]}')`;
            break;
        case '#': // Troca para o GIF 8
            character.style.backgroundImage = `url('${gifs[7]}')`;
            break;
        case '#': // Troca para o GIF 9
            character.style.backgroundImage = `url('${gifs[8]}')`;
            break;
        // Adicione mais casos conforme necessário
    }
    updatePosition();

    if (event.key === 'w') {
        checkPipeInteraction();
    }
});

// Função para atualizar a posição do personagem
function updatePosition() {
    // Garante que o personagem não saia da tela
    if (positionX < 0) positionX = 0; // Não permite que o Mario saia pela esquerda
    if (positionX + characterWidth > window.innerWidth) positionX = window.innerWidth - characterWidth; // Não permite que o Mario saia pela direita
    
    character.style.left = `${positionX}px`;
    character.style.bottom = `${positionY}px`;

    if (positionY > 0) {
        // Simular gravidade após o pulo
        setTimeout(() => {
            positionY = 0;
            character.style.bottom = `${positionY}px`;
            // Retorna para a imagem parada, controlada pelo CSS
        }, 300);
    }
}

// Função para verificar colisão entre Mario e o cano
function checkPipeInteraction() {
    let interactionFound = false;
    pipes.forEach(pipe => {
        const pipeRect = pipe.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();
        
        // Verificação de colisão considerando a altura e largura de Mario e do cano
        if (
            characterRect.right > pipeRect.left && // Borda direita de Mario além da borda esquerda do cano
            characterRect.left < pipeRect.right && // Borda esquerda de Mario antes da borda direita do cano
            characterRect.bottom <= pipeRect.top + pipeRect.height // Pés de Mario ao nível do topo do cano
        ) {
            interactionFound = true;
            const page = pipe.getAttribute('data-page');
            
            // Configura o botão para aparecer com o nome da página
            pipeButton.style.display = 'block';
            pipeButton.textContent = `Ir para ${page}`;
            pipeButton.onclick = () => {
                alert(`Indo para a página ${page}`);
                window.location.href = `/${page}.html`;
            };
            
            // Centraliza o botão acima do cano
            pipeButton.style.left = `${pipeRect.left + pipeRect.width / 2 - pipeButton.offsetWidth / 2}px`;
        }
    });
    
    // Se não houver interação, esconde o botão
    if (!interactionFound) {
        pipeButton.style.display = 'none';
    }
}

// Listener para verificar se as teclas estão soltas
document.addEventListener('keyup', (event) => {
    if (event.key === 'd' || event.key === 'a') {
        // Quando o usuário solta a tecla, volta para a imagem parada, controlada pelo CSS
        character.style.backgroundImage = ''; // Esta linha pode ser removida, pois o CSS controla a imagem parada
    }
});
function positionCloudsRandomly() {
    const clouds = document.querySelectorAll('.cloud');
    const usedPositions = new Set();

    clouds.forEach(cloud => {
        let randomTop, randomLeft, positionKey;

        // Tenta gerar uma nova posição até encontrar uma não utilizada
        do {
            randomTop = Math.floor(Math.random() * 90) + '%';
            randomLeft = Math.floor(Math.random() * 90) + '%';
            positionKey = `${randomTop}-${randomLeft}`;
        } while (usedPositions.has(positionKey));

        // Adiciona a posição ao conjunto para evitar sobreposição
        usedPositions.add(positionKey);
        cloud.style.top = randomTop;
        cloud.style.left = randomLeft;
    });
}

// Posiciona as nuvens aleatoriamente ao carregar a página
positionCloudsRandomly();