//capturar evento de submit do formulário
const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso){
        setResult('Peso inválido', false);
        return;
    }

    if (!altura){
        setResult('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);
    const recomendação = getRecomendação(imc, peso, altura);

    const msg = `Seu IMC é ${imc} (${nivelImc}). <br>
        ${recomendação}`;
    setResult(msg, true);

    console.log('checado');
});

function criaP() {
    const p = document.createElement('p');//cria um elemento p
    return p;
}

function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function getNivelImc(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 
        'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.99) return nivel[5];
    if (imc >= 34.99) return nivel[4];
    if (imc >= 29.99) return nivel[3];
    if (imc >= 24.99) return nivel[2];
    if (imc >= 18.50) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

function getPesoIdeal(altura, imc) {
    if(imc < 18.5){
        const pesoIdeal = 18.5 * altura ** 2;
        return pesoIdeal.toFixed(2);
    }
    if(imc > 24.99){
        const pesoIdeal = 24.99 * altura ** 2;
        return pesoIdeal.toFixed(2);
    }
}

function getRecomendação(imc, peso, altura) {
    if(imc < 18.5 || imc > 24.99){
        const pesoIdeal = getPesoIdeal(altura, imc);

        let palavra = '';
        if(imc < 18.5) palavra = 'ganhar';
        else palavra = 'perder';
        

        return `Seu peso ideal é ${getPesoIdeal(altura, imc)}. <br>
        Você precisa ${palavra} ${Math.abs(peso - pesoIdeal).toFixed(2)}kg.`;
    }
    else{
        return 'Parabéns! Você está no peso ideal.';
    }
}

function setResult(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';//limpa o conteúdo
    const p = criaP();

    if(isValid){
        p.classList.add('paragrafo-resultado');//adiciona uma classe ao elemento
    }
    else{
        p.classList.add('negativo');
    }
    
    p.innerHTML = msg;//adiciona um texto ao elemento
    resultado.appendChild(p);//adiciona o elemento p como filho de resultado
}

