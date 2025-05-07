document.addEventListener('DOMContentLoaded', () => {
    const s_p1 = document.getElementById('s_p1');
    const s_e1 = document.getElementById('s_e1');
    const s_p2 = document.getElementById('s_p2');
    const s_e2 = document.getElementById('s_e2');
    const s_p3 = document.getElementById('s_p3');
    const s_e3 = document.getElementById('s_e3');
    const s_e3_item = document.getElementById('s_e3_item');

    const weightSchemeRadios = document.getElementsByName('weightScheme');
    const calculationModeRadios = document.getElementsByName('calculationMode');
    const calculateButton = document.getElementById('calculateButton');
    const clearButton = document.getElementById('clearButton');

    const totalGradeResultDiv = document.getElementById('totalGradeResult');
    const statusResultDiv = document.getElementById('statusResult');
    const neededFor60ResultDiv = document.getElementById('neededFor60Result');
    const neededFor40ResultDiv = document.getElementById('neededFor40Result');

    function getSelectedWeightScheme() {
        for (const radio of weightSchemeRadios) {
            if (radio.checked) return radio.value;
        }
        return "64"; // Default
    }

    function getSelectedCalculationMode() {
        for (const radio of calculationModeRadios) {
            if (radio.checked) return radio.value;
        }
        return "total"; // Default
    }

    calculationModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = getSelectedCalculationMode();
            if (mode === 'total') {
                s_e3_item.style.display = 'flex';
                totalGradeResultDiv.style.display = 'block';
                statusResultDiv.style.display = 'block';
                neededFor60ResultDiv.style.display = 'none';
                neededFor40ResultDiv.style.display = 'none';
            } else { // mode === 'needed'
                s_e3_item.style.display = 'none'; // Hide final exam input
                totalGradeResultDiv.style.display = 'none';
                statusResultDiv.style.display = 'none';
                neededFor60ResultDiv.style.display = 'block';
                neededFor40ResultDiv.style.display = 'block';
            }
            clearResults();
        });
    });
    
    // Trigger change event on page load to set initial visibility
    document.querySelector('input[name="calculationMode"]:checked').dispatchEvent(new Event('change'));


    function getScores() {
        return {
            p1: parseFloat(s_p1.value) || 0,
            e1: parseFloat(s_e1.value) || 0,
            p2: parseFloat(s_p2.value) || 0,
            e2: parseFloat(s_e2.value) || 0,
            p3: parseFloat(s_p3.value) || 0,
            e3: parseFloat(s_e3.value) || 0,
        };
    }

    function calculateAndDisplay() {
        const scores = getScores();
        const weightScheme = getSelectedWeightScheme();
        const calcMode = getSelectedCalculationMode();

        clearResults(); // Clear previous results before new calculation

        let W_P_each, W_E_each; // Weight for each formative, weight for each exam

        if (weightScheme === "64") { // 段考60% (各20%), 平時40% (各40%/3)
            W_E_each = 0.20;
            W_P_each = 0.40 / 3;
        } else { // weightScheme === "73" -> 段考70% (各70%/3), 平時30% (各10%)
            W_P_each = 0.30 / 3; // which is 0.10
            W_E_each = 0.70 / 3;
        }

        if (calcMode === 'total') {
            const unroundedTotal = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                   (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                   (scores.p3 * W_P_each) + (scores.e3 * W_E_each);
            const finalGrade = Math.round(unroundedTotal);

            totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
            totalGradeResultDiv.style.display = 'block';


            statusResultDiv.classList.remove('pass', 'makeup', 'fail');
            if (finalGrade >= 60) {
                statusResultDiv.textContent = "狀態：恭喜過關！";
                statusResultDiv.classList.add('pass');
            } else if (finalGrade >= 40) {
                statusResultDiv.textContent = "狀態：需要補考！";
                statusResultDiv.classList.add('makeup');
            } else {
                statusResultDiv.textContent = "狀態：死當！";
                statusResultDiv.classList.add('fail');
            }
            statusResultDiv.style.display = 'block';
            neededFor60ResultDiv.style.display = 'none';
            neededFor40ResultDiv.style.display = 'none';

        } else { // calcMode === 'needed'
            const knownUnroundedScoreSum = (scores.p1 * W_P_each) + (scores.e1 * W_E_each) +
                                           (scores.p2 * W_P_each) + (scores.e2 * W_E_each) +
                                           (scores.p3 * W_P_each);

            // Calculate needed for 60 (avoid makeup)
            let neededFor60 = Math.ceil((60 - 0.5 - knownUnroundedScoreSum) / W_E_each);
            if (neededFor60 > 100) {
                neededFor60ResultDiv.textContent = "為達60分(免補考)：即使三段段考考100分，也無法達到60分。";
            } else if (neededFor60 <= 0) {
                neededFor60ResultDiv.textContent = "為達60分(免補考)：您已達到60分標準，無需擔心！";
            } else {
                neededFor60ResultDiv.textContent = `為達60分(免補考)，您的三段段考至少需要 ${neededFor60} 分。`;
            }

            // Calculate needed for 40 (avoid fail)
            let neededFor40 = Math.ceil((40 - 0.5 - knownUnroundedScoreSum) / W_E_each);
            if (neededFor40 > 100) {
                neededFor40ResultDiv.textContent = "為達40分(免死當)：即使三段段考考100分，也無法達到40分。";
            } else if (neededFor40 <= 0) {
                neededFor40ResultDiv.textContent = "為達40分(免死當)：您已達到40分標準！";
            } else {
                neededFor40ResultDiv.textContent = `為達40分(免死當)，您的三段段考至少需要 ${neededFor40} 分。`;
            }
            
            totalGradeResultDiv.style.display = 'none';
            statusResultDiv.style.display = 'none';
            neededFor60ResultDiv.style.display = 'block';
            neededFor40ResultDiv.style.display = 'block';
        }
    }
    
    function clearInputsAndResults() {
        s_p1.value = '';
        s_e1.value = '';
        s_p2.value = '';
        s_e2.value = '';
        s_p3.value = '';
        s_e3.value = '';
        clearResults();
    }

    function clearResults() {
        totalGradeResultDiv.textContent = '';
        statusResultDiv.textContent = '';
        neededFor60ResultDiv.textContent = '';
        neededFor40ResultDiv.textContent = '';
        // Do not hide them here, visibility is controlled by mode change
    }

    calculateButton.addEventListener('click', calculateAndDisplay);
    clearButton.addEventListener('click', clearInputsAndResults);
});