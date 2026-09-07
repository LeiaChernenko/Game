const game = document.getElementById('game');
const menuButton = document.getElementById('menuButton');
const levels = document.getElementById('levels');
const startButton = document.getElementById('startButton');
const timer = document.getElementById('timer');

let timeLeft = 60;
let timerInterval = null;
let gameStarted = false;

function startTimer(minutes) {
    clearInterval(timerInterval);
    timeLeft = minutes * 60;
    updateTimer();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            lockBoard = true;
            gameStarted = false;

            stopAllVideos();

            level4Music.pause();
            level4Music.currentTime = 0;

            alert("Time over!");
            startButton.style.display = 'block';
        }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const level4Music = new Audio('music/level4.mp3');
level4Music.loop = true;
level4Music.volume = 0.2;

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
    'images/sticker50.webm',
    'images/sticker51.webm',
    'images/sticker52.webm',
    'images/sticker53.webm',
    'images/sticker54.webm',
    'images/sticker55.webm',
    'images/sticker56.webm',
    'images/sticker57.webm',
    'images/sticker58.webm',
    'images/sticker59.webm',
    'images/sticker60.webm',
    'images/sticker61.webm',
    'images/sticker62.webm',
    'images/sticker63.webm',
    'images/sticker64.webm',
    'images/sticker65.webm',
    'images/sticker66.webm',
    'images/sticker67.webm',
    'images/sticker68.webm',
    'images/sticker69.webm',
    'images/sticker70.webm',
    'images/sticker71.webm',
    'images/sticker72.webm',
    'images/sticker73.webm',
    'images/sticker74.webm',
    'images/sticker75.webm',
    'images/sticker76.webm',
    'images/sticker77.webm',
    'images/sticker78.webm',
    'images/sticker79.webm',
    'images/sticker80.webm',
    'images/sticker81.webm',
    'images/sticker82.webm',
    'images/sticker83.webm',
    'images/sticker84.webm',
    'images/sticker85.webm',
    'images/sticker86.webm',
    'images/sticker87.webm',
    'images/sticker88.webm',
    'images/sticker89.webm',
    'images/sticker90.webm',
    'images/sticker91.webm',
    'images/sticker92.webm',
    'images/sticker93.webm',
    'images/sticker94.webm',
    'images/sticker95.webm',
    'images/sticker96.webm',
    'images/sticker97.webm',
    'images/sticker98.webm'
];

menuButton.addEventListener('click', () => {
    levels.classList.toggle('active');
});

function createVideo(sticker) {
    const video = document.createElement('video');

    video.src = sticker;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'none';

    return video;
}

function showSticker(card) {
    const video = card.querySelector('video');

    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    card.classList.add('open');
}

function hideSticker(card) {
    const video = card.querySelector('video');

    if (!video) return;

    video.pause();
    video.currentTime = 0;

    card.classList.remove('open');
}

function stopAllVideos() {
    const videos = game.querySelectorAll('video');

    videos.forEach((video) => {
        video.pause();
    });
}

function startGame(size) {
    game.innerHTML = '';

    firstCard = null;
    secondCard = null;
    lockBoard = false;
    gameStarted = true;

    const totalCards = size * size;
    const pairs = totalCards / 2;

    const selectedStickers = stickers.slice(0, pairs);

    const cardStickers = [
        ...selectedStickers,
        ...selectedStickers
    ];

    for (let i = cardStickers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardStickers[i], cardStickers[j]] = [
            cardStickers[j],
            cardStickers[i]
        ];
    }

    game.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    cardStickers.forEach((sticker) => {
        const card = document.createElement('div');

        card.classList.add('card');
        card.textContent = '?';
        card.dataset.symbol = sticker;

        const video = createVideo(sticker);
        card.appendChild(video);

        card.addEventListener('click', () => {
            if (!gameStarted) return;
            if (lockBoard) return;
            if (card === firstCard) return;
            if (card.classList.contains('matched')) return;

            showSticker(card);

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

                const firstVideo = firstCard.querySelector('video');
                const secondVideo = secondCard.querySelector('video');

                setTimeout(() => {
                    if (firstVideo) {
                        firstVideo.pause();
                    }

                    if (secondVideo) {
                        secondVideo.pause();
                    }
                }, 1500);

                const matchedCards = game.querySelectorAll('.matched');

                if (matchedCards.length === game.children.length) {
                    clearInterval(timerInterval);

                    gameStarted = false;
                    lockBoard = true;

                    level4Music.pause();
                    level4Music.currentTime = 0;

                    confetti({
                        particleCount: 200,
                        spread: 100,
                        origin: {
                            y: 0.6
                        }
                    });

                    startButton.style.display = 'block';

                    setTimeout(() => {
                        alert("You win!");
                    }, 500);
                } else {
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }
            } else {
                setTimeout(() => {
                    if (firstCard && secondCard) {
                        hideSticker(firstCard);
                        hideSticker(secondCard);
                    }

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

let currentLevel = 4;

levelButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currentLevel = Number(button.dataset.size);

        clearInterval(timerInterval);

        gameStarted = false;
        lockBoard = true;

        stopAllVideos();

        level4Music.pause();
        level4Music.currentTime = 0;

        game.innerHTML = '';

        firstCard = null;
        secondCard = null;

        startButton.style.display = 'block';

        if (currentLevel === 4) {
            timeLeft = 60;
        } else if (currentLevel === 6) {
            timeLeft = 120;
        } else if (currentLevel === 10) {
            timeLeft = 300;
        } else if (currentLevel === 14) {
            timeLeft = 900;
        }

        updateTimer();

        levels.classList.remove('active');
    });
});

startButton.addEventListener('click', () => {
    startGame(currentLevel);

    if (currentLevel === 4) {
        startTimer(1);
    } else if (currentLevel === 6) {
        startTimer(2);
    } else if (currentLevel === 10) {
        startTimer(5);
    } else if (currentLevel === 14) {
        startTimer(15);
    }

    if (currentLevel === 14) {
        level4Music.currentTime = 0;
        level4Music.play().catch(() => {});
    } else {
        level4Music.pause();
        level4Music.currentTime = 0;
    }

    startButton.style.display = 'none';
});

const rulesButton = document.getElementById('rulesButton');
const textRules = document.getElementById('textRules');

rulesButton.addEventListener('click', () => {
    textRules.classList.toggle('active');
});