import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/countries/ve/ve-all.geo.json";
import "boxicons";
highchartsMap(Highcharts);

function GraficoMapa({ proveedor, titulo }) {
  //console.log(proveedor);
  let dataFinal = [];
  let dataFinalOperativas = [];
  let dataFinalParciales = [];
  let dataFinalFallas = [];

  //console.log(proveedor);
  /*   const obj = [];
  for (let i = 0; i < proveedor.length; i++) {
    obj[i] = {
      z: 1,
      keyword: proveedor[i].bts_name,
      lat: parseFloat(proveedor[i].latitud),
      lon: parseFloat(proveedor[i].longitud),
    };
  }
  dataFinal = obj; */

  let operativas = proveedor.filter((oper) => oper.estatus == "Operativa");
  const objOperativa = [];
  for (let i = 0; i < operativas.length; i++) {
    objOperativa[i] = {
      z: 1,
      keyword: operativas[i].bts_name,
      lat: parseFloat(operativas[i].latitud),
      lon: parseFloat(operativas[i].longitud),
    };
  }
  dataFinalOperativas = objOperativa;

  let parciales = proveedor.filter(
    (oper) => oper.estatus == "Parcialmente Operativa"
  );
  const objParciales = [];
  for (let i = 0; i < parciales.length; i++) {
    objParciales[i] = {
      z: 1,
      keyword: parciales[i].bts_name,
      lat: parseFloat(parciales[i].latitud),
      lon: parseFloat(parciales[i].longitud),
    };
  }
  dataFinalParciales = objParciales;

  let fallas = proveedor.filter((oper) => oper.estatus == "Falla Total");
  const objFallas = [];
  for (let i = 0; i < fallas.length; i++) {
    objFallas[i] = {
      z: 1,
      keyword: fallas[i].bts_name,
      lat: parseFloat(fallas[i].latitud),
      lon: parseFloat(fallas[i].longitud),
    };
  }
  dataFinalFallas = objFallas;

  // console.log(operativas);
  // console.log(parciales);
  // console.log(fallas);
  //console.log(dataFinal);

  if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }

  const mapOptions = {
    chart: {
      backgroundColor: '#B7B7B7',
      map: "countries/ve/ve-all",
    },
    title: {
      text: titulo,
      align: "center",
    },
    subtitle: {
      text: `Total <b>${proveedor.length}</b> Radio Bases`,
      align: "center",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox",
        verticalAlign: "bottom",
      },
    },
    mapView: {
      padding: [0, 0, 8, 0],
    },
     legend: {
      floating: true,
      backgroundColor: "#ffffffcc",
    }, 
/*     legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'vertical',
      itemStyle: {
          color: '#ddd'
      }
  },   */  
    tooltip: {
      headerFormat: "",
      pointFormat:
        "<b>{point.freq}</b><br><b>{point.keyword}</b>                      <br>lat: {point.lat}, lon: {point.lon}",
    },
    plotOptions: {
      series: {
        // general options for all series
      },
      mappoint: {
        turboThreshold: 5000,

        marker: {
          lineWidth: 0.5,
          //lineColor: '#000',
          symbol: "circle", //mapmarker, circle
          radius: 3,
        },
      },
    },
    series: [
      {
        // Use the gb-all map with no data as a basemap
        name: "Basemap",
        mapData: mapDataIE,
        borderColor: "#A0A0A0",
        nullColor: "#EEEEEE",//"rgba(177, 244, 177, 0.5)",
        showInLegend: false,
      },
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: `Operativas <b>${operativas.length}</b>`,
        color: "green",
        //data: [{ z: 1, keyword: "Ruiz Pineda", lat: 10.43, lon: -66.99 }, { z: 1, keyword: "Barrio El Rosario Valle de la Pascua", lat: 9.22, lon: -66.01 }],
        data: dataFinalOperativas,
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              console.log(this.keyword);
            },
          },
        },
      },
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: `Fuera de Servicio Parcial <b>${parciales.length}</b>`,
        color: "orange",
        //data: [{ z: 1, keyword: "Ruiz Pineda", lat: 10.43, lon: -66.99 }, { z: 1, keyword: "Barrio El Rosario Valle de la Pascua", lat: 9.22, lon: -66.01 }],
        data: dataFinalParciales,
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              console.log(this.keyword);
            },
          },
        },
      },
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: `Fuera de Servicio Total <b>${fallas.length}</b>`,
        color: "red",
        //data: [{ z: 1, keyword: "Ruiz Pineda", lat: 10.43, lon: -66.99 }, { z: 1, keyword: "Barrio El Rosario Valle de la Pascua", lat: 9.22, lon: -66.01 }],
        data: dataFinalFallas,
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              console.log(this.keyword);
            },
          },
        },
      },
    ],
  };

  return (
    <>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </>
  );
}

export default GraficoMapa;
