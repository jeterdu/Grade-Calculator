document.addEventListener('DOMContentLoaded', () => {
    // --- DATA: Feng Hsin High School Precise Rules v3.0 ---
    const FENG_HSIN_RULES = {
        g10: { label: '高一', tracks: { all: { label: '不分組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [101], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學': { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24 }, '歷史': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.00, w_e2: 0.20, w_e3: 0.20 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' } }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' }, '物理':       { exceptions: [ { classIds: [102], rule: { w_f: 0.70, w_e1: 0.10, w_e2: 0.10, w_e3: 0.10 } } ], defaultRule: { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1班)規則' } }, '化學':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '生物':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' }, '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '美術':       { w_f: 0.20, w_e1: 0.20, w_e2: 0.30, w_e3: 0.30 }, '水彩':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '水墨':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '書法':       { w_f: 0.40, w_e1: 0.00, w_e2: 0.30, w_e3: 0.30 }, '創意表現':   { w_f: 0.50, w_e1: 0.15, w_e2: 0.15, w_e3: 0.20 }, '演奏實習':   { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 } } } } },
        g11: { label: '高二', tracks: { natural: { label: '自然組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學A':      { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' }, '歷史': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '物理-力學二': { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 }, '化學-物質構造': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '生物-動物體的構造': { w_f: 0.30, w_e1: 0.25, w_e2: 0.25, w_e3: 0.20 } } }, social: { label: '社會組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學B': { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' },'歷史': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 } } } } },
        g12: { label: '高三', tracks: { natural: { label: '自然組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '數學甲':     { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30 }, '物理':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 }, '化學':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 }, '生物':       { w_f: 0.30, w_e1: 0.35, w_e2: 0.35, w_e3: 0.00 }, '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 } } }, social: { label: '社會組', subjects: { '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '數學乙':     { exceptions: [ { classRange: [303, 304], rule: { w_f: 0.00, w_e1: 0.00, w_e2: 0.50, w_e3: 0.50 } }, { classRange: [305, 307], rule: { w_f: 0.50, w_e1: 0.00, w_e2: 0.00, w_e3: 0.50 } } ], defaultRule: { w_f: 0.00, w_e1: 0.25, w_e2: 0.25, w_e3: 0.50, note: '採用(不含303,304,305,307)規則' } }, '歷史':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30, note: '採用(不含1,2班)規則' }, '地理':       { w_f: 0.60, w_e1: 0.40, w_e2: 0.00, w_e3: 0.00 }, '公民與社會':   { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 } } } } }
    };

    // --- DOM ELEMENTS ---
    const elements = { masterSchemeRadios: document.getElementsByName('masterScheme'), fenghsinSelectorsDiv: document.getElementById('fenghsin-selectors'), gradeSelect: document.getElementById('grade-select'), trackSelect: document.getElementById('track-select'), subjectSelect: document.getElementById('subject-select'), classInputContainer: document.getElementById('class-input-container'), classInput: document.getElementById('class-input'), calculatorBody: document.getElementById('calculator-body'), calculationModeRadios: document.getElementsByName('calculationMode'), customTargetInputContainer: document.getElementById('customTargetInputContainer'), customTargetGradeInput: document.getElementById('customTargetGrade'), scoreInputsContainer: document.getElementById('score-inputs-container'), scoresInputs: {}, calculateButton: document.getElementById('calculateButton'), clearButton: document.getElementById('clearButton'), copyResultsButton: document.getElementById('copyResultsButton'), weightsDisplay: document.getElementById('selected-weights-display'), totalGradeResultDiv: document.getElementById('totalGradeResult'), statusResultDiv: document.getElementById('statusResult'), neededResultDiv: document.getElementById('neededResult'), };
    
    // --- LOCALSTORAGE & STATE ---
    const LS_KEYS = { masterScheme: 'gradeCalc_v3_masterScheme', grade: 'gradeCalc_v3_grade', class: 'gradeCalc_v3_class', track: 'gradeCalc_v3_track', subject: 'gradeCalc_v3_subject', calcMode: 'gradeCalc_v3_calcMode', scores: 'gradeCalc_v3_scores' };
    
    // --- *** THE MISSING HELPER FUNCTION *** ---
    function getSelectedRadioValue(name) {
        const radios = document.getElementsByName(name);
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null; // Should not happen if HTML has a default checked
    }

    // --- UI POPULATION & DYNAMIC RENDERING ---
    function populateGrades() { elements.gradeSelect.innerHTML = '<option value="">請選擇年級</option>'; for (const gradeKey in FENG_HSIN_RULES) { const option = document.createElement('option'); option.value = gradeKey; option.textContent = FENG_HSIN_RULES[gradeKey].label; elements.gradeSelect.appendChild(option); } }
    function populateTracks(gradeKey) { const tracks = FENG_HSIN_RULES[gradeKey]?.tracks || {}; elements.trackSelect.innerHTML = '<option value="">請選擇組別</option>'; for (const trackKey in tracks) { const option = document.createElement('option'); option.value = trackKey; option.textContent = tracks[trackKey].label; elements.trackSelect.appendChild(option); } elements.trackSelect.disabled = Object.keys(tracks).length === 0; }
    function populateSubjects(gradeKey, trackKey) { const subjects = FENG_HSIN_RULES[gradeKey]?.tracks[trackKey]?.subjects || {}; elements.subjectSelect.innerHTML = '<option value="">請選擇科目</option>'; for (const subjectName in subjects) { const option = document.createElement('option'); option.value = subjectName; option.textContent = subjectName; elements.subjectSelect.appendChild(option); } elements.subjectSelect.disabled = Object.keys(subjects).length === 0; }
    
    function renderScoreInputs(masterScheme, weights) {
        elements.scoreInputsContainer.innerHTML = '';
        elements.scoresInputs = {};
        const scoresInputDiv = document.createElement('div');
        scoresInputDiv.className = 'scores-input';
        const title = document.createElement('h2');
        title.textContent = '輸入各項成績 (0-100)';
        scoresInputDiv.appendChild(title);
        let inputsToRender = [];
        if (masterScheme === 'fenghsin') {
            if (!weights) return;
            const scoreMap = { 'w_f': { id: 's_p1', label: '平時成績' }, 'w_e1': { id: 's_e1', label: '期一考 (一段)', class: 'exam-score' }, 'w_e2': { id: 's_e2', label: '期二考 (二段)', class: 'exam-score' }, 'w_e3': { id: 's_e3', label: '期末考 (三段)', class: 'exam-score' }};
            for (const key in scoreMap) { if (weights[key] > 0) { inputsToRender.push(scoreMap[key]); } }
        } else {
            inputsToRender = [ { id: 's_p1', label: '平時成績(一)' }, { id: 's_p2', label: '平時成績(二)' }, { id: 's_p3', label: '平時成績(三)' }, { id: 's_e1', label: '段考(一)', class: 'exam-score' }, { id: 's_e2', label: '段考(二)', class: 'exam-score' }, { id: 's_e3', label: '段考(三)', class: 'exam-score' } ];
        }
        inputsToRender.forEach(item => {
            const scoreItemDiv = document.createElement('div');
            scoreItemDiv.className = 'score-item';
            if (item.class) scoreItemDiv.classList.add(item.class);
            if (item.id === 's_e3') scoreItemDiv.id = 's_e3_item';
            const label = document.createElement('label'); label.htmlFor = item.id; label.textContent = item.label;
            const input = document.createElement('input'); input.type = 'number'; input.id = item.id; input.min = 0; input.max = 100; input.placeholder = '0-100';
            const errorSpan = document.createElement('span'); errorSpan.className = 'error-message'; errorSpan.id = `error_${item.id}`;
            scoreItemDiv.appendChild(label); scoreItemDiv.appendChild(input); scoreItemDiv.appendChild(errorSpan);
            scoresInputDiv.appendChild(scoreItemDiv);
            elements.scoresInputs[item.id] = input;
            input.addEventListener('input', () => { validateScoreInput(input); saveAllScores(); });
        });
        elements.scoreInputsContainer.appendChild(scoresInputDiv);
    }

    function setUIState(masterScheme) {
        const fenghsinSelected = masterScheme === 'fenghsin';
        elements.fenghsinSelectorsDiv.classList.toggle('hidden', !fenghsinSelected);
        if (!fenghsinSelected) {
            renderScoreInputs(masterScheme, getWeights());
            elements.calculatorBody.classList.remove('hidden');
            elements.classInputContainer.classList.add('hidden');
        } else {
            handleSubjectChange();
        }
        clearResultsAndHide();
    }
    
    function updateCalculationModeUI() {
        const calcMode = getSelectedRadioValue('calculationMode');
        const customTargetContainer = elements.customTargetInputContainer;
        const finalExamItem = document.getElementById('s_e3_item'); 
        if (!customTargetContainer) return;
        if (calcMode === 'needed') {
            customTargetContainer.style.display = 'flex';
            if (finalExamItem) finalExamItem.style.display = 'none';
        } else {
            customTargetContainer.style.display = 'none';
            if (finalExamItem) finalExamItem.style.display = 'flex';
        }
    }

    function handleSubjectChange() {
        const subject = elements.subjectSelect.value;
        localStorage.setItem(LS_KEYS.subject, subject);
        const grade = elements.gradeSelect.value;
        const track = elements.trackSelect.value;
        if (!grade || !track) return;
        const subjectRules = FENG_HSIN_RULES[grade]?.tracks[track]?.subjects[subject];
        const needsClassInput = subjectRules && subjectRules.exceptions;
        elements.classInputContainer.classList.toggle('hidden', !needsClassInput);
        const canProceed = subject && (!needsClassInput || (needsClassInput && elements.classInput.value.trim() !== ''));
        if (canProceed) {
            const weights = getWeights();
            renderScoreInputs('fenghsin', weights);
            elements.calculatorBody.classList.remove('hidden');
            displaySelectedWeights();
        } else {
            elements.calculatorBody.classList.add('hidden');
            elements.weightsDisplay.style.display = 'none';
        }
        updateCalculationModeUI();
    }
    
    function getWeights() {
        const masterScheme = getSelectedRadioValue('masterScheme');
        if (masterScheme === 'generic64') return { label: '通用方式 (60/40)', formative: 0.4, exam: 0.6 };
        if (masterScheme === 'generic73') return { label: '通用方式 (70/30)', formative: 0.3, exam: 0.7 };
        if (masterScheme === 'fenghsin') {
            const grade = elements.gradeSelect.value; const track = elements.trackSelect.value; const subject = elements.subjectSelect.value;
            if (!grade || !track || !subject) return null;
            const subjectRules = FENG_HSIN_RULES[grade]?.tracks[track]?.subjects[subject];
            if (!subjectRules) return null;
            if (subjectRules.exceptions) {
                const classNum = parseInt(elements.classInput.value) || 0;
                for (const ex of subjectRules.exceptions) {
                    if (ex.classIds && ex.classIds.includes(classNum)) return ex.rule;
                    if (ex.classRange && classNum >= ex.classRange[0] && classNum <= ex.classRange[1]) return ex.rule;
                }
                return subjectRules.defaultRule;
            }
            return subjectRules;
        }
        return null;
    }
    
    function displaySelectedWeights() { /* ... same as previous ... */ }
    function calculateAndDisplay() { /* ... same as previous ... */ }
    function validateScoreInput(inputElement) { /* ... same as previous ... */ }
    function saveAllScores() { /* ... same as previous ... */ }
    function loadAllScores() { /* ... same as previous ... */ }
    function clearInputsAndResults() { /* ... same as previous ... */ }
    function clearResultsAndHide(keepWeightDisplay = false) { /* ... same as previous ... */ }
    
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
                    if (savedSubject) { 
                        elements.subjectSelect.value = savedSubject; 
                    }
                }
            }
        }
        
        const savedCalcMode = localStorage.getItem(LS_KEYS.calcMode) || 'total';
        document.querySelector(`input[name="calculationMode"][value="${savedCalcMode}"]`).checked = true;
        
        const savedClassNum = localStorage.getItem(LS_KEYS.class);
        if (elements.classInput && savedClassNum) { elements.classInput.value = savedClassNum; }
        
        setUIState(savedMasterScheme);
        loadAllScores();
    }
    
    // Attach Event Listeners
    elements.masterSchemeRadios.forEach(radio => { radio.addEventListener('change', (e) => { localStorage.setItem(LS_KEYS.masterScheme, e.target.value); setUIState(e.target.value); }); });
    elements.gradeSelect.addEventListener('change', (e) => { const gradeKey = e.target.value; populateTracks(gradeKey); elements.trackSelect.value = ''; elements.subjectSelect.innerHTML = '<option value="">請先選擇組別</option>'; elements.subjectSelect.disabled = true; localStorage.setItem(LS_KEYS.grade, gradeKey); localStorage.removeItem(LS_KEYS.track); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.trackSelect.addEventListener('change', (e) => { const gradeKey = elements.gradeSelect.value; const trackKey = e.target.value; populateSubjects(gradeKey, trackKey); elements.subjectSelect.value = ''; localStorage.setItem(LS_KEYS.track, trackKey); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.subjectSelect.addEventListener('change', handleSubjectChange);
    elements.classInput.addEventListener('input', () => { localStorage.setItem(LS_KEYS.class, elements.classInput.value); handleSubjectChange(); });
    elements.calculationModeRadios.forEach(radio => { radio.addEventListener('change', (e) => { localStorage.setItem(LS_KEYS.calcMode, e.target.value); updateCalculationModeUI(); }); });
    elements.calculateButton.addEventListener('click', calculateAndDisplay);
    elements.clearButton.addEventListener('click', clearInputsAndResults);
    if (elements.copyResultsButton) { elements.copyResultsButton.addEventListener('click', () => { const summaryToCopy = elements.copyResultsButton.getAttribute('data-summary'); if (summaryToCopy && navigator.clipboard?.writeText) { navigator.clipboard.writeText(summaryToCopy).then(() => { elements.copyResultsButton.textContent = '已複製！'; setTimeout(() => { elements.copyResultsButton.textContent = '複製結果摘要'; }, 2000); }).catch(err => { console.error('複製結果時發生錯誤: ', err); }); } }); }

    initialize();
});
