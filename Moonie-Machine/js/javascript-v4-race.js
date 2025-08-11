
let spinSound;
let stopSound;

let openModalBtn;
let configModal;
let closeModalBtn;
let spinButton;
let showSymbolValuesCheck;

let buttons;

let topSymbolImg = "./img/Race/topSymbol.png";
let premiumGoldImg = "./img/Race/premiumGold.png";
let premiumSilverImg = "./img/Race/premiumSilver.png";
let premiumCopperImg = "./img/Race/premiumCopper.png";
let goldImg = "./img/Race/gold.png";
let silverImg = "./img/Race/silver.png";
let copperImg = "./img/Race/copper.png";
let bonusImg = "./img/chest-closed.png";
let bonusImg2 = "./img/chest-open.png";

const symbolValuesBig = {
    "./img/Race/topSymbol.png": 40,
    "./img/Race/premiumGold.png": 35,
    "./img/Race/premiumSilver.png": 30,
    "./img/Race/premiumCopper.png": 25,
    "./img/Race/gold.png": 20,
    "./img/Race/silver.png": 15,
    "./img/Race/copper.png": 14,
    "./img/chest-closed.png": "Bonus",
};

const symbolValuesSmall = {
    "./img/Race/topSymbol.png": 20,
    "./img/Race/premiumGold.png": 15,
    "./img/Race/premiumSilver.png": 10,
    "./img/Race/premiumCopper.png": 7,
    "./img/Race/gold.png": 5,
    "./img/Race/silver.png": 4,
    "./img/Race/copper.png": 2,
    "./img/chest-closed.png": "Bonus",
};

const evenChance = 10;

const symbolWinChanceBig = {
    "./img/Race/topSymbol.png": evenChance,
    "./img/Race/premiumGold.png": evenChance,
    "./img/Race/premiumSilver.png": evenChance,
    "./img/Race/premiumCopper.png": evenChance,
    "./img/Race/gold.png": evenChance,
    "./img/Race/silver.png": evenChance,
    "./img/Race/copper.png": evenChance,
    "./img/chest-closed.png": 0, // No chance to win directly
};

const symbolWinChanceSmall = {
    "./img/Race/topSymbol.png": evenChance,
    "./img/Race/premiumGold.png": evenChance,
    "./img/Race/premiumSilver.png": evenChance,
    "./img/Race/premiumCopper.png": evenChance,
    "./img/Race/gold.png": evenChance,
    "./img/Race/silver.png": evenChance,
    "./img/Race/copper.png": evenChance,
    "./img/chest-closed.png": 0,
};

const optionsMap = {
    bigMoonieButton: { inputId: 'bigMoonieButton' },
    smallMoonieButton: { inputId: 'smallMoonieButton' }
};


