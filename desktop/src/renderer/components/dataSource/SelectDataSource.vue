<template>
  <div class="c-select-datasource">
    <a-drawer
      @close="cancel"
      :title="i18n.dataSource_select_header"
      placement="right"
      :closable="false"
      width="80%"
      v-model:visible="visible"
    >
      <template v-for="item in dataSources" :key="item.title">
        <div
          class="c-datasource-cards"
          v-if="!item.disableNew"
          style="margin-bottom: 10px"
        >
          <a-card @click="selectDs(item)" hoverable>
            <template #cover>
              <div v-html="item.icon"></div>
            </template>
            <a-card-meta :title="item.title">
              <template #description></template>
            </a-card-meta>
          </a-card>
        </div>
      </template>
      <div class="c-drawer-footer">
        <a-button style="margin-right: 8px" @click="cancel">
          {{ i18n.common_cancel }}
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import {useI18n} from '../../use/state'
export default defineComponent({
  name: 'SelectDataSource',
  props: ['modelValue', 'dataSources'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let isNew = ref(true)
    if (props.modelValue) {
      isNew.value = false
    }

    let sourceType = ref('')
    sourceType.value = props.modelValue

    let visible = computed({
      get() {
        return props.modelValue != null
      },
      set() {
        emit('update:modelValue', null)
      }
    })

    let selectDs = (item: any) => {
      emit('update:modelValue', item.type)
    }

    let cancel = () => {
      emit('update:modelValue', null)
      emit('cancel', null)
    }

    return {
      cancel,
      i18n,
      visible,
      sourceType,
      selectDs
    }
  }
})
</script>

<style lang="less">
.c-select-datasource {
}
.c-datasource-cards {
  display: inline-block;
  width: 210px;
  padding: 20px;
  .ant-card {
    text-align: center;
    .ant-card-body {
      padding: 20px 10px;
      background-color: var(--light-primary-color);
    }
    .ant-card-cover {
      padding: 20px 0px;
      svg {
        width: 64px;
        height: 64px;
      }
    }
  }
}
</style>
