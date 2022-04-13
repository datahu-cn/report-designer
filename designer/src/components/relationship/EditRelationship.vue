<template>
  <div>
    <a-drawer
      title="关系"
      placement="right"
      :closable="false"
      width="80%"
      v-model:visible="visible"
    >
      <div class="c-edit-relationship">
        <a-button class="c-mb5" type="primary" @click="addRelationship()">
          <PlusOutlined />
          添加
        </a-button>
        <table>
          <tr v-for="(item, index) in relationships" :key="index">
            <td><a-cascader v-model:value="item.from" :options="options" /></td>
            <td>
              <a-select
                v-model:value="item.type"
                :options="relationshipTypes"
              ></a-select>
            </td>
            <td><a-cascader v-model:value="item.to" :options="options" /></td>
            <td>
              <a-button
                shape="circle"
                v-if="relationships.length > 1"
                @click="removeRelationship(index)"
                type="danger"
                size="small"
              >
                <template #icon>
                  <icon type="subtract" />
                </template>
              </a-button>
            </td>
          </tr>
        </table>
      </div>
      <div class="c-drawer-footer">
        <a-button style="margin-right: 8px" @click="visible = null">
          {{ i18n.common_cancel }}
        </a-button>
        <a-button type="primary" style="margin-right: 8px" @click="onSubmit()">
          {{ i18n.common_submit }}
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  ref,
  Ref
} from 'vue'
import {useI18n, useState} from '../../use/state'
import http from '../../use/http'
import Field from '../control/Field.vue'
import Form from '../control/Form.vue'
import {config} from 'process'
import Table from '../../views/Table.vue'
import {message} from 'ant-design-vue'
export default defineComponent({
  name: 'EditDataSource',
  components: {Field, Form},
  props: ['visible'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()

    let visible = computed({
      get() {
        return props.visible
      },
      set(v) {
        emit('update:visible', v)
      }
    })

    let relationships: Ref<Array<any>> = ref([])
    if (state.pkg.definition.relationships) {
      for (let r of state.pkg.definition.relationships) {
        let item = {
          from: r.from,
          to: r.to,
          type: r.type
        }
        relationships.value.push(item)
      }
    } else {
      relationships.value = [{from: [], to: [], type: 'TwoWay'}]
    }

    let options: Ref<Array<any>> = ref([])
    if (state.pkg.definition.tables) {
      for (let t of state.pkg.definition.tables) {
        let opt: any = {
          label: t.alias || t.name,
          value: t.id,
          children: []
        }
        for (var c of t.columns) {
          opt.children.push({
            label: c.alias || c.name,
            value: c.id
          })
        }
        options.value.push(opt)
      }
    }

    let relationshipTypes = [
      {label: '双向', value: 'TwoWay'},
      {label: '单向', value: 'OneWay'}
    ]

    let addRelationship = () => {
      relationships.value.push({from: [], to: [], type: 'TwoWay'})
    }
    let removeRelationship = (index: number) => {
      relationships.value.splice(index, 1)
    }

    let onSubmit = async () => {
      let items = []
      for (let r of relationships.value) {
        if (r.from.length > 1 && r.to.length > 1) {
          items.push(r)
        }
      }
      let result = state.pkg.checkRelations(items)
      if (result) {
        message.error('关系中有循环冲突，不能保存')
        return
      }
      state.pkg.updateRelations(items)
      visible.value = false
    }

    return {
      visible,
      i18n,
      relationships,
      options,
      relationshipTypes,
      addRelationship,
      removeRelationship,
      onSubmit
    }
  }
})
</script>

<style lang="less">
.c-edit-relationship {
  table {
    width: 100%;
    border-radius: var(--border-radius-base);
    td {
      border: 1px solid var(--border-color-base);
    }
    tr {
      td:last-child {
        text-align: center;
        border-color: transparent;
        svg {
          fill: white;
        }
      }
    }
    .ant-cascader-picker {
      width: 100%;
      border-color: transparent;
    }
    .ant-select {
      width: 100%;
      border-color: transparent;
      .ant-select-selector {
        border-color: transparent;
      }
    }
    input {
      border-color: transparent;
    }
  }
}
</style>
