let backgroundColor = '#ffffff'
let contrastColor = '#2c3033'
var colorPalette = [
  '#1790cf',
  '#1bb2d8',
  '#99d2dd',
  '#88b0bb',
  '#1c7099',
  '#038cc4',
  '#75abd0',
  '#afd6dd'
]

var theme = {
  color: colorPalette,

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#1790cf'
    }
  },

  visualMap: {
    color: ['#1790cf', '#a2d4e6']
  },

  toolbox: {
    color: ['#1790cf', '#1790cf', '#1790cf', '#1790cf']
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

  // Area scaling controller
  dataZoom: {
    dataBackgroundColor: '#eee', // Data background color
    fillerColor: 'rgba(144,197,237,0.2)', // Fill the color
    handleColor: '#1790cf' // Handle color
  },

  timeline: {
    lineStyle: {
      color: '#1790cfa'
    },
    controlStyle: {
      color: '#1790cf',
      borderColor: '#1790cf'
    }
  },

  candlestick: {
    itemStyle: {
      color: '#1bb2d8',
      color0: '#99d2dd'
    },
    lineStyle: {
      width: 1,
      color: '#1c7099',
      color0: '#88b0bb'
    },
    areaStyle: {
      color: '#1790cf',
      color0: '#1bb2d8'
    }
  },

  chord: {
    padding: 4,
    itemStyle: {
      color: '#1bb2d8',
      borderWidth: 1,
      borderColor: 'rgba(128, 128, 128, 0.5)'
    },
    lineStyle: {
      color: 'rgba(128, 128, 128, 0.5)'
    },
    areaStyle: {
      color: '#1790cf'
    }
  },

  graph: {
    itemStyle: {
      color: '#1bb2d8'
    },
    linkStyle: {
      color: '#88b0bb'
    }
  },

  map: {
    itemStyle: {
      color: '#ddd'
    },
    areaStyle: {
      color: '99d2dd'
    },
    label: {
      color: '#c12e34'
    }
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#1bb2d8'],
          [0.8, '#1790cf'],
          [1, '#1c7099']
        ],
        width: 8
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

export class Blue {
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
          itemStyle: {
            width: 'auto',
            paddingTop: '10px',
            paddingRight: '10px',
            paddingBottom: '10px',
            paddingLeft: '10px',
            justifyContent: 'center',
            alignItems: 'center'
          },
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
