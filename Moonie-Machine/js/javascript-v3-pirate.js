
let spinSound;
let stopSound;

let openModalBtn;
let configModal;
let closeModalBtn;
let spinButton;
let showSymbolValuesCheck;

let buttons;

const symbolValuesBig = {
    "./img/pink-diamond.png": 40,
    "./img/pirate-crown.png": 35,
    "./img/ruby-ring.png": 30,
    "./img/pink-pirate-hat.png": 25,
    "./img/gold-coin.png": 20,
    "./img/silver-coin.png": 15,
    "./img/copper-coin.png": 14,
    "./img/chest-closed.png": "Bonus",
};

const symbolValuesSmall = {
    "./img/pink-diamond.png": 20,
    "./img/pirate-crown.png": 15,
    "./img/ruby-ring.png": 10,
    "./img/pink-pirate-hat.png": 7,
    "./img/gold-coin.png": 5,
    "./img/silver-coin.png": 4,
    "./img/copper-coin.png": 2,
    "./img/chest-closed.png": "Bonus",
};

const evenChance = 14.285714286;
const symbolWinChanceBig = {
    "./img/pink-diamond.png": evenChance,
    "./img/pirate-crown.png": evenChance,
    "./img/ruby-ring.png": evenChance,
    "./img/pink-pirate-hat.png": evenChance,
    "./img/gold-coin.png": evenChance,
    "./img/silver-coin.png": evenChance,
    "./img/copper-coin.png": evenChance,
    "./img/chest-closed.png": 0,
};

const symbolWinChanceSmall = {
    "./img/pink-diamond.png": evenChance,
    "./img/pirate-crown.png": evenChance,
    "./img/ruby-ring.png": evenChance,
    "./img/pink-pirate-hat.png": evenChance,
    "./img/gold-coin.png": evenChance,
    "./img/silver-coin.png": evenChance,
    "./img/copper-coin.png": evenChance,
    "./img/chest-closed.png": 0,
};

const optionsMap = {
    bigMoonieButton: { inputId: 'bigMoonieButton' },
    smallMoonieButton: { inputId: 'smallMoonieButton' }
};


