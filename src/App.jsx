import { useEffect, useState } from 'react';
import './App.css'
import LineChart from './components/LineChart'
import axios from 'axios';

function App() {

const [ejex, setEjex] = useState()
const [ejey, setEjey] = useState({})
let cn5 = [];
let cn6 = []; 
let lu5 = []; 
let mb3 = [];
let mb4 = []; 
let val = [];

useEffect(() => {

  const url = `http://localhost:3000/gsm`

  axios.get(url)
  .then(res => {

    const data = res.data;
    const centrales = [];
    const horas = [];
    let miobj = {};

    for (const x of data) {

      if(!horas.includes(x.hora)){
        horas.push(x.hora)
      } 

      if(!centrales.includes(x.bsc)){
        centrales.push(x.bsc)
      }
    }

    //console.log(data);
    
    for (const c of centrales) {

        miobj[c] = data.filter( d => { return d.bsc === c }) //Filtro por BSC

        let groupedByHour = miobj[c].reduce((acc, curr) => { //Agrupo por las horas
          if (!acc[curr.hora]) {
          acc[curr.hora] = [curr];
          } else {
          acc[curr.hora].push(curr);
          }
          return acc;
          }, {})
          
          let averagesByHour = Object.keys(groupedByHour).reduce((acc, curr) => { //saco el promedio
            const sum = groupedByHour[curr].reduce((a, c) => a + Number(c.volumendetrafico), 0);
            const avg = sum / groupedByHour[curr].length;
            acc[curr] = avg;
            return acc;
            }, {})

            miobj[c] = averagesByHour
            
        //console.log(miobj[c])
    }
    setEjey(miobj);
    //console.log(miobj['CN5'])
    setEjex(horas);
  }
    
  )  
  .catch(err => console.log(err))
}, [])

  for (const bsc in ejey) {
    for (const hora of ejex) {
      bsc === 'CN5' ? cn5.push(Math.round(ejey[bsc][hora])) : 0
      bsc === 'CN6' ? cn6.push(Math.round(ejey[bsc][hora])) : 0
      bsc === 'LU5' ? lu5.push(Math.round(ejey[bsc][hora])) : 0
      bsc === 'MB3' ? mb3.push(Math.round(ejey[bsc][hora])) : 0
      bsc === 'MB4' ? mb4.push(Math.round(ejey[bsc][hora])) : 0
      bsc === 'VAL' ? val.push(Math.round(ejey[bsc][hora])) : 0
    }
  }

  let midata = {
      labels: ejex,
      datasets: [ // Cada una de las líneas del gráfico
          {
              label: 'CN5',
              data: cn5,
              tension: 0.5,
              fill : true,
              borderColor: 'red',
              backgroundColor: 'red',
              pointRadius: 12,
              pointBorderColor: 'black',
              pointBackgroundColor: 'black',
              datalabels: {
              color: 'white',
              labels: {
                title: {
                  font: {
                    weight: 'bold',
                    size:10
                  }
                },
              }
            }
          
          },
          {
              label: 'CN6',
              data: cn6,
              tension: 0.5,
              fill : true,
              borderColor: 'blue',
              backgroundColor: 'blue',
              pointRadius: 12,
              pointBorderColor: 'black',
              pointBackgroundColor: 'black', 
              datalabels: {
              color: 'white',
              labels: {
                title: {
                  font: {
                    weight: 'bold',
                    size:10
                  }
                },
              }
            }

          },
          {
            label: 'LU5',
            data: lu5,
            tension: 0.5,
            fill : true,
            borderColor: 'blue',
            backgroundColor: 'blue',
            pointRadius: 12,
            pointBorderColor: 'black',
            pointBackgroundColor: 'black', 
            datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size:10
                }
              },
            }
          }
          }, 
          {
            label: 'MB3',
            data: mb3,
            tension: 0.5,
            fill : true,
            borderColor: 'red',
            backgroundColor: 'red',
            pointRadius: 12,
            pointBorderColor: 'black',
            pointBackgroundColor: 'black',
            datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size:10
                }
              },
            }
          }
        
          },
          {
              label: 'MB4',
              data: mb4,
              tension: 0.5,
              fill : true,
              borderColor: 'blue',
              backgroundColor: 'blue',
              pointRadius: 12,
              pointBorderColor: 'black',
              pointBackgroundColor: 'black', 
              datalabels: {
              color: 'white',
              labels: {
                title: {
                  font: {
                    weight: 'bold',
                    size:10
                  }
                },
              }
            }
          },
          {
            label: 'VAL',
            data: val,
            tension: 0.5,
            fill : true,
            borderColor: 'blue',
            backgroundColor: 'blue',
            pointRadius: 12,
            pointBorderColor: 'black',
            pointBackgroundColor: 'black', 
            datalabels: {
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold',
                  size:10
                }
              },
            }
          }
          },                 
      ],
  };

  let misoptions = {

      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: 'Trafico de Volumen en Voz por Hora',
        },
    }
  };

  
  return (
    <main>
      <h1>Gráficos</h1>
      {
        !ejex ? 'Cargando': <LineChart midata={midata} misoptions={misoptions}/>
      }
    </main>
  )
}

export default App
