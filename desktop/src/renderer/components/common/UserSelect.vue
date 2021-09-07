<template>
  <div class="c-user-select">
    <a-dropdown
      :trigger="['click']"
      v-if="(users && users.length > 0) || modelValue"
    >
      <template #overlay>
        <a-menu class="c-user-select-menu">
          <a-menu-item
            v-for="(item, index) in users"
            :key="index"
            @click="handleMenuClick(item)"
            :title="item.server"
          >
            <a-avatar :src="avatar(item)">
              {{ item.user.name[0].toUpperCase() }}
            </a-avatar>
            <span class="c-user-name">{{ item.user.name }}</span>
          </a-menu-item>
        </a-menu>
      </template>
      <a-button block>
        <template v-if="modelValue">
          <a-avatar :src="avatar(modelValue)">
            {{ modelValue.user.name[0].toUpperCase() }}
          </a-avatar>
          <span class="c-user-name">{{ modelValue.user.name }}</span>
        </template>
        <span v-if="!modelValue">请选择用户</span>
        <icon type="alignDown" />
      </a-button>
    </a-dropdown>
    <div v-else>
      <span v-if="server">[{{ server }}]下</span>
      没有可用的用户，请先完成
      <a href="javascript:;" @click="startlogin()">登录</a>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref, Ref} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import {PackageManager} from '../../use/PackageManager'
import {Modal} from 'ant-design-vue'
import {Util} from '@datahu/core'
import Icon from './icon/Icon.vue'
export default defineComponent({
  name: 'UserSelect',
  components: {Icon},
  props: ['modelValue', 'server'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let users = computed(() => {
      let list = state.store.users
      if (list && list.length > 1) {
        let r = []
        for (let i = list.length - 1; i >= 0; i--) {
          if (!props.server || list[i].server == props.server) {
            r.push(list[i])
          }
        }
        list = r
      }
      return list
    })

    let avatar = (user: any) => {
      if (user && user.user && user.user.avatar) {
        return user.server + '/file/download/' + user.user.avatar + '/'
      } else {
        return ''
      }
    }

    const handleMenuClick = (item: any) => {
      emit('update:modelValue', item)
      emit('change', item)
    }

    let startlogin = () => {
      state.login = true
      state.loginEnd = (user: any) => {
        if (user) {
          handleMenuClick(user)
        }
      }
    }

    return {
      users,
      avatar,
      handleMenuClick,
      startlogin,
      state
    }
  }
})
</script>

<style lang="less">
.c-user-select {
  > button.ant-btn {
    text-align: left;
    padding: 4px 11px;
    height: auto;
    overflow: hidden;
    .ant-avatar {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
    > span.c-user-name {
      margin: 0px 5px;
      display: inline-block;
    }
    .c-icon {
      position: absolute;
      right: 5px;
      top: 12px;
    }
  }
}
.c-user-select-menu {
  span.c-user-name {
    margin: 0px 5px;
    display: inline-block;
  }
}
</style>
