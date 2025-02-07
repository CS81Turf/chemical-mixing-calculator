const presets = {
    round1: [
        { chemical: '3-Way', rate: 1.0 },
        { chemical: 'Triclopyr', rate: 0.75 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    round2: [
        { chemical: '3-Way', rate: 1.0 },
        { chemical: 'Triclopyr', rate: 0.75 },
        { chemical: 'Dimension', rate: 0.4 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    round3: [
        { chemical: 'Spartan/ 3-Way', rate: 1.0 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    round4: [
        { chemical: 'Spartan/ 3-Way', rate: 1.0 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    round5: [
        { chemical: '3-Way', rate: 1.0 },
        { chemical: 'Triclopyr', rate: 0.75 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    round6: [
        { chemical: '3-Way', rate: 1.0 },
        { chemical: 'Triclopyr', rate: 0.75 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    grub: [
        { chemical: 'Bifenthrin', rate: 1.0 } // Check rate and chemical
    ],
    mosquito: [
        { chemical: 'Bifenthrin', rate: 1.0 }
    ],
    violet: [
        { chemical: 'Triclopyr', rate: 1.5 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    summer: [
        { chemical: 'Azoxystrobin', rate: 0.77 },
        { chemical: 'ChemStick', rate: 0.01 }
    ],
    grassy: [
        { chemical: 'Pylex', rate: 0.75 },
        { chemical: 'Microyl', rate: 0.01 } /* check Microyl rate */
    ]
    // Add more presets as needed
};

// Additional chemicals not in presets
const additionalChemicals = [
    'RangerPro',
    'Dismiss',
    'Dismiss NXT',
    'Impact',
    'Negate',
    'Prodiamine',
    'Speedzone Southern',
    'Q4 Plus',
    'Safari',
    'Surge',
    'Talstar P',
];

document.getElementById('water-volume').addEventListener('input', () => {
    const waterVolume = document.getElementById('water-volume').value;
    const sqFeet = waterVolume * 4;
    document.getElementById('sq-feet').value = sqFeet;
});

document.querySelectorAll('button[data-preset]').forEach(button => {
    button.addEventListener('click', () => {
        const sqFeet = document.getElementById('sq-feet').value;
        if (!sqFeet || sqFeet < 1) {
            alert('Please enter valid square footage (minimum 1)');
            return;
        }

        const presetKey = button.dataset.preset;
        const buttonText = button.textContent.trim(); // Get visible button text
        loadPreset(presetKey, sqFeet, buttonText);
    });
});

function formatOunces(totalOunces) {
    if (totalOunces >= 128) {
        const gallons = Math.floor(totalOunces / 128);
        const ounces = (totalOunces % 128).toFixed(2).replace(/\.00$/, '');
        return `${gallons} gal ${ounces} oz`;
    }
    return `${totalOunces.toFixed(2).replace(/\.00$/, '')} oz`;
}

function loadPreset(presetKey, sqFeet, buttonName) {
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = '';

    // Update results header
    const resultsHeader = document.querySelector('#results h2');
    resultsHeader.textContent = `Mixing Instructions for ${buttonName}`;

    presets[presetKey].forEach(chem => {
        const amount = sqFeet * chem.rate;
        const row = `
            <tr>
                <td>${chem.chemical}</td>
                <td>${chem.rate}</td>
                <td>${formatOunces(amount)}</td>
            </tr>
        `;
        resultsBody.innerHTML += row;
    });

    document.getElementById('results').classList.remove('hidden');
}

// Add this function to generate labels list
function generateLabelLinks() {
    const chemicals = new Set(); // Using Set to avoid duplicates
    
    // Collect all unique chemicals from presets
    Object.values(presets).forEach(preset => {
        preset.forEach(chem => {
            chemicals.add(chem.chemical);
        });
    });

    // Add additional chemicals
    additionalChemicals.forEach(chemical => {
        chemicals.add(chemical);
    });

    // Create links (assuming PDFs are in /labels/ folder)
    let html = '';
    chemicals.forEach(chemical => {
        const filename = `${chemical.toLowerCase().replace(/[\/\s]/g, '-')}-label.pdf`;
        const displayName = chemical.split('/')[0].trim(); // Use only the first name of the chemical name
        html += `
            <a class="label-link" href="/labels/${filename}" target="_blank">
                ${chemical} Label
            </a>
        `;
    });
    
    return html || '<p>No chemical labels found</p>';
}

// Update labels button handler
document.querySelector('.labels').addEventListener('click', () => {
    generateLabelLinks();
    const labelsHtml = generateLabelLinks();
    const labelsWindow = window.open('', '_blank', 'width=600,height=400');
    labelsWindow.document.write(`
        <html>
        <head>
            <title>Chemical Labels</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .label-link { display: block; margin-bottom: 10px; }
            </style>
        </head>
        <body>
            <h1>Chemical Labels</h1>
            <div id="labels-list">${labelsHtml}</div>
        </body>
        </html>
    `);
});

// Update modal hide function
function hideModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Utility button handlers
document.querySelector('.calculator').addEventListener('click', () => {
    document.getElementById('calculator-modal').style.display = 'flex';
});

function calcInput(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
}

function calcClear() {
    document.getElementById('calc-display').value = '';
}

function calcCalculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error';
    }
}

document.querySelector('.labels').addEventListener('click', () => {
    // Implement label links
    window.open('labels/', '_blank');
});