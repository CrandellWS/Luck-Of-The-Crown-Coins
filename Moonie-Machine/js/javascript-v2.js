
let spinSound;
let stopSound;

let openModalBtn;
let configModal;
let closeModalBtn;
let spinButton;
let showSymbolValuesCheck;

let buttons;

const symbolValuesBig = {
    "./img/moon-2.png": 40,
    "./img/crown.png": 35,
    "./img/blue-gem.png": 30,
    "./img/shooting-star.png": 25,
    "./img/moon.png": 20,
    "./img/pink-gem.png": 15,
    "./img/star.png": 14,
};

const symbolValuesSmall = {
    "./img/moon-2.png": 20,
    "./img/crown.png": 15,
    "./img/blue-gem.png": 10,
    "./img/shooting-star.png": 7,
    "./img/moon.png": 5,
    "./img/pink-gem.png": 4,
    "./img/star.png": 2,
};

const evenChance = 14.285714286;
const symbolWinChanceBig = {
    "./img/moon-2.png": evenChance,
    "./img/crown.png": evenChance,
    "./img/blue-gem.png": evenChance,
    "./img/shooting-star.png": evenChance,
    "./img/moon.png": evenChance,
    "./img/pink-gem.png": evenChance,
    "./img/star.png": evenChance,
    "./img/loser.png": 0,
};

const symbolWinChanceSmall = {
    "./img/moon-2.png": evenChance,
    "./img/crown.png": evenChance,
    "./img/blue-gem.png": evenChance,
    "./img/shooting-star.png": evenChance,
    "./img/moon.png": evenChance,
    "./img/pink-gem.png": evenChance,
    "./img/star.png": evenChance,
    "./img/loser.png": 0,
};

const optionsMap = {
    bigMoonieButton: { inputId: 'bigMoonieButton' },
    smallMoonieButton: { inputId: 'smallMoonieButton' }
};


