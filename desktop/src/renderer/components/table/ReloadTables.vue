<template>
  <div class="reload-container">
    <div class="reload-header">
      <div class="reload-header-left">刷新</div>
      <div class="reload-header-right" @click="close">
        <CloseOutlined />
      </div>
    </div>
    <div class="reload-item" v-for="item in list" :key="item.id">
      <div class="reload-table-name">
        <CheckCircleFilled
          v-if="item.loading && item.loading.value === false"
        />
        <a-spin v-else size="small" />
        {{ item.name }}
      </div>

      <div class="reload-table-tips">
        <div v-if="item.loading && item.loading.value === true">
          正在刷新....
        </div>
        <div v-else-if="item.loading && item.loading.value === false">
          已完成刷新
        </div>
        <div v-else>正在等待刷新....</div>
      </div>
    </div>
  </div>
</template>
<script>
import {defineComponent, ref} from 'vue'
import {CheckCircleFilled, CloseOutlined} from '@ant-design/icons-vue'
import {useI18n, useState, useLanguage} from '../../use/state'

export default defineComponent({
  components: {
    CheckCircleFilled,
    CloseOutlined
  },
  setup(props, {emit}) {
    let state = useState()
    let list = ref()
    list.value = state.pkg.getTables()

    const close = () => {
      emit('loaded')
    }
    return {
      list,
      close
    }
  }
})
</script>
<style lang="less">
.reload-container {
  width: 400px;
  background: #fff;
  min-height: 234px;
  border-radius: var(--border-radius-base);
  padding: 0 20px;

  .reload-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .reload-header-left {
      font-size: 16px;
    }

    .reload-header-right {
      cursor: pointer;
    }
  }

  .reload-item {
    padding: 12px 0;
    // border-bottom: 1px solid #ccc;

    .reload-table-name {
      line-height: 20px;
      font-size: 12px;

      span {
        color: green;
      }
    }
    .reload-table-tips {
      font-size: 14px;
      line-height: 20px;
      padding-left: 14px;
    }
  }
}
</style>
