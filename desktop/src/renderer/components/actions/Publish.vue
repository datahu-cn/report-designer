<template>
  <div class="c-publish">
    <a-modal
      :title="chart.name"
      placement="right"
      :closable="false"
      class="c-publish-modal"
      v-model:visible="visible"
      width="500px"
    >
      <div>
        <div>
          <a-form
            :model="chart"
            :label-col="{span: 5}"
            :wrapper-col="{span: 15}"
          >
            <a-form-item label="使用用户">
              <UserSelect
                v-model="currentUser"
                @change="currentUserChange"
              ></UserSelect>
            </a-form-item>
            <template v-if="currentUser">
              <!-- <a-form-item label="预览图片">
                <div
                  class="c-preview-image"
                  :style="{'background-image': previewImage()}"
                ></div>
                <div>
                  <FileUpload
                    :limit-size="2"
                    v-model="manualPreviewImage"
                  ></FileUpload>
                </div>
              </a-form-item> -->
              <a-form-item label="分类">
                <CategorySelect
                  v-if="categories && categories.length > 0"
                  v-model="chart.category"
                  :categories="categories"
                />
              </a-form-item>
              <a-form-item label="说明">
                <a-input
                  v-model:value="chart.description"
                  placeholder=""
                ></a-input>
              </a-form-item>
              <a-form-item label="搜索关键字">
                <a-input
                  v-model:value="chart.keywords"
                  placeholder=""
                ></a-input>
              </a-form-item>
              <a-form-item label="发布到">
                <a-radio-group v-model:value="chart.companyId">
                  <a-radio v-for="target in publishTargets" :value="target.id">
                    {{ target.name }}
                  </a-radio>
                </a-radio-group>
                <div v-if="publishTargets.length == 0">
                  没有可选的组织，请先
                  <a @click="linkUrl('/company')">创建组织</a>
                </div>
              </a-form-item>
              <a-form-item label="发布范围">
                <a-radio-group v-model:value="chart.scope">
                  <a-radio :value="0">默认（部分可见或保持不变）</a-radio>
                  <a-radio :value="1">公开</a-radio>
                  <a-radio :value="2">组织内可见</a-radio>
                  <a-radio :value="3">部分可见</a-radio>
                </a-radio-group>
                <div v-if="publishTargets.length == 0">
                  没有可选的组织，请先
                  <a @click="linkUrl('/company')">创建组织</a>
                </div>
              </a-form-item>
            </template>
          </a-form>
          <a-alert
            class="c-mt4"
            v-if="errorMessage"
            :message="errorMessage"
            type="error"
          />
        </div>
      </div>
      <template #footer>
        <a-button
          v-if="currentUser"
          key="publish"
          type="primary"
          @click="publish()"
          :loading="loading"
          :disabled="
            loading ||
            !publishTargets ||
            publishTargets.length == 0 ||
            !chart.companyId
          "
        >
          发布
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
import {Modal} from 'ant-design-vue'
import Chart from '../../views/Chart.vue'
import FileUpload from '../control/FileUpload.vue'
import CategorySelect from '../common/CategorySelect.vue'
import UserSelect from '../common/UserSelect.vue'
export default defineComponent({
  name: 'Login',
  components: {Chart, FileUpload, CategorySelect, UserSelect},
  props: [],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let visible = computed({
      get() {
        return state.publish
      },
      set(v) {
        state.publish = false
      }
    })

    let save = async () => {
      if (!state.pkg.hasPath()) {
        await state.pkg.saveAs(false)
      } else {
        await state.pkg.save(false)
      }
    }

    let chart = reactive({
      name: state.pkg.getName(),
      chartCode: state.pkg.definition.id,
      description: state.pkg.definition.description,
      category: state.pkg.definition.category,
      keywords: state.pkg.definition.keywords,
      manualPreviewImage: state.pkg.definition.manualPreviewImage,
      autoPreviewImage: state.pkg.definition.autoPreviewImage,
      companyId: 0,
      scope: state.pkg.definition.scope || 0,
      overwrite: false
    })

    let errorMessage: Ref<string | null> = ref(null)

    let loading = ref(false)
    let action = ref('info')

    let validate = () => {
      errorMessage.value = null
      return true
    }

    let publish = async () => {
      if (validate()) {
        try {
          loading.value = true
          chart.name = state.pkg.getName()
          chart.chartCode = state.pkg.definition.id
          state.pkg.definition.description = chart.description
          state.pkg.definition.category = chart.category
          state.pkg.definition.keywords = chart.keywords
          state.pkg.definition.manualPreviewImage = chart.manualPreviewImage
          state.pkg.definition.scope = chart.scope
          await save()

          if (!chart.overwrite) {
            // 检查重名报表
            let code = await http.request('ServerRequest/publishCheck', {
              chart,
              user: currentUser.value
            })
            if (code == 1) {
              Modal.confirm({
                title: '服务器端存在同名的报表, 是否覆盖',
                icon: '',
                content: '',
                okText: '确认',
                cancelText: '取消',
                async onOk() {
                  chart.overwrite = true
                  await sendPublish()
                }
              })
            } else {
              await sendPublish()
            }
          } else {
            await sendPublish()
          }
        } catch (e) {
          errorMessage.value = e.message
        }
        loading.value = false
      }
    }

    let sendPublish = async () => {
      try {
        await http.request(
          'ServerRequest/publish',
          {
            chart,
            path: state.pkg.path,
            user: currentUser.value
          },
          true
        )
        message.success('发布成功')
        visible.value = false
      } catch (e) {
        errorMessage.value = e.message
      }
    }

    let currentUser: Ref<any> = ref(state.store.user)
    let currentUserChange = () => {
      if (currentUser.value) {
        chart.companyId = 0
        getPublishTargets()
      }
    }

    let linkUrl = async (url: string) => {
      openLink(url)
    }

    let categories = ref([])
    let publishTargets: Ref<Array<any>> = ref([])
    let getPublishTargets = async () => {
      try {
        let result: any = await http.request(
          'ServerRequest/getUserinfo',
          {user: currentUser.value},
          true
        )
        let companies = result.userinfo.companies
        categories.value = result.categories
        let pts = []
        if (companies && companies.length > 0) {
          for (let company of companies) {
            pts.push({name: company.name, id: company.id})
          }
        }
        publishTargets.value = pts
        if (!chart.companyId && pts.length > 0) {
          chart.companyId = pts[0].id
        }
      } catch (e) {
        errorMessage.value = e.message
      }
    }

    let previewImage = () => {
      let url =
        chart.manualPreviewImage || state.pkg.definition.autoPreviewImage
      if (url) {
        return `url(${url})`
      }
      return ''
    }

    let manualPreviewImage = computed({
      get() {
        if (chart.manualPreviewImage) {
          return ['预览图片', chart.manualPreviewImage]
        } else {
          return null
        }
      },
      set(v: any) {
        if (v && v.length == 2) {
          chart.manualPreviewImage = v[1]
        } else {
          chart.manualPreviewImage = undefined
        }
      }
    })

    currentUserChange()

    return {
      loading,
      publish,
      errorMessage,
      visible,
      action,
      linkUrl,
      currentUser,
      state,
      chart,
      publishTargets,
      previewImage,
      manualPreviewImage,
      categories,
      currentUserChange
    }
  }
})
</script>

<style lang="less">
.c-publish-modal {
  width: 100%;
  height: 100%;
  .c-preview-image {
    width: 282px;
    height: 150px;
    background-size: cover;
    border: 1px solid var(--border-color-base);
  }
  .ant-radio-group {
    label {
      display: block;
    }
  }
}
</style>
