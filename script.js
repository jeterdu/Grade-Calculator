document.addEventListener('DOMContentLoaded', () => {
    // --- DATA: Feng Hsin High School Rules ---
    const FENG_HSIN_RULES = {
        g10: { label: '高一', tracks: { all: { label: '不分組', subjects: { '國文': { exam: 0.6, formative: 0.4 }, '英文': { exam: 0.6, formative: 0.4 }, '數學': { exam: 0.6, formative: 0.4 }, '物理': { exam: 0.7, formative: 0.3 }, '化學': { exam: 0.7, formative: 0.3 }, '生物': { exam: 0.7, formative: 0.3 }, '地球科學': { exam: 0.7, formative: 0.3 }, '歷史': { exam: 0.7, formative: 0.3 }, '地理': { exam: 0.7, formative: 0.3 }, '公民與社會': { exam: 0.7, formative: 0.3 }, '藝能科': { exam: 0.5, formative: 0.5 } } } } },
        g11: { label: '高二', tracks: { natural: { label: '自然組', subjects: { '國文': { exam: 0.6, formative: 0.4 }, '英文': { exam: 0.6, formative: 0.4 }, '數學A': { exam: 0.6, formative: 0.4 }, '物理': { exam: 0.7, formative: 0.3 }, '化學': { exam: 0.7, formative: 0.3 }, '生物': { exam: 0.7, formative: 0.3 }, '地球科學': { exam: 0.7, formative: 0.3 }, '歷史': { exam: 0.7, formative: 0.3 }, '地理': { exam: 0.7, formative: 0.3 }, '公民與社會': { exam: 0.7, formative: 0.3 }, '藝能科': { exam: 0.5, formative: 0.5 } } }, social: { label: '社會組', subjects: { '國文': { exam: 0.6, formative: 0.4 }, '英文': { exam: 0.6, formative: 0.4 }, '數學B': { exam: 0.6, formative: 0.4 }, '物理': { exam: 0.7, formative: 0.3 }, '化學': { exam: 0.7, formative: 0.3 }, '生物': { exam: 0.7, formative: 0.3 }, '地球科學': { exam: 0.7, formative: 0.3 }, '歷史': { exam: 0.7, formative: 0.3 }, '地理': { exam: 0.7, formative: 0.3 }, '公民與社會': { exam: 0.7, formative: 0.3 }, '藝能科': { exam: 0.5, formative: 0.5 } } } } },
        g12: { label: '高三', tracks: { natural: { label: '自然組', subjects: { '國文': { exam: 0.6, formative: 0.4 }, '英文': { exam: 0.6, formative: 0.4 }, '數學甲': { exam: 0.6, formative: 0.4 }, '物理': { exam: 0.7, formative: 0.3 }, '化學': { exam: 0.7, formative: 0.3 }, '生物': { exam: 0.7, formative: 0.3 }, '地理': { exam: 0.7, formative: 0.3 }, '公民與社會': { exam: 0.7, formative: 0.3 }, '藝能科': { exam: 0.5, formative: 0.5 } } }, social: { label: '社會組', subjects: { '國文': { exam: 0.6, formative: 0.4 }, '英文': { exam: 0.6, formative: 0.4 }, '數學乙': { exam: 0.6, formative: 0.4 }, '物理': { exam: 0.7, formative: 0.3 }, '化學': { exam: 0.7, formative: 0.3 }, '選修科目': { exam: 0.7, formative: 0.3 }, '歷史': { exam: 0.7, formative: 0.3 }, '地理': { exam: 0.7, formative: 0.3 }, '公民與社會': { exam: 0.7, formative: 0.3 }, '藝能科': { exam: 0.5, formative: 0.5 } } } } }
    };

    // --- DOM ELEMENTS ---
    const elements = {
        masterSchemeRadios: document.getElementsByName('masterScheme'),
        fenghsinSelectorsDiv: document.getElementById('fenghsin-selectors'),
        gradeSelect: document.getElementById('grade-select'),
        trackSelect: document.getElementById('track-select'),
        subjectSelect: document.getElementById('subject-select'),
        calculatorBody: document.getElementById('calculator-body'),
        calculationModeRadios: document.getElementsByName('calculationMode'),
        customTargetInputContainer: document.getElementById('customTargetInputContainer'),
        customTargetGradeInput: document.getElementById('customTargetGrade'),
        scoresInputs: {}, errorSpans: {}, scoreItems: {},
        s_e3_item_div: document.getElementById('s_e3_item'),
        calculateButton: document.getElementById('calculateButton'),
        clearButton: document.getElementById('clearButton'),
        copyResultsButton: document.getElementById('copyResultsButton'),
        weightsDisplay: document.getElementById('selected-weights-display'),
        totalGradeResultDiv: document.getElementById('totalGradeResult'),
        statusResultDiv: document.getElementById('statusResult'),
        neededResultDiv: document.getElementById('neededResult')
    };
    const scoreInputIds = ['s_p1', 's_p2', 's_p3', 's_e1', 's_e2', 's_e3'];
    scoreInputIds.forEach(id => {
        elements.scoresInputs[id] = document.getElementById(id);
        elements.errorSpans[id] = document.getElementById(`error_${id}`);
        if (elements.scoresInputs[id]) {
            elements.scoreItems[id] = elements.scoresInputs[id].closest('.score-item');
        }
    });

    // --- LOCALSTORAGE & STATE ---
    const LS_KEYS = { masterScheme: 'gradeCalc_v2_masterScheme', grade: 'gradeCalc_v2_grade', track: 'gradeCalc_v2_track', subject: 'gradeCalc_v2_subject', calcMode: 'gradeCalc_v2_calcMode', scores: 'gradeCalc_v2_scores' };
    
    // --- HELPER FUNCTIONS ---
    function getSelectedRadioValue(name) {
        const radios = document.getElementsByName(name);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null; 
    }

    // --- UI POPULATION & STATE MANAGEMENT ---
    function populateGrades() { elements.gradeSelect.innerHTML = '<option value="">請選擇年級</option>'; for (const gradeKey in FENG_HSIN_RULES) { const option = document.createElement('option'); option.value = gradeKey; option.textContent = FENG_HSIN_RULES[gradeKey].label; elements.gradeSelect.appendChild(option); } }
    function populateTracks(gradeKey) { const tracks = FENG_HSIN_RULES[gradeKey]?.tracks || {}; elements.trackSelect.innerHTML = '<option value="">請選擇組別</option>'; for (const trackKey in tracks) { const option = document.createElement('option'); option.value = trackKey; option.textContent = tracks[trackKey].label; elements.trackSelect.appendChild(option); } elements.trackSelect.disabled = Object.keys(tracks).length === 0; }
    function populateSubjects(gradeKey, trackKey) { const subjects = FENG_HSIN_RULES[gradeKey]?.tracks[trackKey]?.subjects || {}; elements.subjectSelect.innerHTML = '<option value="">請選擇科目</option>'; for (const subjectName in subjects) { const option = document.createElement('option'); option.value = subjectName; option.textContent = subjectName; elements.subjectSelect.appendChild(option); } elements.subjectSelect.disabled = Object.keys(subjects).length === 0; }
    
    function updateScoreInputUI(masterScheme) {
        const p1_label = document.querySelector('label[for="s_p1"]');
        const p2_container = elements.scoreItems.s_p2;
        const p3_container = elements.scoreItems.s_p3;
        if (!p1_label || !p2_container || !p3_container) { return; }
        if (masterScheme === 'fenghsin') {
            p1_label.textContent = '平時成績';
            p2_container.classList.add('hidden');
            p3_container.classList.add('hidden');
        } else {
            p1_label.textContent = '平時成績(一)';
            p2_container.classList.remove('hidden');
            p3_container.classList.remove('hidden');
        }
    }

    function setUIState(masterScheme) {
        updateScoreInputUI(masterScheme);
        if (masterScheme === 'fenghsin') {
            elements.fenghsinSelectorsDiv.classList.remove('hidden');
            const subjectSelected = elements.subjectSelect.value !== "";
            elements.calculatorBody.classList.toggle('hidden', !subjectSelected);
        } else {
            elements.fenghsinSelectorsDiv.classList.add('hidden');
            elements.calculatorBody.classList.remove('hidden');
        }
        updateCalculationModeUI();
        clearResultsAndHide();
    }
    
    function updateCalculationModeUI() {
        const calcMode = getSelectedRadioValue('calculationMode');
        const customTargetContainer = elements.customTargetInputContainer;
        const finalExamItem = elements.s_e3_item_div;
        if (!customTargetContainer || !finalExamItem) { return; }
        if (calcMode === 'needed') {
            customTargetContainer.style.display = 'flex';
            finalExamItem.style.display = 'none';
        } else {
            customTargetContainer.style.display = 'none';
            finalExamItem.style.display = 'flex';
        }
    }

    // --- EVENT HANDLERS ---
    elements.masterSchemeRadios.forEach(radio => { radio.addEventListener('change', (e) => { const selectedScheme = e.target.value; localStorage.setItem(LS_KEYS.masterScheme, selectedScheme); setUIState(selectedScheme); }); });
    elements.gradeSelect.addEventListener('change', (e) => { const gradeKey = e.target.value; populateTracks(gradeKey); elements.trackSelect.value = ''; elements.subjectSelect.innerHTML = '<option value="">請先選擇組別</option>'; elements.subjectSelect.disabled = true; localStorage.setItem(LS_KEYS.grade, gradeKey); localStorage.removeItem(LS_KEYS.track); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.trackSelect.addEventListener('change', (e) => { const gradeKey = elements.gradeSelect.value; const trackKey = e.target.value; populateSubjects(gradeKey, trackKey); elements.subjectSelect.value = ''; localStorage.setItem(LS_KEYS.track, trackKey); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.subjectSelect.addEventListener('change', (e) => { const subject = e.target.value; localStorage.setItem(LS_KEYS.subject, subject); setUIState('fenghsin'); displaySelectedWeights(); });
    elements.calculationModeRadios.forEach(radio => { radio.addEventListener('change', (e) => { localStorage.setItem(LS_KEYS.calcMode, e.target.value); updateCalculationModeUI(); }); });
    
    function validateScoreInput(inputElement) {
        if (!inputElement) return true;
        const errorElement = elements.errorSpans[inputElement.id];
        if (!errorElement) return true;
        const value = parseFloat(inputElement.value);
        let errorMessage = "";
        if (inputElement.value.trim() === "") {
            inputElement.classList.remove('input-invalid');
            errorElement.style.display = 'none';
            return true;
        }
        if (isNaN(value) || value < 0 || value > 100) {
            errorMessage = value < 0 ? "不能小於0" : "分數應介於0-100";
            inputElement.classList.add('input-invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            inputElement.classList.remove('input-invalid');
            errorElement.style.display = 'none';
            return true;
        }
    }
    scoreInputIds.forEach(id => { const inputElement = elements.scoresInputs[id]; if (inputElement) { inputElement.addEventListener('input', () => { validateScoreInput(inputElement); saveAllScores(); }); } });

    function getWeights() {
        const masterScheme = getSelectedRadioValue('masterScheme');
        switch (masterScheme) {
            case 'generic64': return { exam: 0.6, formative: 0.4, label: '通用方式 (60/40)' };
            case 'generic73': return { exam: 0.7, formative: 0.3, label: '通用方式 (70/30)' };
            case 'fenghsin':
                const grade = elements.gradeSelect.value; const track = elements.trackSelect.value; const subject = elements.subjectSelect.value;
                if (!grade || !track || !subject) return null;
                return FENG_HSIN_RULES[grade]?.tracks[track]?.subjects[subject] || null;
            default: return null;
        }
    }
    function displaySelectedWeights() { const weights = getWeights(); if (weights && elements.weightsDisplay) { const examPercent = (weights.exam * 100).toFixed(1).replace(/\.0$/, ''); const formativePercent = (weights.formative * 100).toFixed(1).replace(/\.0$/, ''); elements.weightsDisplay.textContent = `當前權重：定期 ${examPercent}%, 平時 ${formativePercent}%`; elements.weightsDisplay.style.display = 'block'; } else { if(elements.weightsDisplay) elements.weightsDisplay.style.display = 'none'; } }
    
    function calculateAndDisplay() {
        let allInputsValid = true; scoreInputIds.forEach(id => { const currentInput = elements.scoresInputs[id]; if (currentInput && currentInput.closest('.score-item') && !currentInput.closest('.score-item').classList.contains('hidden')) { if (!validateScoreInput(currentInput)) { allInputsValid = false; } } });
        if (!allInputsValid) { alert("部分成績輸入無效 (例如超出0-100範圍)，請修正紅色提示的欄位後再計算。"); return; }
        const weights = getWeights(); if (!weights) { alert("請先完成所有計分方式的選擇！"); return; }
        displaySelectedWeights();
        const scores = {}; scoreInputIds.forEach(id => { scores[id] = parseFloat(elements.scoresInputs[id].value) || 0; });
        const masterScheme = getSelectedRadioValue('masterScheme');
        
        // ** THE FIX IS HERE **
        const checkedMasterRadio = document.querySelector('input[name="masterScheme"]:checked');
        const masterSchemeLabelText = checkedMasterRadio ? checkedMasterRadio.labels[0].textContent.trim() : '未知計分方式';
        let calculationSummary = `計分方式: ${masterSchemeLabelText}\n`;
        // ** END FIX **

        if (masterScheme === 'fenghsin') { calculationSummary += `選擇: ${elements.gradeSelect.options[elements.gradeSelect.selectedIndex].text}, ${elements.trackSelect.options[elements.trackSelect.selectedIndex].text}, ${elements.subjectSelect.value}\n`; }
        
        const formativeScoreComponent = (masterScheme === 'fenghsin') ? scores.s_p1 : (scores.s_p1 + scores.s_p2 + scores.s_p3) / 3;
        const calcMode = getSelectedRadioValue('calculationMode');
        
        clearResultsAndHide(true);
        if (calcMode === 'total') {
            const avgExam = (scores.s_e1 + scores.s_e2 + scores.s_e3) / 3;
            const finalGrade = Math.round((formativeScoreComponent * weights.formative) + (avgExam * weights.exam));
            elements.totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
            elements.totalGradeResultDiv.style.display = 'block';
            let statusText = "";
            if (finalGrade >= 60) { statusText = "狀態：恭喜過關！"; elements.statusResultDiv.className = 'result-item pass'; } else if (finalGrade >= 40) { statusText = "狀態：您可能需要補考！"; elements.statusResultDiv.className = 'result-item makeup'; } else { statusText = "狀態：您可能會被當！"; elements.statusResultDiv.className = 'result-item fail'; }
            elements.statusResultDiv.textContent = statusText;
            elements.statusResultDiv.style.display = 'block';
            calculationSummary += `計算結果:\n學期總成績: ${finalGrade}分\n${statusText}`;
        } else {
            const knownFormativePart = formativeScoreComponent * weights.formative;
            const neededForTarget = (targetGrade) => { return Math.ceil(((targetGrade - 0.5 - knownFormativePart) * 3 / weights.exam) - scores.s_e1 - scores.s_e2); };
            const generateText = (score, label) => { if (score > 100) return `${label}：即使期末考考100分，也無法達到目標。`; if (score <= 0) return `${label}：您已達到此目標標準！`; return `${label}，您的期末考至少需要 ${score} 分。`; };
            const neededFor60 = neededForTarget(60); const neededFor40 = neededForTarget(40); const customTarget = parseFloat(elements.customTargetGradeInput.value) || 70; const neededForCustom = neededForTarget(customTarget);
            const text60 = generateText(neededFor60, "為避免補考 (達60分)"); const text40 = generateText(neededFor40, "為避免被當 (達40分)"); const textCustom = generateText(neededForCustom, `為達自訂目標 (${customTarget}分)`);
            elements.neededResultDiv.innerHTML = `${text60}<br>${text40}<br>${textCustom}`;
            elements.neededResultDiv.style.display = 'block';
            calculationSummary += `計算結果:\n${text60}\n${text40}\n${textCustom}`;
        }
        elements.copyResultsButton.style.display = 'inline-block';
        elements.copyResultsButton.setAttribute('data-summary', calculationSummary);
    }

    function saveAllScores() { const scores = {}; scoreInputIds.forEach(id => { scores[id] = elements.scoresInputs[id].value; }); localStorage.setItem(LS_KEYS.scores, JSON.stringify(scores)); }
    function loadAllScores() { const savedScores = localStorage.getItem(LS_KEYS.scores); if (savedScores) { try { const scores = JSON.parse(savedScores); scoreInputIds.forEach(id => { if (elements.scoresInputs[id] && scores[id] !== undefined) { elements.scoresInputs[id].value = scores[id]; validateScoreInput(elements.scoresInputs[id]); } }); } catch (e) { console.error("解析已儲存的分數時出錯:", e); } } }
    function clearInputsAndResults() { scoreInputIds.forEach(id => { if (elements.scoresInputs[id]) { elements.scoresInputs[id].value = ''; validateScoreInput(elements.scoresInputs[id]); } }); if (elements.customTargetGradeInput) elements.customTargetGradeInput.value = '70'; localStorage.removeItem(LS_KEYS.scores); clearResultsAndHide(); }
    function clearResultsAndHide(keepWeightDisplay = false) { elements.totalGradeResultDiv.style.display = 'none'; elements.statusResultDiv.style.display = 'none'; elements.neededResultDiv.style.display = 'none'; elements.copyResultsButton.style.display = 'none'; if (!keepWeightDisplay && elements.weightsDisplay) { elements.weightsDisplay.style.display = 'none'; } }
    
    function initialize() {
        populateGrades();
        const savedMasterScheme = localStorage.getItem(LS_KEYS.masterScheme) || 'generic64';
        document.querySelector(`input[name="masterScheme"][value="${savedMasterScheme}"]`).checked = true;
        if (savedMasterScheme === 'fenghsin') {
            const savedGrade = localStorage.getItem(LS_KEYS.grade);
            if (savedGrade) {
                elements.gradeSelect.value = savedGrade;
                populateTracks(savedGrade);
                const savedTrack = localStorage.getItem(LS_KEYS.track);
                if (savedTrack) {
                    elements.trackSelect.value = savedTrack;
                    populateSubjects(savedGrade, savedTrack);
                    const savedSubject = localStorage.getItem(LS_KEYS.subject);
                    if (savedSubject) { elements.subjectSelect.value = savedSubject; }
                }
            }
        }
        const savedCalcMode = localStorage.getItem(LS_KEYS.calcMode) || 'total';
        document.querySelector(`input[name="calculationMode"][value="${savedCalcMode}"]`).checked = true;
        loadAllScores();
        setUIState(savedMasterScheme);
        if (savedMasterScheme === 'fenghsin') displaySelectedWeights();
    }
    
    elements.calculateButton.addEventListener('click', calculateAndDisplay);
    elements.clearButton.addEventListener('click', clearInputsAndResults);
    if (elements.copyResultsButton) {
        elements.copyResultsButton.addEventListener('click', () => {
            const summaryToCopy = elements.copyResultsButton.getAttribute('data-summary');
            if (summaryToCopy && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(summaryToCopy).then(() => {
                    elements.copyResultsButton.textContent = '已複製！';
                    setTimeout(() => { elements.copyResultsButton.textContent = '複製結果摘要'; }, 2000);
                }).catch(err => { console.error('複製結果時發生錯誤: ', err); });
            }
        });
    }

    initialize();
});
