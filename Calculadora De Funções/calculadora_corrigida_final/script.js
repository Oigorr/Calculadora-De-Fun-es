// Seleção de elementos DOM
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContainer = document.querySelector("#dropdown-container");
const caretIcon = dropdownBtn.querySelector("i");
const closeBtn = document.querySelector(".close-btn");
const inputA = document.getElementById("input-a");
const inputB = document.getElementById("input-b");
const inputC = document.getElementById("input-c");
const inputX = document.getElementById("input-x");
const inputBase = document.getElementById("input-base");
const inputExpoente = document.getElementById("input-expoente");
const inputExpr = document.getElementById("input-expr");
const inputAprox = document.getElementById("input-aprox");
const inputInverso = document.getElementById("input-inverso");
const inputOperador = document.getElementById("input-operador");
const inputNumerador = document.getElementById("input-numerador");
const inputDenominador = document.getElementById("input-denominador");
const inputLimiteInf = document.getElementById("input-limite-inf");
const inputLimiteSup = document.getElementById("input-limite-sup");
const btnCalcular = document.querySelector(".btn-calcular");

// Painel de exibição
const displayPanel = document.querySelector(".display-panel");

// Histórico
const historyList = document.querySelector(".history-list");

// Limpar histórico
closeBtn.addEventListener("click", () => {
    historyList.innerHTML = ""; // Limpa todos os itens do histórico
});

// Função para adicionar item ao histórico
function adicionarHistorico(titulo, texto) {
    // Criar a div flex container
    const flexDiv = document.createElement("div");
    flexDiv.classList.add("flex");

    // Criar o span para margin-right
    const spanMargin = document.createElement("span");
    spanMargin.classList.add("margin-right");

    // Criar o div do histórico
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.innerHTML = `<strong>${titulo}</strong> = ${texto}`;

    // Montar a hierarquia
    flexDiv.appendChild(spanMargin);
    flexDiv.appendChild(historyItem);

    // Inserir no início da lista
    historyList.prepend(flexDiv);
}

// Toggle do dropdown
dropdownBtn.addEventListener("click", () => {
    dropdownContainer.classList.toggle("open");
    caretIcon.classList.toggle("rotate");
});

// Função para avaliar expressões com frações e potências
function avaliarExpressao(expr) {
    if (!expr || expr.trim() === '') return NaN;
    
    try {
        // Verificar se é uma fração simples (formato: a/b)
        if (expr.includes('/') && !expr.includes('+') && !expr.includes('-') && 
            !expr.includes('*') && !expr.includes('^') && !expr.includes('(')) {
            const partes = expr.split('/');
            if (partes.length === 2) {
                const numerador = parseFloat(partes[0].trim());
                const denominador = parseFloat(partes[1].trim());
                if (!isNaN(numerador) && !isNaN(denominador) && denominador !== 0) {
                    return numerador / denominador;
                }
            }
        }
        
        // Para expressões mais complexas ou números simples
        try {
            // Usar math.js para avaliação mais robusta
            return math.evaluate(expr);
        } catch (mathError) {
            // Fallback para eval nativo se math.js falhar
            // Substituir ^ por ** para potenciação
            expr = expr.replace(/\^/g, '**');
            return eval(expr);
        }
    } catch (error) {
        console.error("Erro ao avaliar expressão:", error);
        return NaN;
    }
}

// Função para processar expressões com x
function processarExpressaoComX(expr, valorX) {
    if (!expr || expr.trim() === '') return NaN;
    
    try {
        // Substituir x pelo valor
        const scope = { x: valorX };
        return math.evaluate(expr, scope);
    } catch (error) {
        console.error("Erro ao processar expressão com x:", error);
        return NaN;
    }
}

