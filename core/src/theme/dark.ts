var contrastColor = '#ffffff'
var backgroundColor = '#232323'
var axisCommon = function () {
  return {
    axisLine: {
      lineStyle: {
        color: contrastColor
      }
    },
    splitLine: {
      lineStyle: {
        color: '#484753'
      }
    },
    splitArea: {
      areaStyle: {
        color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)']
      }
    },
    minorSplitLine: {
      lineStyle: {
        color: '#20203B'
      }
    }
  }
}

var colorPalette = [
  '#4992ff',
  '#7cffb2',
  '#fddd60',
  '#ff6e76',
  '#58d9f9',
  '#05c091',
  '#ff8a45',
  '#8d48e3',
  '#dd79ff'
]
var theme: any = {
  darkMode: true,

  color: colorPalette,
  backgroundColor: backgroundColor,
  amap: {
    mapStyle: 'amap://styles/darkblue'
  },
  axisPointer: {
    lineStyle: {
      color: '#817f91'
    },
    crossStyle: {
      color: '#817f91'
    },
    label: {
      // TODO Contrast of label backgorundColor
      color: '#fff'
    }
  },
  legend: {
    textStyle: {
      color: contrastColor
    }
  },
  textStyle: {
    color: contrastColor
  },
  title: {
    textStyle: {
      color: '#EEF1FA'
    },
    subtextStyle: {
      color: '#B9B8CE'
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: contrastColor
    }
  },
  dataZoom: {
    borderColor: '#71708A',
    textStyle: {
      color: contrastColor
    },
    brushStyle: {
      color: 'rgba(135,163,206,0.3)'
    },
    handleStyle: {
      color: '#353450',
      borderColor: '#C5CBE3'
    },
    moveHandleStyle: {
      color: '#B0B6C3',
      opacity: 0.3
    },
    fillerColor: 'rgba(135,163,206,0.2)',
    emphasis: {
      handleStyle: {
        borderColor: '#91B7F2',
        color: '#4D587D'
      },
      moveHandleStyle: {
        color: '#636D9A',
        opacity: 0.7
      }
    },
    dataBackground: {
      lineStyle: {
        color: '#71708A',
        width: 1
      },
      areaStyle: {
        color: '#71708A'
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: '#87A3CE'
      },
      areaStyle: {
        color: '#87A3CE'
      }
    }
  },
  visualMap: {
    textStyle: {
      color: contrastColor
    }
  },
  timeline: {
    lineStyle: {
      color: contrastColor
    },
    label: {
      color: contrastColor
    },
    controlStyle: {
      color: contrastColor,
      borderColor: contrastColor
    }
  },
  calendar: {
    itemStyle: {
      color: backgroundColor
    },
    dayLabel: {
      color: contrastColor
    },
    monthLabel: {
      color: contrastColor
    },
    yearLabel: {
      color: contrastColor
    }
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),

  line: {
    symbol: 'circle'
  },
  graph: {
    color: colorPalette
  },
  gauge: {
    title: {
      color: contrastColor
    }
  },
  candlestick: {
    itemStyle: {
      color: '#FD1050',
      color0: '#0CF49B',
      borderColor: '#FD1050',
      borderColor0: '#0CF49B'
    }
  }
}

theme.categoryAxis.splitLine.show = false

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

export class Dark {
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
          backgroundColor: '#232323',
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
      }
    },
    PageLayout: {
      body: {
        style: {
          backgroundColor: '#000000'
        }
      }
    }
  }
}
