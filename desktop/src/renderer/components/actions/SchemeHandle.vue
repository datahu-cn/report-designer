<template>
  <div class="c-scheme-handle">
    <a-modal
      title="提示"
      placement="right"
      :closable="false"
      class="c-scheme-handle-modal"
      v-model:visible="visible"
      width="500px"
    >
      <div>
        <a-form :model="chart" :label-col="{span: 5}" :wrapper-col="{span: 15}">
          <a-form-item label="使用用户">
            <UserSelect
              v-model="currentUser"
              :server="currentServer"
            ></UserSelect>
          </a-form-item>
          <a-form-item :label="actionConfig.showText">
            {{ query.name }}
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button
          v-if="currentUser"
          key="openreport"
          type="primary"
          :loading="loading"
          @click="open()"
        >
          {{ actionConfig.showText }}
        </a-button>
        <a-button key="cancel" @click="visible = false">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref, Ref} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import {PackageManager} from '../../use/PackageManager'
import {Modal} from 'ant-design-vue'
import {Util} from '@datahu/core'
import UserSelect from '../common/UserSelect.vue'
import http from '../../use/http'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
  name: 'SchemeHandle',
  components: {UserSelect},
  props: ['modelValue'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let router = useRouter()
    let route = useRoute()
    let visible = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', null)
      }
    })

    let loadPkgFromServer = async (params: any) => {
      let newPkg = await PackageManager.loadFromServer(params)
      if (newPkg) {
        state.pkg = newPkg
        state.pkg.init()
        state.loaded = false
        nextTick(() => {
          state.loaded = true
        })
      }
    }

    let currentUser: Ref<any> = ref(null)
    let currentServer: Ref<string> = ref('')

    let query: any = ref(null)
    let actionConfig = {
      action: '',
      showText: ''
    }
    if ((props.modelValue.action = 'scheme')) {
      actionConfig.action = props.modelValue.url.substring(
        'datahu://'.length,
        props.modelValue.url.indexOf('?')
      )
      if(actionConfig.action.endsWith('/')){
        actionConfig.action = actionConfig.action.substring(0, actionConfig.action.length - 1)
      }
      query.value = Util.Url.query(props.modelValue.url)
      currentServer.value = query.value.server
      if (state.store.user && state.store.user.server == currentServer.value) {
        currentUser.value = state.store.user
      } else {
        if (state.store.users && state.store.users.length > 0) {
          for (let u of state.store.users) {
            if (u.server == currentServer.value) {
              currentUser.value = u
              break
            }
          }
        }
      }

      if (actionConfig.action == 'design') {
        // 打开在线报表
        query.value.name = decodeURI(query.value.name)
        actionConfig.showText = '打开报表'
      } else if (actionConfig.action == 'usedata') {
        // 使用数据
        query.value.name = decodeURI(query.value.name)
        actionConfig.showText = '加载数据'
      }
    }

    let loading = ref(false)
    let open = async () => {
      loading.value = true
      try {
        if (actionConfig.action == 'design') {
          await loadPkgFromServer({user: currentUser.value, query: query.value})
          if (query.value.route && route.name != query.value.route) {
            router.push(query.value.route)
          }
        } else if (actionConfig.action == 'usedata') {
          state.usedata = {user: currentUser.value, table: query.value.name}
          if (route.name == 'dataSource') {
            state.loaded = false
            nextTick(() => {
              state.loaded = true
            })
          } else {
            router.push('dataSource')
          }
        }
      } catch (e) {
        console.error(e)
      }
      loading.value = false
      visible.value = false
    }

    if (!(state.store && state.store.user)) {
      state.login = true
    }

    return {
      visible,
      state,
      loading,
      open,
      query,
      currentUser,
      currentServer,
      actionConfig
    }
  }
})
</script>

<style lang="less">
.c-scheme-handle-modal {
}
</style>
