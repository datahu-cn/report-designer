<template>
  <div class="c-border-style-picker">
    <div class="ant-input-group">
      <span v-if="label" class="ant-input-group-addon">{{ label }}</span>
      <a-select
        :class="{'c-ant-input': label}"
        @change="change"
        :disabled="disabled"
        size="small"
        class="c-line-select"
        v-model:value="innerValue"
        :dropdown-match-select-width="false"
      >
        <a-select-option value="none">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'none'}"
          ></div>
        </a-select-option>
        <a-select-option value="solid">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'solid'}"
          ></div>
        </a-select-option>
        <a-select-option value="dotted">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'dotted'}"
          ></div>
        </a-select-option>
        <a-select-option value="dashed">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'dashed'}"
          ></div>
        </a-select-option>
        <a-select-option value="double">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'double'}"
          ></div>
        </a-select-option>
        <a-select-option value="groove">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'groove'}"
          ></div>
        </a-select-option>
        <a-select-option value="ridge">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'ridge'}"
          ></div>
        </a-select-option>
        <a-select-option value="inset">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'inset'}"
          ></div>
        </a-select-option>
        <a-select-option value="outset">
          <div
            class="c-line-select-option"
            :style="{borderStyle: 'outset'}"
          ></div>
        </a-select-option>
      </a-select>
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
export default defineComponent({
  name: 'BorderStylePicker',
  components: {},
  props: ['modelValue', 'disabled', 'label'],
  setup(props: any, {emit}) {
    let innerValue = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })

    let change = (v: any) => {
      emit('change', v)
    }

    return {
      innerValue,
      change
    }
  }
})
</script>

<style lang="less">
.c-border-style-picker {
  display: inline-block;
  border-radius: var(--border-radius-base);
  vertical-align: text-bottom;
  > div {
    display: inline-block;
    .c-ant-input {
      padding: 0px;
      .ant-select-selector {
        border-width: 0px;
      }
    }
  }
}
.ant-select.c-line-select {
  .ant-select-selector {
    width: 65px;
  }
}
.c-line-select-option {
  display: inline-block;
  width: 28px;
  vertical-align: middle;
  border-width: 1px;
}
</style>