// Função para mostrar/esconder inputs relevantes para cada operação
function mostrarInputsRelevantes(operacao) {
    // Esconder todos os inputs primeiro
    const todosInputs = document.querySelectorAll('.input-field');
    todosInputs.forEach(input => {
        input.style.display = 'none';
    });

    // Remover dicas de ajuda anteriores
    const dicasAnteriores = document.querySelectorAll('.help-tip');
    dicasAnteriores.forEach(dica => dica.remove());

    // Mostrar inputs relevantes baseado na operação
    switch (operacao) {
        case "potencia":
            inputBase.style.display = 'block';
            inputExpoente.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: Base = 2, Expoente = 3 ou Base = -2, Expoente = 2");
            break;
        case "afim":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputX.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: a = 2, b = -3, x = 4");
            break;
        case "segundo_grau":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputC.style.display = 'block';
            inputX.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: a = 1, b = -5, c = 6, x = 2");
            break;
        case "inversa":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputInverso.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: a = 2, b = 3, valor = 7");
            break;
        case "exponencial":
            inputA.style.display = 'block';
            inputBase.style.display = 'block';
            inputX.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: a = 2, base = 3, x = -1");
            break;
        case "equacao_1_grau":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos para resolver ax + b = 0. Ex: a = 2, b = -6");
            break;
        case "equacao_2_grau":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputC.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos para resolver ax² + bx + c = 0. Ex: a = 1, b = -5, c = 6");
            break;
        case "inequacao_1":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputOperador.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos para resolver ax + b [operador] 0. Ex: a = 2, b = -6");
            break;
        case "inequacao_2":
            inputA.style.display = 'block';
            inputB.style.display = 'block';
            inputC.style.display = 'block';
            inputOperador.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos para resolver ax² + bx + c [operador] 0. Ex: a = 1, b = -5, c = 6");
            break;
        case "logaritmo":
            inputA.style.display = 'block';
            inputBase.style.display = 'block';
            inputX.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos para base e x. Ex: a = 2, base = 10, x = 100");
            break;
        case "limite":
            inputExpr.style.display = 'block';
            inputAprox.style.display = 'block';
            adicionarDicaDeAjuda("Para expressões com x, use x^2 para x². Ex: x^2+3*x-4 ou (x^2-4)/(x-2)");
            break;
        case "divisao":
            inputNumerador.style.display = 'block';
            inputDenominador.style.display = 'block';
            adicionarDicaDeAjuda("Insira valores positivos ou negativos. Ex: Numerador = 2, Denominador = 3 ou Numerador = -5, Denominador = 2");
            break;
        case "derivada":
            inputExpr.style.display = 'block';
            inputX.style.display = 'block';
            adicionarDicaDeAjuda("Para expressões com x, use x^2 para x². Ex: x^2+3*x-4 ou 2*x^3-5*x^2+1");
            break;
        case "integral":
            inputExpr.style.display = 'block';
            inputLimiteInf.style.display = 'block';
            inputLimiteSup.style.display = 'block';
            adicionarDicaDeAjuda("Para expressões com x, use x^2 para x². Ex: 3*x^2+2*x+1 ou sin(x)");
            break;
        default:
            // Mostrar todos os inputs se não houver correspondência
            todosInputs.forEach(input => {
                input.style.display = 'block';
            });
    }
}

// Função para adicionar dica de ajuda
function adicionarDicaDeAjuda(texto) {
    const dica = document.createElement("div");
    dica.classList.add("help-tip");
    dica.textContent = texto;
    document.querySelector('.input-panel').appendChild(dica);
}

