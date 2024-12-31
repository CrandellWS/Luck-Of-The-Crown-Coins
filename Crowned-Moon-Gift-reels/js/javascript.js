document.addEventListener('DOMContentLoaded', () => {
    const spinSound = new Audio('audio/394101__deleted_user_6479820__single-swish-5.mp3');
    const stopSound = new Audio('audio/202314__7778__click-1.mp3');

    const openModalBtn = document.getElementById('openModal');
    const configModal = document.getElementById('configModal');
    const closeModalBtn = document.getElementById('closeModal');
    const increaseWinCheck = document.getElementById('increaseWinCheck');
    const winPercentageContainer = document.getElementById('winPercentageContainer');
    const spinButton = document.getElementById('spinButton');

    const symbolsArray = [
        "./img/moon.png",
        "./img/star.png",
        "./img/pink-gem.png",
        "./img/crown.png",
        "./img/moon-2.png",
        "./img/blue-gem.png",
        "./img/shooting-star.png"
    ];

    const optionsMap = {
        gambleWithAshButton: { inputId: 'gambleWithAshInput' },
        fullMoonButton: { inputId: 'fullMoonInput' },
        halfMoonButton: { inputId: 'halfMoonInput' },
        crescentMoonButton: { inputId: 'crescentMoonInput' },
        newMoonButton: { inputId: 'newMoonInput' },
        robInSpinsButton: { inputId: 'robInSpinsInput' },
    };

    const buttons = Object.keys(optionsMap)
        .map((id) => document.getElementById(id))
        .filter((button) => button !== null);

    // Generate symbols for a reel
    function generateInitialSymbols(reel, numSymbols = 21) {
        const symbolsContainer = reel.querySelector('.symbols');
        symbolsContainer.innerHTML = ''; // Clear existing symbols
        for (let i = 0; i < numSymbols; i++) {
            const newSymbol = document.createElement('div');
            newSymbol.className = 'symbol';
            const img = document.createElement('img');
            img.src = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
            newSymbol.appendChild(img);
            symbolsContainer.appendChild(newSymbol);
        }
    }

    // Play sound helper
    function playSound(sound) {
        try {
            sound.currentTime = 0;
            sound.play();
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    }

    function spinReel(reel, duration, isWinningSpin, winningSymbol) {
        const symbolsContainer = reel.querySelector('.symbols');

        // Reset position to align the reel seamlessly
        symbolsContainer.style.transform = "translateY(0)";
        symbolsContainer.style.transition = "none"; // Ensure no ongoing animation

        const symbolHeight = symbolsContainer.firstElementChild
            ? symbolsContainer.firstElementChild.offsetHeight
            : 100; // Default fallback height

        // Prepend new symbols for continuity during the spin
        for (let i = 0; i < 3; i++) {
            const newSymbol = document.createElement('div');
            newSymbol.className = 'symbol';
            const img = document.createElement('img');
            img.src = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
            newSymbol.appendChild(img);
            symbolsContainer.insertBefore(newSymbol, symbolsContainer.firstChild);
        }

        // Remove excess symbols to maintain reel size
        while (symbolsContainer.children.length > 21) {
            symbolsContainer.removeChild(symbolsContainer.lastChild);
        }

        // Assign winning symbol (if applicable) **before** spinning
        if (isWinningSpin && winningSymbol) {
            const middleSymbol = symbolsContainer.children[1]; // Middle position
            const img = middleSymbol.querySelector('img');
            if (img) {
                img.src = winningSymbol; // Assign winning symbol
            }
        }

        // Begin the spin animation
        playSound(spinSound);
        symbolsContainer.style.transition = `transform ${duration}s ease-out`;
        symbolsContainer.style.transform = `translateY(${symbolHeight * 18}px)`;

        setTimeout(() => {
            // Stop animation but make no further changes to symbols
            symbolsContainer.style.transition = "none";
            playSound(stopSound);
        }, duration * 1000);
    }


    // Initialize reels with default symbols
    ["reel1", "reel2", "reel3"].forEach((id) => {
        const reel = document.getElementById(id);
        generateInitialSymbols(reel);
    });

    // Activate a button
    function activateButton(buttonId) {
        buttons.forEach((btn) => btn.classList.remove('active'));
        const activeButton = document.getElementById(buttonId);
        activeButton?.classList.add('active');
    }

    // Add click event listeners to all buttons
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            activateButton(button.id);
        });
    });

    // Handle modal open/close
    openModalBtn.addEventListener('click', () => {
        configModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        configModal.style.display = 'none';
    });

    increaseWinCheck.addEventListener('change', () => {
        winPercentageContainer.style.display = increaseWinCheck.checked ? 'block' : 'none';
    });

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;

        const activeButton = buttons.find((btn) => btn.classList.contains('active'));
        let winChance = 0;
        let isWinningSpin = false;
        let winningSymbol = null;

        if (activeButton) {
            // Fetch the win percentage from the corresponding input
            const { inputId } = optionsMap[activeButton.id];
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                winChance = parseInt(inputElement.value, 10) / 100;
            }

            // Calculate if this spin is a winner
            isWinningSpin = Math.random() < winChance;

            // Choose a winning symbol if it's a winning spin
            if (isWinningSpin) {
                winningSymbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)];
            }
        }

        // Spin each reel with the calculated parameters
        ["reel1", "reel2", "reel3"].forEach((id, index) => {
            const reel = document.getElementById(id);
            spinReel(reel, 3 + index * 0.5, isWinningSpin, winningSymbol);
        });

        setTimeout(() => {
            spinButton.disabled = false; // Re-enable after spin
        }, 4000);
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Set default win percentages if not already set
        const defaultPercentages = {
            gambleWithAshInput: 100,
            fullMoonInput: 75,
            halfMoonInput: 50,
            crescentMoonInput: 25,
            newMoonInput: 10,
            robInSpinsInput: 1,
        };

        Object.keys(defaultPercentages).forEach((inputId) => {
            const inputElement = document.getElementById(inputId);
            if (inputElement && !inputElement.value) {
                inputElement.value = defaultPercentages[inputId];
            }
        });
    });

    activateButton('newMoonButton'); // Set default active button
});
