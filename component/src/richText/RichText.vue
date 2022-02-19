<template>
  <div class="com-rich-text">
    <div class="com-rich-text-panel">
      <div
        class="com-rich-text-panel-editor"
        @keydown.stop="$event.stopPropagation()"
        ref="editorRef"
      ></div>
      <div class="com-rich-text-drop-panel">
        <DropPanel
          @size-change="sizeChange"
          @remove-chart="dropPanelRemoveChart"
          ref="dropPanelRef"
          :chart="chart"
        ></DropPanel>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ChartData,
  CodeExpression,
  FilterExpression,
  FilterType,
  Formula,
  IChartDefinition,
  IFilterInfo,
  Util,
  Resize
} from '@datahu/core'
import {Modal} from 'ant-design-vue'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed,
  createVNode,
  nextTick
} from 'vue'
import {SplitLayoutComponent} from '../splitLayout'
import {DropPanel} from '@datahu/component-base'
import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import NestedList from '@editorjs/nested-list'
import Embed from '@editorjs/embed'
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import ImageTool from '@editorjs/image'
import Table from '@editorjs/table'
import Underline from '@editorjs/underline'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import Delimiter from '@editorjs/delimiter'
export default defineComponent({
  name: 'RichText',
  props: ['chart', 'data', 'pkg', 'view', 'language'],
  components: {DropPanel},
  setup(props, {emit}) {
    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      emit('unmounted')
    })
    let chart = props.chart

    let dropPanelRef: any = ref(null)

    const add = () => {
      if (dropPanelRef.value) {
        let newChart = {
          filters: [],
          type: SplitLayoutComponent.name,
          option: new SplitLayoutComponent(props.language).option,
          children: []
        }
        newChart.option.disableDrag = true
        newChart.option.split.rows = ['1']
        dropPanelRef.value.addChild(newChart)
      }
    }

    const removeChart = (removedChart: IChartDefinition) => {
      props.pkg.removeChart(chart, removedChart)
      dropPanelRef.value.removeChart(removedChart)
    }

    let chartPanels: Array<RichTextChartPanel> = []
    let sizeChange = (chartObj: any) => {
      for (let panel of chartPanels) {
        if (panel.richChart == chartObj.item) {
          panel.resetPanelSize()
        }
      }
    }
    let dropPanelRemoveChart = (chartObj: any) => {
      for (let panel of chartPanels) {
        if (panel.richChart == chartObj.item) {
          panel.delete()
        }
      }
    }

    class RichTextChartPanel {
      // ... toolbox static getter
      data: any
      block: any
      api: any
      richChart?: IChartDefinition
      div?: HTMLElement

      static get isReadOnlySupported() {
        return true
      }

      constructor(arg: any) {
        this.block = arg.block
        this.data = arg.data
        this.api = arg.api
      }

      getRichChart(): IChartDefinition {
        if (!this.richChart) {
          if (!(this.data && this.data.chartId)) {
            add()
            this.data.chartId = chart.children[chart.children.length - 1].id
          }
          for (let child of chart.children) {
            if (child.id == this.data.chartId) {
              this.richChart = child
              break
            }
          }

          chartPanels.push(this)
        }
        return this.richChart!
      }

      delete() {
        if (
          chart.option.data &&
          chart.option.data.blocks &&
          chart.option.data.blocks.length > 0
        ) {
          let index = 0
          for (let i = 0; i < chart.option.data.blocks.length; i++) {
            let block = chart.option.data.blocks[i]
            if (block.data.chartId == this.data.chartId) {
              index = i
              break
            }
          }
          this.api.blocks.delete(index)
        }
      }

      resetPanelSize() {
        console.log('resetPanelSize')
        if (this.div) {
          let richChart = this.getRichChart()
          let rect = this.div.getBoundingClientRect()
          let parentRect = editorRef.value.getBoundingClientRect()
          dropPanelRef.value.$el.style.width = parentRect.width + 'px'
          dropPanelRef.value.$el.style.height = parentRect.height + 'px'
          let wr = parentRect.width / 100
          let hr = parentRect.height / 100
          this.div.style.width = richChart.option.pos.width * wr + 'px'
          this.div.style.height = richChart.option.pos.height * hr + 'px'
        }
      }
      resetChartSize() {
        console.log('resetChartSize')
        if (this.div) {
          let richChart = this.getRichChart()
          let rect = this.div.getBoundingClientRect()
          if (rect.width > 0) {
            let parentRect = editorRef.value.getBoundingClientRect()
            dropPanelRef.value.$el.style.width = parentRect.width + 'px'
            dropPanelRef.value.$el.style.height = parentRect.height + 'px'
            let wr = parentRect.width / 100
            let hr = parentRect.height / 100

            richChart.option.pos.left = (rect.left - parentRect.left) / wr
            richChart.option.pos.width = rect.width / wr
            richChart.option.pos.top = (rect.top - parentRect.top) / hr
            richChart.option.pos.height = rect.height / hr
          }
        }
      }

      static get toolbox() {
        return {
          title: '组件面板',
          icon: '<svg t="1618673527873" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6021" width="15" height="15"><path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" fill="#595959" p-id="6022"></path><path d="M272 728h536c4.4 0 8-3.6 8-8V284c0-7.2-8.7-10.7-13.7-5.7L592 488.6l-125.4-124c-3.1-3.1-8.2-3.1-11.3 0l-189 189.6c-1.5 1.5-2.3 3.5-2.3 5.6V720c0 4.4 3.6 8 8 8z" fill="#595959" p-id="6023"></path></svg>'
        }
      }

      getRect() {
        if (this.data && this.data.chartId && this.data.width) {
          return this.data
        } else {
          return {
            width: '100%',
            height: '200px'
          }
        }
      }

      render() {
        const div = document.createElement('div')
        div.classList.add('com-rich-text-drop-panels-rich')

        div.classList.add('com-rich-text-drop-panels-rich-' + this.data.chartId)

        let rect = this.getRect()
        div.style.width = rect.width
        div.style.height = rect.height
        this.div = div
        nextTick(() => {
          this.getRichChart()
          this.resetChartSize()
        })
        return div
      }

      save(blockContent: HTMLElement) {
        if (this.div) {
          let rect = this.div!.getBoundingClientRect()
          this.data.width = rect.width + 'px'
          this.data.height = rect.height + 'px'
        }
        return this.data
      }
    }

    let saveRichText = (jsonData: any) => {
      let removed = []
      for (let child of chart.children) {
        let has = false
        for (let block of jsonData.blocks) {
          if (block.type == 'RichTextChartPanel') {
            if (block.data.chartId && block.data.chartId == child.id) {
              has = true
              break
            }
          }
        }
        if (!has) {
          removed.push(child)
        }
      }
      for (let item of removed) {
        for (let panel of chartPanels) {
          if (panel.richChart == item) {
            chartPanels.splice(chartPanels.indexOf(panel), 1)
            break
          }
        }

        removeChart(item)
      }
      for (let panel of chartPanels) {
        panel.resetChartSize()
      }
    }

    let editorRef: any = ref(null)
    let image: any = {
      class: ImageTool,
      config: {
        /**
         * Custom uploader
         */
        uploader: {
          /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByFile(file: File) {
            // your own uploading logic here

            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => {
                resolve({
                  success: 1,
                  file: {
                    url: reader.result
                    // any other image data you want to store, such as width, height, color, extension, etc
                  },
                  caption: file.name
                })
              }
              reader.readAsDataURL(file)
            })
          },

          /**
           * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
           * @param {string} url - pasted image URL
           * @return {Promise.<{success, file: {url}}>}
           */
          uploadByUrl(url: string) {
            // your ajax request for uploading
            return Promise.resolve(() => {
              return {
                success: 1,
                file: {
                  url: url
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
                caption: url
              }
            })
          }
        }
      }
    }

    onMounted(() => {
      const editor = new EditorJS({
        holder: editorRef.value,
        readOnly: props.view,
        tools: {
          // RichTextChartPanel,
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 3
            }
          },
          // paragraph: Paragraph,
          list: {
            class: NestedList,
            inlineToolbar: true
          },
          embed: Embed,
          checklist: Checklist,
          quote: Quote,
          raw: Raw,
          image,
          table: Table,
          underline: Underline,
          Marker: Marker,
          warning: Warning,
          delimiter: Delimiter
        },
        data: chart.option.data,
        onChange() {
          editor
            .save()
            .then((outputData: any) => {
              console.log('Article data: ', outputData)
              chart.option.data = outputData
              saveRichText(outputData)
              props.pkg!.updateOption(chart)
            })
            .catch((error: any) => {
              console.log('Saving failed: ', error)
            })
        },
        i18n: {
          messages: {
            ui: {
              blockTunes: {
                toggler: {
                  'Click to tune': '点击调整',
                  'or drag to move': '或拖拽'
                }
              },
              inlineToolbar: {
                converter: {
                  'Convert to': '转换为'
                }
              },
              toolbar: {
                toolbox: {
                  Add: '添加'
                }
              }
            },
            toolNames: {
              Text: '文本',
              Heading: '标题',
              List: '列表',
              Warning: '警告',
              Checklist: '勾选列表',
              Quote: '引用',
              Code: '代码',
              Delimiter: '分隔',
              'Raw HTML': '源码',
              Table: '表格',
              Link: '链接',
              Marker: '标记',
              Bold: '加粗',
              Italic: '斜体',
              InlineCode: '内嵌代码',
              Image: '图片',
              Underline: '下划线'
            },
            tools: {
              // Section for passing translations to the external tools classes
              // The first-level keys of this object should be equal of keys ot the 'tools' property of EditorConfig
            },
            blockTunes: {
              // Section allows to translate Block Tunes
            }
          }
        }
      })

      Resize.addResizeListener(editorRef.value, () => {
        for (let panel of chartPanels) {
          panel.resetChartSize()
        }
      })
    })

    let testData = ref('333')

    return {
      chart,
      dropPanelRef,
      editorRef,
      testData,
      sizeChange,
      dropPanelRemoveChart
    }
  }
})
</script>

<style lang="less">
.c-component-preview {
  .com-rich-text {
    .codex-editor__redactor {
      padding-bottom: 0px !important;
      margin-right: 0px !important;
    }
  }
}
.com-rich-text {
  width: 100%;
  height: 100%;
  overflow: overlay;
  .cdx-input.image-tool__caption {
    display: none;
  }
  .cdx-input.cdx-quote__caption {
    display: none;
  }
  .ce-inline-toolbar,
  .ce-toolbar,
  .ce-settings {
    // position: fixed;
  }
  .com-rich-text-panel {
    // height: 100%;
    // position: relative;
    .com-rich-text-panel-editor {
      left: 0px;
      top: 0px;
      padding: 5px;
      z-index: 2;
      .com-rich-text-drop-panels-rich {
        background-color: transparent;
        border-width: 0px;
      }
      .codex-editor {
        .ce-toolbar {
          z-index: 4;
        }
      }
    }
    .com-rich-text-drop-panel {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      > div.c-drop-panel {
        > div.c-drop-cell {
          border-style: none;
          > div.c-chart-panel {
            z-index: 3 !important;
          }
        }
      }
    }
  }
}
</style>
