const formulario = document.getElementById("formulario");

const grafico = document.getElementById("grafico");

var caso = 1;


var chart = new Chart(grafico, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Pivote izquierdo",
        data: [],
        borderColor: "red",
        fill: false
      },
      {
        label: "Pivote derecho",
        data: [],
        borderColor: "blue",
        fill: false
      },
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Valores de los pivotes"
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Masa de los bloques"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  },
});


const obtenerValores = async () => {

  const masaTabla = (document.getElementById("masaTabla")).value;
  const masaBloque1 = (document.getElementById("masaBloque1")).value;
  const masaBloque2 = (document.getElementById("masaBloque2")).value;
  const masaBloque3 = (document.getElementById("masaBloque3")).value;
  const masaBloque4 = (document.getElementById("masaBloque4")).value;

  return { masaTabla, masaBloque1, masaBloque2, masaBloque3, masaBloque4 }

}

const calcular = async (masaTabla, masaBloque1, masaBloque2, masaBloque3, masaBloque4) => {

  const gravedad = 9.8;

  const fuerzaPivoteDerecho = ( (masaTabla * gravedad * 3) + (masaBloque2 * gravedad * 2) + (masaBloque3 * gravedad * 4) + (masaBloque4 * gravedad * 6) ) / 6;

  const fuerzaPivoteIzquierdo = ((masaTabla * gravedad ) + (masaBloque1 * gravedad) + (masaBloque2 * gravedad) + (masaBloque3 * gravedad) + (masaBloque4 * gravedad) - (fuerzaPivoteDerecho));

  return { fuerzaPivoteDerecho, fuerzaPivoteIzquierdo };

}

const ejecutar  = async() => {
  
  const valoresMasas = await obtenerValores();
  const valoresPivotes = await calcular(valoresMasas.masaTabla, valoresMasas.masaBloque1, valoresMasas.masaBloque2, valoresMasas.masaBloque3, valoresMasas.masaBloque4);
  await actualizarGrafico(valoresPivotes.fuerzaPivoteIzquierdo, valoresPivotes.fuerzaPivoteDerecho, caso);
  await actualizarTabla(valoresMasas.masaTabla, valoresMasas.masaBloque1, valoresMasas.masaBloque2, valoresMasas.masaBloque3, valoresMasas.masaBloque4,valoresPivotes.fuerzaPivoteDerecho, valoresPivotes.fuerzaPivoteIzquierdo, caso)
  caso += 1;


  
} 

const actualizarGrafico = async(pivoteIzquierdoValor, pivoteDerechoValor, caso)  => {
  var caso = `Caso ${caso}`;
  chart.data.labels.push(caso);
  chart.data.datasets[0].data.push(pivoteIzquierdoValor);
  chart.data.datasets[1].data.push(pivoteDerechoValor);
  chart.update();

}

const actualizarTabla = async( masaTabla, masaBloque1, masaBloque2, masaBloque3, masaBloque4, pivoteDerechoValor, pivoteIzquierdoValor, caso) => {

  const tabla = document.getElementById("tabla-body");
  const fila = document.createElement("tr");
  const columna1 = document.createElement("td");
  const columna2 = document.createElement("td");
  const columna3 = document.createElement("td");
  const columna4 = document.createElement("td");
  const columna5 = document.createElement("td");
  const columna6 = document.createElement("td");
  const columna7 = document.createElement("td");
  const columna8 = document.createElement("td");

  columna1.innerHTML = caso;
  columna2.innerHTML = masaTabla + ' kg';
  columna3.innerHTML = masaBloque1 + ' kg';
  columna4.innerHTML = masaBloque2 + ' kg';
  columna5.innerHTML = masaBloque3 + ' kg';
  columna6.innerHTML = masaBloque4 + ' kg';
  columna7.innerHTML = pivoteDerechoValor + ' N';
  columna8.innerHTML = pivoteIzquierdoValor + ' N';

  fila.appendChild(columna1);
  fila.appendChild(columna2);
  fila.appendChild(columna3);
  fila.appendChild(columna4);
  fila.appendChild(columna5);
  fila.appendChild(columna6);
  fila.appendChild(columna7);
  fila.appendChild(columna8);

  tabla.appendChild(fila);

}

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  ejecutar();

});



