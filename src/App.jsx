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

let ac2 = [];
let ac3 = []; 
let bt2 = []; 
let bt3 = []; 
let cnt = []; 
let faj = []; 
let lc2 = []; 
let lc3 = []; 
let lms = []; 
let lur = []; 
let mc2 = []; 
let mc4 = []; 
let mt2 = []; 
let pl2 = []; 
let pt2 = []; 
let sc2 = []; 
let sc3 = []; 
let sf2 = []; 
let vr2 = [];

useEffect(() => {

  const url = `http://localhost:3000/gsm`

  axios.get(url)
  .then(res => {

    const data = res.data;
    const centrales = [];
    const horas = [];
    let miobj = {};

    for (const x of data) {
      if(!horas.includes(x.hora)) { horas.push(x.hora) } 
      if(!centrales.includes(x.bsc)) { centrales.push(x.bsc) }
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

  let dataSetGrafica = []
  let count = 0
  let data = []

  for (const bsc in ejey) {
    for (const hora of ejex) {
      
      data[count] = () => {
        //ZTE
        if(bsc === 'CN5') { cn5.push(Math.round(ejey[bsc][hora])); return cn5 }
        if(bsc === 'CN6') { cn6.push(Math.round(ejey[bsc][hora])); return cn6 }
        if(bsc === 'LU5') { lu5.push(Math.round(ejey[bsc][hora])); return lu5 }
        if(bsc === 'MB3') { mb3.push(Math.round(ejey[bsc][hora])); return mb3 }
        if(bsc === 'MB4') { mb4.push(Math.round(ejey[bsc][hora])); return mb4 }
        if(bsc === 'VAL') { val.push(Math.round(ejey[bsc][hora])); return val }

        //HUAWEI
        if(bsc === 'AC2') { ac2.push(Math.round(ejey[bsc][hora])); return ac2 }
        if(bsc === 'AC3') { ac3.push(Math.round(ejey[bsc][hora])); return ac3 }
        if(bsc === 'BT2') { bt2.push(Math.round(ejey[bsc][hora])); return bt2 }  
        if(bsc === 'BT3') { bt3.push(Math.round(ejey[bsc][hora])); return bt3 }
        if(bsc === 'CNT') { cnt.push(Math.round(ejey[bsc][hora])); return cnt }
        if(bsc === 'FAJ') { faj.push(Math.round(ejey[bsc][hora])); return faj }
        if(bsc === 'LC2') { lc2.push(Math.round(ejey[bsc][hora])); return lc2 }
        if(bsc === 'LC3') { lc3.push(Math.round(ejey[bsc][hora])); return lc3 }
        if(bsc === 'LMS') { lms.push(Math.round(ejey[bsc][hora])); return lms }
        if(bsc === 'LUR') { lur.push(Math.round(ejey[bsc][hora])); return lur }
        if(bsc === 'MC2') { mc2.push(Math.round(ejey[bsc][hora])); return mc2 }
        if(bsc === 'MC4') { mc4.push(Math.round(ejey[bsc][hora])); return mc4 }
        if(bsc === 'MT2') { mt2.push(Math.round(ejey[bsc][hora])); return mt2 }
        if(bsc === 'PL2') { pl2.push(Math.round(ejey[bsc][hora])); return pl2 }
        if(bsc === 'PT2') { pt2.push(Math.round(ejey[bsc][hora])); return pt2 }
        if(bsc === 'SC2') { sc2.push(Math.round(ejey[bsc][hora])); return sc2 }
        if(bsc === 'SC3') { sc3.push(Math.round(ejey[bsc][hora])); return sc3 }
        if(bsc === 'SF2') { sf2.push(Math.round(ejey[bsc][hora])); return sf2 }
        if(bsc === 'VR2') { vr2.push(Math.round(ejey[bsc][hora])); return vr2 }
      }

      let color = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      let finalColor = color()

      dataSetGrafica[count] =  {
          label: bsc,
          data: data[count](),
          tension: 0.5,
          fill : true,
          borderColor: finalColor,
          backgroundColor: finalColor,
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
      }
    }
    count++
  }

let midata = {
    labels: ejex,
    datasets: dataSetGrafica,
};

//console.log( midata);

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
