let backgroundColor = '#ffffff'
let contrastColor = '#707070'
var colorPalette = [
  '#7678ED',
  '#F9896B',
  '#FEC52D',
  '#70DEC8',
  '#d87a80',
  '#8d98b3',
  '#e5cf0d',
  '#97b552',
  '#95706d',
  '#dc69aa',
  '#07a2a4',
  '#9a7fd1',
  '#588dd5',
  '#f5994e',
  '#c05050',
  '#59678c',
  '#c9ab00',
  '#7eb00a',
  '#6f5553',
  '#c14089'
]

var theme = {
  color: colorPalette,

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: contrastColor
    }
  },

  visualMap: {
    itemWidth: 15,
    color: ['#FEC52D', '#e0ffff']
  },

  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colorPalette[0]
      }
    }
  },
  legend: {
    textStyle: {
      color: contrastColor
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

  dataZoom: {
    dataBackgroundColor: '#efefff',
    fillerColor: 'rgba(182,162,222,0.2)',
    handleColor: '#008acd'
  },

  grid: {
    borderColor: '#eee'
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: contrastColor
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#eee']
      }
    }
  },

  valueAxis: {
    axisLine: {
      lineStyle: {
        color: contrastColor
      }
    },
    // splitArea: {
    //   show: true,
    //   areaStyle: {
    //     color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
    //   }
    // },
    splitLine: {
      lineStyle: {
        color: ['#eee']
      }
    }
  },

  timeline: {
    lineStyle: {
      color: '#008acd'
    },
    controlStyle: {
      color: '#008acd',
      borderColor: '#008acd'
    },
    symbol: 'emptyCircle',
    symbolSize: 3
  },

  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3
  },

  candlestick: {
    itemStyle: {
      color: '#F9896B',
      color0: '#7678ED'
    },
    lineStyle: {
      width: 1,
      color: '#F9896B',
      color0: '#7678ED'
    },
    areaStyle: {
      color: '#7678ED',
      color0: '#F9896B'
    }
  },

  scatter: {
    symbol: 'circle',
    symbolSize: 4
  },

  map: {
    itemStyle: {
      color: '#ddd'
    },
    areaStyle: {
      color: '#fe994e'
    },
    label: {
      color: '#d87a80'
    }
  },

  graph: {
    itemStyle: {
      color: '#d87a80'
    },
    linkStyle: {
      color: '#7678ED'
    }
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#7678ED'],
          [0.8, '#FEC52D'],
          [1, '#d87a80']
        ],
        width: 10
      }
    },
    axisTick: {
      splitNumber: 10,
      length: 15,
      lineStyle: {
        color: 'auto'
      }
    },
    splitLine: {
      length: 22,
      lineStyle: {
        color: 'auto'
      }
    },
    pointer: {
      width: 5
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

export class Macarons {
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
          backgroundColor: colorPalette[1],
          color: '#ffffff',
          textAlign: 'center',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
          borderBottomRightRadius: '5px',
          borderBottomLeftRadius: '5px',
          fontSize: '20px',
          fontWeight: 'bold'
        }
      },
      card: {
        style: {
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      cardItems: [
        {
          itemStyle: {},
          valueStyle: {},
          labelStyle: {}
        }
      ]
    },
    PageLayout: {
      body: {
        style: {
          backgroundColor: '#f8f9fe'
        }
      }
    }
  }
}
