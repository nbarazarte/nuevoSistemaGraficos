import { useEffect, useState } from 'react'
import './App.css'
import Congestion from './Congestion'
import LlamadasCaidas from './LlamadasCaidas'
import TraficoVolumenVoz from './TraficoVolumenVoz'
import axios from 'axios'

function App() {

    const [datahuawei, setDatahuawei] = useState()
    const [dataZte, setDataZte] = useState()

useEffect(() => {
    
/*     const url_huawei = `http://localhost:3000/gsm/huawei`
    axios.get(url_huawei)
    .then(res => {setDatahuawei(res.data)})  
    .catch(err => console.log(err)) */
    
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
            <LlamadasCaidas proveedor={datahuawei}/>
            <hr /> 
            <TraficoVolumenVoz proveedor={datahuawei}/>
            <hr />
            <Congestion proveedor={datahuawei}/>    
        </>        
        : 'Cargando'
    }    
    {
        dataZte ?
        <>
            <h1>Gráficos GSM: ZTE</h1>
            <LlamadasCaidas proveedor={dataZte}/>
            <hr /> 
            <TraficoVolumenVoz proveedor={dataZte}/>
            <hr />
            <Congestion proveedor={dataZte}/>    
        </>        
        : 'Cargando'
    }



{/*       <h1>Gráficos GSM: Huawei</h1>
        <LlamadasCaidas proveedor={'huawei'}/>
        <hr /> 
        <TraficoVolumenVoz proveedor={'huawei'}/>
        <hr />
        <Congestion proveedor={'huawei'}/>
        <hr />
        <h1>Gráficos GSM: ZTE</h1>
        <LlamadasCaidas proveedor={'zte'}/>
        <hr /> 
        <TraficoVolumenVoz proveedor={'zte'}/>
        <hr />
        <Congestion proveedor={'zte'}/>   */}
    </>
  )
}

export default App
