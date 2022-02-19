<template>
  <a-spin class="c-main-spin" :spinning="state.loading">
    <div @click="mainClick()" v-if="state.loaded" class="c-main">
      <div class="c-main-left">
        <div :collapsed="true">
          <div @click="login()" class="c-main-user" :title="user.name">
            <div class="c-main-logo">
              <a-avatar v-if="user && user.name" :src="avatar">
                {{ user.name.substring(0, 2) }}
              </a-avatar>
              <span v-else>
                <icon type="user" />
              </span>
            </div>
            <span v-if="user.name">
              {{ user.name }}
            </span>
            <span v-if="!user.name">登录</span>
          </div>

          <ul class="c-menu">
            <li
              :title="i18n.main_chart"
              @click="selectTab('chart')"
              :class="{selected: route.name == 'chart'}"
            >
              <icon type="chart" />
              <p v-if="showText">{{ i18n.main_chart }}</p>
            </li>
            <li
              :title="i18n.main_table"
              @click="selectTab('table')"
              :class="{selected: route.name == 'table'}"
            >
              <icon type="table" />
              <p v-if="showText">{{ i18n.main_table }}</p>
            </li>
            <li
              :title="i18n.main_relationship"
              @click="selectTab('relationship')"
              :class="{selected: route.name == 'relationship'}"
            >
              <icon type="relationship" />
              <p v-if="showText">{{ i18n.main_relationship }}</p>
            </li>

            <li class="c-line" />
            <li
              :title="i18n.main_dataSource"
              @click="selectTab('dataSource')"
              :class="{selected: route.name == 'dataSource'}"
            >
              <icon type="datasource" />
              <p v-if="showText">{{ i18n.main_dataSource }}</p>
            </li>
            <li
              :title="i18n.main_options"
              @click="selectTab('options')"
              :class="{selected: route.name == 'options'}"
            >
              <icon type="options" />
              <p v-if="showText">{{ i18n.main_options }}</p>
            </li>
          </ul>
        </div>
        <div class="c-main-left-bottom">
          <a @click="openHomeLink()"><icon type="logo" /></a>
        </div>
      </div>
      <div class="c-main-right">
        <Header />
        <router-view />
      </div>
    </div>
    <Preview v-if="state.preview"></Preview>
    <Login v-if="state.login"></Login>
    <Publish v-if="state.publish"></Publish>
    <SchemeHandle v-if="schemeHangle" v-model="schemeHangle" />
    <WelcomePage v-if="welcomePageVisible" v-model="welcomePageVisible" />
  </a-spin>
