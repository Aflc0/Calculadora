const $screen = document.getElementById("w3review");
const $input = document.getElementById("res");
const $buttons = document.querySelectorAll(".click-button");

const p_lenght = 5;
const p_numeros = new Array(p_lenght);
const p_operadores = new Array(p_lenght);
let topNum = 0;
let topOpe = 0;
let lastEntrance;

class Calculator {
  constructor() {}

  //Adiciona pilha de operadores
  addOperStack(enter) {
    if (topOpe < p_lenght) {
      p_operadores[topOpe] = enter;
      topOpe++;
    } else {
      alert("Está cheio!");
      topOpe = p_lenght;
    }
  }

  //Adiciona Pilha de números
  addNumberStack(enter) {
    if (topNum < p_lenght) {
      p_numeros[topNum] = enter;
      topNum++;
    } else {
      alert("Está cheio!");
      topNum = p_lenght;
    }
  }

  //Atualiza textarea
  updateScreen(val) {
    $screen.disabled = "false";
    $screen.value += `${$input.value}\n ${val}\n`;
    $screen.disabled = "true";
  }

  //Pega valor clicado e coloca no input
  updateInput(val) {
    $input.value += val;
  }

  //Limpa o input
  clean() {
    $input.value = "";
  }

  //Limpa tudo
  cleanAll() {
    $input.value = "";
    $screen.value = "";
    while (topNum >= 0) {
      p_numeros[topNum] = "";
      topNum--;
    }
    while (topOpe >= 0) {
      p_operadores[topOpe] = "";
      topOpe--;
    }
  }

  //Calcula operação
  calculate(equal) {
    let lastDigit = $screen.value.trim().slice(-1);
    if (!lastDigit) {
      return;
    } else if (isNaN(lastDigit) && !$input.value) {
      console.log("Digite um número");
      return;
    } else {
      calculadora.addNumberStack($input.value);
      calculadora.updateScreen();
      calculadora.clean();
    }
  }
}

//Instancia objeto
const calculadora = new Calculator();

//Mostra as duas pilhas
function mostrarPilhas() {
  console.log("Números: " + p_numeros + " Operadores: " + p_operadores);
}

//Verifica operador anterior e executa operação

function verificarAnterior(op) {
  let n1 = parseInt(p_numeros[topNum - 2]);
  let n2 = parseInt(p_numeros[topNum - 1]);
  let topoAnterior = p_operadores[topOpe - 2];
  if (op == topoAnterior) {
    executaOperacao(op);
  } else if (
    (op == "+" || op == "-") &&
    (topoAnterior == "*" || topoAnterior == "/" || topoAnterior == "%")
  ) {
    executaOperacao(op);
  } else if (op == "=") {
    executaOperacao(topoAnterior);
    $screen.value = p_numeros[0];
  } else if (op == "+" && topoAnterior == "-") {
    executaOperacao(topoAnterior);
  } else if (op == "-" && topoAnterior == "+") {
    executaOperacao(topoAnterior);
  } else if (op == "=") {
    executaOperacao(op);
  }

  function executaOperacao(oper) {
    switch (oper) {
      case "*":
        //Substituir numero
        p_numeros[topNum - 2] = n1 * n2;
        p_numeros[topNum - 1] = "";
        //Substituir operador
        p_operadores[topOpe - 2] = p_operadores[topOpe - 1];
        p_operadores[topOpe - 1] = "";
        topNum--;
        topOpe--;
        topoAnterior = p_operadores[topOpe - 2];
        verificarAnterior(topoAnterior);

        break;
      case "/":
        //Substituir numero
        p_numeros[topNum - 2] = n1 / n2;
        p_numeros[topNum - 1] = "";
        //Substituir operador
        p_operadores[topOpe - 2] = p_operadores[topOpe - 1];
        p_operadores[topOpe - 1] = "";
        topNum--;
        topOpe--;
        topoAnterior = p_operadores[topOpe - 2];
        verificarAnterior(topoAnterior);

        break;
      case "%":
        //Substituir numero
        p_numeros[topNum - 2] = n1 % n2;
        p_numeros[topNum - 1] = "";
        //Substituir operador
        p_operadores[topOpe - 2] = p_operadores[topOpe - 1];
        p_operadores[topOpe - 1] = "";
        topNum--;
        topOpe--;
        topoAnterior = p_operadores[topOpe - 2];
        verificarAnterior(topoAnterior);

        break;
      case "+":
        //Substituir numero
        p_numeros[topNum - 2] = n1 + n2;
        p_numeros[topNum - 1] = "";
        //Substituir operador
        p_operadores[topOpe - 2] = p_operadores[topOpe - 1];
        p_operadores[topOpe - 1] = "";
        topNum--;
        topOpe--;
        topoAnterior = p_operadores[topOpe - 2];
        verificarAnterior(topoAnterior);

        break;
      case "-":
        //Substituir numero
        p_numeros[topNum - 2] = n1 - n2;
        p_numeros[topNum - 1] = "";
        //Substituir operador
        p_operadores[topOpe - 2] = p_operadores[topOpe - 1];
        p_operadores[topOpe - 1] = "";
        topNum--;
        topOpe--;
        topoAnterior = p_operadores[topOpe - 2];
        verificarAnterior(topoAnterior);

        break;
    }
  }
}

//Função chamada ao clicar em um operador
function getInput(input) {
  if (isNaN(input)) {
    if (!$input.value) {
      console.log("Digite um número");
    } else {
      calculadora.addNumberStack($input.value);
      calculadora.updateScreen(input);
      calculadora.clean();
      calculadora.addOperStack(input);
      verificarAnterior(input);
    }
  } else {
    calculadora.updateInput(input);
  }
}

//Adiciona atributo a todos os botões
$buttons.forEach((item) => {
  item.setAttribute("onclick", "getInput(this.innerText)");
});
