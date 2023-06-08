import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import proj4 from "proj4";
import mapDataIE from "@highcharts/map-collection/custom/europe.topo.json";

highchartsMap(Highcharts);

function GraficoPrueba() {

  if (typeof window !== "undefined") {
    window.proj4 = window.proj4 || proj4;
  }

console.log(mapDataIE);

  const mapOptions = {

    chart: {
        map: mapDataIE,
        spacingBottom: 20
      },
  
      title: {
        text: 'Europe time zones'
      },
  
      accessibility: {
        series: {
          descriptionFormat: 'Timezone {series.name} with {series.points.length} countries.'
        },
        point: {
          valueDescriptionFormat: '{point.name}.'
        }
      },
  
      legend: {
        enabled: true
      },
  
      plotOptions: {
        map: {
          allAreas: false,
          joinBy: ['iso-a2', 'code'],
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            style: {
              fontWeight: 'bold'
            },
            // Only show dataLabels for areas with high label rank
            format: '{#if (lt point.properties.labelrank 5)}' +
              '{point.properties.iso-a2}' +
              '{/if}'
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '{point.name}: <b>{series.name}</b>'
          }
        }
      },
  
      series: [{
        name: 'UTC',
        data: ['IE', 'IS', 'GB', 'PT'].map(code => ({ code }))
      }, {
        name: 'UTC + 1',
        data: [
          'NO', 'SE', 'DK', 'DE', 'NL', 'BE', 'LU', 'ES', 'FR', 'PL',
          'CZ', 'AT', 'CH', 'LI', 'SK', 'HU', 'SI', 'IT', 'SM', 'HR',
          'BA', 'YF', 'ME', 'AL', 'MK'
        ].map(code => ({ code }))
      }, {
        name: 'UTC + 2',
        data: [
          'FI', 'EE', 'LV', 'LT', 'BY', 'UA', 'MD', 'RO', 'BG', 'GR',
          'TR', 'CY'
        ].map(code => ({ code }))
      }, {
        name: 'UTC + 3',
        data: [{
          code: 'RU'
        }]
      }]
    

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

export default GraficoPrueba;
