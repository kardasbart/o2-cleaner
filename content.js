console.log("O2 Advanced Marker: Loaded.");

// ==========================================
// 0. GLOBAL STATE
// ==========================================
let isAutoMarkingEnabled = true;

// ==========================================
// 1. UI INJECTION CODE
// ==========================================
function createControlPanel() {
    if (document.getElementById('o2-custom-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'o2-custom-panel';
    
    // Style: Fixed Bottom-Right
    Object.assign(panel.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '9999',
        backgroundColor: '#fff',
        padding: '12px 16px',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#333'
    });

    // 1. Label
    const titleLabel = document.createElement('span');
    titleLabel.innerText = 'O2-cleaner';
    titleLabel.style.fontWeight = 'bold';

    // 2. Toggle Switch
    const toggleContainer = document.createElement('div');
    Object.assign(toggleContainer.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        borderRight: '1px solid #ddd',
        paddingRight: '12px'
    });

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    toggleInput.id = 'o2-auto-toggle';
    toggleInput.checked = isAutoMarkingEnabled;
    toggleInput.style.cursor = 'pointer';

    const toggleLabel = document.createElement('label');
    toggleLabel.innerText = 'Auto /o2';
    toggleLabel.htmlFor = 'o2-auto-toggle';
    Object.assign(toggleLabel.style, {
        fontSize: '12px',
        cursor: 'pointer',
        userSelect: 'none'
    });

    toggleInput.onchange = (e) => {
        isAutoMarkingEnabled = e.target.checked;
        console.log(`O2 Auto-mark is now: ${isAutoMarkingEnabled ? 'ON' : 'PAUSED'}`);
    };

    toggleContainer.appendChild(toggleInput);
    toggleContainer.appendChild(toggleLabel);

    // 3. Regex Input
    const regexInput = document.createElement('input');
    regexInput.id = 'o2-regex-input';
    regexInput.placeholder = 'Regex (e.g. Bank|Faktura)';
    Object.assign(regexInput.style, {
        padding: '6px 8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '160px',
        fontSize: '13px'
    });

    // 4. Mark Button
    const btn = document.createElement('button');
    btn.innerText = 'Mark';
    Object.assign(btn.style, {
        padding: '6px 12px',
        backgroundColor: '#00adef', // O2 Blue
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '13px'
    });

    btn.onmouseover = () => btn.style.backgroundColor = '#008bbd';
    btn.onmouseout  = () => btn.style.backgroundColor = '#00adef';

    btn.onclick = () => {
        const text = regexInput.value;
        if (text) markByRegex(text);
        else alert("Please enter a regex pattern first.");
    };

    panel.appendChild(titleLabel);
    panel.appendChild(toggleContainer);
    panel.appendChild(regexInput);
    panel.appendChild(btn);
    
    document.body.appendChild(panel);
}

// ==========================================
// 2. MANUAL MARKING LOGIC (Regex)
// ==========================================
function markByRegex(patternString) {
    try {
        const regex = new RegExp(patternString, 'i');
        const rows = document.querySelectorAll('div[role="option"]');
        let count = 0;

        rows.forEach(row => {
            if (regex.test(row.innerText)) {
                const checkbox = row.querySelector('button[role="checkbox"]');
                if (checkbox && checkbox.getAttribute('aria-checked') === 'false') {
                    checkbox.click();
                    row.style.backgroundColor = "#e6fffa"; // Light teal
                    count++;
                }
            }
        });
        console.log(`Manual Regex: Marked ${count} emails.`);
    } catch (e) {
        alert("Invalid Regex pattern! " + e.message);
    }
}

// ==========================================
// 3. BACKGROUND TASKS
// ==========================================

// Task A: Mark /o2 Ads
function selectSponsoredEmails() {
    if (!isAutoMarkingEnabled) return;

    const rows = document.querySelectorAll('div[role="option"]');
    rows.forEach(row => {
        if (row.innerText.includes("/o2")) {
            const checkbox = row.querySelector('button[role="checkbox"]');
            if (checkbox && checkbox.getAttribute('aria-checked') === 'false') {
                checkbox.click();
                row.style.backgroundColor = "#fff0f0"; // Light red
            }
        }
    });
}

// Task B: Auto-Close Info Banners
function autoCloseBanners() {
    // Select the close container based on the specific class structure provided
    // We look for the div with class 'grid-area_close' and find the button inside it.
    const closeButtons = document.querySelectorAll('.grid-area_close button');

    closeButtons.forEach(btn => {
        // Find the parent banner container to check if we already closed it (avoid error loops)
        // We traverse up to find the main grid wrapper
        const bannerContainer = btn.closest('.d_grid');
        
        if (bannerContainer && !bannerContainer.dataset.autoClosed) {
            console.log("O2 Cleaner: Closing an info banner...");
            btn.click();
            bannerContainer.dataset.autoClosed = "true"; // Mark as handled
            bannerContainer.style.display = 'none'; // Force hide just in case
        }
    });
}

// ==========================================
// 4. INITIALIZATION & LOOP
// ==========================================

createControlPanel();

// Master Loop (Runs every 2 seconds)
setInterval(() => {
    selectSponsoredEmails();
    autoCloseBanners();     // Run the banner closer
    createControlPanel();   // Keep UI alive
}, 2000);