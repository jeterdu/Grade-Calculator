document.addEventListener('DOMContentLoaded', () => {
    // --- DATA: Feng Hsin High School Precise Rules v3.0 ---
    const FENG_HSIN_RULES = {
        g10: { label: '高一', tracks: { all: { label: '不分組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [101], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學': { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24 }, '歷史': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.00, w_e2: 0.20, w_e3: 0.20 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' } }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1,2班)規則' }, '物理':       { exceptions: [ { classIds: [102], rule: { w_f: 0.70, w_e1: 0.10, w_e2: 0.10, w_e3: 0.10 } } ], defaultRule: { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1班)規則' } }, '化學':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '生物':       { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25, note: '採用(不含1,2班)規則' }, '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '美術':       { w_f: 0.20, w_e1: 0.20, w_e2: 0.30, w_e3: 0.30 }, '水彩':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '水墨':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '書法':       { w_f: 0.40, w_e1: 0.00, w_e2: 0.30, w_e3: 0.30 }, '創意表現':   { w_f: 0.50, w_e1: 0.15, w_e2: 0.15, w_e3: 0.20 }, '演奏實習':   { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 } } } } },
        g11: { label: '高二', tracks: { natural: { label: '自然組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學A':      { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' }, '歷史': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '物理-力學二': { w_f: 0.30, w_e1: 0.20, w_e2: 0.25, w_e3: 0.25 }, '化學-物質構造': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '生物-動物體的構造': { w_f: 0.30, w_e1: 0.25, w_e2: 0.25, w_e3: 0.20 } } }, social: { label: '社會組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { exceptions: [ { classIds: [201], rule: { w_f: 0.60, w_e1: 0.13, w_e2: 0.13, w_e3: 0.14 } } ], defaultRule: { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20, note: '採用(不含1班)規則' } }, '數學B': { w_f: 0.30, w_e1: 0.23, w_e2: 0.23, w_e3: 0.24, note: '採用(不含1,2班)規則' },'歷史': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '地理': { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 }, '公民與社會':   { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 } } } } },
        g12: { label: '高三', tracks: { natural: { label: '自然組', subjects: { '國文': { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文': { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '數學甲':     { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30 }, '物理':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 }, '化學':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 }, '生物':       { w_f: 0.30, w_e1: 0.35, w_e2: 0.35, w_e3: 0.00 }, '地球科學':   { w_f: 0.25, w_e1: 0.25, w_e2: 0.25, w_e3: 0.25 } } }, social: { label: '社會組', subjects: { '國文':       { w_f: 0.30, w_e1: 0.20, w_e2: 0.20, w_e3: 0.30 }, '英文':       { w_f: 0.40, w_e1: 0.20, w_e2: 0.20, w_e3: 0.20 }, '數學乙':     { exceptions: [ { classRange: [303, 304], rule: { w_f: 0.00, w_e1: 0.00, w_e2: 0.50, w_e3: 0.50 } }, { classRange: [305, 307], rule: { w_f: 0.50, w_e1: 0.00, w_e2: 0.00, w_e3: 0.50 } } ], defaultRule: { w_f: 0.00, w_e1: 0.25, w_e2: 0.25, w_e3: 0.50, note: '採用(不含303,304,305,307)規則' } }, '歷史':       { w_f: 0.40, w_e1: 0.30, w_e2: 0.00, w_e3: 0.30, note: '採用(不含1,2班)規則' }, '地理':       { w_f: 0.60, w_e1: 0.40, w_e2: 0.00, w_e3: 0.00 }, '公民與社會':   { w_f: 0.40, w_e1: 0.30, w_e2: 0.30, w_e3: 0.00 } } } } }
    };

    // --- DOM ELEMENTS ---
    const elements = { masterSchemeRadios: document.getElementsByName('masterScheme'), fenghsinSelectorsDiv: document.getElementById('fenghsin-selectors'), gradeSelect: document.getElementById('grade-select'), trackSelect: document.getElementById('track-select'), subjectSelect: document.getElementById('subject-select'), classInputContainer: document.getElementById('class-input-container'), classInput: document.getElementById('class-input'), calculatorBody: document.getElementById('calculator-body'), calculationModeRadios: document.getElementsByName('calculationMode'), customTargetInputContainer: document.getElementById('customTargetInputContainer'), customTargetGradeInput: document.getElementById('customTargetGrade'), scoreInputsContainer: document.getElementById('score-inputs-container'), scoresInputs: {}, calculateButton: document.getElementById('calculateButton'), clearButton: document.getElementById('clearButton'), copyResultsButton: document.getElementById('copyResultsButton'), weightsDisplay: document.getElementById('selected-weights-display'), totalGradeResultDiv: document.getElementById('totalGradeResult'), statusResultDiv: document.getElementById('statusResult'), neededResultDiv: document.getElementById('neededResult'), calculationProcessContainer: document.getElementById('calculation-process-container'), calculationProcessContent: document.getElementById('calculation-process-content') };
    
    // --- LOCALSTORAGE & STATE ---
    const LS_KEYS = { masterScheme: 'gradeCalc_v3_masterScheme', grade: 'gradeCalc_v3_grade', class: 'gradeCalc_v3_class', track: 'gradeCalc_v3_track', subject: 'gradeCalc_v3_subject', calcMode: 'gradeCalc_v3_calcMode', scores: 'gradeCalc_v3_scores' };
    
    // --- HELPER FUNCTIONS ---
    function getSelectedRadioValue(name) { const radios = document.getElementsByName(name); for (let i = 0; i < radios.length; i++) { if (radios[i].checked) { return radios[i].value; } } return null; }
    const formatPercent = (p) => `${(p * 100).toFixed(1).replace(/\.0$/, '')}%`;

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
        loadAllScores();
        updateCalculationModeUI();
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
    
    function displaySelectedWeights() { const weights = getWeights(); if (weights && elements.weightsDisplay) { let text; if (weights.label) { text = `當前模式：${weights.label}`; } else { text = `權重：平時${formatPercent(weights.w_f)} | 期一${formatPercent(weights.w_e1)} | 期二${formatPercent(weights.w_e2)} | 期末${formatPercent(weights.w_e3)}`; if(weights.note) { text += ` (${weights.note})` } } elements.weightsDisplay.textContent = text; elements.weightsDisplay.style.display = 'block'; } else { if(elements.weightsDisplay) elements.weightsDisplay.style.display = 'none'; } }
    
    function generateProcessHtml(data) {
        let html = '';
        const { mode, scheme, weights, scores, finalGrade } = data;
        html += `<div class="process-step"><strong>公式:</strong> ${scheme === 'fenghsin' ? '各項成績 * 對應權重' : '(平時平均 * 權重) + (段考平均 * 權重)'}</div>`;
        
        if (mode === 'total') {
            if (scheme === 'fenghsin') {
                let formula = [];
                if(weights.w_f > 0) formula.push(`(平時 ${scores.s_p1} * ${formatPercent(weights.w_f)})`);
                if(weights.w_e1 > 0) formula.push(`(期一 ${scores.s_e1} * ${formatPercent(weights.w_e1)})`);
                if(weights.w_e2 > 0) formula.push(`(期二 ${scores.s_e2} * ${formatPercent(weights.w_e2)})`);
                if(weights.w_e3 > 0) formula.push(`(期末 ${scores.s_e3} * ${formatPercent(weights.w_e3)})`);
                html += `<div class="process-step"><strong>代入:</strong><br>${formula.join(' +<br>')}</div>`;
            } else { // Generic
                html += `<div class="process-step"><strong>平時平均:</strong> (${scores.s_p1} + ${scores.s_p2} + ${scores.s_p3}) / 3 = ${data.avgFormative.toFixed(2)}</div>`;
                html += `<div class="process-step"><strong>段考平均:</strong> (${scores.s_e1} + ${scores.s_e2} + ${scores.s_e3}) / 3 = ${data.avgExam.toFixed(2)}</div>`;
                html += `<div class="process-step"><strong>總成績:</strong> (${data.avgFormative.toFixed(2)} * ${formatPercent(weights.formative)}) + (${data.avgExam.toFixed(2)} * ${formatPercent(weights.exam)})</div>`;
            }
            html += `<div class="process-step"><strong>計算結果:</strong> ${data.unroundedTotal.toFixed(3)}</div>`;
            html += `<div class="process-step"><strong>四捨五入後:</strong> <strong>${finalGrade}</strong></div>`;
        } else { // Needed mode
            html += `<div class="process-step"><strong>已知分數加權總和 (Known Part):</strong> ${data.knownPart.toFixed(3)}</div>`;
            html += `<div class="process-step"><strong>期末考權重:</strong> ${formatPercent(data.weightNeeded)}</div>`;
            data.targets.forEach(item => {
                html += `<div class="process-step"><strong>目標 ${item.target}分 (${item.label}) 所需分數:</strong><br>Math.ceil( ( ${item.target} - 0.5 - ${data.knownPart.toFixed(3)} ) / ${data.weightNeeded.toFixed(4)} ) = <strong>${item.neededScore}</strong></div>`;
            });
        }
        return html;
    }

    function calculateAndDisplay() {
        let allInputsValid = true; for (const id in elements.scoresInputs) { if (elements.scoresInputs[id] && !validateScoreInput(elements.scoresInputs[id])) { allInputsValid = false; } }
        if (!allInputsValid) { alert("部分成績輸入無效，請修正紅色提示的欄位。"); return; }
        const weights = getWeights(); if (!weights) { alert("請先完成所有計分方式的選擇！"); return; }
        displaySelectedWeights();
        const scores = {}; for (const id in elements.scoresInputs) { scores[id] = parseFloat(elements.scoresInputs[id]?.value) || 0; }
        const masterScheme = getSelectedRadioValue('masterScheme'); const calcMode = getSelectedRadioValue('calculationMode');
        clearResultsAndHide(true);
        let finalGrade = 0, summaryText = "", processData = {};

        if (masterScheme === 'fenghsin') {
            const unroundedTotal = (scores.s_p1 * weights.w_f) + (scores.s_e1 * weights.w_e1) + (scores.s_e2 * weights.w_e2) + (scores.s_e3 * weights.w_e3);
            finalGrade = Math.round(unroundedTotal);
            const knownPartForNeeded = (scores.s_p1 * weights.w_f) + (scores.s_e1 * weights.w_e1) + (scores.s_e2 * weights.w_e2);
            processData = { mode: calcMode, scheme: 'fenghsin', weights, scores, unroundedTotal, finalGrade, knownPart: knownPartForNeeded, weightNeeded: weights.w_e3 };
        } else { // Generic
            const avgFormative = (scores.s_p1 + scores.s_p2 + scores.s_p3) / 3;
            const avgExam = (scores.s_e1 + scores.s_e2 + scores.s_e3) / 3;
            const unroundedTotal = (avgFormative * weights.formative) + (avgExam * weights.exam);
            finalGrade = Math.round(unroundedTotal);
            const knownPartForNeeded = (avgFormative * weights.formative) + ((scores.s_e1 + scores.s_e2) / 3 * weights.exam);
            processData = { mode: calcMode, scheme: 'generic', weights, scores, avgFormative, avgExam, unroundedTotal, finalGrade, knownPart: knownPartForNeeded, weightNeeded: weights.exam / 3 };
        }

        if (calcMode === 'total') {
            elements.totalGradeResultDiv.textContent = `您的學期總成績為：${finalGrade} 分`;
            let statusText = "";
            if (finalGrade >= 60) { statusText = "狀態：恭喜過關！"; elements.statusResultDiv.className = 'result-item pass'; } else if (finalGrade >= 40) { statusText = "狀態：您可能需要補考！"; elements.statusResultDiv.className = 'result-item makeup'; } else { statusText = "狀態：您可能會被當！"; elements.statusResultDiv.className = 'result-item fail'; }
            elements.statusResultDiv.textContent = statusText;
            elements.totalGradeResultDiv.style.display = 'block'; elements.statusResultDiv.style.display = 'block';
            summaryText = `學期總成績: ${finalGrade}分\n${statusText}`;
        } else { // 'needed' mode
             if (processData.weightNeeded === 0) {
                 elements.neededResultDiv.innerHTML = "此計分方式無期末考權重，無法計算所需分數。";
                 processData = null; 
             } else {
                const neededForTarget = (targetGrade) => Math.ceil((targetGrade - 0.5 - processData.knownPart) / processData.weightNeeded);
                const generateText = (score, label) => { if (score > 100) return `${label}：即使考100分也無法達到。`; if (score <= 0) return `${label}：您已達到此目標！`; return `${label}，期末考至少需 ${score} 分。`; };
                const customTarget = parseFloat(elements.customTargetGradeInput.value) || 70;
                const targets = [ { target: 60, label: "為避免補考(達60分)"}, { target: 40, label: "為避免被當(達40分)"}, { target: customTarget, label: `為達自訂目標(${customTarget}分)`}];
                let resultHTML = []; let resultText = [];
                targets.forEach(t => { t.neededScore = neededForTarget(t.target); const text = generateText(t.neededScore, t.label); resultHTML.push(text); resultText.push(text); });
                elements.neededResultDiv.innerHTML = resultHTML.join('<br>');
                summaryText = resultText.join('\n');
                processData.targets = targets;
             }
             elements.neededResultDiv.style.display = 'block';
        }
        
        if (processData) { elements.calculationProcessContent.innerHTML = generateProcessHtml(processData); elements.calculationProcessContainer.style.display = 'block'; }
        
        elements.copyResultsButton.style.display = 'inline-block';
        const checkedMasterRadio = document.querySelector('input[name="masterScheme"]:checked');
        let fullSummary = `計分方式: ${checkedMasterRadio ? checkedMasterRadio.labels[0].textContent.trim() : ''}\n`;
        if (getSelectedRadioValue('masterScheme') === 'fenghsin') { fullSummary += `選擇: ${elements.gradeSelect.options[elements.gradeSelect.selectedIndex].text}, ${elements.trackSelect.options[elements.trackSelect.selectedIndex].text}, ${elements.subjectSelect.value}\n`; }
        fullSummary += `\n計算結果:\n${summaryText}`;
        elements.copyResultsButton.setAttribute('data-summary', fullSummary);
    }
    
    function saveAllScores() { const scores = {}; for(const id in elements.scoresInputs) { if(elements.scoresInputs[id]) scores[id] = elements.scoresInputs[id].value; } localStorage.setItem(LS_KEYS.scores, JSON.stringify(scores)); }
    function loadAllScores() { const savedScores = localStorage.getItem(LS_KEYS.scores); if (savedScores) { try { const scores = JSON.parse(savedScores); for(const id in scores) { if (elements.scoresInputs[id] && scores[id] !== undefined) { elements.scoresInputs[id].value = scores[id]; validateScoreInput(elements.scoresInputs[id]); } } } catch (e) { console.error("解析已儲存的分數時出錯:", e); } } }
    function clearInputsAndResults() { for(const id in elements.scoresInputs) { if (elements.scoresInputs[id]) { elements.scoresInputs[id].value = ''; validateScoreInput(elements.scoresInputs[id]); } } if (elements.customTargetGradeInput) elements.customTargetGradeInput.value = '70'; localStorage.removeItem(LS_KEYS.scores); clearResultsAndHide(); }
    function clearResultsAndHide(keepWeightDisplay = false) { elements.totalGradeResultDiv.style.display = 'none'; elements.statusResultDiv.style.display = 'none'; elements.neededResultDiv.style.display = 'none'; elements.copyResultsButton.style.display = 'none'; if (!keepWeightDisplay && elements.weightsDisplay) { elements.weightsDisplay.style.display = 'none'; } if (elements.calculationProcessContainer) { elements.calculationProcessContainer.style.display = 'none'; elements.calculationProcessContainer.open = false; } }
    
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
                    if (savedSubject) { 
                        elements.subjectSelect.value = savedSubject; 
                        const savedClassNum = localStorage.getItem(LS_KEYS.class);
                        if (elements.classInput && savedClassNum) { elements.classInput.value = savedClassNum; }
                        handleSubjectChange(); 
                    }
                }
            }
        }
        const savedCalcMode = localStorage.getItem(LS_KEYS.calcMode) || 'total';
        document.querySelector(`input[name="calculationMode"][value="${savedCalcMode}"]`).checked = true;
        // loadAllScores is now called within renderScoreInputs
        updateCalculationModeUI();
    }
    
    // Attach Event Listeners
    elements.calculateButton.addEventListener('click', calculateAndDisplay);
    elements.clearButton.addEventListener('click', clearInputsAndResults);
    elements.classInput.addEventListener('input', () => { localStorage.setItem(LS_KEYS.class, elements.classInput.value); handleSubjectChange(); });
    if (elements.copyResultsButton) { elements.copyResultsButton.addEventListener('click', () => { const summaryToCopy = elements.copyResultsButton.getAttribute('data-summary'); if (summaryToCopy && navigator.clipboard?.writeText) { navigator.clipboard.writeText(summaryToCopy).then(() => { elements.copyResultsButton.textContent = '已複製！'; setTimeout(() => { elements.copyResultsButton.textContent = '複製結果摘要'; }, 2000); }).catch(err => { console.error('複製結果時發生錯誤: ', err); }); } }); }
    
    initialize();
});
