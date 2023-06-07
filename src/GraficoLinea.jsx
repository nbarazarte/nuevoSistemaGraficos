import { useEffect, useState } from 'react';
import './App.css'
import LineChart from './components/LineChart'

function GraficoLinea({proveedor, titulo, kpi, tipo}) {

const [ejex, setEjex] = useState()
const [ejey, setEjey] = useState({})
let cn5 = [], cn6 = [], lu5 = [], mb3 = [], mb4 = [], val = [];
let ac2 = [], ac3 = [], bt2 = [], bt3 = [], cnt = [], faj = [], lc2 = [], lc3 = [], lms = [], lur = [], mc2 = [], mc4 = [], mt2 = [], pl2 = [], pt2 = [], sc2 = [], sc3 = [], sf2 = [], vr2 = [];

useEffect(() => {

  const data = proveedor;
  const centrales = [], horas = [], dias = [];
  let miobj = {};

  if(tipo === 'horas'){

    for (const x of data) {
        if(!horas.includes(x.hora)) { horas.push(x.hora) } 
        if(!centrales.includes(x.bsc)) { centrales.push(x.bsc) }
    }

    setEjex(horas);

  }else if(tipo === 'dias'){

    for (const x of data) {
        if(!dias.includes(x.dia)) { dias.push(x.dia) } 
        if(!centrales.includes(x.bsc)) { centrales.push(x.bsc) }
      }

      setEjex(dias);
  }

  //console.log(data);
  
  for (const c of centrales) {
    //console.log(tipo);
    let grouped = {}

    miobj[c] = data.filter( d => { return d.bsc === c }) //Filtro por BSC

    if(tipo === 'horas'){

        grouped = miobj[c].reduce((acc, curr) => { //Agrupo por las horas
            if (!acc[curr.hora]) {
              acc[curr.hora] = [curr];
            } else {
              acc[curr.hora].push(curr);
            }
            return acc;
            }, {})

    }else if(tipo === 'dias'){

        grouped = miobj[c].reduce((acc, curr) => { //Agrupo por los dias
            if (!acc[curr.dia]) {
              acc[curr.dia] = [curr];
            } else {
              acc[curr.dia].push(curr);
            }
            return acc;
            }, {})
    }
        let averagesByHour = Object.keys(grouped).reduce((acc, curr) => { //saco el promedio
            //console.log(kpi);
          const sum = grouped[curr].reduce((a, c) => a + Number(c[kpi]), 0);//kpi es una variable, si quisieramos hacer referencia directa al kpi de la consulta escribiriamos por ejemplo Number(c.disponibilidad)
          const avg = sum / grouped[curr].length;// en caso que sea solamente una suma seria asi: const avg = sum;
          acc[curr] = avg;
          return acc;
          }, {})

          miobj[c] = averagesByHour
          
      //console.log(miobj[c])
  }
  setEjey(miobj);
  //console.log(miobj['CN5'])
  
}, [])

  let dataSetGrafica = [], data = []
  let count = 0

  for (const bsc in ejey) {
    for (const x of ejex) {
      
      data[count] = () => {
        //ZTE
        if(bsc === 'CN5') { cn5.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return cn5 }
        if(bsc === 'CN6') { cn6.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return cn6 }
        if(bsc === 'LU5') { lu5.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return lu5 }
        if(bsc === 'MB3') { mb3.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return mb3 }
        if(bsc === 'MB4') { mb4.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return mb4 }
        if(bsc === 'VAL') { val.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return val }

        //HUAWEI        
        if(bsc === 'AC2') { ac2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return ac2 }
        if(bsc === 'AC3') { ac3.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return ac3 }
        if(bsc === 'BT2') { bt2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return bt2 }  
        if(bsc === 'BT3') { bt3.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return bt3 }
        if(bsc === 'CNT') { cnt.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return cnt }
        if(bsc === 'FAJ') { faj.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return faj }
        if(bsc === 'LC2') { lc2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return lc2 }
        if(bsc === 'LC3') { lc3.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return lc3 }
        if(bsc === 'LMS') { lms.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return lms }
        if(bsc === 'LUR') { lur.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return lur }
        if(bsc === 'MC2') { mc2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return mc2 }
        if(bsc === 'MC4') { mc4.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return mc4 }
        if(bsc === 'MT2') { mt2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return mt2 }
        if(bsc === 'PL2') { pl2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return pl2 }
        if(bsc === 'PT2') { pt2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return pt2 }
        if(bsc === 'SC2') { sc2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return sc2 }
        if(bsc === 'SC3') { sc3.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return sc3 }
        if(bsc === 'SF2') { sf2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return sf2 }
        if(bsc === 'VR2') { vr2.push(Number.parseFloat(ejey[bsc][x]).toFixed(2)); return vr2 }        
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
          //pointRadius: 12,
          //pointBorderColor: 'black',
          //pointBackgroundColor: 'black',
/*           datalabels: {
          color: 'white',
          labels: {
            title: {
              font: {
                weight: 'bold',
                size:10
              }
            },
          }
        } */
      }
    }
    count++
  }

let midata = {
    labels: ejex,
    datasets: dataSetGrafica,
};

let misoptions = {

    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: titulo,
      },
  }
};

  return (
    <main>      
      <LineChart midata={midata} misoptions={misoptions}/>
    </main>
  )
}

export default GraficoLinea
