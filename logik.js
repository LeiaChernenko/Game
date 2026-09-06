const game = document.getElementById('game');

const menuButton = document.getElementById('menuButton');
const levels = document.getElementById('levels');

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const stickers = [
    'images/sticker1.webm',
    'images/sticker2.webm',
    'images/sticker3.webm',
    'images/sticker4.webm',
    'images/sticker5.webm',
    'images/sticker6.webm',
    'images/sticker7.webm',
    'images/sticker8.webm',
    'images/sticker9.webm',
    'images/sticker10.webm',
    'images/sticker11.webm',
    'images/sticker12.webm',
    'images/sticker13.webm',
    'images/sticker14.webm',
    'images/sticker15.webm',
    'images/sticker16.webm',
    'images/sticker17.webm',
    'images/sticker18.webm',
    'images/sticker19.webm',
    'images/sticker20.webm',
    'images/sticker21.webm',
    'images/sticker22.webm',
    'images/sticker23.webm',
    'images/sticker24.webm',
    'images/sticker25.webm',
    'images/sticker26.webm',
    'images/sticker27.webm',
    'images/sticker28.webm',
    'images/sticker29.webm',
    'images/sticker30.webm',
    'images/sticker31.webm',
    'images/sticker32.webm',
    'images/sticker33.webm',
    'images/sticker34.webm',
    'images/sticker35.webm',
    'images/sticker36.webm',
    'images/sticker37.webm',
    'images/sticker38.webm',
    'images/sticker39.webm',
    'images/sticker40.webm',
    'images/sticker41.webm',
    'images/sticker42.webm',
    'images/sticker43.webm',
    'images/sticker44.webm',
    'images/sticker45.webm',
    'images/sticker46.webm',
    'images/sticker47.webm',
    'images/sticker48.webm',
    'images/sticker49.webm',
    'images/sticker50.webm'
];

menuButton.addEventListener('click', () => {
    levels.classList.toggle('active');
});

function showSticker(card, sticker) {
    card.innerHTML = '';

    const video = document.createElement('video');

    video.src = sticker;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    card.appendChild(video);

    video.play().catch(() => {});
}

function hideSticker(card) {
    card.innerHTML = '?';
}

function startGame(size) {
    game.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    const totalCards = size * size;
    const pairs = totalCards / 2;
    const selectedStickers = stickers.slice(0, pairs);
    const cardStickers = [
        ...selectedStickers,
        ...selectedStickers
    ];
    cardStickers.sort(() => Math.random() - 0.5);
    game.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    cardStickers.forEach((sticker) => {

        const card = document.createElement('div');

        card.classList.add('card');

        card.textContent = '?';

        card.dataset.symbol = sticker;
        card.addEventListener('click', () => {
            if (lockBoard) return;
            if (card === firstCard) return;
            if (card.classList.contains('matched')) return;

            showSticker(card, sticker);

            if (firstCard === null) {
                firstCard = card;
                return;
            }
            secondCard = card;
            lockBoard = true;

            if (
                firstCard.dataset.symbol ===
                secondCard.dataset.symbol
            ) {

                firstCard.classList.add('matched');
                secondCard.classList.add('matched');

                firstCard = null;
                secondCard = null;
                lockBoard = false;

            } else {
                setTimeout(() => {
                    hideSticker(firstCard);
                    hideSticker(secondCard);

                    firstCard = null;
                    secondCard = null;

                    lockBoard = false;

                }, 1000);
            }
        });


        game.appendChild(card);
    });
}

const levelButtons = document.querySelectorAll('.levels button');


levelButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const size = Number(button.dataset.size);
        startGame(size);
        levels.classList.remove('active');
    });

});

startGame(4);

const rulesButton = document.getElementById('rulesButton');
const textRules = document.getElementById('textRules');

rulesButton.addEventListener('click', () => {
    textRules.classList.toggle('active');
});