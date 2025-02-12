
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
    "./img/rob.gif": "Bonus",
};

const symbolValuesSmall = {
    "./img/moon-2.png": 20,
    "./img/crown.png": 15,
    "./img/blue-gem.png": 10,
    "./img/shooting-star.png": 7,
    "./img/moon.png": 5,
    "./img/pink-gem.png": 4,
    "./img/star.png": 2,
    "./img/rob.gif": "Bonus",
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
    "./img/rob.gif": 0,
};

const symbolWinChanceSmall = {
    "./img/moon-2.png": evenChance,
    "./img/crown.png": evenChance,
    "./img/blue-gem.png": evenChance,
    "./img/shooting-star.png": evenChance,
    "./img/moon.png": evenChance,
    "./img/pink-gem.png": evenChance,
    "./img/star.png": evenChance,
    "./img/rob.gif": 0,
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

    document.getElementById('bigValueRob').value = symbolValuesBig["./img/rob.gif"];
    document.getElementById('bigWinPercentageRob').value = symbolWinChanceBig["./img/rob.gif"];

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

    document.getElementById('smallValueRob').value = symbolValuesSmall["./img/rob.gif"];
    document.getElementById('smallWinPercentageRob').value = symbolWinChanceSmall["./img/rob.gif"];

    // Assign values to the variables after DOM has loaded
    spinSound = new Audio('audio/394101__deleted_user_6479820__single-swish-5.mp3');
    stopSound = new Audio('audio/202314__7778__click-1.mp3');

    openModalBtn = document.getElementById('openSpinConfigModal');
    configModal = document.getElementById('spinConfigModal');
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

    document.getElementById('openBonusConfigModal').addEventListener('click', () => {
        document.getElementById('bonusConfigModal').style.display = 'block';
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

                    // Check if the winning symbol is "Rob's Bonus" and open the game modal
                    if (winningSymbol === "./img/rob.gif") {
                        openGameModal();
                    }
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

// Initialize the game logic when needed
    initLuckOfTheCrownsGame();
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
    symbolValuesBig["./img/rob.gif"] = document.getElementById('bigValueRob').value || "";

    symbolWinChanceBig["./img/moon-2.png"] = document.getElementById('bigWinPercentageMoon2').value || "";
    symbolWinChanceBig["./img/crown.png"] = document.getElementById('bigWinPercentageCrown').value || "";
    symbolWinChanceBig["./img/blue-gem.png"] = document.getElementById('bigWinPercentageBlueGem').value || "";
    symbolWinChanceBig["./img/shooting-star.png"] = document.getElementById('bigWinPercentageShootingStar').value || "";
    symbolWinChanceBig["./img/moon.png"] = document.getElementById('bigWinPercentageMoon').value || "";
    symbolWinChanceBig["./img/pink-gem.png"] = document.getElementById('bigWinPercentagePinkGem').value || "";
    symbolWinChanceBig["./img/star.png"] = document.getElementById('bigWinPercentageStar').value || "";
    symbolWinChanceBig["./img/rob.gif"] = document.getElementById('bigWinPercentageRob').value || "";

    // Update Small Symbol Values and Win Percentages
    symbolValuesSmall["./img/moon-2.png"] = document.getElementById('smallValueMoon2').value || "";
    symbolValuesSmall["./img/crown.png"] = document.getElementById('smallValueCrown').value || "";
    symbolValuesSmall["./img/blue-gem.png"] = document.getElementById('smallValueBlueGem').value || "";
    symbolValuesSmall["./img/shooting-star.png"] = document.getElementById('smallValueShootingStar').value || "";
    symbolValuesSmall["./img/moon.png"] = document.getElementById('smallValueMoon').value || "";
    symbolValuesSmall["./img/pink-gem.png"] = document.getElementById('smallValuePinkGem').value || "";
    symbolValuesSmall["./img/star.png"] = document.getElementById('smallValueStar').value || "";
    symbolValuesSmall["./img/rob.gif"] = document.getElementById('smallValueRob').value || "";

    symbolWinChanceSmall["./img/moon-2.png"] = document.getElementById('smallWinPercentageMoon2').value || "";
    symbolWinChanceSmall["./img/crown.png"] = document.getElementById('smallWinPercentageCrown').value || "";
    symbolWinChanceSmall["./img/blue-gem.png"] = document.getElementById('smallWinPercentageBlueGem').value || "";
    symbolWinChanceSmall["./img/shooting-star.png"] = document.getElementById('smallWinPercentageShootingStar').value || "";
    symbolWinChanceSmall["./img/moon.png"] = document.getElementById('smallWinPercentageMoon').value || "";
    symbolWinChanceSmall["./img/pink-gem.png"] = document.getElementById('smallWinPercentagePinkGem').value || "";
    symbolWinChanceSmall["./img/star.png"] = document.getElementById('smallWinPercentageStar').value || "";
    symbolWinChanceSmall["./img/rob.gif"] = document.getElementById('smallWinPercentageRob').value || "";
}


// Generate symbols for a reel
function generateInitialSymbols(reel, numSymbols = 21) {
    // Get the active button (to determine whether to use big or small symbols)
    const activeButton = buttons.find((btn) => btn.classList.contains('active'));
    const isBigSet = activeButton && activeButton.id.includes('big'); // Check if it's a "big" button

    // Select symbol set based on active button
    const symbolValuesToUse = isBigSet ? symbolValuesBig : symbolValuesSmall;
    const symbolWinChancesToUse = isBigSet ? symbolWinChanceBig : symbolWinChanceSmall;

    // Get all symbol paths that have a win chance greater than 0%
    const symbolKeys = Object.keys(symbolValuesToUse).filter(symbol => symbolWinChancesToUse[symbol] > 0);

    // Get the symbols container inside the reel
    const symbolsContainer = reel.querySelector('.symbols');
    symbolsContainer.innerHTML = ''; // Clear existing symbols

    for (let i = 0; i < numSymbols; i++) {
        const newSymbol = document.createElement('div');
        newSymbol.className = 'symbol';

        const img = document.createElement('img');
        // Select random symbol from the filtered set
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
    const symbolWinChancesToUse = isBigSet ? symbolWinChanceBig : symbolWinChanceSmall;

    // Get all valid symbols that have a win chance > 0%
    const validSymbols = Object.keys(symbolValuesToUse).filter(symbol => symbolWinChancesToUse[symbol] > 0);

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
        img.src = validSymbols[Math.floor(Math.random() * validSymbols.length)]; // Only choose from valid symbols
        newSymbol.appendChild(img);

        symbolsContainer.insertBefore(newSymbol, symbolsContainer.firstChild);
    }

    // Remove excess symbols to maintain reel size
    while (symbolsContainer.children.length > 21) {
        symbolsContainer.removeChild(symbolsContainer.lastChild);
    }

    // Winning symbol logic
    if (winningSymbol && validSymbols.includes(winningSymbol)) {
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

        if(symbolSrc === "./img/rob.gif")
            return;

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
        if (chance > 0) { // Ignore symbols with 0% chance
            const weight = Math.floor(chance * 100); // Convert percentage to a whole number
            for (let i = 0; i < weight; i++) {
                weightedPool.push(symbol);
            }
        }
    }

    // If no valid symbols exist (edge case), return null or a fallback symbol
    if (weightedPool.length === 0) {
        console.warn("No valid symbols to choose from!");
        return null;
    }

    // Randomly select from the weighted pool
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}



function initLuckOfTheCrownsGame() {
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function openGameModal() {
        document.getElementById('gameModal').style.display = 'block';

        const newPrizes = [];
        for (let i = 0; i < 20; i++) {
            newPrizes.push(parseFloat(document.getElementById(`prize${i}`).value) || 0);
        }
        generateGameBoxes(newPrizes);
    }

    function closeGameModal() {
        document.getElementById('gameModal').style.display = 'none';
    }


    function generateGameBoxes(prizes) {
        const boxContainer = document.getElementById('box-container');
        boxContainer.innerHTML = '';
        const losingPicks = parseInt(document.getElementById('losingPicks').value) || 0;

        console.log(prizes)
        let shuffledPrizes = [...prizes].sort(() => Math.random() - 0.5);

        // Replace some values with broken-moon images
        for (let i = 0; i < losingPicks; i++) {
            shuffledPrizes[i] = "broken-moon.png";
        }

        let totalScore = 0;

        shuffledPrizes.forEach((prize, i) => {
            const box = document.createElement('div');
            box.classList.add('luck-crowns-box');

            const numberCircle = document.createElement('div');
            numberCircle.classList.add('luck-crowns-box-number');
            numberCircle.textContent = i + 1;
            box.appendChild(numberCircle);

            box.addEventListener('click', () => {
                if (!box.classList.contains('selected')) {
                    if (prize === "broken-moon.png") {
                        box.innerHTML = `<img src="./broken-moon.png" alt="Losing Pick" width="100%">`;
                    } else {
                        box.innerHTML = `${prize} SC`;
                        totalScore += prize;
                        document.getElementById("totalScore").textContent = `Total: ${totalScore.toFixed(0)} SC`;
                    }
                    box.classList.add('selected');
                }
            });
            boxContainer.appendChild(box);
        });
    }

    // Expose functions to global scope if needed
    window.openGameModal = openGameModal;
    window.closeGameModal = closeGameModal;
    window.generateGameBoxes = generateGameBoxes;


    const prizeValues = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 4, 5, 5, 10];
    const prizesContainer = document.getElementById("prizesContainer");

    // Generate 20 input fields for prize values
    prizeValues.forEach((value, index) => {
        const div = document.createElement("div");
        div.classList.add("config-item");
        div.innerHTML = `
                <label for="prize${index}">Prize ${index + 1}:</label>
                <input type="number" id="prize${index}" value="${value}" step="0.01" min="0">
            `;
        prizesContainer.appendChild(div);
    });


    document.getElementById("saveBonusConfig").addEventListener("click", function () {
        const newPrizes = [];
        for (let i = 0; i < 20; i++) {
            newPrizes.push(parseFloat(document.getElementById(`prize${i}`).value) || 0);
        }
        generateGameBoxes(newPrizes);
        document.getElementById('bonusConfigModal').style.display = 'none';
    });

}
