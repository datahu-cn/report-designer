<template>
  <div class="c-category-select">
    <a-tree-select
      :allow-clear="true"
      v-model:value="innerValue"
      :tree-data="treeData"
      v-model:treeExpandedKeys="expandedKeys"
    ></a-tree-select>
  </div>
</template>
<script lang="ts">
import {message} from 'ant-design-vue'
import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  components: {},
  props: ['modelValue', 'categories', 'key'],
  setup(props, {emit}) {
    let innerValue = computed({
      get() {
        console.log('get', props.modelValue)
        return props.modelValue
      },
      set(v: any) {
        console.log('set', v)
        emit('update:modelValue', v)
        emit('change', v)
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
        {
          title: '顶层分类',
          key: 0,
          value: 0,
          numCount: 0,
          children: []
        }
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
              key: props.key ? node[props.key] : node.id,
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

    let expandedKeys = ref([0])

    return {
      treeData,
      innerValue,
      expandedKeys
    }
  }
})
</script>
<style lang="less">
.c-category-select {
}
</style>
