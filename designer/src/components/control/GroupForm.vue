<template>
  <div class="c-group-form">
    <a-form class="c-controls-form" v-if="parent.children">
      <a-collapse v-model:activeKey="activeKey">
        <template v-for="control in parent.children" :key="control.name">
          <template v-if="control.array" :key="control.name">
            <template v-for="(item, index) in modelValue[control.name]">
              <a-collapse-panel
                :header="control.title + (index + 1)"
                :key="control.name + '_' + index"
                :title="control.description"
                v-if="fieldFunction(control.show, modelValue, true)"
              >
                <template #extra>
                  <div @click.stop="onChange()">
                    <a-switch
                      v-if="control.enableProperty"
                      size="small"
                      v-model:checked="
                        modelValue[control.name][index][control.enableProperty]
                      "
                    ></a-switch>
                    <icon
                      v-if="fieldFunction(control.addable, modelValue, false)"
                      :type="
                        modelValue[control.name].length == index + 1
                          ? 'plus'
                          : 'subtract'
                      "
                      @click.stop="
                        updateCollapsePanel(modelValue[control.name], index)
                      "
                    />
                  </div>
                </template>

                <a-button
                  size="small"
                  v-if="control.defaultValue !== undefined"
                  @click="resetToDefault(control, modelValue, index)"
                  type="link"
                >
                  恢复默认值
                </a-button>
                <ControlList
                  :field-function="fieldFunction"
                  @change="onChange"
                  :parent="control"
                  v-model="modelValue[control.name][index]"
                ></ControlList>
              </a-collapse-panel>
            </template>
          </template>
          <template v-else>
            <a-collapse-panel
              :key="control.name"
              :header="control.title"
              :title="control.description"
              v-if="fieldFunction(control.show, modelValue, true)"
            >
              <template #extra>
                <div v-if="control.enableProperty" @click.stop="onChange()">
                  <a-switch
                    size="small"
                    v-model:checked="
                      modelValue[control.name][control.enableProperty]
                    "
                  ></a-switch>
                </div>
              </template>
              <a-button
                v-if="control.defaultValue !== undefined"
                size="small"
                @click="resetToDefault(control, modelValue)"
                type="link"
              >
                恢复默认值
              </a-button>
              <ControlList
                :field-function="fieldFunction"
                @change="onChange"
                :parent="control"
                v-model="modelValue[control.name]"
              ></ControlList>
            </a-collapse-panel>
          </template>
        </template>
      </a-collapse>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, reactive} from 'vue'
import {useI18n} from '../../use/state'
import Field from './Field.vue'
import {ControlType, Util} from '@datahu/core'
import ControlList from './ControlList.vue'
export default defineComponent({
  name: 'GroupForm',
  components: {Field, ControlList},
  props: ['modelValue', 'parent', 'fieldFunction'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let onChange = (arg: any) => {
      emit('change', arg)
    }

    let activeKey = ref([])
    if (
      props.parent &&
      props.parent.children &&
      props.parent.children.length > 0
    ) {
      activeKey.value = props.parent.children[0].name
    }
    let updateCollapsePanel = (arr: Array<any>, index: number) => {
      if (index + 1 == arr.length) {
        // 添加
        arr.push(Util.copy(arr[arr.length - 1]))
      } else {
        // 删除
        arr.splice(index, 1)
      }
      onChange(null)
    }

    let resetToDefault = (control: any, formData: any, index: number) => {
      if (control.defaultValue !== undefined) {
        let v = Util.copy(control.defaultValue)
        if (index != null) {
          formData[control.name][index] = v
        } else {
          formData[control.name] = v
        }
      }
    }

    return {
      i18n,
      onChange,
      activeKey,
      updateCollapsePanel,
      resetToDefault
    }
  }
})
</script>

<style lang="less">
.c-group-form {
  overflow: overlay;
  height: 100%;
  .ant-collapse {
    border-width: 0px;
    border-radius: 0px;
    > .ant-collapse-item {
      > .ant-collapse-header {
        padding: 6px 4px;
        padding-left: 22px;
        padding-right: 22px;
        position: relative;
        .ant-collapse-arrow {
          left: 7px;
        }
        .ant-collapse-extra {
          position: absolute;
          top: 6px;
          right: 6px;
        }
      }
    }
  }
  .ant-collapse-content {
    border-bottom-width: 0;
    > .ant-collapse-content-box {
      // padding: 17px;
      > .c-control-list {
        border: 0px solid var(--border-color-base);
        padding: 0px;
      }
    }
  }
  .ant-collapse > .ant-collapse-item:last-child,
  .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 0px;
  }
}
</style>
