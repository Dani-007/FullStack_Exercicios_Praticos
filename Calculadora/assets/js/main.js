//não era necessário criar uma função para criar a calculadora,
// mas foi feito para fins de aprendizado
function criaCalculadora(){
    return {
        display: document.querySelector('.display'),
        btnClear: document.querySelector('.btn-clear'),

        iniciar(){
            this.clickBottons();
        },

        btnParaDisplay(valor){
            this.display.value += valor;
        },

        clearDisplay(){
            this.display.value = '';
        },

        deleteOne(){
            this.display.value = this.display.value.slice(0, -1);
        },

        doTheMath() {
            let conta = this.display.value;
        
            try {  
                // Validar se a expressão contém apenas números e operadores válidos
                if (!/^[\d+\-*/.() ]+$/.test(conta)) {
                    throw new Error('Expressão inválida');
                }
        
                // Avaliar a expressão matemática com segurança
                const resultado = this.calculateExpression(conta);
        
                // Exibir o resultado ou limpar o display se for inválido
                if (!isNaN(resultado)) {
                    this.display.value = resultado;
                } else {
                    throw new Error('Resultado inválido');
                }
            } catch (e) {
                alert('Conta inválida: ' + e.message);
                this.clearDisplay();
            }
        },
        
        calculateExpression(expressao) {
            // Divide a expressão em tokens usando os operadores
            const tokens = expressao.split(/([+\-*/])/).map(token => token.trim()).filter(token => token);
        
            let resultado = parseFloat(tokens[0]);
            for (let i = 1; i < tokens.length; i += 2) {
                const operador = tokens[i];
                const proximoNumero = parseFloat(tokens[i + 1]);
        
                if (isNaN(proximoNumero)) throw new Error('Número inválido');
        
                switch (operador) {
                    case '+':
                        resultado += proximoNumero;
                        break;
                    case '-':
                        resultado -= proximoNumero;
                        break;
                    case '*':
                        resultado *= proximoNumero;
                        break;
                    case '/':
                        if (proximoNumero === 0) throw new Error('Divisão por zero');
                        resultado /= proximoNumero;
                        break;
                    default:
                        throw new Error('Operador inválido');
                }
            }
        
            return resultado;
        },

        clickBottons() {
            document.addEventListener('click', e =>{
                const el = e.target;

                if(el.classList.contains('btn-num')){
                    this.btnParaDisplay(el.innerText);
                }

                if(el.classList.contains('btn-clear')){
                    this.clearDisplay();
                }

                if(el.classList.contains('btn-del')){
                    this.deleteOne();
                }

                if(el.classList.contains('btn-eq')){
                    this.doTheMath();
                }
            });
        },
            
    };
}

const calculadora = criaCalculadora();
calculadora.iniciar();