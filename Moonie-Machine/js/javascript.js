document.addEventListener('DOMContentLoaded', () => {
    const spinSound = new Audio('audio/394101__deleted_user_6479820__single-swish-5.mp3');
    const stopSound = new Audio('audio/202314__7778__click-1.mp3');

    const openModalBtn = document.getElementById('openModal');
    const configModal = document.getElementById('configModal');
    const closeModalBtn = document.getElementById('closeModal');
    const increaseWinCheck = document.getElementById('increaseWinCheck');
    const winPercentageContainer = document.getElementById('winPercentageContainer');
    const spinButton = document.getElementById('spinButton');
    const showSymbolValuesCheck = document.getElementById('showSymbolValuesCheck');

    const symbolValues = {
        "./img/moon-2.png": 50,
        "./img/crown.png": 25,
        "./img/blue-gem.png": 20,
        "./img/shooting-star.png": 15,
        "./img/moon.png": 10,
        "./img/pink-gem.png": 5,
        "./img/star.png": 2,
    };

    document.getElementById('valueMoon').value = symbolValues["./img/moon.png"];
    document.getElementById('valueStar').value = symbolValues["./img/star.png"];
    document.getElementById('valuePinkGem').value = symbolValues["./img/pink-gem.png"];
    document.getElementById('valueCrown').value = symbolValues["./img/crown.png"];
    document.getElementById('valueMoon2').value = symbolValues["./img/moon-2.png"];
    document.getElementById('valueBlueGem').value = symbolValues["./img/blue-gem.png"];
    document.getElementById('valueShootingStar').value = symbolValues["./img/shooting-star.png"];

    // Function to update symbol values from modal inputs
    function updateSymbolValues() {
        symbolValues["./img/moon.png"] = document.getElementById('valueMoon').value || "";
        symbolValues["./img/star.png"] = document.getElementById('valueStar').value || "";
        symbolValues["./img/pink-gem.png"] = document.getElementById('valuePinkGem').value || "";
        symbolValues["./img/crown.png"] = document.getElementById('valueCrown').value || "";
        symbolValues["./img/moon-2.png"] = document.getElementById('valueMoon2').value || "";
        symbolValues["./img/blue-gem.png"] = document.getElementById('valueBlueGem').value || "";
        symbolValues["./img/shooting-star.png"] = document.getElementById('valueShootingStar').value || "";
    }


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
        // renderSymbolValues();
        const symbolsContainer = reel.querySelector('.symbols');
        symbolsContainer.innerHTML = ''; // Clear existing symbols
        const symbolKeys = Object.keys(symbolValues); // Get all symbol paths

        for (let i = 0; i < numSymbols; i++) {
            const newSymbol = document.createElement('div');
            newSymbol.className = 'symbol';

            const img = document.createElement('img');
             // Select random symbol
            img.src = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
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
        const symbolKeys = Object.keys(symbolValues); // Get all symbol paths

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
            img.src = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
            newSymbol.appendChild(img);

            symbolsContainer.insertBefore(newSymbol, symbolsContainer.firstChild);
        }

        // Remove excess symbols to maintain reel size
        while (symbolsContainer.children.length > 21) {
            symbolsContainer.removeChild(symbolsContainer.lastChild);
        }

        // Winning symbol logic
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
        // renderSymbolValues();
        renderSymbolValues();
        buttons.forEach((btn) => btn.classList.remove('active'));
        const activeButton = document.getElementById(buttonId);
        activeButton?.classList.add('active');
    }

    function renderSymbolValues() {
        console.log("renderSymbolValues...");
        updateSymbolValues();
        const container = document.getElementById('symbolValuesContainerRight');
        container.innerHTML = ''; // Clear previous content
        const symbolKeys = Object.keys(symbolValues);

        symbolKeys.forEach((symbolSrc) => {
            const item = document.createElement('div');
            item.className = 'symbol-value-item';

            const hr = document.createElement('hr');

            const img = document.createElement('img');
            img.src = symbolSrc;

            const valueText = document.createElement('span');
            valueText.textContent = symbolValues[symbolSrc];

            item.appendChild(img);
            item.appendChild(hr);
            item.appendChild(valueText);
            container.appendChild(item);
        });

        // Set visibility based on the checkbox state
        container.style.display = showSymbolValuesCheck.checked ? 'flex' : 'none';
    }

    showSymbolValuesCheck.addEventListener('change', () => {
        const visibility = showSymbolValuesCheck.checked ? 'block' : 'none';
        document.querySelectorAll('.symbol-value').forEach((valueOverlay) => {
            valueOverlay.style.display = visibility;
        });
    });

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
        renderSymbolValues();
        configModal.style.display = 'none';
    });

    increaseWinCheck.addEventListener('change', () => {
        winPercentageContainer.style.display = increaseWinCheck.checked ? 'block' : 'none';
    });

    showSymbolValuesCheck.addEventListener('change', () => {
        const container = document.getElementById('symbolValuesContainerRight');
        container.style.display = showSymbolValuesCheck.checked ? 'flex' : 'none';
    });

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true;

        const activeButton = buttons.find((btn) => btn.classList.contains('active'));
        let winChance = 0;
        let isWinningSpin = false;
        let winningSymbol = null;

        const symbolKeys = Object.keys(symbolValues); // Get all symbol paths

        if (activeButton) {
            const { inputId } = optionsMap[activeButton.id];
            const inputElement = document.getElementById(inputId);
            if (inputElement) {
                winChance = parseInt(inputElement.value, 10) / 100;
            }

            isWinningSpin = Math.random() < winChance;

            if (isWinningSpin) {
                winningSymbol = symbolKeys[Math.floor(Math.random() * symbolKeys.length)];
            }
        }

        ["reel1", "reel2", "reel3"].forEach((id, index) => {
            const reel = document.getElementById(id);
            spinReel(reel, 3 + index * 0.5, isWinningSpin, winningSymbol);
        });

        setTimeout(() => {
            spinButton.disabled = false; // Re-enable after spin


            // Winning symbol logic
            if (isWinningSpin && winningSymbol) {

                const winningItem = document.querySelector(
                    `.symbol-value-item img[src="${winningSymbol}"]`
                )?.parentElement;

                // Flash the associated symbol-value-item
                if (winningItem) {
                    winningItem.classList.add('flash');
                    setTimeout(() => {
                        winningItem.classList.remove('flash');
                    }, 5000); // Stop flashing after 5 seconds
                }

                // Overlay winning symbol on the reels
                const overlay = document.createElement('div');
                overlay.className = 'winning-symbol-overlay';

                const overlayImg = document.createElement('img');
                overlayImg.src = winningSymbol;

                overlay.appendChild(overlayImg);
                document.body.appendChild(overlay);

                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 3000); // Remove overlay after 3 seconds
            }
        }, 3*3*0.5*1000);
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
        renderSymbolValues();
    });

    activateButton('newMoonButton'); // Set default active button
});


