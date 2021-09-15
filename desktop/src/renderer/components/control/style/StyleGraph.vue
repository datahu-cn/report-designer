<template>
  <div class="c-style-graph">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div>
          <a-form-item name="fontFamily" label="图形标记">
            <a-select
              class="c-style-fontfamily"
              size="small"
              :allow-clear="true"
              v-model:value="SelectSymbol"
              :dropdown-match-select-width="false"
              @change="change"
            >
              <a-select-option value="circle">circle</a-select-option>
              <a-select-option value="rect">rect</a-select-option>
              <a-select-option value="roundRect">roundRect</a-select-option>
              <a-select-option value="triangle">triangle</a-select-option>
              <a-select-option value="diamond">diamond</a-select-option>
              <a-select-option value="pin">pin</a-select-option>
              <a-select-option value="arrow">arrow</a-select-option>
              <a-select-option value="none">none</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="borderStyle" label="背景图片">
            <ImageUpload v-model="ImageSymbol" />
          </a-form-item>
          <a-form-item name="borderStyle" label="标记大小">
            <a-select
              class="c-style-fontfamily"
              :clearable="true"
              size="small"
              @change="change"
              :dropdown-match-select-width="false"
              v-model:value="symbolSizeType"
            >
              <a-select-option value="0">自动</a-select-option>
              <a-select-option value="1">手动</a-select-option>
            </a-select>
          </a-form-item>
          <div v-if="symbolSizeType == '1'">
            <div>
              <a-input-number
                :size="size"
                :disabled="disabled"
                v-model:value="modelValue.symbolSize[0]"
              />
            </div>
            <div>
              <a-input-number
                :size="size"
                :disabled="disabled"
                v-model:value="modelValue.symbolSize[1]"
              />
            </div>
          </div>
        </div>
      </template>
      <a-button
        class="c-style-graph-btn"
        style="
          max-width: 64px;
          min-width: 64px;
          min-height: 28px;
          max-height: 28px;
          overflow: hidden;
        "
        size="small"
        :style="elStyle"
      >
        <span :id="SelectSymbol"></span>
      </a-button>
    </a-popover>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch
} from 'vue'
import {useI18n, useState} from '../../../use/state'
import ImageUpload from '../ImageUpload.vue'
export default defineComponent({
  name: 'StyleGraph',
  components: {
    ImageUpload
  },
  props: ['modelValue', 'disabled', 'data', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }
    let SelectSymbol = computed({
      get() {
        if (
          props.modelValue.symbol &&
          props.modelValue.symbol.startsWith('image://')
        )
          return ''
        return props.modelValue.symbol
      },
      set(v: any) {
        props.modelValue.symbol = v
      }
    })

    let ImageSymbol = computed({
      get() {
        if (
          props.modelValue.symbol &&
          props.modelValue.symbol.startsWith('image://')
        )
          return props.modelValue.symbol.substring(8)
      },
      set(v: any) {
        console.log(v)
        if (v && v.startsWith('data:')) {
          props.modelValue.symbol = 'image://' + v
        }
      }
    })
    let symbolSizeType = computed({
      get() {
        if (
          props.modelValue.symbolSize &&
          props.modelValue.symbolSize.length > 0
        ) {
          return '1'
        }
        return '0'
      },
      set(v: any) {
        if (v == '0') {
          props.modelValue.symbolSize = []
        } else {
          props.modelValue.symbolSize = [20, 20]
        }
      }
    })

    let elStyle = computed(() => {})

    return {i18n, change, SelectSymbol, ImageSymbol, symbolSizeType, elStyle}
  }
})
</script>

<style lang="less">
.c-style-graph {
  display: inline-block;
  .ant-select {
    min-width: 60px;
  }

  .c-style-graph-btn {
    border: 1px solid var(--border-color-base);
    > span {
      vertical-align: middle;
    }
  }

  #circle {
    width: 20px;
    height: 20px;
    background: #1890ff;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 1 0px;
  }
  #rect {
    width: 20px;
    height: 20px;
    background: #1890ff;
  }
  #roundRect {
    width: 20px;
    height: 20px;
    background: #1890ff;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
  #triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid #1890ff;
  }
  #diamond {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: #1890ff;
    position: relative;
    top: -10px;
  }
  #diamond:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #1890ff;
  }
  #pin {
    width: 20px;
    height: 20px;
    background-color: #1890ff;
    border-radius: 50% 0 50% 50%; /* 左上 右上 右下 左下 */
    transform: rotate(135deg); /* 旋转调正 */
  }
  #arrow {
    display: inline-block;
    border-style: solid;
    margin-top: 5px;
    width: 20px;
    height: 20px;
    border-width: 10px 10px 0 0;
    border-color: #1890ff;
    transform: matrix(0.5, -0.71, 0.5, 0.71, 0, 0);
  }
}
</style>
