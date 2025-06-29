document.addEventListener('DOMContentLoaded', () => {
    // --- DATA: Feng Hsin High School Precise Rules v3.0 ---
    const FENG_HSIN_RULES = {
        g10: {
            label: '高一',
            tracks: {
                all: {
                    label: '不分組',
                    subjects: {
                        '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '英文':       { exceptions: [ { classIds: [101], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } },
                        '數學':       { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24 },
                        '歷史':       { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.00, w_e2: 0.20, w_e3: 0.20 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' } },
                        '地理':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' },
                        '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' },
                        '物理':       { exceptions: [ { classIds: [102], rule: { w_f: 0.70, w_e1: 0.10, w_e2: 0.10, w_e3: 0.10 } } ], defaultRule: { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1班)規則' } },
                        '化學':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 },
                        '生物':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' },
                        '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 },
                        '美術':       { w_f: 0.20, w_e1: 0.20, w_e2: 0.30, w_e3: 0.30 },
                        '水彩':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '水墨':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '書法':       { w_f: 0.40, w_e1: 0.00, w_e2: 0.30, w_e3: 0.30 },
                        '創意表現':   { w_f: 0.50, w_e1: 0.15, w_e2: 0.15, w_e3: 0.20 },
                        '演奏實習':   { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 }
                    }
                }
            }
        },
        g11: {
            label: '高二',
            tracks: {
                natural: {
                    label: '自然組',
                    subjects: {
                        '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '英文':       { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } },
                        '數學A':      { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' },
                        '歷史':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '地理':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 },
                        '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '物理-力學二': { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 },
                        '化學-物質構造': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 },
                        '生物-動物體的構造': { w_f: 0.30, w_e1: 0.25, w_e2: 0.25, w_e3: 0.20 }
                    }
                },
                social: {
                    label: '社會組',
                    subjects: {
                        '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '英文':       { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } },
                        '數學B':      { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' },
                        '歷史':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '地理':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 },
                        '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }
                    }
                }
            }
        },
        g12: {
            label: '高三',
            tracks: {
                natural: {
                    label: '自然組',
                    subjects: {
                        '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '英文':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '數學甲':     { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30 },
                        '物理':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 },
                        '化學':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 },
                        '生物':       { w_f: 0.30, w_e1: 0.35, w_e2: 0.35, w_e3: 0.00 },
                        '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }
                    }
                },
                social: {
                    label: '社會組',
                    subjects: {
                        '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 },
                        '英文':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 },
                        '數學乙':     { exceptions: [ { classRange: [303, 304], rule: { w_f: 0.00, w_e1: 0.00, w_e2: 0.50, w_e3: 0.50 } }, { classRange: [305, 307], rule: { w_f: 0.50, w_e1: 0.00, w_e2: 0.00, w_e3: 0.50 } } ], defaultRule: { w_f: 0.00, w_e1: 0.25, w_e2: 0.25, w_e3: 0.50, note: '採用(不含303,304,305,307)規則' } },
                        '歷史':       { exceptions: [ { classIds: [302], rule: { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30 } } ], defaultRule: { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30, note: '採用(不含1,2班)規則' } },
                        '地理':       { w_f: 0.60, w_e1: 0.40, w_e2: 0.00, w_e3: 0.00 }, // Note: Sum is 1.0, not > 1
                        '公民與社會':   { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 }
                    }
                }
            }
        }
    };

    // --- DOM ELEMENTS ---
    const elements = { masterSchemeRadios: document.getElementsByName('masterScheme'), fenghsinSelectorsDiv: document.getElementById('fenghsin-selectors'), gradeSelect: document.getElementById('grade-select'), trackSelect: document.getElementById('track-select'), subjectSelect: document.getElementById('subject-select'), classInputContainer: document.getElementById('class-input-container'), classInput: document.getElementById('class-input'), calculatorBody: document.getElementById('calculator-body'), calculationModeRadios: document.getElementsByName('calculationMode'), customTargetInputContainer: document.getElementById('customTargetInputContainer'), customTargetGradeInput: document.getElementById('customTargetGrade'), scoreInputsContainer: document.getElementById('score-inputs-container'), scoresInputs: {}, calculateButton: document.getElementById('calculateButton'), clearButton: document.getElementById('clearButton'), copyResultsButton: document.getElementById('copyResultsButton'), weightsDisplay: document.getElementById('selected-weights-display'), totalGradeResultDiv: document.getElementById('totalGradeResult'), statusResultDiv: document.getElementById('statusResult'), neededResultDiv: document.getElementById('neededResult') };
    
    // --- LOCALSTORAGE & STATE ---
    const LS_KEYS = { masterScheme: 'gradeCalc_v3_masterScheme', grade: 'gradeCalc_v3_grade', class: 'gradeCalc_v3_class', track: 'gradeCalc_v3_track', subject: 'gradeCalc_v3_subject', calcMode: 'gradeCalc_v3_calcMode', scores: 'gradeCalc_v3_scores' };
    
    // --- HELPER FUNCTIONS ---
    function getSelectedRadioValue(name) { const radios = document.getElementsByName(name); for (let i = 0; i < radios.length; i++) { if (radios[i].checked) { return radios[i].value; } } return null; }

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

    // --- UI STATE MANAGEMENT ---
    function setUIState(masterScheme) {
        const fenghsinSelected = masterScheme === 'fenghsin';
        elements.fenghsinSelectorsDiv.classList.toggle('hidden', !fenghsinSelected);
        if (!fenghsinSelected) {
            renderScoreInputs(masterScheme, getWeights());
            elements.calculatorBody.classList.remove('hidden');
        } else {
            handleSubjectChange(); // Let subject change handler manage UI
        }
        updateCalculationModeUI();
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
        const grade = elements.gradeSelect.value;
        const track = elements.trackSelect.value;
        localStorage.setItem(LS_KEYS.subject, subject);
        const subjectRules = FENG_HSIN_RULES[grade]?.tracks[track]?.subjects[subject];
        const needsClassInput = subjectRules && subjectRules.exceptions;
        elements.classInputContainer.classList.toggle('hidden', !needsClassInput);
        const canProceed = !needsClassInput || (needsClassInput && elements.classInput.value.trim() !== '');
        if (canProceed) {
            const weights = getWeights();
            renderScoreInputs('fenghsin', weights);
            elements.calculatorBody.classList.remove('hidden');
            displaySelectedWeights();
        } else {
            elements.calculatorBody.classList.add('hidden');
        }
    }

    // --- EVENT HANDLERS ---
    elements.masterSchemeRadios.forEach(radio => { radio.addEventListener('change', (e) => { const selectedScheme = e.target.value; localStorage.setItem(LS_KEYS.masterScheme, selectedScheme); setUIState(selectedScheme); }); });
    elements.gradeSelect.addEventListener('change', (e) => { const gradeKey = e.target.value; populateTracks(gradeKey); elements.trackSelect.value = ''; elements.subjectSelect.innerHTML = '<option value="">請先選擇組別</option>'; elements.subjectSelect.disabled = true; localStorage.setItem(LS_KEYS.grade, gradeKey); localStorage.removeItem(LS_KEYS.track); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.trackSelect.addEventListener('change', (e) => { const gradeKey = elements.gradeSelect.value; const trackKey = e.target.value; populateSubjects(gradeKey, trackKey); elements.subjectSelect.value = ''; localStorage.setItem(LS_KEYS.track, trackKey); localStorage.removeItem(LS_KEYS.subject); setUIState('fenghsin'); });
    elements.subjectSelect.addEventListener('change', handleSubjectChange);
    elements.classInput.addEventListener('input', () => { localStorage.setItem(LS_KEYS.class, elements.classInput.value); handleSubjectChange(); });
    elements.calculationModeRadios.forEach(radio => { radio.addEventListener('change', (e) => { localStorage.setItem(LS_KEYS.calcMode, e.target.value); updateCalculationModeUI(); }); });
    
    function validateScoreInput(inputElement) { if (!inputElement) return true; const errorElement = document.getElementById(`error_${inputElement.id}`); if (!errorElement) return true; const value = parseFloat(inputElement.value); let errorMessage = ""; if (inputElement.value.trim() === "") { inputElement.classList.remove('input-invalid'); errorElement.style.display = 'none'; return true; } if (isNaN(value) || value < 0 || value > 100) { errorMessage = value < 0 ? "不能小於0" : "分數應介於0-100"; inputElement.classList.add('input-invalid'); errorElement.textContent = errorMessage; errorElement.style.display = 'block'; return false; } else { inputElement.classList.remove('input-invalid'); errorElement.style.display = 'none'; return true; } }
    
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
    function displaySelectedWeights() { const weights = getWeights(); if (weights && elements.weightsDisplay) { let text; if (weights.label) { text = `當前模式：${weights.label}`; } else { const w_f_p = (weights.w_f * 100).toFixed(1).replace(/\.0$/, ''); const w_e1_p = (weights.w_e1 * 100).toFixed(1).replace(/\.0$/, ''); const w_e2_p = (weights.w_e2 * 100).toFixed(1).replace(/\.0$/, ''); const w_e3_p = (weights.w_e3 * 100).toFixed(1).replace(/\.0$/, ''); text = `權重：平時${w_f_p}% | 期一${w_e1_p}% | 期二${w_e2_p}% | 期末${w_e3_p}%`; } elements.weightsDisplay.textContent = text; elements.weightsDisplay.style.display = 'block'; } else { if(elements.weightsDisplay) elements.weightsDisplay.style.display = 'none'; } }
    
    function calculateAndDisplay() {
        let allInputsValid = true;
        for (const id in elements.scoresInputs) { if (elements.scoresInputs[id] && !validateScoreInput(elements.scoresInputs[id])) { allInputsValid = false; } }
        if (!allInputsValid) { alert("部分成績輸入無效，請修正紅色提示的欄位。"); return; }
        const weights = getWeights(); if (!weights) { alert("請先完成所有計分方式的選擇！"); return; }
        displaySelectedWeights();
        const scores = {};
        for (const id in elements.scoresInputs) { scores[id] = parseFloat(elements.scoresInputs[id]?.value) || 0; }
        const masterScheme = getSelectedRadioValue('masterScheme');
        const calcMode = getSelectedRadioValue('calculationMode');
        clearResultsAndHide(true);
        let finalGrade = 0, knownPartForNeeded = 0, weightForNeeded = 0, summaryText = "";

        if (masterScheme === 'fenghsin') {
            finalGrade = Math.round((scores.s_p1 * weights.w_f) + (scores.s_e1 * weights.w_e1) + (scores.s_e2 * weights.w_e2) + (scores.s_e3 * weights.w_e3));
            knownPartForNeeded = (scores.s_p1 * weights.w_f) + (scores.s_e1 * weights.w_e1) + (scores.s_e2 * weights.w_e2);
            weightForNeeded = weights.w_e3;
        } else {
            const avgFormative = (scores.s_p1 + scores.s_p2 + scores.s_p3) / 3;
            const avgExam = (scores.s_e1 + scores.s_e2 + scores.s_e3) / 3;
            finalGrade = Math.round((avgFormative * weights.formative) + (avgExam * weights.exam));
            const knownFormativePart = avgFormative * weights.formative;
            knownPartForNeeded = knownFormativePart + ((scores.s_e1 + scores.s_e2) / 3 * weights.exam);
            weightForNeeded = weights.exam / 3;
        }

        if (calcMode === 'total') {
            elements.totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
            let statusText = "";
            if (finalGrade >= 60) { statusText = "狀態：恭喜過關！"; elements.statusResultDiv.className = 'result-item pass'; } else if (finalGrade >= 40) { statusText = "狀態：您可能需要補考！"; elements.statusResultDiv.className = 'result-item makeup'; } else { statusText = "狀態：您可能會被當！"; elements.statusResultDiv.className = 'result-item fail'; }
            elements.statusResultDiv.textContent = statusText;
            elements.totalGradeResultDiv.style.display = 'block'; elements.statusResultDiv.style.display = 'block';
            summaryText = `學期總成績: ${finalGrade}分\n${statusText}`;
        } else {
             if (weightForNeeded === 0) {
                 elements.neededResultDiv.innerHTML = "此計分方式無期末考權重，無法計算所需分數。";
             } else {
                const neededForTarget = (targetGrade) => Math.ceil((targetGrade - 0.5 - knownPartForNeeded) / weightForNeeded);
                const generateText = (score, label) => { if (score > 100) return `${label}：即使考100分也無法達到。`; if (score <= 0) return `${label}：您已達到此目標！`; return `${label}，期末考至少需 ${score} 分。`; };
                const customTarget = parseFloat(elements.customTargetGradeInput.value) || 70;
                const text60 = generateText(neededForTarget(60), "為避免補考(達60分)"); const text40 = generateText(neededForTarget(40), "為避免被當(達40分)"); const textCustom = generateText(neededForTarget(customTarget), `為達自訂目標(${customTarget}分)`);
                elements.neededResultDiv.innerHTML = `${text60}<br>${text40}<br>${textCustom}`;
                summaryText = `${text60}\n${text40}\n${textCustom}`;
             }
             elements.neededResultDiv.style.display = 'block';
        }
        elements.copyResultsButton.style.display = 'inline-block';
        const checkedMasterRadio = document.querySelector('input[name="masterScheme"]:checked');
        let fullSummary = `計分方式: ${checkedMasterRadio ? checkedMasterRadio.labels[0].textContent.trim() : ''}\n`;
        if (masterScheme === 'fenghsin') { fullSummary += `選擇: ${elements.gradeSelect.options[elements.gradeSelect.selectedIndex].text}, ${elements.trackSelect.options[elements.trackSelect.selectedIndex].text}, ${elements.subjectSelect.value}\n`; }
        fullSummary += `計算結果:\n${summaryText}`;
        elements.copyResultsButton.setAttribute('data-summary', fullSummary);
    }
    
    function saveAllScores() { const scores = {}; for(const id in elements.scoresInputs) { if(elements.scoresInputs[id]) scores[id] = elements.scoresInputs[id].value; } localStorage.setItem(LS_KEYS.scores, JSON.stringify(scores)); }
    function loadAllScores() { const savedScores = localStorage.getItem(LS_KEYS.scores); if (savedScores) { try { const scores = JSON.parse(savedScores); for(const id in scores) { if (elements.scoresInputs[id] && scores[id] !== undefined) { elements.scoresInputs[id].value = scores[id]; validateScoreInput(elements.scoresInputs[id]); } } } catch (e) { console.error("解析已儲存的分數時出錯:", e); } } }
    function clearInputsAndResults() { for(const id in elements.scoresInputs) { if (elements.scoresInputs[id]) { elements.scoresInputs[id].value = ''; validateScoreInput(elements.scoresInputs[id]); } } if (elements.customTargetGradeInput) elements.customTargetGradeInput.value = '70'; localStorage.removeItem(LS_KEYS.scores); clearResultsAndHide(); }
    function clearResultsAndHide(keepWeightDisplay = false) { elements.totalGradeResultDiv.style.display = 'none'; elements.statusResultDiv.style.display = 'none'; elements.neededResultDiv.style.display = 'none'; elements.copyResultsButton.style.display = 'none'; if (!keepWeightDisplay && elements.weightsDisplay) { elements.weightsDisplay.style.display = 'none'; } }
    
    function initialize() {
        populateGrades();
        const savedMasterScheme = localStorage.getItem(LS_KEYS.masterScheme) || 'generic64';
        document.querySelector(`input[name="masterScheme"][value="${savedMasterScheme}"]`).checked = true;
        setUIState(savedMasterScheme);
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
                    if (savedSubject) { elements.subjectSelect.value = savedSubject; handleSubjectChange(); }
                }
            }
        }
        const savedCalcMode = localStorage.getItem(LS_KEYS.calcMode) || 'total';
        document.querySelector(`input[name="calculationMode"][value="${savedCalcMode}"]`).checked = true;
        const savedClassNum = localStorage.getItem(LS_KEYS.class);
        if (elements.classInput && savedClassNum) { elements.classInput.value = savedClassNum; }
        loadAllScores();
        updateCalculationModeUI();
    }
    
    elements.calculateButton.addEventListener('click', calculateAndDisplay);
    elements.clearButton.addEventListener('click', clearInputsAndResults);
    if (elements.copyResultsButton) { elements.copyResultsButton.addEventListener('click', () => { const summaryToCopy = elements.copyResultsButton.getAttribute('data-summary'); if (summaryToCopy && navigator.clipboard?.writeText) { navigator.clipboard.writeText(summaryToCopy).then(() => { elements.copyResultsButton.textContent = '已複製！'; setTimeout(() => { elements.copyResultsButton.textContent = '複製結果摘要'; }, 2000); }).catch(err => { console.error('複製結果時發生錯誤: ', err); }); } }); }
    
    initialize();
});
