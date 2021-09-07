<template>
  <div class="c-data-role">
    <a-modal
      title="提示"
      placement="right"
      :closable="false"
      class="c-data-role-modal"
      v-model:visible="visible"
      width="500px"
    >
      <div>
        <a-form :model="form" :label-col="{span: 5}" :wrapper-col="{span: 15}">
          <a-form-item label="角色列">
            <a-select
              mode="multiple"
              v-model:value="form.roleColumns"
              :options="columns"
              placeholder="选择列"
            />
          </a-form-item>
          <a-form-item label="模拟角色">
            <a-select
              mode="multiple"
              v-model:value="form.roles"
              placeholder="输入您想模拟的角色名称"
              style="width: 100%"
              :filter-option="false"
              @search="searchRole"
              :options="roleOptions"
              :not-found-content="null"
            ></a-select>
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button key="save" type="primary" @click="save()">提交</a-button>
        <a-button key="cancel" @click="visible = false">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref, Ref, reactive} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import {PackageManager} from '../../use/PackageManager'
import {Modal} from 'ant-design-vue'
import {FilterType, Util} from '@datahu/core'
import UserSelect from '../common/UserSelect.vue'
import http from '../../use/http'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
  name: 'DataRole',
  components: {UserSelect},
  props: ['visible'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let router = useRouter()
    let route = useRoute()
    let visible = computed({
      get() {
        return props.visible
      },
      set(v) {
        emit('update:visible', false)
      }
    })

    let roleOptions: Ref<any> = ref([])

    let columns = computed(() => {
      let options = []
      for (let table of state.pkg.definition.tables) {
        for (let col of table.columns) {
          options.push({
            label: `${col.alias || col.name}[${table.alias || table.name}]`,
            value: col.id
          })
        }
      }
      return options
    })

    const form: any = reactive({
      roles: state.pkg.definition.mockRoles || [],
      roleColumns: []
    })

    let initRoleColumns = () => {
      for (let table of state.pkg.definition.tables) {
        for (let col of table.columns) {
          if (col.filters) {
            for (let filter of col.filters) {
              if (filter.filterType == FilterType.role) {
                form.roleColumns.push(col.id)
                break
              }
            }
          }
        }
      }
    }
    initRoleColumns()

    let searchRole = (v: string) => {
      for (let role of roleOptions.value) {
        let has = false
        for (let selectedRole of form.roles) {
          if (selectedRole == role.value) {
            has = true
            break
          }
        }
        if (!has) {
          roleOptions.value.splice(roleOptions.value.indexOf(role), 1)
          break
        }
      }
      let has = false
      for (let role of roleOptions.value) {
        if (role.label == v) {
          has = true
          break
        }
      }
      if (!has) {
        roleOptions.value.push({label: v, value: v})
      }
    }

    let save = () => {
      state.pkg.updateRole(form)
      visible.value = false
    }

    return {
      visible,
      state,
      open,
      form,
      roleOptions,
      searchRole,
      columns,
      save
    }
  }
})
</script>

<style lang="less">
.c-data-role-modal {
}
</style>
