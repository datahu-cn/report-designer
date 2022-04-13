<template>
  <div class="c-style-property">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div class="c-controls-form">
          <a-form-item
            v-if="config.options.indexOf('width') >= 0"
            name="width"
            label="宽"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.width"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('height') >= 0"
            name="height"
            label="高"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.height"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('minWidth') >= 0"
            name="minWidth"
            label="最小宽"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.minWidth"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('maxWidth') >= 0"
            name="maxWidth"
            label="最大宽"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.maxWidth"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('minHeight') >= 0"
            name="minHeight"
            label="最小高"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.minHeight"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('maxHeight') >= 0"
            name="maxHeight"
            label="最大高"
          >
            <StyleLength
              :auto="true"
              @change="change"
              v-model="modelValue.maxHeight"
            />
          </a-form-item>
          <StyleAligin v-model="modelValue" :config="config" />

          <a-form-item
            v-if="config.options.indexOf('fontSize') >= 0"
            name="fontSize"
            label="文字大小"
          >
            <StyleLength
              :auto="false"
              @change="change"
              v-model="modelValue.fontSize"
            />
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('color') >= 0"
            name="color"
            label="文字颜色"
          >
            <ColorPicker @change="change" v-model="modelValue.color" />
          </a-form-item>
          <StyleFont
            v-if="config.options.indexOf('fontFamily') >= 0"
            v-model="modelValue"
            label="字体"
          ></StyleFont>
          <a-form-item
            v-if="config.options.indexOf('fontWeight') >= 0"
            name="fontWeight"
            label="文字加粗"
          >
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              v-model:value="modelValue.fontWeight"
            >
              <a-select-option value="bold">bold</a-select-option>
              <a-select-option value="normal">normal</a-select-option>
              <a-select-option value="lighter">lighter</a-select-option>
              <a-select-option value="100">100</a-select-option>
              <a-select-option value="200">200</a-select-option>
              <a-select-option value="300">300</a-select-option>
              <a-select-option value="400">400</a-select-option>
              <a-select-option value="500">500</a-select-option>
              <a-select-option value="600">600</a-select-option>
              <a-select-option value="700">700</a-select-option>
              <a-select-option value="800">800</a-select-option>
              <a-select-option value="900">900</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="config.options.indexOf('lineHeight') >= 0"
            name="lineHeight"
            label="文字行高"
          >
            <StyleLength
              :auto="false"
              @change="change"
              v-model="modelValue.lineHeight"
            />
          </a-form-item>
          <StylePadding
            v-if="config.options.indexOf('padding') >= 0"
            v-model="modelValue"
            label="内间距"
          />
          <StyleMargin
            v-if="config.options.indexOf('margin') >= 0"
            v-model="modelValue"
            label="外间距"
          />
          <StyleBorderWidth
            v-if="config.options.indexOf('borderWidth') >= 0"
            v-model="modelValue"
            label="边框宽"
          />
          <StyleBorderColor
            v-if="config.options.indexOf('borderColor') >= 0"
            v-model="modelValue"
            label="边框颜色"
          />
          <StyleBorderStyle
            v-if="config.options.indexOf('borderStyle') >= 0"
            v-model="modelValue"
            label="线条"
          />
          <StyleBorderRadius
            v-if="config.options.indexOf('borderRadius') >= 0"
            v-model="modelValue"
            label="圆角"
          />
          <a-form-item
            v-if="config.options.indexOf('backgroundColor') >= 0"
            name="backgroundColor"
            label="背景颜色"
          >
            <ColorPicker
              @change="change"
              v-model="modelValue.backgroundColor"
            />
          </a-form-item>
          <StyleBackground
            v-if="config.options.indexOf('backgroundImage') >= 0"
            v-model="modelValue"
            label="背景图片"
          />
        </div>
      </template>
      <a-button
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
        文
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
import ColorPicker from './ColorPicker.vue'
import FileUpload from './FileUpload.vue'
import {useI18n, useState} from '../../use/state'
import StyleLength from './style/StyleLength.vue'
import StylePadding from './style/StylePadding.vue'
import StyleMargin from './style/StyleMargin.vue'
import StyleBorderWidth from './style/StyleBorderWidth.vue'
import StyleBorderColor from './style/StyleBorderColor.vue'
import StyleBorderStyle from './style/StyleBorderStyle.vue'
import StyleBorderRadius from './style/StyleBorderRadius.vue'
import StyleBackground from './style/StyleBackground.vue'
import StyleFont from './style/StyleFont.vue'
import StyleAligin from './style/StyleAligin.vue'
export default defineComponent({
  name: 'StyleProperty',
  components: {
    ColorPicker,
    FileUpload,
    StyleLength,
    StylePadding,
    StyleMargin,
    StyleBorderWidth,
    StyleBorderColor,
    StyleBorderStyle,
    StyleBorderRadius,
    StyleBackground,
    StyleFont,
    StyleAligin
  },
  props: ['modelValue', 'disabled', 'data', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    let supports: any = {
      width: ['width'],
      minWidth: ['minWidth'],
      maxWidth: ['maxWidth'],
      minHeight: ['minHeight'],
      maxHeight: ['maxHeight'],
      height: ['height'],
      textAlign: ['textAlign'],
      fontSize: ['fontSize'],
      color: ['color'],
      fontFamily: ['fontFamily'],
      fontWeight: ['fontWeight'],
      lineHeight: ['lineHeight'],
      padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
      margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      borderWidth: [
        'borderTopWidth',
        'borderBottomWidth',
        'borderRightWidth',
        'borderLeftWidth'
      ],
      borderColor: [
        'borderTopColor',
        'borderBottomColor',
        'borderRightColor',
        'borderLeftColor'
      ],
      borderStyle: [
        'borderTopStyle',
        'borderBottomStyle',
        'borderRightStyle',
        'borderLeftStyle'
      ],
      borderRadius: [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomRightRadius',
        'borderBottomLeftRadius'
      ],
      backgroundColor: ['backgroundColor'],
      backgroundImage: ['backgroundImage']
    }
    let elStyle = computed(() => {
      let opts = props.config.options
      let style: any = {}
      for (let opt of opts) {
        if (supports[opt]) {
          for (let key of supports[opt]) {
            if (props.modelValue[key]) {
              style[key] = props.modelValue[key]
            }
          }
        }
      }
      return style
    })

    return {i18n, change, elStyle}
  }
})
</script>

<style lang="less">
.c-style-property {
  display: inline-block;
  .ant-select {
    min-width: 60px;
  }
}
</style>
