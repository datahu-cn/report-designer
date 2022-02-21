let backgroundColor = '#ffffff'
let contrastColor = '#2c3033'

let theme = {
  color: [
    '#d87c7c',
    '#919e8b',
    '#d7ab82',
    '#6e7074',
    '#61a0a8',
    '#efa18d',
    '#787464',
    '#cc7e63',
    '#724e58',
    '#4b565b'
  ],
  backgroundColor: backgroundColor,
  amap: {
    mapStyle: 'amap://styles/light'
  },
  textStyle: {},
  title: {
    textStyle: {
      color: '#333333'
    },
    subtextStyle: {
      color: '#aaaaaa'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false
  },
  radar: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc'
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#c23531',
      color0: '#314656',
      borderColor: '#c23531',
      borderColor0: '#314656',
      borderWidth: 1
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    },
    lineStyle: {
      width: 1,
      color: '#aaaaaa'
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
    color: [
      '#d87c7c',
      '#919e8b',
      '#d7ab82',
      '#6e7074',
      '#61a0a8',
      '#efa18d',
      '#787464',
      '#cc7e63',
      '#724e58',
      '#4b565b'
    ],
    label: {
      color: '#eeeeee'
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#eeeeee',
        borderColor: '#444444',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#eeeeee',
        borderColor: '#444444',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444444',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(100,0,0)'
        }
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#ccc']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#ccc']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#ccc']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#333'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#ccc']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#999999'
      },
      emphasis: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#333333'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1
      },
      crossStyle: {
        color: '#cccccc',
        width: 1
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#293c55',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#293c55',
        borderWidth: 1
      },
      emphasis: {
        color: '#a9334c'
      }
    },
    controlStyle: {
      normal: {
        color: '#293c55',
        borderColor: '#293c55',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#293c55',
        borderColor: '#293c55',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#e43c59',
      borderColor: '#c23531'
    },
    label: {
      normal: {
        textStyle: {
          color: '#293c55'
        }
      },
      emphasis: {
        textStyle: {
          color: '#293c55'
        }
      }
    }
  },
  visualMap: {
    color: ['#bf444c', '#d88273', '#f6efa6']
  },
  dataZoom: {
    backgroundColor: 'rgba(47,69,84,0)',
    dataBackgroundColor: 'rgba(47,69,84,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      color: '#eeeeee'
    },
    emphasis: {
      label: {
        color: '#eeeeee'
      }
    }
  }
}

let option: any = {
  body: {
    style: {
      backgroundColor: backgroundColor,
      color: contrastColor
    }
  },
  title: {
    style: {
      backgroundColor: backgroundColor,
      color: contrastColor
    }
  },
  tooltip: {
    style: {
      backgroundColor: backgroundColor,
      color: contrastColor
    }
  }
}

export class Vintage {
  static echarts: any = theme
  static option: any = option
  static charts: any = {
    Base: {
      body: {
        style: {
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
          borderBottomRightRadius: '3px',
          borderBottomLeftRadius: '3px',
          backgroundColor: backgroundColor
        }
      }
    },
    GridLayout: {
      body: {
        style: {
          backgroundColor: 'transparent'
        }
      }
    },
    SingleCard: {
      title: {
        style: {
          fontSize: '14px'
        }
      },
      body: {
        style: {
          borderTopWidth: '0px',
          borderRightWidth: '0px',
          borderBottomWidth: '0px',
          borderLeftWidth: '0px',
          backgroundColor: theme.color[1],
          color: '#ffffff',
          textAlign: 'center',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
          borderBottomRightRadius: '3px',
          borderBottomLeftRadius: '3px',
          fontSize: '20px',
          fontWeight: 'bold'
        }
      },
      card: {
        style: {
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    },
    PageLayout: {
      body: {
        style: {
          backgroundColor: 'rgba(254,248,239,1)'
        }
      }
    },
    RefreshControl: {
      body: {
        style: {
          backgroundColor: '#00000000'
        }
      },
      content: {
        style: {
          justifyContent: 'center',
          alignItems: 'center'
        }
      }
    }
  }
}
