import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_heatmap from 'highcharts/modules/heatmap'

// init the module
HC_heatmap(Highcharts)

const HighchartsHeatmap2 = (props) => {
  let filterData = (props.heatmapData.filter(point => point.x===point.marker).map(cluster => cluster.name));
  let startPoint = props.heatmapData.map(cluster=>cluster.y)[0];
  console.log(startPoint);
  if(startPoint>0){
  //let padding = new Array(startPoint); filterData = padding.concat(filterData)
  for(let i =0;i<startPoint;i++)
    {
      filterData.unshift(' ');
    }
  }

  for(let i = 0; i<50;i++)
  {
    filterData.push(' ');
  }

  const options = {
    chart: {
      type: 'heatmap',
      height: props.chartHeight,
      zoomType: 'y'
    },
    credits: {
      enabled: false
    },
    labels: {
      step: 1
    },
    title: {
      text: 'Heatmap for Cluster '+ props.userOption +' with ' + Math.ceil(props.heatmapData.length/props.clusterIds.length)+' marker genes'
    },
    // subtitle: {
    //   text: 'E-GEOD-70580 for k = 7'
    // },

    xAxis: {
      opposite: true,
      labels: {
        format: 'Cluster {value}'
        // rotation: -30
      }
    },

    yAxis: {
      //labes:{
      categories: filterData,
     // } ,
     // height: Math.ceil(props.heatmapData.length/props.clusterIds.length)-1,
      credits: {
        enabled: false
      },
     // min: 0,
      min: startPoint,
      title: false,
      reversed: true,
      showEmpty: false
      //showLastLabel: true
     //max: props.heatmapData.length
    },

    tooltip: {
      formatter: function () {
        if(this.point.value === null) {
          return `<b>Cluster ID:</b> ${this.point.x} <br/> <b>Gene ID:</b> ${this.point.name} <br /> <b>Average expression:</b> Not expressed <br/>`;
        }
        else {
          return `<b>Cluster ID:</b> ${this.point.x} <br/> <b>Gene ID:</b> ${this.point.name} <br /> <b>Average expression:</b> ${Math.round(this.point.value)} TPM <br/>`;
        }
      }
    },

    // colorAxis: {
    //   min: 0,
    //   minColor: '#F8F8FF',
    //   maxColor: '#002366'
    // },

    colorAxis: {
      type: 'logarithmic',
      minColor: '#EEEEFF',
      maxColor: '#024990',
      stops: [
        [0, '#deebf7'],
        [0.67, '#9ecae1'],
        [1, '#3182bd']
      ]
    },

    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      symbolWidth: 280
      // align: 'right',
      // layout: 'vertical',
      // margin: 0,
      // verticalAlign: 'middle',
      // y: 45,
      // symbolHeight: 280
    },

    series: [{
      data: props.heatmapData,
      nullColor: '#eaeaea',
      states: {
        hover: {
          // animation: 25,
          brightness: 0,
          borderColor: 'coral',
          borderWidth: 2
        }
      },
      //color: props.heatmapData.map(point => point.marker ===1 ?  'colorAxis' : '#eaeaea')
      // borderWidth: 1,
      // borderColor: '#dddddd'
    }]

  }

  if(props.isLarge) {
    options.boost = {
      useGPUTranslations: true
    }

    options.series[0].boostThreshold = 4000;
  
    options.series[0].turboThreshold = Number.MAX_VALUE;
  }

  return (
    !props.loading  &&
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

export default HighchartsHeatmap2
