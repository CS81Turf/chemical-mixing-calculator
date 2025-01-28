// Define preset chemical configurations
const presets = {
    "Round 1": [
        { chemical: "3-Way", rate: 1.0 },   //adjust rates and chemicals accordingly
        { chemical: "Triclopyr", rate: 0.75 },
    ],
    "Round 2": [
        { chemical: "3-Way", rate: 1.0 },
        { chemical: "Triclopyr", rate: 0.75 },
        { chemical: "ChemStick", rate: 0.1 },
        { chemical: "Dimension", rate: 1.0 },
    ],
    "Round 3": [
        { chemical: "3-Way", rate: 1.0 },
        { chemical: "Spartan/Sulf.", rate: 0.75 },
        { chemical: "ChemStick", rate: 0.1 }
    ],
    "Round 4": [
        { chemical: "3-Way", rate: 1.0 },
        { chemical: "Spartan?Sulf.", rate: 0.75 },
        { chemical: "ChemStick", rate: 0.1 }
    ],
    "Round 5": [
        { chemical: "3-Way", rate: 1.0 },
        { chemical: "Triclopyr", rate: 0.75 }
    ],
    "Round 6": [
        { chemical: "3-Way", rate: 1.5 },
        { chemical: "Chemstick", rate: 0.75 }
    ],
    "Sports Turf": [
        { chemical: "Dimension", rate: 1.0 },
        { chemical: "ChemStick", rate: 0.1 }
    ],
    "Grub": [
        { chemical: "Bifenthrin", rate: 1.5 }
    ],
    "Flea and Tick": [
        { chemical: "Bifenthrin", rate: 1.5 }
    ],
    "Summer Disease": [
        { chemical: "Zoxy", rate: .75 },
        { chemical: "ChemStick", rate: 0.1 }
    ],
    "Grassy Weed": [
        { chemical: "Triclopyr", rate: 1.5 },
        { chemical: "Microyl", rate: 0.75 }
    ],
    "Wild Violet": [
        { chemical: "Triclopyr", rate: 1.5 }
    ],
    "Mosquito": [
        { chemical: "Bifenthrin", rate: 2 }
    ]// Add other presets as needed
};

function loadPreset(presetName) {
    const preset = presets[presetName];
    if (!preset) {
        alert("Preset not found!");
        return;
    }

    // Clear previous form inputs
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`chemical${i}`).value = "";
        document.getElementById(`rate${i}`).value = "";
        document.getElementById(`chemical-amount${i}`).innerText = "";
    }

    // Load the preset into the form
    preset.forEach((item, index) => {
        const slot = index + 1;
        if (slot <= 4) {
            document.getElementById(`chemical${slot}`).value = item.chemical;
            document.getElementById(`rate${slot}`).value = item.rate;
        }
    });

    document.getElementById("results").innerHTML = `${presetName} loaded. Enter sq. ft. to calculate.`;
}


function calculateMixture() {
    const sqFeetInput = document.getElementById('sq_feet');
    const sqFeet = parseFloat(sqFeetInput.value) * 1000; // Convert square feet to actual sq ft

    if (isNaN(sqFeet) || sqFeet <= 0) {
        alert('Please enter a valid square footage.');
        return;
    }

    for (let i = 1; i <= 4; i++) {
        const chemicalSelect = document.getElementById(`chemical${i}`);
        const rateInput = document.getElementById(`rate${i}`);
        const amountDisplay = document.getElementById(`chemical-amount${i}`);

        const chemical = chemicalSelect.value;
        const rate = parseFloat(rateInput.value);

        if (chemical && !isNaN(rate) && rate > 0) {
            const totalAmount = (rate * sqFeet) / 1000; // Calculate total amount needed
            const gallons = Math.floor(totalAmount / 128);
            const ounces = totalAmount % 128;
            amountDisplay.innerText = `${gallons} gal ${ounces.toFixed(2)} oz`;
        } else {
            amountDisplay.innerText = ''; // Clear if invalid
        }
    }
}
