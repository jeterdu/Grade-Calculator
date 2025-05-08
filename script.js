document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection and Validation ---
    const elements = {
        s_p1_input: document.getElementById('s_p1'),
        s_e1_input: document.getElementById('s_e1'),
        s_p2_input: document.getElementById('s_p2'),
        s_e2_input: document.getElementById('s_e2'),
        s_p3_input: document.getElementById('s_p3'),
        s_e3_input: document.getElementById('s_e3'),
        s_e3_item_div: document.getElementById('s_e3_item'),
        weightSchemeRadios: document.getElementsByName('weightScheme'),
        calculationModeRadios: document.getElementsByName('calculationMode'),
        customTargetInputContainer: document.getElementById('customTargetInputContainer'),
        customTargetGradeInput: document.getElementById('customTargetGrade'),
        calculateButton: document.getElementById('calculateButton'),
        clearButton: document.getElementById('clearButton'),
        copyResultsButton: document.getElementById('copyResultsButton'),
        totalGradeResultDiv: document.getElementById('totalGradeResult'),
        statusResultDiv: document.getElementById('statusResult'),
        neededResultDiv: document.getElementById('neededResult')
    };

    const scoreInputIds = ['s_p1', 's_e1', 's_p2', 's_e2', 's_p3', 's_e3'];
    scoreInputIds.forEach(id => {
        elements[`error_${id}`] = document.getElementById(`error_${id}`);
    });

    let essentialElementsPresent = true;
    for (const key in elements) {
        if (elements.hasOwnProperty(key)) {
            if (!elements[key] && 
                key !== 'weightSchemeRadios' && 
                key !== 'calculationModeRadios' && 
                !key.startsWith('error_')) {
                console.error(`Error: HTML element with ID or reference '${key}' not found.`);
                essentialElementsPresent = false;
            } else if ((key === 'weightSchemeRadios' || key === 'calculationModeRadios') && elements[key].length === 0) {
                console.error(`Error: No elements found for radio button group '${key}'.`);
                // This might not be critical if defaults are handled, but good to note.
            }
        }
    }

    if (!essentialElementsPresent) {
        alert("網頁初始化錯誤：缺少必要的 HTML 元件。請檢查 Console 獲取更多資訊。功能可能無法正常運作。");
    }

    // --- Feature: Remember Weighting Scheme (localStorage) ---
    function loadSavedWeightScheme() {
        try {
            const savedScheme = localStorage.getItem('gradeCalc_weightScheme');
            // Ensure elements.weightSchemeRadios itself is not null before trying to access its members or length
            const defaultWeightRadio = elements.weightSchemeRadios && elements.weightSchemeRadios.length > 0 ? elements.weightSchemeRadios[0].labels[0].htmlFor : 'weightScheme1';
            let schemeApplied = false;
            if (savedScheme && elements.weightSchemeRadios) {
                for (let i = 0; i < elements.weightSchemeRadios.length; i++) {
                    if (elements.weightSchemeRadios[i].value === savedScheme) {
                        elements.weightSchemeRadios[i].checked = true;
                        schemeApplied = true;
                        break;
                    }
                }
            }
            if (!schemeApplied) {
                 const defaultRadioElem = document.getElementById(defaultWeightRadio);
                 if(defaultRadioElem) defaultRadioElem.checked = true;
                 else if(elements.weightSchemeRadios && elements.weightSchemeRadios.length > 0) elements.weightSchemeRadios[0].checked = true; // Fallback
            }
        } catch (e) {
            console.error("Error loading weight scheme:", e);
             if(elements.weightSchemeRadios && elements.weightSchemeRadios.length > 0) elements.weightSchemeRadios[0].checked = true;
        }
    }

    function saveWeightScheme() {
        try {
            const selectedScheme = getSelectedWeightScheme();
            if (selectedScheme) {
                localStorage.setItem('gradeCalc_weightScheme', selectedScheme);
            }
        } catch (e) {
            console.error("Error saving weight scheme:", e);
        }
    }
    
    if (elements.weightSchemeRadios && elements.weightSchemeRadios.length > 0) {
        elements.weightSchemeRadios.forEach(radio => radio.addEventListener('change', saveWeightScheme));
        loadSavedWeightScheme();
    }

    // --- Feature: Save/Load All Entered Scores (localStorage) ---
    const scoreLocalStoragePrefix = 'gradeCalc_score_';

    function saveScore(inputIdSuffix) { // Renamed parameter for clarity
        const inputElement = elements[inputIdSuffix + '_input'];
        if (inputElement) {
            try {
                localStorage.setItem(scoreLocalStoragePrefix + inputIdSuffix, inputElement.value);
            } catch (e) {
                console.error(`Error saving score for ${inputIdSuffix}:`, e);
            }
        }
    }

    function loadScores() {
        scoreInputIds.forEach(idSuffix => {
            const inputKey = idSuffix + '_input';
            const inputElement = elements[inputKey];
            if (inputElement) {
                try {
                    const savedValue = localStorage.getItem(scoreLocalStoragePrefix + idSuffix);
                    if (savedValue !== null) {
                        inputElement.value = savedValue;
                        validateScoreInput(inputElement, elements[`error_${idSuffix}`]); 
                    }
                } catch (e) {
                    console.error(`Error loading score for ${idSuffix}:`, e);
                }
            }
        });
    }
    
    // --- Feature: Input Validation and Hints ---
    function validateScoreInput(inputElement, errorElement) {
        if (!inputElement) return true; // Should not happen if initial check passed, consider it valid

        const value = parseFloat(inputElement.value);
        let errorMessage = "";

        if (inputElement.value.trim() === "") { 
            inputElement.classList.remove('input-invalid');
            if (errorElement) {
                errorElement.textContent = ""; 
                errorElement.style.display = 'none';
            }
            return true; 
        }

        if (isNaN(value)) {
            errorMessage = "請輸入數字";
        } else if (value < 0) {
            errorMessage = "分數不能小於0";
        } else if (value > 100) {
            errorMessage = "分數不能大於100";
        }

        if (errorMessage) {
            inputElement.classList.add('input-invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            }
            return false;
        } else {
            inputElement.classList.remove('input-invalid');
            if (errorElement) {
                errorElement.textContent = "";
                errorElement.style.display = 'none';
            }
            return true;
        }
    }
    
    // Attach event listeners for saving scores and validation AFTER loadScores
    scoreInputIds.forEach(idSuffix => {
        const inputElement = elements[idSuffix + '_input'];
        const errorElement = elements[`error_${idSuffix}`];
        if (inputElement) {
            inputElement.addEventListener('input', () => {
                validateScoreInput(inputElement, errorElement);
                saveScore(idSuffix);
            });
        }
    });

    if(essentialElementsPresent) { // Only load scores if elements are there
        loadScores(); 
    }


    // --- Helper Functions ---
    function getSelectedRadioValue(name) {
        const radios = document.getElementsByName(name); 
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        // Fallback for initial load if no radio is 'checked' in HTML (though it should be)
        if (name === 'weightScheme') return '64';
        if (name === 'calculationMode') return 'total';
        return null;
    }
    
    function getSelectedWeightScheme() { return getSelectedRadioValue('weightScheme'); }
    function getSelectedCalculationMode() { return getSelectedRadioValue('calculationMode'); }

    // --- UI Updates based on Mode ---
    function updateUIForMode() {
        const mode = getSelectedCalculationMode();
        clearResultsAndHide(); 

        if (elements.s_e3_item_div && elements.customTargetInputContainer) {
            if (mode === 'total') {
                elements.s_e3_item_div.style.display = 'flex';
                elements.customTargetInputContainer.style.display = 'none';
            } else { 
                elements.s_e3_item_div.style.display = 'none';
                elements.customTargetInputContainer.style.display = 'flex';
            }
        } else {
            console.error("Cannot update UI for mode: s_e3_item_div or customTargetInputContainer is missing.");
        }
    }

    if (elements.calculationModeRadios && elements.calculationModeRadios.length > 0) {
        elements.calculationModeRadios.forEach(radio => radio.addEventListener('change', updateUIForMode));
        if (essentialElementsPresent) updateUIForMode(); 
    }


    // --- Score Retrieval ---
    function getScores() {
        return {
            p1: parseFloat(elements.s_p1_input ? elements.s_p1_input.value : 0) || 0,
            e1: parseFloat(elements.s_e1_input ? elements.s_e1_input.value : 0) || 0,
            p2: parseFloat(elements.s_p2_input ? elements.s_p2_input.value : 0) || 0,
            e2: parseFloat(elements.s_e2_input ? elements.s_e2_input.value : 0) || 0,
            p3: parseFloat(elements.s_p3_input ? elements.s_p3_input.value : 0) || 0,
            e3: parseFloat(elements.s_e3_input ? elements.s_e3_input.value : 0) || 0,
        };
    }
    
    // --- Needed Score Text Helper ---
    function getNeededScoreText(targetGrade, knownUnroundedScoreSum, W_E_each, labelPrefix = "為達總成績") {
        let neededScore = Math.ceil((targetGrade - 0.5 - knownUnroundedScoreSum) / W_E_each);
        if (neededScore > 100) {
            return `${labelPrefix} ${targetGrade} 分：即使三段段考考100分，也無法達到目標。`;
        } else if (neededScore <= 0) {
            return `${labelPrefix} ${targetGrade} 分：您已達到此目標標準！`;
        } else {
            return `${labelPrefix} ${targetGrade} 分，您的三段段考至少需要 ${neededScore} 分。`;
        }
    }

    // --- Main Calculation and Display ---
    function calculateAndDisplay() {
        if (!essentialElementsPresent) {
            alert("部分網頁元件遺失，無法執行計算。請檢查 Console。");
            return;
        }
        try {
            let allInputsProgrammaticallyValid = true;
            scoreInputIds.forEach(idSuffix => {
                const inputElement = elements[idSuffix + '_input'];
                const errorElement = elements[`error_${idSuffix}`];
                if (!validateScoreInput(inputElement, errorElement) && inputElement && inputElement.value.trim() !== "") {
                    allInputsProgrammaticallyValid = false;
                }
            });

            if (!allInputsProgrammaticallyValid) {
                alert("部分成績輸入無效 (例如超出0-100範圍)，請修正紅色提示的欄位後再計算。");
                return;
            }

            const scores = getScores();
            const weightScheme = getSelectedWeightScheme();
            const calcMode = getSelectedCalculationMode();

            clearResultsAndHide(); 

            let W_P_each, W_E_each;
            if (weightScheme === "64") {
                W_E_each = 0.20; W_P_each = 0.40 / 3;
            } else { // "73"
                W_P_each = 0.30 / 3; W_E_each = 0.70 / 3;
            }
            
            let weightSchemeLabelElement = document.querySelector(`label[for="weightScheme${weightScheme === '64' ? '1' : '2'}"]`);
            const weightSchemeText = weightSchemeLabelElement ? weightSchemeLabelElement.textContent.trim() : "未知權重";

            let calculationSummary = `權重選擇：${weightSchemeText}\n`;
            calculationSummary += `各項成績：\n  一段平時: ${scores.p1}, 一段段考: ${scores.e1}\n  二段平時: ${scores.p2}, 二段段考: ${scores.e2}\n  三段平時: ${scores.p3}\n`;

            if (calcMode === 'total') {
                calculationSummary += `  三段段考: ${scores.e3}\n`;
                const unroundedTotal = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                       (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                       (scores.p3 * W_P_each) + (scores.e3 * W_E_each);
                const finalGrade = Math.round(unroundedTotal);

                if (elements.totalGradeResultDiv) {
                    elements.totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
                    elements.totalGradeResultDiv.style.display = 'block';
                }

                if (elements.statusResultDiv) {
                    elements.statusResultDiv.classList.remove('pass', 'makeup', 'fail');
                    let statusText = "";
                    if (finalGrade >= 60) {
                        statusText = "狀態：恭喜過關！"; elements.statusResultDiv.classList.add('pass');
                    } else if (finalGrade >= 40) {
                        statusText = "狀態：您可能需要補考！"; elements.statusResultDiv.classList.add('makeup');
                    } else {
                        statusText = "狀態：您可能會被當！"; elements.statusResultDiv.classList.add('fail');
                    }
                    elements.statusResultDiv.textContent = statusText;
                    elements.statusResultDiv.style.display = 'block';
                    calculationSummary += `\n計算結果：\n  學期總成績: ${finalGrade}分\n  ${statusText}`;
                } else {
                    calculationSummary += `\n計算結果：\n  學期總成績: ${finalGrade}分\n  (狀態顯示元件遺失)`;
                }

                if (elements.neededResultDiv) elements.neededResultDiv.style.display = 'none';
                
            } else { // calcMode === 'needed'
                const customTargetDefault = (elements.customTargetGradeInput && elements.customTargetGradeInput.placeholder) ? elements.customTargetGradeInput.placeholder : '70';
                let customTargetVal = (elements.customTargetGradeInput && elements.customTargetGradeInput.value.trim() !== "") ? elements.customTargetGradeInput.value : customTargetDefault;
                const customTarget = parseFloat(customTargetVal) || parseFloat(customTargetDefault);

                calculationSummary += `  (計算三段段考所需分數)\n`;

                const knownUnroundedScoreSum = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                               (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                               (scores.p3 * W_P_each);
                
                const neededFor60Text = getNeededScoreText(60, knownUnroundedScoreSum, W_E_each, "為避免補考 (達60分)");
                const neededFor40Text = getNeededScoreText(40, knownUnroundedScoreSum, W_E_each, "為避免被當 (達40分)");
                const neededForCustomText = getNeededScoreText(customTarget, knownUnroundedScoreSum, W_E_each, `為達自訂目標 (${customTarget}分)`);

                if (elements.neededResultDiv) {
                    elements.neededResultDiv.innerHTML = `${neededFor60Text}<br>${neededFor40Text}<br>${neededForCustomText}`;
                    elements.neededResultDiv.style.display = 'block';
                }
                
                calculationSummary += `\n計算結果：\n  ${neededFor60Text}\n  ${neededFor40Text}\n  ${neededForCustomText}`;
                
                if (elements.totalGradeResultDiv) elements.totalGradeResultDiv.style.display = 'none';
                if (elements.statusResultDiv) elements.statusResultDiv.style.display = 'none';
            }
            
            if(elements.copyResultsButton) { 
                elements.copyResultsButton.style.display = 'inline-block'; 
                elements.copyResultsButton.setAttribute('data-summary', calculationSummary);
            }

        } catch (e) {
            console.error("計算或顯示時發生錯誤:", e);
            const errorDisplay = elements.neededResultDiv || elements.totalGradeResultDiv;
            if(errorDisplay) {
                errorDisplay.textContent = "計算時發生錯誤，請檢查 Console。";
                errorDisplay.style.display = 'block';
            }
        }
    }
    
    // --- Clear Functions ---
    function clearInputsAndResults() {
        if (!essentialElementsPresent && !elements.s_p1_input) { // Check if elements object itself might not be fully populated for some reason
             console.warn("Clear function called but essential elements might be missing.");
        }
        try {
            scoreInputIds.forEach(idSuffix => {
                const inputElement = elements[idSuffix + '_input'];
                const errorElement = elements[`error_${idSuffix}`];
                if (inputElement) {
                    inputElement.value = '';
                    inputElement.classList.remove('input-invalid');
                }
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
                try { // Clear from localStorage as well
                    localStorage.removeItem(scoreLocalStoragePrefix + idSuffix);
                } catch (e) {
                    console.error(`Error removing score ${idSuffix} from localStorage:`, e);
                }
            });

            if(elements.customTargetGradeInput) elements.customTargetGradeInput.value = '70';
            clearResultsAndHide();
            updateUIForMode(); 
        } catch (e) {
            console.error("清除時發生錯誤:", e);
        }
    }

    function clearResultsAndHide() {
        if(elements.totalGradeResultDiv) { elements.totalGradeResultDiv.textContent = ''; elements.totalGradeResultDiv.style.display = 'none'; }
        if(elements.statusResultDiv) { elements.statusResultDiv.textContent = ''; elements.statusResultDiv.style.display = 'none'; }
        if(elements.neededResultDiv) { elements.neededResultDiv.innerHTML = ''; elements.neededResultDiv.style.display = 'none'; }
        if(elements.copyResultsButton) {
            elements.copyResultsButton.style.display = 'none';
            elements.copyResultsButton.removeAttribute('data-summary');
        }
    }

    // --- Event Listeners for Buttons ---
    if (elements.copyResultsButton) {
        elements.copyResultsButton.addEventListener('click', () => {
            const summaryToCopy = elements.copyResultsButton.getAttribute('data-summary');
            if (summaryToCopy && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(summaryToCopy)
                    .then(() => {
                        elements.copyResultsButton.textContent = '已複製！';
                        setTimeout(() => { elements.copyResultsButton.textContent = '複製結果摘要'; }, 2000);
                    })
                    .catch(err => {
                        console.error('複製結果時發生錯誤: ', err);
                        // alert('複製失敗，您的瀏覽器可能不支援此功能或未授予權限。');
                    });
            } else if (!navigator.clipboard || !navigator.clipboard.writeText) {
                // alert('您的瀏覽器不支援自動複製功能。');
            }
        });
    }

    if (elements.calculateButton) {
        elements.calculateButton.addEventListener('click', calculateAndDisplay);
    }

    if (elements.clearButton) {
        elements.clearButton.addEventListener('click', clearInputsAndResults);
    }
});
