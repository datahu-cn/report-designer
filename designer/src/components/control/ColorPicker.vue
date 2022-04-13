<template>
  <div class="c-color-picker" :title="color">
    <div class="ant-input-group">
      <span v-if="label" class="ant-input-group-addon">{{ label }}</span>
      <span :class="{'c-ant-input': label}">
        <div ref="codeRef"></div>
      </span>
    </div>
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
import '@simonwep/pickr/dist/themes/nano.min.css'
import Pickr from '@simonwep/pickr'
export default defineComponent({
  name: 'ColorPicker',
  components: {},
  props: ['modelValue', 'disabled', 'label'],
  setup(props: any, {emit}) {
    let codeRef = ref(null)

    let color = computed(() => {
      if (pickr) {
        if (pickr && pickr.getColor().toHEXA().toString() != props.modelValue) {
          if (props.modelValue) pickr.setColor(props.modelValue)
          else {
            // pickr.setColor('#00000000')
          }
        }
      }
      return props.modelValue
    })

    let pickr: any = null
    let init = () => {
      pickr = Pickr.create({
        el: codeRef.value!,
        default: props.modelValue || '#00000000',
        theme: 'nano', // or 'monolith', or 'nano'

        swatches: [
          '#f9896b',
          '#7678ed',
          '#ffefeb',
          '#eff1ff',

          '#66ba66',
          '#fed666',
          '#ec6d79',

          '#707070',

          '#707070aa',

          '#d9d9d9'
        ],

        components: {
          // Main components
          preview: true,
          opacity: true,
          hue: true,

          // Input / output Options
          interaction: {
            input: true,
            clear: true,
            save: true
          }
        },
        i18n: {
          'btn:save': '确定',
          'btn:cancel': '取消',
          'btn:clear': '清除'
        }
      } as any)

      pickr.on('save', (color: any) => {
        let v = color ? color.toHEXA().toString() : null
        emit('update:modelValue', v)
        emit('change', v)
        pickr.hide()
      })
    }

    onMounted(() => {
      init()
    })
    return {
      codeRef,
      color
    }
  }
})
</script>

<style lang="less">
.c-color-picker {
  display: inline-block;
  border-radius: var(--border-radius-base);
  vertical-align: text-bottom;
  > div {
    display: inline-block;
  }
  .pickr {
    display: inline-block;
    line-height: 18px;
    vertical-align: text-bottom;
    .pcr-button {
      height: 1.2em;
      border: 1px solid var(--border-color-base);
      width: 1.2em;
      vertical-align: middle;
    }
  }
}
</style>
