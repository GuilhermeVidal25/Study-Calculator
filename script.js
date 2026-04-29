const MATH_MAP = {
    SQRT: (n) => Math.sqrt(n),
    SQR:  (n) => Math.pow(n, 2),
    SIN:  (n) => Math.sin(n * Math.PI / 180),
    COS:  (n) => Math.cos(n * Math.PI / 180),
    TAN:  (n) => Math.tan(n * Math.PI / 180)
};

let state = { input: '0', log: '', err: false };

const ui = {
    screen: document.getElementById('display'),
    history: document.getElementById('previous-op')
};

const sync = () => {
    ui.screen.innerText = state.err ? "Erro" : state.input;
    ui.history.innerText = state.log;
};

const fmt = (n) => {
    const val = parseFloat(n.toFixed(8));
    return isFinite(val) ? val.toString() : "Erro";
};

const actions = {
    addNum: (n) => {
        if (state.err) actions.reset();
        if (n === '.' && state.input.includes('.')) return;
        state.input = (state.input === '0' && n !== '.') ? n : state.input + n;
        sync();
    },

    // PREVENÇÃO DE OPERADORES DUPLICADOS (Defensive Programming)
    addOp: (symbol) => {
        if (state.err) return;
        const lastChar = state.input.trim().slice(-1);
        const operators = ['+', '-', '*', '/', '×', '÷'];

        // Se o último caractere for um operador, substitui pelo novo
        if (operators.includes(lastChar)) {
            state.input = state.input.trim().slice(0, -1) + ` ${symbol} `;
        } else {
            state.input += ` ${symbol} `;
        }
        sync();
    },

    // EXECUÇÃO SEGURA E CONSISTENTE
    safeEval: (expression) => {
        const raw = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Sanitização rigorosa: apenas números, operadores e ponto
        const sanitized = raw.replace(/[^-+*/\d. ]/g, '');
        return new Function(`"use strict"; return (${sanitized})`)();
    },

    execSpec: (key) => {
        try {
            const v = actions.safeEval(state.input);
            if (key === 'SQRT' && v < 0) throw new Error();
            
            state.log = `${key}(${v})`;
            state.input = fmt(MATH_MAP[key](v));
        } catch {
            actions.fail();
        }
        sync();
    },

    execMain: () => {
        try {
            const res = actions.safeEval(state.input);
            state.log = `${state.input} =`;
            state.input = fmt(res);
        } catch {
            actions.fail();
        }
        sync();
    },

    reset: () => {
        state = { input: '0', log: '', err: false };
        sync();
    },

    fail: () => {
        state.err = true;
        setTimeout(actions.reset, 1500);
    }
};

window.calc = {
    appendNumber: actions.addNum,
    appendOperator: (op) => op === '**2' ? actions.execSpec('SQR') : actions.addOp(op),
    calculate: actions.execMain,
    calcRoot: () => actions.execSpec('SQRT'),
    calcTrig: (t) => actions.execSpec(t.toUpperCase()),
    clear: actions.reset
};