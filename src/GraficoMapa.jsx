import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/countries/ve/ve-all.geo.json";
highchartsMap(Highcharts);

function GraficoMapa({ proveedor }) {
  //console.log(proveedor);
  let dataFinal = [];

  const obj = [];
  for (let i = 0; i < proveedor.length; i++) {
    obj[i] = {
      z: 1,
      keyword: proveedor[i].bts_name,
      lat: parseFloat(proveedor[i].latitud),
      lon: parseFloat(proveedor[i].longitud),
    };
  }

  dataFinal = obj;

  console.log(dataFinal);

  if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }

  const mapOptions = {
    chart: {
      map: "countries/ve/ve-all",
    },
    title: {
      text: "GSM",
      align: "left",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
    },
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
      },
    },
    series: [
      {
        // Use the gb-all map with no data as a basemap
        name: "Basemap",
        mapData: mapDataIE,
        borderColor: "#A0A0A0",
        nullColor: "rgba(177, 244, 177, 0.5)",
        showInLegend: false,
      },
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: "RBS",
        color: "#4169E1",
        /*     data: [{ z: 1, keyword: "Ruiz Pineda", lat: 10.43, lon: -66.99 }, 
             { z: 1, keyword: "Barrio El Rosario Valle de la Pascua", lat: 9.22, lon: -66.01 }], */
        data: dataFinal,
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
      <h1>Mapas de las RBS</h1>
      <HighchartsReact
        constructorType={"mapChart"}
        highcharts={Highcharts}
        options={mapOptions}
      />
    </>
  );
}

export default GraficoMapa;