// Biblioteca matemática com passos
const mathLib = {
    passos: [],

    passo(mensagem) {
        this.passos.push(`🔹 ${mensagem}`);
    },

    limparPassos() {
        this.passos = [];
    },

    funcao_divisao(numerador, denominador) {
        this.limparPassos();
        
        // Verificar se o denominador é zero
        if (denominador === 0) {
            this.passo("Erro: Divisão por zero não é permitida.");
            return null;
        }
        
        this.passo(`Calculando ${numerador} ÷ ${denominador}`);
        const resultado = numerador / denominador;
        
        // Verificar se o resultado é um número inteiro
        if (resultado === Math.floor(resultado)) {
            this.passo(`Resultado: ${resultado}`);
            return resultado;
        } else {
            // Encontrar a fração irredutível
            const mdc = this.calcularMDC(Math.abs(numerador), Math.abs(denominador));
            const numSimplificado = numerador / mdc;
            const denomSimplificado = denominador / mdc;
            
            this.passo(`Resultado como decimal: ${resultado}`);
            this.passo(`Resultado como fração: ${numSimplificado}/${denomSimplificado}`);
            
            return {
                decimal: resultado,
                fracao: `${numSimplificado}/${denomSimplificado}`
            };
        }
    },
    
    calcularMDC(a, b) {
        // Algoritmo de Euclides para MDC
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    },

    funcao_derivada(expr, ponto) {
        this.limparPassos();
        
        try {
            this.passo(`Calculando a derivada de ${expr} em relação a x`);
            
            // Não precisamos substituir ^ por ** aqui, math.js entende ^ como potência
            
            // Usar math.js para calcular a derivada simbólica
            const derivada = math.derivative(expr, 'x');
            const derivadaExpr = derivada.toString();
            
            this.passo(`Derivada: ${derivadaExpr}`);
            
            // Se um ponto específico foi fornecido, avaliar a derivada nesse ponto
            if (ponto !== undefined && ponto !== null && ponto !== '') {
                const scope = { x: parseFloat(ponto) };
                const valorDerivada = derivada.evaluate(scope);
                this.passo(`Valor da derivada em x = ${ponto}: ${valorDerivada}`);
                return {
                    expressao: derivadaExpr,
                    valor: valorDerivada
                };
            }
            
            return {
                expressao: derivadaExpr
            };
        } catch (error) {
            this.passo(`Erro ao calcular a derivada: ${error.message}`);
            return null;
        }
    },
    
    funcao_integral(expr, limiteInf, limiteSup) {
        this.limparPassos();
        
        try {
            this.passo(`Calculando a integral de ${expr} em relação a x`);
            
            // Não precisamos substituir ^ por ** aqui, math.js entende ^ como potência
            
            // Usar math.js para calcular a integral simbólica
            try {
                const primitiva = math.integral(expr, 'x');
                const primitivaExpr = primitiva.toString();
                this.passo(`Primitiva (antiderivada): ${primitivaExpr}`);
                
                // Se limites foram fornecidos, calcular a integral definida
                if (limiteInf !== undefined && limiteInf !== null && limiteInf !== '' &&
                    limiteSup !== undefined && limiteSup !== null && limiteSup !== '') {
                    // Avaliar a primitiva nos limites
                    const scopeInf = { x: parseFloat(limiteInf) };
                    const scopeSup = { x: parseFloat(limiteSup) };
                    
                    const valorInf = primitiva.evaluate(scopeInf);
                    const valorSup = primitiva.evaluate(scopeSup);
                    
                    const resultado = valorSup - valorInf;
                    
                    this.passo(`F(${limiteSup}) = ${valorSup}`);
                    this.passo(`F(${limiteInf}) = ${valorInf}`);
                    this.passo(`Integral definida de ${limiteInf} a ${limiteSup}: ${resultado}`);
                    
                    return {
                        primitiva: primitivaExpr,
                        resultado: resultado
                    };
                }
                
                return {
                    primitiva: primitivaExpr
                };
            } catch (integralError) {
                // Se não conseguir calcular simbolicamente, tentar aproximação numérica
                if (limiteInf !== undefined && limiteInf !== null && limiteInf !== '' &&
                    limiteSup !== undefined && limiteSup !== null && limiteSup !== '') {
                    this.passo("Não foi possível calcular a integral simbólica. Usando aproximação numérica.");
                    
                    // Usar integração numérica
                    const resultado = math.integrate(function(x) {
                        return math.evaluate(expr, { x: x });
                    }, parseFloat(limiteInf), parseFloat(limiteSup));
                    
                    this.passo(`Integral definida de ${limiteInf} a ${limiteSup} (aproximação numérica): ${resultado}`);
                    
                    return {
                        resultado: resultado,
                        aproximado: true
                    };
                } else {
                    this.passo("Não foi possível calcular a primitiva desta expressão.");
                    return null;
                }
            }
        } catch (error) {
            this.passo(`Erro ao calcular a integral: ${error.message}`);
            return null;
        }
    },

    funcao_potencia(base, expoente) {
        this.limparPassos();
        this.passo(`Calculando ${base}^${expoente}`);
        const resultado = Math.pow(base, expoente);
        this.passo(`Resultado: ${base}^${expoente} = ${resultado}`);
        return resultado;
    },

    funcao_afim(a, b, x) {
        this.limparPassos();
        this.passo(`Calculando f(x) = ${a}x + ${b} para x = ${x}`);
        const resultado = a * x + b;
        this.passo(`${a} * ${x} + ${b} = ${resultado}`);
        return resultado;
    },

    equacao_primeiro_grau(a, b) {
        this.limparPassos();
        this.passo(`Resolvendo 0 = ${a}x + ${b}`);
        if (a === 0) {
            if (b === 0) {
                this.passo("A equação é uma identidade (0 = 0). Qualquer valor de x é solução.");
                return "Qualquer valor de x";
            } else {
                this.passo(`Erro: Equação impossível (0 = ${b}). Não há solução.`);
                return null;
            }
        }
        const x = -b / a;
        this.passo(`x = -${b} / ${a} = ${x}`);
        return x;
    },

    funcao_segundo_grau(a, b, c, x) {
        this.limparPassos();
        
        // Verificar se 'a' é zero
        if (a === 0) {
            this.passo("O coeficiente 'a' não pode ser zero em uma função do 2º grau.");
            return null;
        }
        
        this.passo(`Calculando f(x) = ${a}x² + ${b}x + ${c} para x = ${x}`);
        const resultado = a * x * x + b * x + c;
        this.passo(`f(${x}) = ${a} * ${x}² + ${b} * ${x} + ${c}`);
        this.passo(`f(${x}) = ${a * x * x} + ${b * x} + ${c} = ${resultado}`);
        return resultado;
    },

    equacao_segundo_grau(a, b, c) {
        this.limparPassos();

        // Verificar se 'a' é zero, porque aí não é uma equação do segundo grau
        if (a === 0) {
            this.passo("O coeficiente 'a' não pode ser zero em uma equação do 2º grau.");
            return null;
        }

        this.passo(`Resolvendo ${a}x² + ${b}x + ${c} = 0`);

        const delta = b * b - 4 * a * c;
        this.passo(`Δ = ${b}² - 4*${a}*${c} = ${delta}`);

        if (delta < 0) {
            this.passo("Não existem raízes reais.");
            return null;
        } else if (delta === 0) {
            const x = -b / (2 * a);
            this.passo(`Raiz única: x = ${x}`);
            return [x];
        } else {
            const sqrtDelta = Math.sqrt(delta);
            const x1 = (-b + sqrtDelta) / (2 * a);
            const x2 = (-b - sqrtDelta) / (2 * a);
            this.passo(`x1 = (-${b} + √${delta}) / (2*${a}) = ${x1}`);
            this.passo(`x2 = (-${b} - √${delta}) / (2*${a}) = ${x2}`);
            return [x1, x2];
        }
    },

    funcao_exponencial(a, b, x) {
        this.limparPassos();
        this.passo(`Calculando f(x) = ${a} * ${b}^${x}`);
        const resultado = a * Math.pow(b, x);
        this.passo(`Resultado: ${a} * ${b}^${x} = ${resultado}`);
        return resultado;
    },

    funcao_logaritmo(a, base, x) {
        this.limparPassos();
        if (x <= 0 || base <= 0 || base === 1) {
            this.passo("Erro: base e x devem ser positivos, e base ≠ 1.");
            return null;
        }
        this.passo(`Calculando f(x) = ${a} * log_${base}(${x})`);
        const resultado = a * (Math.log(x) / Math.log(base));
        this.passo(`Resultado: ${a} * log_${base}(${x}) = ${resultado}`);
        return resultado;
    },

    funcao_inversa(a, b, val) {
        this.limparPassos();
        if (a === 0) {
            this.passo("Erro: 'a' não pode ser zero para função inversa.");
            return null;
        }
        this.passo(`Dada f(x) = ${a}x + ${b}, a função inversa é f⁻¹(x) = (x - ${b}) / ${a}`);
        const resultado = (val - b) / a;
        this.passo(`Calculando f⁻¹(${val}) = (${val} - ${b}) / ${a} = ${resultado}`);
        return resultado;
    },

    inequacao_primeiro_grau(a, b, operador) {
        this.limparPassos();
        this.passo(`Resolvendo ${a}x + ${b} ${operador} 0`);
        
        if (a === 0) {
            if ((operador === "<" || operador === "<=") && b > 0) {
                this.passo(`${b} ${operador} 0 é falso para qualquer valor de x`);
                return "Conjunto vazio";
            } else if ((operador === ">" || operador === ">=") && b < 0) {
                this.passo(`${b} ${operador} 0 é falso para qualquer valor de x`);
                return "Conjunto vazio";
            } else if ((operador === "<" || operador === "<=") && b <= 0) {
                this.passo(`${b} ${operador} 0 é verdadeiro para qualquer valor de x`);
                return "Todos os reais";
            } else if ((operador === ">" || operador === ">=") && b >= 0) {
                this.passo(`${b} ${operador} 0 é verdadeiro para qualquer valor de x`);
                return "Todos os reais";
            } else if (b === 0) {
                this.passo(`0 ${operador} 0`);
                if (operador === "<" || operador === ">") {
                    return "Conjunto vazio";
                } else {
                    return "Todos os reais";
                }
            }
        }
        
        const x = -b / a;
        this.passo(`Isolando x: x ${a > 0 ? operador : this.inverterOperador(operador)} ${-b/a}`);
        
        let resultado;
        if (a > 0) {
            switch (operador) {
                case "<": resultado = `x < ${x}`; break;
                case ">": resultado = `x > ${x}`; break;
                case "<=": resultado = `x ≤ ${x}`; break;
                case ">=": resultado = `x ≥ ${x}`; break;
            }
        } else {
            switch (operador) {
                case "<": resultado = `x > ${x}`; break;
                case ">": resultado = `x < ${x}`; break;
                case "<=": resultado = `x ≥ ${x}`; break;
                case ">=": resultado = `x ≤ ${x}`; break;
            }
        }
        
        this.passo(`Solução: ${resultado}`);
        return resultado;
    },
    
    inverterOperador(operador) {
        switch (operador) {
            case "<": return ">";
            case ">": return "<";
            case "<=": return ">=";
            case ">=": return "<=";
            default: return operador;
        }
    },

    inequacao_segundo_grau(a, b, c, operador) {
        this.limparPassos();
        
        if (a === 0) {
            this.passo("O coeficiente 'a' não pode ser zero em uma inequação do 2º grau.");
            return this.inequacao_primeiro_grau(b, c, operador);
        }
        
        this.passo(`Resolvendo ${a}x² + ${b}x + ${c} ${operador} 0`);
        
        // Calcular as raízes da equação correspondente
        const delta = b * b - 4 * a * c;
        this.passo(`Δ = ${b}² - 4*${a}*${c} = ${delta}`);
        
        if (delta < 0) {
            // Não há raízes reais
            if ((a > 0 && (operador === ">" || operador === ">=")) || 
                (a < 0 && (operador === "<" || operador === "<="))) {
                this.passo("A parábola não cruza o eixo x e está sempre acima do eixo.");
                return "Conjunto vazio";
            } else {
                this.passo("A parábola não cruza o eixo x e está sempre abaixo do eixo.");
                return "Todos os reais";
            }
        } else if (delta === 0) {
            // Uma raiz real
            const x = -b / (2 * a);
            this.passo(`Raiz única: x = ${x}`);
            
            if (operador === ">" || operador === ">=") {
                if (a > 0) {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para cima e toca o eixo x em x = ${x}`);
                    return operador === ">" ? `x < ${x} ou x > ${x}` : `x ≤ ${x} ou x ≥ ${x}`;
                } else {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para baixo e toca o eixo x em x = ${x}`);
                    return operador === ">" ? `x = ${x}` : `x = ${x}`;
                }
            } else { // < ou <=
                if (a > 0) {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para cima e toca o eixo x em x = ${x}`);
                    return operador === "<" ? `x = ${x}` : `x = ${x}`;
                } else {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para baixo e toca o eixo x em x = ${x}`);
                    return operador === "<" ? `x < ${x} ou x > ${x}` : `x ≤ ${x} ou x ≥ ${x}`;
                }
            }
        } else {
            // Duas raízes reais
            const sqrtDelta = Math.sqrt(delta);
            let x1 = (-b + sqrtDelta) / (2 * a);
            let x2 = (-b - sqrtDelta) / (2 * a);
            
            // Garantir que x1 < x2
            if (x1 > x2) {
                const temp = x1;
                x1 = x2;
                x2 = temp;
            }
            
            this.passo(`Raízes: x₁ = ${x1} e x₂ = ${x2}`);
            
            if (operador === ">" || operador === ">=") {
                if (a > 0) {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para cima e cruza o eixo x em x = ${x1} e x = ${x2}`);
                    return operador === ">" ? `x < ${x1} ou x > ${x2}` : `x ≤ ${x1} ou x ≥ ${x2}`;
                } else {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para baixo e cruza o eixo x em x = ${x1} e x = ${x2}`);
                    return operador === ">" ? `${x1} < x < ${x2}` : `${x1} ≤ x ≤ ${x2}`;
                }
            } else { // < ou <=
                if (a > 0) {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para cima e cruza o eixo x em x = ${x1} e x = ${x2}`);
                    return operador === "<" ? `${x1} < x < ${x2}` : `${x1} ≤ x ≤ ${x2}`;
                } else {
                    this.passo(`Para ${a}x² + ${b}x + ${c} ${operador} 0, a parábola é voltada para baixo e cruza o eixo x em x = ${x1} e x = ${x2}`);
                    return operador === "<" ? `x < ${x1} ou x > ${x2}` : `x ≤ ${x1} ou x ≥ ${x2}`;
                }
            }
        }
    },

    funcao_limite(expr, valor_aproxima) {
        this.limparPassos();
        
        this.passo(`Cálculo de limite simbólico não suportado completamente no navegador.`);
        this.passo(`Expressão: ${expr}`);
        this.passo(`x tende a: ${valor_aproxima}`);
        
        // Tentativa simples para expressões básicas
        try {
            // Substituir x por valores próximos ao valor de aproximação
            const epsilon = 0.0001;
            const valorAprox = parseFloat(valor_aproxima);
            const valorMenor = valorAprox - epsilon;
            const valorMaior = valorAprox + epsilon;
            
            // Avaliar para valores próximos usando math.js
            const resultadoMenor = math.evaluate(expr, { x: valorMenor });
            const resultadoMaior = math.evaluate(expr, { x: valorMaior });
            
            this.passo(`Avaliando para x = ${valorMenor}: ${resultadoMenor}`);
            this.passo(`Avaliando para x = ${valorMaior}: ${resultadoMaior}`);
            
            // Verificar se os resultados são próximos
            if (Math.abs(resultadoMenor - resultadoMaior) < epsilon * 10) {
                const resultado = (resultadoMenor + resultadoMaior) / 2;
                this.passo(`O limite parece convergir para: ${resultado}`);
                return resultado;
            } else {
                // Tentar avaliar diretamente no ponto, se possível
                try {
                    const resultadoExato = math.evaluate(expr, { x: valorAprox });
                    this.passo(`Avaliando diretamente em x = ${valorAprox}: ${resultadoExato}`);
                    this.passo(`O limite é: ${resultadoExato}`);
                    return resultadoExato;
                } catch (directError) {
                    this.passo(`O limite pode não existir ou a expressão é complexa demais.`);
                    return "Limite não determinado";
                }
            }
        } catch (error) {
            this.passo(`Erro ao calcular o limite: ${error.message}`);
            this.passo(`Para cálculo simbólico completo, use ambiente com suporte a álgebra simbólica.`);
            return "Limite não calculado";
        }
    }
};

// Mostrar passos e resultado no display
function mostrarResultado(resultado) {
    let html = "";
    if (mathLib.passos.length) {
        html += mathLib.passos.map(p => `<p>${p}</p>`).join("");
    }
    
    if (resultado !== null && typeof resultado === 'object') {
        if (resultado.hasOwnProperty('decimal') && resultado.hasOwnProperty('fracao')) {
            html += `<p><strong>Resultado decimal:</strong> ${resultado.decimal}</p>`;
            html += `<p><strong>Resultado fracionário:</strong> ${resultado.fracao}</p>`;
        } else if (resultado.hasOwnProperty('expressao')) {
            html += `<p><strong>Expressão da derivada:</strong> ${resultado.expressao}</p>`;
            if (resultado.hasOwnProperty('valor')) {
                html += `<p><strong>Valor no ponto:</strong> ${resultado.valor}</p>`;
            }
        } else if (resultado.hasOwnProperty('primitiva')) {
            html += `<p><strong>Primitiva:</strong> ${resultado.primitiva}</p>`;
            if (resultado.hasOwnProperty('resultado')) {
                html += `<p><strong>Resultado da integral definida:</strong> ${resultado.resultado}</p>`;
                if (resultado.hasOwnProperty('aproximado') && resultado.aproximado) {
                    html += `<p><em>(Resultado obtido por aproximação numérica)</em></p>`;
                }
            }
        } else if (resultado.hasOwnProperty('resultado')) {
            html += `<p><strong>Resultado:</strong> ${resultado.resultado}</p>`;
            if (resultado.hasOwnProperty('aproximado') && resultado.aproximado) {
                html += `<p><em>(Resultado obtido por aproximação numérica)</em></p>`;
            }
        } else {
            html += `<p><strong>Resultado:</strong> ${JSON.stringify(resultado)}</p>`;
        }
    } else {
        html += `<p><strong>Resultado:</strong> ${Array.isArray(resultado) ? resultado.join(", ") : resultado}</p>`;
    }
    
    displayPanel.innerHTML = html;
}

// Variável para armazenar a operação atual
let operacaoAtual = null;

// Executar operação com base nos inputs
function executarOperacao(op) {
    // Atualizar a operação atual
    operacaoAtual = op;
    
    // Mostrar apenas os inputs relevantes
    mostrarInputsRelevantes(op);
    
    // Limpar o display
    displayPanel.innerHTML = "Preencha os campos e clique no botão para calcular.";
}

// Adiciona listeners nos links do dropdown para executar a operação
document.querySelectorAll(".dropdown-container a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        // Remover destaque anterior
        document.querySelectorAll(".dropdown-container a").forEach(l => l.classList.remove("active"));

        // Destacar o selecionado
        link.classList.add("active");

        // Obter e atualizar o nome no botão
        const nomeOperacao = link.textContent;
        dropdownBtn.innerHTML = `${nomeOperacao} <i class="fas fa-caret-down"></i>`;

        const op = link.getAttribute("data-op");
        executarOperacao(op);

        // Fechar dropdown visualmente
        dropdownContainer.classList.remove("open");
        caretIcon.classList.remove("rotate");
    });
});

// Botão calcular
btnCalcular.addEventListener("click", () => {
    if (!operacaoAtual) {
        alert("Selecione uma operação primeiro.");
        return;
    }

    try {
        // Avaliar expressões em todos os campos
        const a = avaliarExpressao(inputA.value);
        const b = avaliarExpressao(inputB.value);
        const c = avaliarExpressao(inputC.value);
        const x = avaliarExpressao(inputX.value);
        const base = avaliarExpressao(inputBase.value);
        const expoente = avaliarExpressao(inputExpoente.value);
        const expr = inputExpr.value;
        const aprox = inputAprox.value;
        const inverso = avaliarExpressao(inputInverso.value);
        const operador = inputOperador.value;
        const numerador = avaliarExpressao(inputNumerador.value);
        const denominador = avaliarExpressao(inputDenominador.value);
        const limiteInf = inputLimiteInf.value;
        const limiteSup = inputLimiteSup.value;

        let res = null;

        switch (operacaoAtual) {
            case "divisao":
                if (isNaN(numerador) || isNaN(denominador)) {
                    alert("Informe numerador e denominador válidos.");
                    return;
                }
                res = mathLib.funcao_divisao(numerador, denominador);
                mostrarResultado(res);
                if (res && res.fracao) {
                    adicionarHistorico(`Divisão: ${numerador} ÷ ${denominador}`, `${res.decimal} (${res.fracao})`);
                } else {
                    adicionarHistorico(`Divisão: ${numerador} ÷ ${denominador}`, res);
                }
                break;
                
            case "derivada":
                if (!expr) {
                    alert("Informe uma expressão válida.");
                    return;
                }
                res = mathLib.funcao_derivada(expr, x);
                mostrarResultado(res);
                if (res && res.expressao) {
                    if (res.hasOwnProperty('valor')) {
                        adicionarHistorico(`Derivada de ${expr} em x = ${x}`, `${res.expressao} = ${res.valor}`);
                    } else {
                        adicionarHistorico(`Derivada de ${expr}`, res.expressao);
                    }
                } else {
                    adicionarHistorico(`Derivada de ${expr}`, "Erro no cálculo");
                }
                break;
                
            case "integral":
                if (!expr) {
                    alert("Informe uma expressão válida.");
                    return;
                }
                
                if (limiteInf === '' || limiteSup === '') {
                    // Integral indefinida
                    res = mathLib.funcao_integral(expr);
                    mostrarResultado(res);
                    if (res && res.primitiva) {
                        adicionarHistorico(`Primitiva de ${expr}`, res.primitiva);
                    } else {
                        adicionarHistorico(`Primitiva de ${expr}`, "Erro no cálculo");
                    }
                } else {
                    // Integral definida
                    res = mathLib.funcao_integral(expr, limiteInf, limiteSup);
                    mostrarResultado(res);
                    if (res && res.hasOwnProperty('resultado')) {
                        adicionarHistorico(`Integral de ${expr} de ${limiteInf} a ${limiteSup}`, res.resultado);
                    } else {
                        adicionarHistorico(`Integral de ${expr} de ${limiteInf} a ${limiteSup}`, "Erro no cálculo");
                    }
                }
                break;
                
            case "potencia":
                if (isNaN(base) || isNaN(expoente)) {
                    alert("Informe base e expoente válidos.");
                    return;
                }
                res = mathLib.funcao_potencia(base, expoente);
                mostrarResultado(res);
                adicionarHistorico(`Potência: ${base}^${expoente}`, res);
                break;

            case "afim":
                if (isNaN(a) || isNaN(b) || isNaN(x)) {
                    alert("Informe a, b e x válidos.");
                    return;
                }
                res = mathLib.funcao_afim(a, b, x);
                mostrarResultado(res);
                adicionarHistorico(`f(x) = ${a}x + ${b} para x = ${x}`, res);
                break;

            case "equacao_1_grau":
                if (isNaN(a) || isNaN(b)) {
                    alert("Informe a e b válidos.");
                    return;
                }
                res = mathLib.equacao_primeiro_grau(a, b);
                mostrarResultado(res ?? "Sem solução real");
                adicionarHistorico(`Equação 0 = ${a}x + ${b}`, res ?? "Sem solução real");
                break;

            case "equacao_2_grau":
                if (isNaN(a) || isNaN(b) || isNaN(c)) {
                    alert("Informe a, b e c válidos.");
                    return;
                }
                res = mathLib.equacao_segundo_grau(a, b, c);
                mostrarResultado(res ?? "Sem solução real");
                adicionarHistorico(`Equação ${a}x² + ${b}x + ${c} = 0`, res ?? "Sem solução real");
                break;

            case "segundo_grau":
                if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(x)) {
                    alert("Informe a, b, c e x válidos.");
                    return;
                }
                res = mathLib.funcao_segundo_grau(a, b, c, x);
                mostrarResultado(res);
                adicionarHistorico(`f(${x}) = ${a}x² + ${b}x + ${c}`, res);
                break;

            case "inequacao_1":
                if (isNaN(a) || isNaN(b) || !operador) {
                    alert("Informe a, b válidos e selecione um operador.");
                    return;
                }
                res = mathLib.inequacao_primeiro_grau(a, b, operador);
                mostrarResultado(res);
                adicionarHistorico(`Inequação ${a}x + ${b} ${operador} 0`, res);
                break;

            case "inequacao_2":
                if (isNaN(a) || isNaN(b) || isNaN(c) || !operador) {
                    alert("Informe a, b, c válidos e selecione um operador.");
                    return;
                }
                res = mathLib.inequacao_segundo_grau(a, b, c, operador);
                mostrarResultado(res);
                adicionarHistorico(`Inequação ${a}x² + ${b}x + ${c} ${operador} 0`, res);
                break;

            case "exponencial":
                if (isNaN(a) || isNaN(base) || isNaN(x)) {
                    alert("Informe a, base e x válidos.");
                    return;
                }
                res = mathLib.funcao_exponencial(a, base, x);
                mostrarResultado(res);
                adicionarHistorico(`f(x) = ${a} * ${base}^${x}`, res);
                break;

            case "logaritmo":
                if (isNaN(a) || isNaN(base) || isNaN(x)) {
                    alert("Informe a, base e x válidos.");
                    return;
                }
                res = mathLib.funcao_logaritmo(a, base, x);
                mostrarResultado(res ?? "Erro");
                adicionarHistorico(`f(x) = ${a} * log_${base}(${x})`, res ?? "Erro");
                break;

            case "inversa":
                if (isNaN(a) || isNaN(b) || isNaN(inverso)) {
                    alert("Informe a, b e o valor para calcular a inversa válidos.");
                    return;
                }
                res = mathLib.funcao_inversa(a, b, inverso);
                mostrarResultado(res ?? "Erro");
                adicionarHistorico(`f⁻¹(${inverso}) de f(x) = ${a}x + ${b}`, res ?? "Erro");
                break;

            case "limite":
                if (!expr || !aprox) {
                    alert("Informe expressão e x tende a.");
                    return;
                }
                res = mathLib.funcao_limite(expr, aprox);
                mostrarResultado(res);
                adicionarHistorico(`Limite de ${expr} quando x → ${aprox}`, res);
                break;

            default:
                alert("Operação inválida ou não implementada.");
        }
    } catch (error) {
        console.error("Erro ao executar operação:", error);
        alert("Ocorreu um erro ao calcular. Verifique os valores inseridos.");
    }
});

// Inicializar a interface escondendo todos os inputs
window.addEventListener('DOMContentLoaded', () => {
    const todosInputs = document.querySelectorAll('.input-field');
    todosInputs.forEach(input => {
        input.style.display = 'none';
    });
    
    displayPanel.innerHTML = "Selecione uma operação no menu à esquerda para começar.";
    
    // Adicionar dica geral
    const dica = document.createElement("div");
    dica.classList.add("help-tip");
    dica.textContent = "Para inserir potências, use o símbolo ^ (ex: x^2). Para valores negativos, use o sinal - (ex: -3).";
    document.querySelector('.main-panel').insertBefore(dica, document.querySelector('.input-area'));
});
