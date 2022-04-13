<template>
  <div>
    <div class="object-container" v-for="(item, i) in innerValue" :key="i">
      <div class="object-input">
        <a-input
          :size="size"
          :disabled="disabled"
          v-model:value="item.key"
          placeholder="key"
          @change="addObject"
        />
      </div>

      <div class="object-input">
        <a-input
          :size="size"
          :disabled="disabled"
          v-model:value="item.value"
          placeholder="value"
        />
      </div>
      <div class="object-icon">
        <icon
          v-if="i != 0"
          type="close"
          :width="'18px'"
          @click="deleteObject(i)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import Icon from '../common/icon/Icon.vue'
import {useI18n} from '../../use/state'
import {message} from 'ant-design-vue'
export default defineComponent({
  name: 'ObjectSet',
  components: {
    Icon
  },
  props: ['modelValue', 'size', 'disabled'],
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
    if (!innerValue.value) {
      innerValue.value = ref([
        {
          key: '',
          value: ''
        }
      ])
    }

    const addObject = () => {
      if (innerValue.value[innerValue.value.length - 1]['key']) {
        innerValue.value.push({
          key: '',
          value: ''
        })
      }
    }

    const deleteObject = (index: number) => {
      innerValue.value.splice(index, 1)
    }

    return {
      i18n,
      innerValue,
      addObject,
      deleteObject
    }
  }
})
</script>

<style lang="less">
.object-container {
  display: flex;
  align-items: center;

  .object-input {
    margin-right: 10px;
    margin-bottom: 2px;
  }
}
</style>