document.addEventListener('DOMContentLoaded', () => {

// Setting Big Values
    document.getElementById('bigValueMoon2').value = symbolValuesBig["./img/pink-diamond.png"];
    document.getElementById('bigWinPercentageMoon2').value = symbolWinChanceBig["./img/pink-diamond.png"];

    document.getElementById('bigValueCrown').value = symbolValuesBig["./img/pirate-crown.png"];
    document.getElementById('bigWinPercentageCrown').value = symbolWinChanceBig["./img/pirate-crown.png"];

    document.getElementById('bigValueBlueGem').value = symbolValuesBig["./img/ruby-ring.png"];
    document.getElementById('bigWinPercentageBlueGem').value = symbolWinChanceBig["./img/ruby-ring.png"];

    document.getElementById('bigValueShootingStar').value = symbolValuesBig["./img/pink-pirate-hat.png"];
    document.getElementById('bigWinPercentageShootingStar').value = symbolWinChanceBig["./img/pink-pirate-hat.png"];

    document.getElementById('bigValueMoon').value = symbolValuesBig["./img/gold-coin.png"];
    document.getElementById('bigWinPercentageMoon').value = symbolWinChanceBig["./img/gold-coin.png"];

    document.getElementById('bigValuePinkGem').value = symbolValuesBig["./img/silver-coin.png"];
    document.getElementById('bigWinPercentagePinkGem').value = symbolWinChanceBig["./img/silver-coin.png"];

    document.getElementById('bigValueStar').value = symbolValuesBig["./img/copper-coin.png"];
    document.getElementById('bigWinPercentageStar').value = symbolWinChanceBig["./img/copper-coin.png"];

    document.getElementById('bigValueRob').value = symbolValuesBig["./img/chest-closed.png"];
    document.getElementById('bigWinPercentageRob').value = symbolWinChanceBig["./img/chest-closed.png"];

// Setting Small Values
    document.getElementById('smallValueMoon2').value = symbolValuesSmall["./img/pink-diamond.png"];
    document.getElementById('smallWinPercentageMoon2').value = symbolWinChanceSmall["./img/pink-diamond.png"];

    document.getElementById('smallValueCrown').value = symbolValuesSmall["./img/pirate-crown.png"];
    document.getElementById('smallWinPercentageCrown').value = symbolWinChanceSmall["./img/pirate-crown.png"];

    document.getElementById('smallValueBlueGem').value = symbolValuesSmall["./img/ruby-ring.png"];
    document.getElementById('smallWinPercentageBlueGem').value = symbolWinChanceSmall["./img/ruby-ring.png"];

    document.getElementById('smallValueShootingStar').value = symbolValuesSmall["./img/pink-pirate-hat.png"];
    document.getElementById('smallWinPercentageShootingStar').value = symbolWinChanceSmall["./img/pink-pirate-hat.png"];

    document.getElementById('smallValueMoon').value = symbolValuesSmall["./img/gold-coin.png"];
    document.getElementById('smallWinPercentageMoon').value = symbolWinChanceSmall["./img/gold-coin.png"];

    document.getElementById('smallValuePinkGem').value = symbolValuesSmall["./img/silver-coin.png"];
    document.getElementById('smallWinPercentagePinkGem').value = symbolWinChanceSmall["./img/silver-coin.png"];

    document.getElementById('smallValueStar').value = symbolValuesSmall["./img/copper-coin.png"];
    document.getElementById('smallWinPercentageStar').value = symbolWinChanceSmall["./img/copper-coin.png"];

    document.getElementById('smallValueRob').value = symbolValuesSmall["./img/chest-closed.png"];
    document.getElementById('smallWinPercentageRob').value = symbolWinChanceSmall["./img/chest-closed.png"];

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
                    if (winningSymbol === "./img/chest-closed.png") {
                        openGameModal();

                        document.getElementById("totalScore").textContent = `Total: 0 SC`;
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
    symbolValuesBig["./img/pink-diamond.png"] = document.getElementById('bigValueMoon2').value || "";
    symbolValuesBig["./img/pirate-crown.png"] = document.getElementById('bigValueCrown').value || "";
    symbolValuesBig["./img/ruby-ring.png"] = document.getElementById('bigValueBlueGem').value || "";
    symbolValuesBig["./img/pink-pirate-hat.png"] = document.getElementById('bigValueShootingStar').value || "";
    symbolValuesBig["./img/gold-coin.png"] = document.getElementById('bigValueMoon').value || "";
    symbolValuesBig["./img/silver-coin.png"] = document.getElementById('bigValuePinkGem').value || "";
    symbolValuesBig["./img/copper-coin.png"] = document.getElementById('bigValueStar').value || "";
    symbolValuesBig["./img/chest-closed.png"] = document.getElementById('bigValueRob').value || "";

    symbolWinChanceBig["./img/pink-diamond.png"] = document.getElementById('bigWinPercentageMoon2').value || "";
    symbolWinChanceBig["./img/pirate-crown.png"] = document.getElementById('bigWinPercentageCrown').value || "";
    symbolWinChanceBig["./img/ruby-ring.png"] = document.getElementById('bigWinPercentageBlueGem').value || "";
    symbolWinChanceBig["./img/pink-pirate-hat.png"] = document.getElementById('bigWinPercentageShootingStar').value || "";
    symbolWinChanceBig["./img/gold-coin.png"] = document.getElementById('bigWinPercentageMoon').value || "";
    symbolWinChanceBig["./img/silver-coin.png"] = document.getElementById('bigWinPercentagePinkGem').value || "";
    symbolWinChanceBig["./img/copper-coin.png"] = document.getElementById('bigWinPercentageStar').value || "";
    symbolWinChanceBig["./img/chest-closed.png"] = document.getElementById('bigWinPercentageRob').value || "";

    // Update Small Symbol Values and Win Percentages
    symbolValuesSmall["./img/pink-diamond.png"] = document.getElementById('smallValueMoon2').value || "";
    symbolValuesSmall["./img/pirate-crown.png"] = document.getElementById('smallValueCrown').value || "";
    symbolValuesSmall["./img/ruby-ring.png"] = document.getElementById('smallValueBlueGem').value || "";
    symbolValuesSmall["./img/pink-pirate-hat.png"] = document.getElementById('smallValueShootingStar').value || "";
    symbolValuesSmall["./img/gold-coin.png"] = document.getElementById('smallValueMoon').value || "";
    symbolValuesSmall["./img/silver-coin.png"] = document.getElementById('smallValuePinkGem').value || "";
    symbolValuesSmall["./img/copper-coin.png"] = document.getElementById('smallValueStar').value || "";
    symbolValuesSmall["./img/chest-closed.png"] = document.getElementById('smallValueRob').value || "";

    symbolWinChanceSmall["./img/pink-diamond.png"] = document.getElementById('smallWinPercentageMoon2').value || "";
    symbolWinChanceSmall["./img/pirate-crown.png"] = document.getElementById('smallWinPercentageCrown').value || "";
    symbolWinChanceSmall["./img/ruby-ring.png"] = document.getElementById('smallWinPercentageBlueGem').value || "";
    symbolWinChanceSmall["./img/pink-pirate-hat.png"] = document.getElementById('smallWinPercentageShootingStar').value || "";
    symbolWinChanceSmall["./img/gold-coin.png"] = document.getElementById('smallWinPercentageMoon').value || "";
    symbolWinChanceSmall["./img/silver-coin.png"] = document.getElementById('smallWinPercentagePinkGem').value || "";
    symbolWinChanceSmall["./img/copper-coin.png"] = document.getElementById('smallWinPercentageStar').value || "";
    symbolWinChanceSmall["./img/chest-closed.png"] = document.getElementById('smallWinPercentageRob').value || "";
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

        if(symbolSrc === "./img/chest-closed.png")
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
    function openGameModal() {
        document.getElementById('gameModal').style.display = 'block';

        const activeButton = document.querySelector('.button-reel .active');
        const isBigSet = activeButton && activeButton.id.includes('big');

        const newPrizes = [];
        for (let i = 0; i < 20; i++) {
            const prizeInputId = isBigSet ? `bigPrize${i}` : `smallPrize${i}`;
            console.log("prizeInputId: " + prizeInputId);
            newPrizes.push(parseFloat(document.getElementById(prizeInputId).value) || 0);
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

        let shuffledPrizes = [...prizes].sort(() => Math.random() - 0.5);

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
                        var prizeText = `${prize} SC`;
                        totalScore += prize;
                        document.getElementById("totalScore").textContent = `Total: ${totalScore.toFixed(0)} SC`;

                        var innerHTML = `<img src="./img/chest-open.png" alt="Winning Pick" width="100%">`;
                        innerHTML += `<div class="luck-crowns-box-win-amount">${prizeText}</div>`;
                        box.innerHTML = innerHTML;
                    }
                    box.classList.add('selected');
                }
            });
            boxContainer.appendChild(box);
        });
    }

    // Expose functions to global scope
    window.openGameModal = openGameModal;
    window.closeGameModal = closeGameModal;
    window.generateGameBoxes = generateGameBoxes;

    const bigPrizeValues = [2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 5, 5, 5, 5, 10, 10, 10, 15, 15];
    const smallPrizeValues = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 4, 4, 4, 4, 5, 5, 5, 10, 10];

    const prizesContainer = document.getElementById("prizesContainer");
    const prizeConfigWrapper = document.createElement("div");
    prizeConfigWrapper.classList.add("prize-config-wrapper");

    const bigPrizesDiv = document.createElement("div");
    bigPrizesDiv.classList.add("prize-column");
    bigPrizesDiv.innerHTML = `<h3>Big Prizes</h3>`;

    const smallPrizesDiv = document.createElement("div");
    smallPrizesDiv.classList.add("prize-column");
    smallPrizesDiv.innerHTML = `<h3>Small Prizes</h3>`;

    // Generate 20 input fields for big and small prize values
    bigPrizeValues.forEach((value, index) => {
        const div = document.createElement("div");
        div.classList.add("config-item");
        div.innerHTML = `
            <label for="bigPrize${index}">Big Prize ${index + 1}:</label>
            <input type="number" id="bigPrize${index}" value="${value}" step="0.01" min="0">
        `;
        bigPrizesDiv.appendChild(div);
    });

    smallPrizeValues.forEach((value, index) => {
        const div = document.createElement("div");
        div.classList.add("config-item");
        div.innerHTML = `
            <label for="smallPrize${index}">Small Prize ${index + 1}:</label>
            <input type="number" id="smallPrize${index}" value="${value}" step="0.01" min="0">
        `;
        smallPrizesDiv.appendChild(div);
    });

    prizeConfigWrapper.appendChild(bigPrizesDiv);
    prizeConfigWrapper.appendChild(smallPrizesDiv);
    prizesContainer.appendChild(prizeConfigWrapper);

    document.getElementById("saveBonusConfig").addEventListener("click", function () {
        document.getElementById('bonusConfigModal').style.display = 'none';
    });
}