</template>
<script lang="ts">
import Header from './Header.vue'
import {defineComponent, ref, nextTick, onMounted, computed} from 'vue'
import http from '../use/http'
import {loadStore, useState, useI18n, useLanguage, openLink} from '../use/state'
import {loadPlugins} from '../use/plugin'
import {useRoute, useRouter} from 'vue-router'
import Preview from '../components/preview/Preview.vue'
import Login from '../components/actions/Login.vue'
import Publish from '../components/actions/Publish.vue'
import {useHandle} from '../use/electron'
import {Util} from '@datahu/core'
import SchemeHandle from '../components/actions/SchemeHandle.vue'
import WelcomePage from '../components/actions/WelcomePage.vue'
export default defineComponent({
  components: {Header, Preview, Login, Publish, SchemeHandle, WelcomePage},
  setup() {
    let i18n = useI18n()
    let route = useRoute()
    let router = useRouter()
    let state = useState()
    let selectTab = (name: any) => {
      router.push(name)
    }
    let language = useLanguage()

    let welcomePageVisible = ref(false)
    let openWelcomePage = () => {
      welcomePageVisible.value = true
    }

    // 自定义schema 触发事件
    let schemeHangle = ref(null)
    useHandle(async (message: any) => {
      schemeHangle.value = message
      welcomePageVisible.value = false
    })

    let login = () => {
      state.login = true
    }

    let user = computed(() => {
      if (state.store && state.store.user) {
        return state.store.user.user || {}
      }
      return {}
    })

    let avatar = computed(() => {
      if (state.store && state.store.user) {
        if (state.store.user.server)
          return (
            state.store.user.server +
            '/file/download/' +
            state.store.user.user.avatar +
            '/'
          )
      }
    })

    let showText = ref(false)

    let openHomeLink = () => {
      openLink(Util.getServerUrl())
    }

    let mainClick = () => {
      if (state.formatPainterChart) {
        state.formatPainterChart = null
      }
    }

    let onSave = async () => {
      if (!state.pkg.hasPath()) {
        await state.pkg.saveAs()
      } else {
        await state.pkg.save()
      }
    }

    // onPaste 事件有时无效，自己监听组合事件
    let pressedKey: any = {}
    let onKeyDown = (e: any) => {
      pressedKey[e.key] = true
      if (pressedKey['Meta'] || pressedKey['Control']) {
        if (e.key == 's' || e.key == 'S') {
          // save
          onSave()
        }
      }
    }
    let onKeyUp = (e: any) => {
      console.log('key up', e.key)
      pressedKey[e.key] = false
    }

    onMounted(async () => {
      nextTick(() => {
        document.addEventListener('keyup', onKeyUp)
        document.addEventListener('keydown', onKeyDown)
      })
      await loadStore()
      await loadPlugins()
      openWelcomePage()
    })

    return {
      route,
      selectTab,
      i18n,
      state,
      showText,
      login,
      user,
      avatar,
      schemeHangle,
      openHomeLink,
      mainClick,
      onKeyDown,
      onKeyUp,
      welcomePageVisible
    }
  }
})
</script>
<style lang="less">
.c-main-spin {
  width: 100%;
  height: 100%;
  > .ant-spin-dot {
    margin-top: 50px;
  }
}
.ant-spin-nested-loading {
  height: 100%;
  .ant-spin-container {
    height: 100%;
  }
}
.c-main {
  height: 100%;
  width: 100%;
  position: relative;
  padding-left: 80px;
  .c-main-left {
    width: 80px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: #f8f9fe;
    border-right: 1px solid #f0f0f0;

    .c-main-left-bottom {
      width: 80px;
      text-align: center;
      .c-icon {
        width: 48px;
        height: 48px;
      }
      position: absolute;
      bottom: 20px;
    }
  }
  .c-main-right {
    height: 100%;
    width: 100%;
    min-width: 1024px;
    padding-top: 54px;
    position: relative;
    .c-header {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      background-color: #f8f9fe;
      padding: 0px 10px;
      height: 54px;
      line-height: 52px;
    }
    .c-pane-1 {
      background-color: var(--light-second-color);
    }
    .c-pane-2 {
      background-color: #f8f9fe;
    }
    .c-pane-3 {
      background-color: var(--light-second-color);
    }
  }
  .c-main-user {
    cursor: pointer;
    text-align: center;
    .c-icon {
      height: 48px;
      width: 48px;
      margin: 16px;
      fill: var(--text-color-secondary);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      // border: 2px solid var(--primary-color);
      padding: 10px;
    }
    .ant-avatar {
      height: 48px;
      width: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      margin: 16px;
      text-align: center;
      line-height: 44px;
      color: var(--primary-color);
      font-size: 16px;
      img {
        height: 44px;
        width: 44px;
        border-radius: 50%;
      }
      svg {
        display: none;
        fill: var(--primary-color);
        display: inline-block;
        vertical-align: middle;
      }
    }
    > span {
      display: block;
      margin: 0px 8px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .trigger:hover {
    color: #1890ff;
  }

  .c-menu {
    list-style: none;
    outline: none;
    text-align: center;
    padding: 0px;
    margin-top: 30px;
    li {
      padding: 5px 0px;
      margin: 15px 0px;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      cursor: pointer;
      &:hover {
        background-color: var(--light-primary-color);
      }
      .c-icon {
        width: 28px;
        height: 28px;
      }
      &.c-line {
        box-shadow: var(--box-shadow-base);
        // background-color: var(--heading-color);
        opacity: 0.5;
        margin: 20px 20px;
        padding: 0px;
        height: 1px;
        border-radius: 1px;
      }
      svg {
        fill: var(--text-color-secondary);
      }
      p {
        color: var(--text-color-secondary);
        font-size: 12px;
      }

      &.selected {
        border-right-color: var(--primary-color);
        svg {
          fill: var(--primary-color);
        }
        p {
          color: var(--primary-color);
        }
      }
    }
  }
}
</style>
