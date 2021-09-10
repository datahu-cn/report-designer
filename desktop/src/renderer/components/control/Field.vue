<template>
  <div class="c-field" :class="['c-field-' + config.type]">
    <a-textarea
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'textarea'"
      v-model:value="innerValue"
      :placeholder="config.title"
      @change="change"
      auto-size
    />
    <a-input
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'text'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-input-number
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'number'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-input-password
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'password'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-select
      :allow-clear="true"
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'select'"
      v-model:value="innerValue"
      :mode="config.multiple ? 'multiple' : null"
      @change="change"
      :dropdown-match-select-width="false"
      :placeholder="config.title"
      :options="fieldFunction(config.options, data, [])"
    ></a-select>
    <a-switch
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'boolean'"
      v-model:checked="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-date-picker
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'date'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-date-picker
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'datetime'"
      show-time
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
    />
    <a-slider
      :size="size"
      range
      :disabled="disabled"
      v-if="config.type == 'range'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
      :min="fieldFunction(config.min, data, 0)"
      :max="fieldFunction(config.max, data, 0)"
      :step="fieldFunction(config.step, data, 1)"
    ></a-slider>
    <a-slider
      :size="size"
      :disabled="disabled"
      v-if="config.type == 'slider'"
      v-model:value="innerValue"
      @change="change"
      :placeholder="config.title"
      :min="fieldFunction(config.min, data, 0)"
      :max="fieldFunction(config.max, data, 0)"
      :step="fieldFunction(config.step, data, 1)"
    ></a-slider>
    <FileUpload
      v-if="config.type == 'file'"
      :size="size"
      :disabled="disabled"
      :limit-size="config.limitSize || 5"
      v-model="innerValue"
      @change="change"
    ></FileUpload>
    <FileUpload
      v-if="config.type == 'filePath'"
      :size="size"
      :disabled="disabled"
      :limit-size="config.limitSize || 5"
      v-model="innerValue"
      :isPath="true"
      @change="change"
    ></FileUpload>
    <ImageUpload
      v-if="config.type == 'image'"
      :disabled="disabled"
      :limit-size="config.limitSize || 5"
      v-model="innerValue"
      @change="change"
    ></ImageUpload>
    <CodeEditor
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'code'"
      :code-description="config.codeDescription"
      @change="change"
    ></CodeEditor>
    <ColorPicker
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'color'"
      @change="change"
    ></ColorPicker>
    <StyleLength
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      :options="fieldFunction(config.options, data, [])"
      v-if="config.type == 'styleLength'"
      @change="change"
    ></StyleLength>
    <StyleProperty
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'style'"
      @change="change"
      :config="config"
    ></StyleProperty>
    <ScreenSize
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'screen'"
      @change="change"
      :config="config"
    ></ScreenSize>
    <ObjectSet
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'objectSet'"
    />

    <StyleGraph
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'graph'"
      @change="change"
      :config="config"
    ></StyleGraph>
    <StyleGraphSet
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'graphset'"
      @change="change"
      :config="config"
    ></StyleGraphSet>
    <StyleGraphLine
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'graphline'"
      @change="change"
      :config="config"
    ></StyleGraphLine>
    <StyleKItemStyle
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'kItemStyle'"
      @change="change"
      :config="config"
    ></StyleKItemStyle>
    <NumberColor
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'numberColor'"
      @change="change"
      :min="fieldFunction(config.min, data, 0)"
      :max="fieldFunction(config.max, data, 0)"
      :config="config"
    ></NumberColor>
    <ChartScope
      :size="size"
      :disabled="disabled"
      v-model="innerValue"
      v-if="config.type == 'chartScope'"
      @change="change"
      :config="config"
    ></ChartScope>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, watch} from 'vue'
import {useI18n} from '../../use/state'
import CodeEditor from './CodeEditor.vue'
import ColorPicker from './ColorPicker.vue'
import FileUpload from './FileUpload.vue'
import ImageUpload from './ImageUpload.vue'
import StyleProperty from './StyleProperty.vue'
import StyleLength from './style/StyleLength.vue'
import ObjectSet from './ObjectSet.vue'
import StyleGraph from './style/StyleGraph.vue'
import StyleGraphSet from './style/StyleGraphSet.vue'
import StyleGraphLine from './style/StyleGraphLine.vue'

import StyleKItemStyle from './style/StyleKItemStyle.vue'
import NumberColor from './style/NumberColor.vue'
import ScreenSize from './ScreenSize.vue'
import ChartScope from './ChartScope.vue'
export default defineComponent({
  name: 'Field',
  components: {
    CodeEditor,
    ColorPicker,
    FileUpload,
    ImageUpload,
    StyleProperty,
    StyleLength,
    ObjectSet,
    StyleGraph,
    StyleGraphSet,
    StyleGraphLine,
    StyleKItemStyle,
    NumberColor,
    ScreenSize,
    ChartScope
  },
  props: [
    'modelValue',
    'config',
    'disabled',
    'size',
    'data',
    'fieldFunction',
    'index'
  ],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let innerValue = computed({
      get() {
        if (props.config.value && props.config.value.get) {
          return props.config.value.get(props.data, props.index)
        }
        return props.modelValue
      },
      set(v) {
        if (props.config.value && props.config.value.set) {
          return props.config.value.set(props.data, v, props.index)
        } else {
          emit('update:modelValue', v)
        }
      }
    })

    let change = (v: any) => {
      emit('change', v)
    }

    return {
      i18n,
      innerValue,
      change
    }
  }
})
</script>

<style lang="less">
.c-field {
  &.c-field-code {
    width: 100%;
  }
  > div {
    display: block;
  }
  .ant-input-number {
    min-width: 60px;
  }
  .ant-slider {
    min-width: 80px;
  }
  .ant-select {
    min-width: 60px;
  }
  .c-image-upload {
    height: 32px;
  }
}
</style>
