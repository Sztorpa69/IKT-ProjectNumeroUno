const quizData = [
    { q: "Melyik fejlesztő készítette a Hollow Knightot?", a: ["Team Cherry", "FromSoftware", "Nintendo"], correct: 0 },
    { q: "Milyen műfajú a játék?", a: ["FPS", "Metroidvania", "RPG"], correct: 1 },
    { q: "Melyik évben jelent meg a játék?", a: ["2015", "2017", "2019"], correct: 1 }
];

const quiz = document.getElementById('quiz');
const bar = document.getElementById('bar');
let idx = Number(localStorage.getItem('hk_quiz_idx') || 0);
let score = Number(localStorage.getItem('hk_quiz_score') || 0);

function updateProgress() {
    const pct = Math.round((idx / quizData.length) * 100);
    bar.style.width = pct + '%';
}

function render() {
    if (idx >= quizData.length) {
        showResult();
        return;
    }
    updateProgress();
    const item = quizData[idx];
    quiz.innerHTML = `
    <div><strong>Q${idx + 1}:</strong> ${item.q}</div>
    <div class=\"choices\" style=\"margin-top:8px;display:flex;gap:8px;flex-wrap:wrap\">${item.a.map((t, i) => `<button data-i=${i} class=\"choice card-hover\">${t}</button>`).join('')}</div>
    <div style=\"margin-top:10px;color:var(--muted);font-size:13px\">(${idx + 1}/${quizData.length})</div>`;

    document.querySelectorAll('.choice').forEach(b => b.addEventListener('click', e => {
        const chosen = Number(b.dataset.i);
        if (chosen === item.correct) { score++; b.style.borderColor = 'var(--accent)'; b.textContent += ' ✓'; }
        else { b.style.opacity = '0.6'; b.textContent += ' ✕'; }
        // store
        localStorage.setItem('hk_quiz_idx', idx);
        localStorage.setItem('hk_quiz_score', score);
        setTimeout(() => { idx++; localStorage.setItem('hk_quiz_idx', idx); if (idx < quizData.length) render(); else showResult(); }, 700);
    }));
}

function showResult() {
    bar.style.width = '100%';
    quiz.innerHTML = `<div style=\"font-size:18px\"><strong>Végeredmény:</strong> ${score}/${quizData.length}</div><div style=\"margin-top:10px;color:var(--muted)\">Köszönjük a részvételt! <button id=\"reset\">Újra</button></div>`;
    document.getElementById('reset').addEventListener('click', () => {
        idx = 0; score = 0; localStorage.removeItem('hk_quiz_idx'); localStorage.removeItem('hk_quiz_score'); render(); updateProgress();
    });
}

updateProgress(); render();

/*
README notes:
- Save the three sections into: index.html, styles.css, script.js
- To upload to GitHub: create repo, add files, commit, push.
*/