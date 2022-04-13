<template>
  <div class="c-welcome-page">
    <a-modal
      title="Data Hu Desktop"
      placement="right"
      :closable="false"
      class="c-welcome-page-modal"
      v-model:visible="visible"
      :maskClosable="false"
      width="800px"
      :footer="null"
    >
      <div>
        <a-button class="c-mr10" type="text" @click="newPkgHandle()">
          <template #icon><icon type="plus" /></template>
          新建报表
        </a-button>
        <a-button type="text" @click="loadPkgHandle()">
          <template #icon><icon type="open" /></template>
          打开报表
        </a-button>
        <div
          class="c-recenty-list"
          v-if="
            state.store && state.store.recenty && state.store.recenty.length > 0
          "
        >
          <h4>最近使用</h4>
          <div>
            <div v-for="item in state.store.recenty" :key="item.path">
              <a-button type="text" @click="loadPkgFromPathHandle(item)">
                <span :title="item.path">{{ item.path }}</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref, Ref} from 'vue'
import {
  useState,
  useI18n,
  useLanguage,
  newPkg,
  loadPkg,
  loadPkgFromPath
} from '../../use/state'
import {PackageManager} from '../../use/PackageManager'
import {Modal} from 'ant-design-vue'
import {Util} from '@datahu/core'
import UserSelect from '../common/UserSelect.vue'
import http from '../../use/http'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
  name: 'WelcomePage',
  components: {UserSelect},
  props: ['modelValue'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let visible = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })

    let loading = ref(false)

    let newPkgHandle = async () => {
      await newPkg()
      visible.value = false
    }
    let loadPkgHandle = async () => {
      await loadPkg()
      visible.value = false
    }
    let loadPkgFromPathHandle = async (recenty: any) => {
      await loadPkgFromPath(recenty)
      visible.value = false
    }

    return {
      visible,
      state,
      loading,
      open,
      newPkgHandle,
      loadPkgHandle,
      loadPkgFromPathHandle
    }
  }
})
</script>

<style lang="less">
.c-welcome-page-modal {
  .c-recenty-list {
    margin-top: 20px;
    h4 {
      margin-left: 15px;
    }
  }
}
</style>
