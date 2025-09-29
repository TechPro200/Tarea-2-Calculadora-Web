const pantalla = document.getElementById("Resultado");
const Btnnumeros = document.querySelectorAll(".num");
const suma = document.getElementById("suma");
const resta = document.getElementById("resta");
const multiplicacion = document.getElementById("multiplicacion");
const division = document.getElementById("division");
const lista = document.getElementById("ResultadosGuardados")

document.addEventListener("DOMContentLoaded", () => {
  mostrarhistorial(); 
});

function limpiarError() {
  if (pantalla.value === "Error" || pantalla.value === "undefined") {
    pantalla.value = "";
  }
}

Btnnumeros.forEach(boton => {
    boton.addEventListener("click", () => {
    limpiarError()
    pantalla.value += boton.textContent;
    });
});

function BorrarOp(){
  pantalla.value = pantalla.value.slice(0, -1); 
}

suma.addEventListener("click", () => {limpiarError(); pantalla.value += '+'; })
resta.addEventListener("click", () => {limpiarError(); pantalla.value += '-'; })
multiplicacion.addEventListener("click", () => {limpiarError(); pantalla.value += '×'; })
division.addEventListener("click", () => {limpiarError(); pantalla.value += '÷'; })


function calcular(){
  try{
    let expr = pantalla.value.replace(/×/g, '*').replace(/÷/g, '/');
    let Resultado = eval(expr);
    pantalla.value = Resultado

    historial(expr,Resultado);
    mostrarhistorial();
  }
  catch(error){
    pantalla.value = "Error"
  }
};

function historial(expr,Resultado){
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.push({expr,Resultado});
  localStorage.setItem("historial", JSON.stringify(historial))
  console.log(historial);
}

function mostrarhistorial(){
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  lista.innerHTML = ""
  historial.forEach(item => {
    let list = document.createElement("li")
    list.textContent = `${item.expr} = ${item.Resultado}`;
    lista.appendChild(list);
  });
}

function borrarhistorial(){
  let historial = JSON.parse(localStorage.getItem("historial")) || [];
  localStorage.removeItem("historial");
  mostrarhistorial();
}


