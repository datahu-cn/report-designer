<template>
  <div class="c-login">
    <a-modal
      :title="'用户'"
      placement="right"
      :closable="false"
      class="c-login-modal"
      v-model:visible="visible"
      width="500px"
    >
      <div>
        <div v-if="users && users.length > 0 && action == 'info'">
          <a-list bordered item-layout="horizontal" :data-source="users">
            <template #renderItem="{item}">
              <a-list-item>
                <a-list-item-meta :description="item.server">
                  <template #title>
                    {{ item.user.name }}
                    <a-tag
                      color="success"
                      v-if="
                        state.store.user &&
                        item.user.id == state.store.user.user.id &&
                        item.server == state.store.user.server
                      "
                    >
                      正在使用
                    </a-tag>
                  </template>
                  <template #avatar>
                    <a-avatar :src="avatar(item)">
                      {{ item.user.name[0].toUpperCase() }}
                    </a-avatar>
                  </template>
                </a-list-item-meta>
                <template #actions>
                  <a href="javascript:;" @click="logout(item)">注销</a>
                  <a href="javascript:;" @click="switchTo(item)">切换</a>
                </template>
              </a-list-item>
            </template>
          </a-list>
        </div>
        <div v-if="!users || users.length == 0 || action == 'login'">
          <a-tabs v-model:activeKey="user.loginType">
            <a-tab-pane key="password" tab="密码登录"></a-tab-pane>
            <a-tab-pane key="code" tab="验证码登录"></a-tab-pane>
          </a-tabs>
          <a-form layout="vertical" :model="user">
            <a-form-item>
              <a-input
                :disabled="serverType == 'public'"
                v-model:value="user.server"
              >
                <template #addonBefore>
                  <a-select
                    :dropdown-match-select-width="false"
                    @change="setServerType"
                    v-model:value="serverType"
                    style="width: 90px"
                  >
                    <a-select-option value="public">云端</a-select-option>
                    <a-select-option value="private">私有</a-select-option>
                  </a-select>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input v-model:value="user.mobile" placeholder="手机号" />
            </a-form-item>
            <a-form-item v-if="user.loginType == 'code'">
              <a-input
                name="datahu-mobile"
                v-model:value="user.code"
                placeholder="验证码"
              >
                <template #addonAfter>
                  <a-button
                    size="small"
                    :disabled="verCodeDisabled"
                    @click="sendVerCode()"
                    type="link"
                  >
                    {{ seconds > 0 ? seconds + '秒' : '获取验证码' }}
                  </a-button>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-if="user.loginType == 'password'">
              <a-input-password
                name="datahu-password"
                v-model:value="user.password"
                placeholder="密码"
              />
            </a-form-item>
            <a-form-item>
              <a-alert
                class="c-mb4"
                v-if="errorMessage"
                :message="errorMessage"
                type="error"
              />
              <a-button
                :loading="loading"
                :disabled="loading"
                block
                @click="login()"
                type="primary"
              >
                登录
              </a-button>
              <a-row class="c-login-links">
                <a-col :span="12">
                  <a @click="linkUrl('/signup')">注册新用户</a>
                </a-col>
                <a-col :span="12" class="c-login-link-right">
                  <a @click="linkUrl('/forget')">忘记密码</a>
                </a-col>
              </a-row>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <template #footer>
        <a-button
          v-if="logonedUser && action == 'login'"
          key="back"
          @click="action = 'info'"
        >
          返回
        </a-button>
        <a-button
          v-if="users && users.length > 0 && action == 'info'"
          key="switch"
          @click="action = 'login'"
          type="primary"
        >
          登录其他用户
        </a-button>
        <a-button key="cancel" @click="visible = false">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  toRefs,
  unref,
  ref,
  Ref
} from 'vue'
import {useI18n, useState, useLanguage, openLink} from '../../use/state'
import http from '../../use/http'
import {message} from 'ant-design-vue'
import {ITableDefinition} from '@datahu/core'
import {Util} from '@datahu/core'
export default defineComponent({
  name: 'Login',
  components: {},
  props: [],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let visible = computed({
      get() {
        return state.login
      },
      set(v) {
        state.login = false
        if (state.loginEnd) {
          state.loginEnd(false)
          state.loginEnd = null
        }
      }
    })

    let users = computed(() => {
      let list = state.store.users
      if (list && list.length > 1) {
        let r = []
        for (let i = list.length - 1; i >= 0; i--) {
          r.push(list[i])
        }
        list = r
      }
      return list
    })

    let publicServerUrl = Util.getServerUrl()
    let user = reactive({
      mobile: '',
      password: '',
      code: '',
      loginType: 'password',
      server: publicServerUrl
    })

    let serverType = computed({
      get() {
        if (user.server) {
          if (user.server != publicServerUrl) {
            return 'private'
          }
        }
        return 'public'
      },
      set(v) {
        if (v == 'public') {
          setServerUrl(publicServerUrl)
        } else {
          setServerUrl('https://')
        }
      }
    })

    let serverUrl = computed({
      get() {
        return user.server
      },
      set(v: any) {
        setServerUrl(v)
      }
    })

    let setServerUrl = async (v: string) => {
      user.server = v
    }

    let verCodeDisabled: Ref<boolean> = ref(false)
    let errorMessage: Ref<string | null> = ref(null)

    let seconds: Ref<number> = ref(-1)
    let intervalSeconds = () => {
      seconds.value = 120
      var interval = setInterval(() => {
        if (seconds.value < 0) {
          window.clearInterval(interval)
          verCodeDisabled.value = false
          return
        }
        seconds.value--
      }, 1000)
    }

    let sendVerCode = async () => {
      if (verCodeDisabled.value) {
        return
      }
      errorMessage.value = null
      var mobileReg = /^\d{11}$/
      if (!user.mobile || !mobileReg.test(user.mobile.trim())) {
        errorMessage.value = '手机号格式不正确'
        return false
      }
      user.mobile = user.mobile.trim()
      try {
        await http.request('ServerRequest/sms', user)
        verCodeDisabled.value = true
        intervalSeconds()
      } catch (e) {
        errorMessage.value = e.message
      }
    }

    let validate = () => {
      errorMessage.value = ''
      if (!user.mobile) {
        errorMessage.value = '请输入手机号'
        return false
      }
      if (user.loginType == 'password' && !user.password) {
        errorMessage.value = '请输入密码'
        return false
      }

      user.mobile = user.mobile.trim()

      if (user.loginType == 'code' && !user.code) {
        errorMessage.value = '请输入6位短信验证码'
        return false
      }
      return true
    }

    let loading = ref(false)
    let action = ref('info')

    let login = async () => {
      if (validate()) {
        try {
          loading.value = true
          let result = await http.request('ServerRequest/login', user)
          state.store = result
          message.success('登录成功')
          if (state.loginEnd) {
            state.loginEnd(state.store.user)
            state.loginEnd = null
          }
          visible.value = false
        } catch (e) {
          errorMessage.value = e.message
        }
        loading.value = false
      }
    }

    let switchTo = async (user: any) => {
      let result = await http.request('ServerRequest/switchTo', user)
      state.store = result
    }

    let logout = async (user: any) => {
      let result = await http.request('ServerRequest/logout', user)
      state.store = result
    }

    let avatar = (user: any) => {
      if (user.user && user.user.avatar) {
        return user.server + '/file/download/' + user.user.avatar + '/'
      } else {
        return ''
      }
    }

    let linkUrl = async (url: string) => {
      openLink(url)
    }

    let switchUser = () => {
      action.value = 'login'
    }

    return {
      user,
      verCodeDisabled,
      loading,
      seconds,
      sendVerCode,
      login,
      logout,
      errorMessage,
      visible,
      avatar,
      switchUser,
      switchTo,
      action,
      linkUrl,
      state,
      serverUrl,
      serverType,
      users,
      publicServerUrl
    }
  }
})
</script>

<style lang="less">
.c-login-modal {
  width: 100%;
  height: 100%;

  .c-login-user {
    cursor: pointer;
    text-align: center;
    .c-login-logo {
      height: 48px;
      padding-top: 6px;
      width: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      margin: auto;
      margin-bottom: 10px;
      border: 1px solid var(--border-color-base);
      text-align: center;
      line-height: 32px;
      color: var(--error-color);
      font-size: 16px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      svg {
        display: none;
        fill: var(--error-color);
        display: inline-block;
        vertical-align: middle;
      }
    }
    > span {
      display: block;
      margin: 0px 5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .c-login-links {
    margin-top: 10px;
    .c-login-link-right {
      text-align: right;
    }
  }
}
</style>