document.addEventListener('DOMContentLoaded', () => {

// Setting Big Values
    document.getElementById('bigTopSymbol').value = symbolValuesBig[topSymbolImg];
    document.getElementById('bigTopSymbolCount').value = symbolWinChanceBig[topSymbolImg];

    document.getElementById('bigPremiumGold').value = symbolValuesBig[premiumGoldImg];
    document.getElementById('bigPremiumGoldCount').value = symbolWinChanceBig[premiumGoldImg];

    document.getElementById('bigPremiumSilver').value = symbolValuesBig[premiumSilverImg];
    document.getElementById('bigPremiumSilverCount').value = symbolWinChanceBig[premiumSilverImg];

    document.getElementById('bigPremiumCopper').value = symbolValuesBig[premiumCopperImg];
    document.getElementById('bigPremiumCopperCount').value = symbolWinChanceBig[premiumCopperImg];

    document.getElementById('bigGold').value = symbolValuesBig[goldImg];
    document.getElementById('bigGoldCount').value = symbolWinChanceBig[goldImg];

    document.getElementById('bigSilver').value = symbolValuesBig[silverImg];
    document.getElementById('bigSilverCount').value = symbolWinChanceBig[silverImg];

    document.getElementById('bigCopper').value = symbolValuesBig[copperImg];
    document.getElementById('bigCopperCount').value = symbolWinChanceBig[copperImg];

    document.getElementById('bigBonus').value = symbolValuesBig[bonusImg];
    document.getElementById('bigBonusCount').value = symbolWinChanceBig[bonusImg];

// Setting Small Values
    document.getElementById('smallTopSymbol').value = symbolValuesSmall[topSymbolImg];
    document.getElementById('smallTopSymbolCount').value = symbolWinChanceSmall[topSymbolImg];

    document.getElementById('smallPremiumGold').value = symbolValuesSmall[premiumGoldImg];
    document.getElementById('smallPremiumGoldCount').value = symbolWinChanceSmall[premiumGoldImg];

    document.getElementById('smallPremiumSilver').value = symbolValuesSmall[premiumSilverImg];
    document.getElementById('smallPremiumSilverCount').value = symbolWinChanceSmall[premiumSilverImg];

    document.getElementById('smallPremiumCopper').value = symbolValuesSmall[premiumCopperImg];
    document.getElementById('smallPremiumCopperCount').value = symbolWinChanceSmall[premiumCopperImg];

    document.getElementById('smallGold').value = symbolValuesSmall[goldImg];
    document.getElementById('smallGoldCount').value = symbolWinChanceSmall[goldImg];

    document.getElementById('smallSilver').value = symbolValuesSmall[silverImg];
    document.getElementById('smallSilverCount').value = symbolWinChanceSmall[silverImg];

    document.getElementById('smallCopper').value = symbolValuesSmall[copperImg];
    document.getElementById('smallCopperCount').value = symbolWinChanceSmall[copperImg];

    document.getElementById('smallValueBonus').value = symbolValuesSmall[bonusImg];
    document.getElementById('smallBonusCount').value = symbolWinChanceSmall[bonusImg];

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
        updateInputValues();
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

        const isBigSet = document.querySelector('.button-reel .active')?.id.includes('big');

        if (isBigSet) {
            const totalWinChanceBig = Object.values(symbolWinChanceBig).reduce((sum, value) => sum + value, 0);
            if(totalWinChanceBig < 1 )
            {
                alert("No More Items Left Big")
                return;
            }
        }
        else
        {
            const totalWinChanceSmall = Object.values(symbolWinChanceSmall).reduce((sum, value) => sum + value, 0);
            if(totalWinChanceSmall < 1 )
            {
                alert("No More Items Left Small")
                return;
            }

        }

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
                // Check if "Consume Items on Win" is enabled
                const consumeItemsEnabled = document.getElementById("consumeItemsCheck").checked;

                // Reduce the count of the winning item from the correct set
                if (winningSymbol && consumeItemsEnabled) {

                    if (isBigSet) {
                        if (symbolWinChanceBig[winningSymbol] > 0) {
                            symbolWinChanceBig[winningSymbol] -= 1;
                        }
                    } else {
                        if (symbolWinChanceSmall[winningSymbol] > 0) {
                            symbolWinChanceSmall[winningSymbol] -= 1;
                        }
                    }
                    updateInputValues();

                    console.log(`Updated chances: ${winningSymbol} -> Big: ${symbolWinChanceBig[winningSymbol]}, Small: ${symbolWinChanceSmall[winningSymbol]}`);
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

                    // Check if the winning symbol is "Bonus" and open the game modal
                    if (winningSymbol === bonusImg) {
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

// Function to populate modal inputs with stored symbol win chances
function updateInputValues() {
    // Populate Big Symbol Win Percentage Inputs
    document.getElementById('bigTopSymbolCount').value = symbolWinChanceBig[topSymbolImg] || "0";
    document.getElementById('bigPremiumGoldCount').value = symbolWinChanceBig[premiumGoldImg] || "0";
    document.getElementById('bigPremiumSilverCount').value = symbolWinChanceBig[premiumSilverImg] || "0";
    document.getElementById('bigPremiumCopperCount').value = symbolWinChanceBig[premiumCopperImg] || "0";
    document.getElementById('bigGoldCount').value = symbolWinChanceBig[goldImg] || "0";
    document.getElementById('bigSilverCount').value = symbolWinChanceBig[silverImg] || "0";
    document.getElementById('bigCopperCount').value = symbolWinChanceBig[copperImg] || "0";
    document.getElementById('bigBonusCount').value = symbolWinChanceBig[bonusImg] || "0";

    // Populate Small Symbol Win Percentage Inputs
    document.getElementById('smallTopSymbolCount').value = symbolWinChanceSmall[topSymbolImg] || "0";
    document.getElementById('smallPremiumGoldCount').value = symbolWinChanceSmall[premiumGoldImg] || "0";
    document.getElementById('smallPremiumSilverCount').value = symbolWinChanceSmall[premiumSilverImg] || "0";
    document.getElementById('smallPremiumCopperCount').value = symbolWinChanceSmall[premiumCopperImg] || "0";
    document.getElementById('smallGoldCount').value = symbolWinChanceSmall[goldImg] || "0";
    document.getElementById('smallSilverCount').value = symbolWinChanceSmall[silverImg] || "0";
    document.getElementById('smallCopperCount').value = symbolWinChanceSmall[copperImg] || "0";
    document.getElementById('smallBonusCount').value = symbolWinChanceSmall[bonusImg] || "0";
}



// Function to update symbol values and win percentages from modal inputs
function updateSymbolValues() {
    // Update Big Symbol Values and Win Percentages
    symbolValuesBig[topSymbolImg] = document.getElementById('bigTopSymbol').value || "";
    symbolValuesBig[premiumGoldImg] = document.getElementById('bigPremiumGold').value || "";
    symbolValuesBig[premiumSilverImg] = document.getElementById('bigPremiumSilver').value || "";
    symbolValuesBig[premiumCopperImg] = document.getElementById('bigPremiumCopper').value || "";
    symbolValuesBig[goldImg] = document.getElementById('bigGold').value || "";
    symbolValuesBig[silverImg] = document.getElementById('bigSilver').value || "";
    symbolValuesBig[copperImg] = document.getElementById('bigCopper').value || "";
    symbolValuesBig[bonusImg] = document.getElementById('bigBonus').value || "";

    symbolWinChanceBig[topSymbolImg] = document.getElementById('bigTopSymbolCount').value || "";
    symbolWinChanceBig[premiumGoldImg] = document.getElementById('bigPremiumGoldCount').value || "";
    symbolWinChanceBig[premiumSilverImg] = document.getElementById('bigPremiumSilverCount').value || "";
    symbolWinChanceBig[premiumCopperImg] = document.getElementById('bigPremiumCopperCount').value || "";
    symbolWinChanceBig[goldImg] = document.getElementById('bigGoldCount').value || "";
    symbolWinChanceBig[silverImg] = document.getElementById('bigSilverCount').value || "";
    symbolWinChanceBig[copperImg] = document.getElementById('bigCopperCount').value || "";
    symbolWinChanceBig[bonusImg] = document.getElementById('bigBonusCount').value || "";

    // Update Small Symbol Values and Win Percentages
    symbolValuesSmall[topSymbolImg] = document.getElementById('smallTopSymbol').value || "";
    symbolValuesSmall[premiumGoldImg] = document.getElementById('smallPremiumGold').value || "";
    symbolValuesSmall[premiumSilverImg] = document.getElementById('smallPremiumSilver').value || "";
    symbolValuesSmall[premiumCopperImg] = document.getElementById('smallPremiumCopper').value || "";
    symbolValuesSmall[goldImg] = document.getElementById('smallGold').value || "";
    symbolValuesSmall[silverImg] = document.getElementById('smallSilver').value || "";
    symbolValuesSmall[copperImg] = document.getElementById('smallCopper').value || "";
    symbolValuesSmall[bonusImg] = document.getElementById('smallValueBonus').value || "";

    symbolWinChanceSmall[topSymbolImg] = document.getElementById('smallTopSymbolCount').value || "";
    symbolWinChanceSmall[premiumGoldImg] = document.getElementById('smallPremiumGoldCount').value || "";
    symbolWinChanceSmall[premiumSilverImg] = document.getElementById('smallPremiumSilverCount').value || "";
    symbolWinChanceSmall[premiumCopperImg] = document.getElementById('smallPremiumCopperCount').value || "";
    symbolWinChanceSmall[goldImg] = document.getElementById('smallGoldCount').value || "";
    symbolWinChanceSmall[silverImg] = document.getElementById('smallSilverCount').value || "";
    symbolWinChanceSmall[copperImg] = document.getElementById('smallCopperCount').value || "";
    symbolWinChanceSmall[bonusImg] = document.getElementById('smallBonusCount').value || "";
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

        if(symbolSrc === bonusImg)
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

                        var innerHTML = `<img src="${bonusImg2}" alt="Winning Pick" width="100%">`;
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
