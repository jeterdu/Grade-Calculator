document.addEventListener('DOMContentLoaded', () => {
    // Input elements
    const s_p1_input = document.getElementById('s_p1');
    const s_e1_input = document.getElementById('s_e1');
    const s_p2_input = document.getElementById('s_p2');
    const s_e2_input = document.getElementById('s_e2');
    const s_p3_input = document.getElementById('s_p3');
    const s_e3_input = document.getElementById('s_e3'); // s_e3_input is still needed for total calculation
    const s_e3_item_div = document.getElementById('s_e3_item');

    // Options
    const weightSchemeRadios = document.getElementsByName('weightScheme');
    const calculationModeRadios = document.getElementsByName('calculationMode');
    const customTargetInputContainer = document.getElementById('customTargetInputContainer');
    const customTargetGradeInput = document.getElementById('customTargetGrade');

    // Buttons
    const calculateButton = document.getElementById('calculateButton');
    const clearButton = document.getElementById('clearButton');
    const copyResultsButton = document.getElementById('copyResultsButton');

    // Result display elements
    const totalGradeResultDiv = document.getElementById('totalGradeResult');
    const statusResultDiv = document.getElementById('statusResult');
    const neededResultDiv = document.getElementById('neededResult');

    // --- Feature 1: Remember Weighting Scheme ---
    function loadSavedWeightScheme() {
        try {
            const savedScheme = localStorage.getItem('gradeCalc_weightScheme');
            const targetRadio = document.querySelector(`input[name="weightScheme"][value="${savedScheme}"]`);
            if (targetRadio) {
                targetRadio.checked = true;
            } else {
                document.getElementById('weightScheme1').checked = true; 
            }
        } catch (e) {
            console.error("Error loading weight scheme:", e);
            document.getElementById('weightScheme1').checked = true;
        }
    }

    function saveWeightScheme() {
        try {
            const selectedScheme = getSelectedWeightScheme();
            localStorage.setItem('gradeCalc_weightScheme', selectedScheme);
        } catch (e) {
            console.error("Error saving weight scheme:", e);
        }
    }

    if (weightSchemeRadios && weightSchemeRadios.length > 0) {
        weightSchemeRadios.forEach(radio => radio.addEventListener('change', saveWeightScheme));
        loadSavedWeightScheme();
    }
    
    function getSelectedRadioValue(name) {
        const selectedRadio = document.querySelector(`input[name="${name}"]:checked`);
        return selectedRadio ? selectedRadio.value : null;
    }
    
    function getSelectedWeightScheme() { return getSelectedRadioValue('weightScheme') || "64"; }
    function getSelectedCalculationMode() { return getSelectedRadioValue('calculationMode') || "total"; }

    // --- UI Updates based on Mode ---
    function updateUIForMode() {
        const mode = getSelectedCalculationMode();
        clearResultsAndHide(); 

        if (mode === 'total') {
            s_e3_item_div.style.display = 'flex';
            customTargetInputContainer.style.display = 'none';
            totalGradeResultDiv.style.display = 'block'; 
            statusResultDiv.style.display = 'block';  
            neededResultDiv.style.display = 'none';
        } else { // mode === 'needed'
            s_e3_item_div.style.display = 'none';
            customTargetInputContainer.style.display = 'flex'; // Changed to flex from block for consistency
            totalGradeResultDiv.style.display = 'none';
            statusResultDiv.style.display = 'none';
            neededResultDiv.style.display = 'block'; 
        }
    }
    if (calculationModeRadios && calculationModeRadios.length > 0) {
        calculationModeRadios.forEach(radio => radio.addEventListener('change', updateUIForMode));
        updateUIForMode(); // Initial UI setup
    }

    function getScores() {
        return {
            p1: parseFloat(s_p1_input.value) || 0,
            e1: parseFloat(s_e1_input.value) || 0,
            p2: parseFloat(s_p2_input.value) || 0,
            e2: parseFloat(s_e2_input.value) || 0,
            p3: parseFloat(s_p3_input.value) || 0,
            e3: parseFloat(s_e3_input.value) || 0,
        };
    }
    
    // "What-If" feature (s_e3_input event listener) has been REMOVED.

    function calculateAndDisplay() {
        try {
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

            let weightSchemeLabelForRadio = "";
            if(document.querySelector(`label[for="weightScheme${weightScheme === '64' ? '1' : '2'}"]`)){
                weightSchemeLabelForRadio = document.querySelector(`label[for="weightScheme${weightScheme === '64' ? '1' : '2'}"]`).textContent.trim();
            }
            
            let calculationSummary = `權重選擇：${weightSchemeLabelForRadio}\n`;
            calculationSummary += `各項成績：\n  一段平時: ${scores.p1}, 一段段考: ${scores.e1}\n  二段平時: ${scores.p2}, 二段段考: ${scores.e2}\n  三段平時: ${scores.p3}\n`;

            if (calcMode === 'total') {
                calculationSummary += `  三段段考: ${scores.e3}\n`;
                const unroundedTotal = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                       (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                       (scores.p3 * W_P_each) + (scores.e3 * W_E_each);
                const finalGrade = Math.round(unroundedTotal);

                totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
                totalGradeResultDiv.style.display = 'block';

                statusResultDiv.classList.remove('pass', 'makeup', 'fail');
                let statusText = "";
                if (finalGrade >= 60) {
                    statusText = "狀態：恭喜過關！"; statusResultDiv.classList.add('pass');
                } else if (finalGrade >= 40) {
                    statusText = "狀態：需要補考！"; statusResultDiv.classList.add('makeup');
                } else {
                    statusText = "狀態：死當！"; statusResultDiv.classList.add('fail');
                }
                statusResultDiv.textContent = statusText;
                statusResultDiv.style.display = 'block';
                neededResultDiv.style.display = 'none';
                
                calculationSummary += `\n計算結果：\n  學期總成績: ${finalGrade}分\n  ${statusText}`;

            } else { // calcMode === 'needed'
                const customTarget = parseFloat(customTargetGradeInput.value) || 60;
                calculationSummary += `  (計算三段段考所需分數，目標總成績: ${customTarget}分)\n`;

                const knownUnroundedScoreSum = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                               (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                               (scores.p3 * W_P_each);
                
                let neededScore = Math.ceil((customTarget - 0.5 - knownUnroundedScoreSum) / W_E_each);
                let neededText = "";

                if (neededScore > 100) {
                    neededText = `為達總成績 ${customTarget} 分：即使三段段考考100分，也無法達到目標。`;
                } else if (neededScore <= 0) {
                    neededText = `為達總成績 ${customTarget} 分：您已達到此目標標準！`;
                } else {
                    neededText = `為達總成績 ${customTarget} 分，您的三段段考至少需要 ${neededScore} 分。`;
                }
                neededResultDiv.textContent = neededText;
                neededResultDiv.style.display = 'block';
                totalGradeResultDiv.style.display = 'none';
                statusResultDiv.style.display = 'none';

                calculationSummary += `\n計算結果：\n  ${neededText}`;
            }
            
            if(copyResultsButton) { // Check if button exists
                copyResultsButton.style.display = 'inline-block'; 
                copyResultsButton.setAttribute('data-summary', calculationSummary);
            }

        } catch (e) {
            console.error("計算或顯示時發生錯誤:", e);
            // Optionally display a user-friendly error message in the UI
            if(neededResultDiv) neededResultDiv.textContent = "計算時發生錯誤，請檢查輸入或稍後再試。";
            else if(totalGradeResultDiv) totalGradeResultDiv.textContent = "計算時發生錯誤，請檢查輸入或稍後再試。";
        }
    }
    
    function clearInputsAndResults() {
        try {
            if(s_p1_input) s_p1_input.value = ''; 
            if(s_e1_input) s_e1_input.value = '';
            if(s_p2_input) s_p2_input.value = ''; 
            if(s_e2_input) s_e2_input.value = '';
            if(s_p3_input) s_p3_input.value = ''; 
            if(s_e3_input) s_e3_input.value = '';
            if(customTargetGradeInput) customTargetGradeInput.value = '60';
            clearResultsAndHide();
            updateUIForMode(); 
        } catch (e) {
            console.error("清除時發生錯誤:", e);
        }
    }

    function clearResultsAndHide() {
        if(totalGradeResultDiv) { totalGradeResultDiv.textContent = ''; totalGradeResultDiv.style.display = 'none'; }
        if(statusResultDiv) { statusResultDiv.textContent = ''; statusResultDiv.style.display = 'none'; }
        if(neededResultDiv) { neededResultDiv.textContent = ''; neededResultDiv.style.display = 'none'; }
        if(copyResultsButton) {
            copyResultsButton.style.display = 'none';
            copyResultsButton.removeAttribute('data-summary');
        }
    }

    // --- Feature 4: Copy Results ---
    if (copyResultsButton) {
        copyResultsButton.addEventListener('click', () => {
            const summaryToCopy = copyResultsButton.getAttribute('data-summary');
            if (summaryToCopy) {
                navigator.clipboard.writeText(summaryToCopy)
                    .then(() => {
                        copyResultsButton.textContent = '已複製！';
                        setTimeout(() => { copyResultsButton.textContent = '複製結果摘要'; }, 2000);
                    })
                    .catch(err => {
                        console.error('複製失敗: ', err);
                        alert('複製失敗，您的瀏覽器可能不支援此功能或未授予權限。');
                    });
            }
        });
    }

    if (calculateButton) {
        calculateButton.addEventListener('click', calculateAndDisplay);
    } else {
        console.error("計算按鈕 ('calculateButton') 未找到！");
    }

    if (clearButton) {
        clearButton.addEventListener('click', clearInputsAndResults);
    } else {
        console.error("清除按鈕 ('clearButton') 未找到！");
    }

    // --- Mobile-Friendly Tooltip Click Logic ---
    const tooltipIcons = document.querySelectorAll('.tooltip-icon');
    tooltipIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-tooltip-target');
            const targetTooltipContent = document.getElementById(targetId);
            if (targetTooltipContent) {
                const isVisible = targetTooltipContent.style.display === 'block';
                // Hide all other open tooltips
                document.querySelectorAll('.tooltip-text-content').forEach(tt => {
                    if (tt.id !== targetId) { // don't hide the one we are about to toggle
                         tt.style.display = 'none';
                    }
                });
                targetTooltipContent.style.display = isVisible ? 'none' : 'block';
            }
        });
        // Accessibility: Allow Enter/Space to trigger click for keyboard users
        icon.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent page scroll on Space
                icon.click();
            }
        });
    });
    // Optional: Click outside to close tooltips
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.tooltip-icon') && !event.target.closest('.tooltip-text-content')) {
            document.querySelectorAll('.tooltip-text-content').forEach(tt => {
                tt.style.display = 'none';
            });
        }
    });

});
