import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

import GraficoLinea from './GraficoLinea'

function App() {

    const [datahuawei, setDatahuawei] = useState()
    const [dataZte, setDataZte] = useState()

    useEffect(() => {
        
        const url_huawei = `http://localhost:3000/gsm/huawei`
        axios.get(url_huawei)
        .then(res => {setDatahuawei(res.data)})  
        .catch(err => console.log(err)) 
        
        const url_zte = `http://localhost:3000/gsm/zte`
        axios.get(url_zte)
        .then(res => {setDataZte(res.data)})  
        .catch(err => console.log(err)) 

    }, [])

  return (
    <>
    {
        datahuawei ?
        <>
            <h1>Gráficos GSM: Huawei</h1>
            <GraficoLinea
                proveedor={datahuawei}
                titulo={'Llamadas Caidas (%)'}
                kpi={'llamadascaidas'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={datahuawei}
                titulo={'Trafico de Volumen de Voz (Erlang)'}
                kpi={'volumendetrafico'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={datahuawei}
                titulo={'Congestion (%)'}
                kpi={'congestion'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={datahuawei}
                titulo={'Disponibilidad (%)'}
                kpi={'disponibilidad'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={datahuawei}
                titulo={'Accesibilidad (%)'}
                kpi={'accesibilidad'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />            
        </>        
        : 'Cargando datos de Huawei'
    }
    <hr /> 
    {
        dataZte ?
        <>
            <h1>Gráficos GSM: ZTE</h1>
            <GraficoLinea
                proveedor={dataZte}
                titulo={'Llamadas Caidas (%)'}
                kpi={'llamadascaidas'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={dataZte}
                titulo={'Trafico de Volumen de Voz (Erlang)'}
                kpi={'volumendetrafico'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={dataZte}
                titulo={'Congestion (%)'}
                kpi={'congestion'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={dataZte}
                titulo={'Disponibilidad (%)'}
                kpi={'disponibilidad'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
            <hr />
            <GraficoLinea
                proveedor={dataZte}
                titulo={'Accesibilidad (%)'}
                kpi={'accesibilidad'}//se debe llamar el kpi como se llama en la vista materializada
                tipo={'horas'}//puede ser horas o dias
            />
        </>        
        : 'Cargando datos de ZTE'
    }
    </>
  )
}

export default App