document.addEventListener('DOMContentLoaded', () => {

// Setting Big Values
    document.getElementById('bigValueMoon2').value = symbolValuesBig["./img/moon-2.png"];
    document.getElementById('bigWinPercentageMoon2').value = symbolWinChanceBig["./img/moon-2.png"];

    document.getElementById('bigValueCrown').value = symbolValuesBig["./img/crown.png"];
    document.getElementById('bigWinPercentageCrown').value = symbolWinChanceBig["./img/crown.png"];

    document.getElementById('bigValueBlueGem').value = symbolValuesBig["./img/blue-gem.png"];
    document.getElementById('bigWinPercentageBlueGem').value = symbolWinChanceBig["./img/blue-gem.png"];

    document.getElementById('bigValueShootingStar').value = symbolValuesBig["./img/shooting-star.png"];
    document.getElementById('bigWinPercentageShootingStar').value = symbolWinChanceBig["./img/shooting-star.png"];

    document.getElementById('bigValueMoon').value = symbolValuesBig["./img/moon.png"];
    document.getElementById('bigWinPercentageMoon').value = symbolWinChanceBig["./img/moon.png"];

    document.getElementById('bigValuePinkGem').value = symbolValuesBig["./img/pink-gem.png"];
    document.getElementById('bigWinPercentagePinkGem').value = symbolWinChanceBig["./img/pink-gem.png"];

    document.getElementById('bigValueStar').value = symbolValuesBig["./img/star.png"];
    document.getElementById('bigWinPercentageStar').value = symbolWinChanceBig["./img/star.png"];

    document.getElementById('bigValueLoser').value = symbolValuesBig["./img/loser.png"];
    document.getElementById('bigWinPercentageLoser').value = symbolWinChanceBig["./img/loser.png"];

// Setting Small Values
    document.getElementById('smallValueMoon2').value = symbolValuesSmall["./img/moon-2.png"];
    document.getElementById('smallWinPercentageMoon2').value = symbolWinChanceSmall["./img/moon-2.png"];

    document.getElementById('smallValueCrown').value = symbolValuesSmall["./img/crown.png"];
    document.getElementById('smallWinPercentageCrown').value = symbolWinChanceSmall["./img/crown.png"];

    document.getElementById('smallValueBlueGem').value = symbolValuesSmall["./img/blue-gem.png"];
    document.getElementById('smallWinPercentageBlueGem').value = symbolWinChanceSmall["./img/blue-gem.png"];

    document.getElementById('smallValueShootingStar').value = symbolValuesSmall["./img/shooting-star.png"];
    document.getElementById('smallWinPercentageShootingStar').value = symbolWinChanceSmall["./img/shooting-star.png"];

    document.getElementById('smallValueMoon').value = symbolValuesSmall["./img/moon.png"];
    document.getElementById('smallWinPercentageMoon').value = symbolWinChanceSmall["./img/moon.png"];

    document.getElementById('smallValuePinkGem').value = symbolValuesSmall["./img/pink-gem.png"];
    document.getElementById('smallWinPercentagePinkGem').value = symbolWinChanceSmall["./img/pink-gem.png"];

    document.getElementById('smallValueStar').value = symbolValuesSmall["./img/star.png"];
    document.getElementById('smallWinPercentageStar').value = symbolWinChanceSmall["./img/star.png"];

    document.getElementById('smallValueLoser').value = symbolValuesSmall["./img/loser.png"];
    document.getElementById('smallWinPercentageLoser').value = symbolWinChanceSmall["./img/loser.png"];

    // Assign values to the variables after DOM has loaded
    spinSound = new Audio('audio/394101__deleted_user_6479820__single-swish-5.mp3');
    stopSound = new Audio('audio/202314__7778__click-1.mp3');

    openModalBtn = document.getElementById('openModal');
    configModal = document.getElementById('configModal');
    closeModalBtn = document.getElementById('closeModal');
    spinButton = document.getElementById('spinButton');
    showSymbolValuesCheck = document.getElementById('showSymbolValuesCheck');

    buttons = Object.keys(optionsMap)
        .map((id) => document.getElementById(id))
        .filter((button) => button !== null);

    // Initialize reels with default symbols
    ["reel1", "reel2", "reel3"].forEach((id) => {
        const reel = document.getElementById(id);
        generateInitialSymbols(reel);
    });

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


    showSymbolValuesCheck.addEventListener('change', () => {
        const container = document.getElementById('symbolValuesContainerRight');
        container.style.display = showSymbolValuesCheck.checked ? 'flex' : 'none';
    });

    spinButton.addEventListener('click', () => {

        spinButton.disabled = true;

        const activeButton = buttons.find((btn) => btn.classList.contains('active'));
        let winningSymbol = null;
        let symbolValuesToUse = null;
        let symbolChancesToUse = null;
        if (activeButton) {
            const isBigSet = activeButton.id.includes('big');
            symbolChancesToUse = isBigSet ? symbolWinChanceBig : symbolWinChanceSmall;
            symbolValuesToUse = isBigSet ? symbolValuesBig : symbolValuesSmall;
            // Select a random weighted symbol
            winningSymbol = getRandomWeightedSymbol(symbolChancesToUse);
        }

        // Spin the reels
        ["reel1", "reel2", "reel3"].forEach((id, index) => {
            const reel = document.getElementById(id);
            spinReel(reel, 3 + index * 0.5, winningSymbol);
        });

        setTimeout(() => {
            spinButton.disabled = false; // Re-enable after spin

            // Winning symbol logic
            if (winningSymbol) {

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
                const scVal = symbolValuesToUse[winningSymbol]; // Use the correct symbol values (big or small)

                // Create text above the image
                const overlayText = document.createElement('h1');
                overlayText.innerHTML = 'Win With Ash! <br> ' + scVal + ' SC';
                overlayText.className = 'overlay-text';
                overlay.appendChild(overlayText);

                // Create the image element
                const overlayImg = document.createElement('img');
                overlayImg.src = winningSymbol;
                overlayImg.className = 'animated-symbol';
                overlay.appendChild(overlayImg);

                // Add overlay to the document
                document.body.appendChild(overlay);

                // Start animation for the image
                setTimeout(() => {
                    overlayImg.classList.add('grow');
                }, 10); // Add a slight delay to ensure animation applies

                // Remove overlay after 3 seconds
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 4000); // 1 second growth + 3 seconds display
            }
        }, 3 * 3 * 0.5 * 1000);
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

    activateButton('smallMoonieButton'); // Set default active button
});


// Function to update symbol values and win percentages from modal inputs
function updateSymbolValues() {
    // Update Big Symbol Values and Win Percentages
    symbolValuesBig["./img/moon-2.png"] = document.getElementById('bigValueMoon2').value || "";
    symbolValuesBig["./img/crown.png"] = document.getElementById('bigValueCrown').value || "";
    symbolValuesBig["./img/blue-gem.png"] = document.getElementById('bigValueBlueGem').value || "";
    symbolValuesBig["./img/shooting-star.png"] = document.getElementById('bigValueShootingStar').value || "";
    symbolValuesBig["./img/moon.png"] = document.getElementById('bigValueMoon').value || "";
    symbolValuesBig["./img/pink-gem.png"] = document.getElementById('bigValuePinkGem').value || "";
    symbolValuesBig["./img/star.png"] = document.getElementById('bigValueStar').value || "";

    symbolWinChanceBig["./img/moon-2.png"] = document.getElementById('bigWinPercentageMoon2').value || "";
    symbolWinChanceBig["./img/crown.png"] = document.getElementById('bigWinPercentageCrown').value || "";
    symbolWinChanceBig["./img/blue-gem.png"] = document.getElementById('bigWinPercentageBlueGem').value || "";
    symbolWinChanceBig["./img/shooting-star.png"] = document.getElementById('bigWinPercentageShootingStar').value || "";
    symbolWinChanceBig["./img/moon.png"] = document.getElementById('bigWinPercentageMoon').value || "";
    symbolWinChanceBig["./img/pink-gem.png"] = document.getElementById('bigWinPercentagePinkGem').value || "";
    symbolWinChanceBig["./img/star.png"] = document.getElementById('bigWinPercentageStar').value || "";
    symbolWinChanceBig["./img/loser.png"] = document.getElementById('bigWinPercentageLoser').value || ""; // Add for Big Loser

    // Update Small Symbol Values and Win Percentages
    symbolValuesSmall["./img/moon-2.png"] = document.getElementById('smallValueMoon2').value || "";
    symbolValuesSmall["./img/crown.png"] = document.getElementById('smallValueCrown').value || "";
    symbolValuesSmall["./img/blue-gem.png"] = document.getElementById('smallValueBlueGem').value || "";
    symbolValuesSmall["./img/shooting-star.png"] = document.getElementById('smallValueShootingStar').value || "";
    symbolValuesSmall["./img/moon.png"] = document.getElementById('smallValueMoon').value || "";
    symbolValuesSmall["./img/pink-gem.png"] = document.getElementById('smallValuePinkGem').value || "";
    symbolValuesSmall["./img/star.png"] = document.getElementById('smallValueStar').value || "";

    symbolWinChanceSmall["./img/moon-2.png"] = document.getElementById('smallWinPercentageMoon2').value || "";
    symbolWinChanceSmall["./img/crown.png"] = document.getElementById('smallWinPercentageCrown').value || "";
    symbolWinChanceSmall["./img/blue-gem.png"] = document.getElementById('smallWinPercentageBlueGem').value || "";
    symbolWinChanceSmall["./img/shooting-star.png"] = document.getElementById('smallWinPercentageShootingStar').value || "";
    symbolWinChanceSmall["./img/moon.png"] = document.getElementById('smallWinPercentageMoon').value || "";
    symbolWinChanceSmall["./img/pink-gem.png"] = document.getElementById('smallWinPercentagePinkGem').value || "";
    symbolWinChanceSmall["./img/star.png"] = document.getElementById('smallWinPercentageStar').value || "";
    symbolWinChanceSmall["./img/loser.png"] = document.getElementById('smallWinPercentageLoser').value || ""; // Add for Small Loser
}


// Generate symbols for a reel
// Generate symbols for a reel
function generateInitialSymbols(reel, numSymbols = 21) {
    // Get the active button (to determine whether to use big or small symbols)
    const activeButton = buttons.find((btn) => btn.classList.contains('active'));
    const isBigSet = activeButton && activeButton.id.includes('big'); // Check if it's a "big" button

    // Select symbol set based on active button
    const symbolValuesToUse = isBigSet ? symbolValuesBig : symbolValuesSmall;

    // Get all symbol paths from the selected symbol values
    const symbolKeys = Object.keys(symbolValuesToUse);

    // Get the symbols container inside the reel
    const symbolsContainer = reel.querySelector('.symbols');
    symbolsContainer.innerHTML = ''; // Clear existing symbols

    for (let i = 0; i < numSymbols; i++) {
        const newSymbol = document.createElement('div');
        newSymbol.className = 'symbol';

        const img = document.createElement('img');
        // Select random symbol from the active set
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

function spinReel(reel, duration, winningSymbol) {
    updateSymbolValues();
    const symbolsContainer = reel.querySelector('.symbols');

    // Determine which symbol set to use based on active button
    const activeButton = buttons.find((btn) => btn.classList.contains('active'));
    const isBigSet = activeButton && activeButton.id.includes('big');
    const symbolValuesToUse = isBigSet ? symbolValuesBig : symbolValuesSmall;
    const symbolKeys = Object.keys(symbolValuesToUse); // Get all symbol paths for the correct set

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
    if (winningSymbol) {
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

// Activate a button
function activateButton(buttonId) {
    buttons.forEach((btn) => btn.classList.remove('active'));
    const activeButton = document.getElementById(buttonId);
    activeButton?.classList.add('active');
    renderSymbolValues();
}

// Function to render symbol values based on active button (big or small)
function renderSymbolValues() {
    updateSymbolValues();
    console.log("renderSymbolValues...");

    // Determine which set of symbol values to use (big or small) based on the active button
    const activeButton = buttons.find((btn) => btn.classList.contains('active'));

    console.log("activeButton... " + activeButton );

    const isBigSet = activeButton && activeButton.id.includes('big'); // Check if it's a "big" button

    console.log("isBigSet... " + isBigSet );
    // Select symbol values based on the active button (big or small)
    const symbolValuesToRender = isBigSet ? symbolValuesBig : symbolValuesSmall;

    // Update the symbol values container
    const container = document.getElementById('symbolValuesContainerRight');
    container.innerHTML = ''; // Clear previous content

    const symbolKeys = Object.keys(symbolValuesToRender);

    console.log("symbolValuesToRender... " + symbolValuesToRender);
    console.log("symbolValuesBig... " + symbolValuesBig);
    console.log("symbolValuesSmall... " + symbolValuesSmall);
    console.log("symbolKeys... " + symbolKeys);
    symbolKeys.forEach((symbolSrc) => {
        console.log("symbolSrc... " + symbolSrc);
        const item = document.createElement('div');
        item.className = 'symbol-value-item';

        const hr = document.createElement('hr');

        const img = document.createElement('img');
        img.src = symbolSrc;

        const valueText = document.createElement('span');
        valueText.textContent = symbolValuesToRender[symbolSrc];

        item.appendChild(img);
        item.appendChild(hr);
        item.appendChild(valueText);
        container.appendChild(item);
    });

    // Set visibility based on the checkbox state
    container.style.display = showSymbolValuesCheck.checked ? 'flex' : 'none';
}

function getRandomWeightedSymbol(symbolWinChances) {
    const weightedPool = [];

    // Create a weighted pool based on win chances
    for (const [symbol, chance] of Object.entries(symbolWinChances)) {
        const weight = Math.floor(chance * 100); // Convert percentage to a whole number
        for (let i = 0; i < weight; i++) {
            weightedPool.push(symbol);
        }
    }

    // Randomly select from the weighted pool
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}