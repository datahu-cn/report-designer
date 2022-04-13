<template>
  <div class="c-category-tree">
    <a-tree
      :selectable="false"
      :checkable="true"
      :multiple="true"
      :tree-data="treeData"
      v-model:checkedKeys="checkedKeys"
      v-model:expandedKeys="expandedKeys"
    >
      <template #title="node">
        <span>{{ node.title }}({{ node.numCount }})</span>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts">
import {message} from 'ant-design-vue'
import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  components: {},
  props: ['modelValue', 'categories', 'hiddenZero'],
  setup(props, {emit}) {
    let checkedKeys = computed({
      get() {
        console.log('get', props.modelValue)
        return props.modelValue
      },
      set(v: any) {
        let paths = getCheckedPaths(v)
        emit('update:modelValue', paths)
        emit('change', paths)
      }
    })

    let getCheckedPaths = (checked: Array<string>) => {
      let paths = []
      for (let path1 of checked) {
        let has = true
        for (let path2 of checked) {
          if (path1.startsWith(path2 + '.')) {
            has = false
            break
          }
        }
        if (has) {
          paths.push(path1)
        }
      }
      return paths
    }

    let getTreeNodes = () => {
      let roots: Array<any> = [
        {title: '顶层分类', key: '', value: 0, numCount: 0, children: []}
      ]
      let buildTree = (
        nodes: Array<any>,
        children: Array<any>,
        parentId: number
      ) => {
        for (let node of nodes) {
          if (node.parentId == parentId) {
            // 排除自身节点
            let item: any = {
              id: node.id,
              title: node.name,
              key: node.path,
              value: node.id,
              numCount: node.numCount,
              children: []
            }
            children.push(item)
            buildTree(props.categories, item.children, item.id)
            let numCount = parseFloat(node.numCount)
            for (let child of item.children) {
              numCount += parseFloat(child.numCount)
            }
            if (props.hiddenZero && numCount == 0) {
              children.splice(children.indexOf(item), 1)
            }
            item.numCount = numCount
          }
        }
      }
      if (props.categories && props.categories.length > 0) {
        buildTree(props.categories, roots[0].children, 0)
        let numCount = roots[0].numCount
        for (let child of roots[0].children) {
          numCount += child.numCount
        }
        roots[0].numCount = numCount
      }
      return roots
    }

    let treeData = computed(() => {
      return getTreeNodes()
    })

    let expandedKeys = ref([''])
    return {
      treeData,
      checkedKeys,
      expandedKeys
    }
  }
})
</script>
<style lang="less">
.c-category-tree {
}
</style>
