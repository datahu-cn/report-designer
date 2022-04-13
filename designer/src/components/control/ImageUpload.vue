<template>
  <div class="c-image-upload">
    <a-upload
      :disabled="disabled"
      :multiple="false"
      list-type="picture-card"
      :show-upload-list="false"
      :before-upload="beforeFileUpload"
    >
      <span>
        <div
          class="c-bg-image"
          :style="{backgroundImage: imageUrl}"
          v-if="imageUrl"
          alt="avatar"
        />
        <div v-else>
          <icon type="upload" />
        </div>
      </span>
      <icon
        class="c-file-remove"
        v-if="!disabled && innerValue"
        type="close"
        @click.stop="handleFileRemove"
      />
    </a-upload>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch,
  ComputedRef
} from 'vue'
import {useI18n} from '../../use/state'
import {message} from 'ant-design-vue'
import Icon from '../common/icon/Icon.vue'
export default defineComponent({
  name: 'ImageUpload',
  components: {Icon},
  props: ['modelValue', 'disabled', 'limitSize'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let innerValue: any = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })
    let handleFileRemove = () => {
      innerValue.value = null
      change(innerValue.value)
    }

    const imageUrl = computed(() => {
      if (innerValue.value) {
        return `url(${innerValue.value})`
      }
    })
    let beforeFileUpload = (file: File) => {
      if (props.image) {
        const isJpgOrPng = file.type.indexOf('image') == 0
        if (!isJpgOrPng) {
          message.error('请上传图片')
          return false
        }
      }
      if (props.limitSize) {
        const isLt = file.size / 1024 / 1024 < props.limitSize
        if (!isLt) {
          message.error('上传文件不能超过' + props.limitSize + 'M')
          return false
        }
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        // logs data:<type>;base64,wL2dvYWwgbW9yZ...
        innerValue.value = reader.result
        change(innerValue.value)
      }
      reader.readAsDataURL(file)
      return false
    }

    let change = (v: any) => {
      emit('change', v)
    }

    return {
      i18n,
      innerValue,
      handleFileRemove,
      beforeFileUpload,
      imageUrl
    }
  }
})
</script>

<style lang="less">
.c-image-upload {
  display: inline-block;
  .ant-upload-picture-card-wrapper {
    width: auto;
  }
  .ant-upload {
    position: relative;
    &.ant-upload-select-picture-card {
      width: 30px;
      height: 30px;
      margin: 0px;
      .c-bg-image {
        width: 30px;
        height: 30px;
      }
      > .ant-upload {
        padding: 0px;
      }
      i {
        color: #999;
      }
    }

    .c-file-remove {
      display: none;
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 7px;
      background-color: var(--error-color);
      fill: white;
      top: -7px;
      right: -7px;
    }
    &:hover {
      .c-file-remove {
        display: block;
      }
    }
  }
}
</style>
