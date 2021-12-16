<template>
  <div class="c-relationship-panel">
    <div ref="panelRef">
      <!--辅助线-->
      <span
        v-for="item in resizeData.vLine"
        v-show="item.display"
        :key="item.id"
        class="ref-line v-line"
        :style="{
          left: item.position,
          top: item.origin,
          height: item.lineLength
        }"
      />
      <span
        v-for="item in resizeData.hLine"
        v-show="item.display"
        :key="item.id"
        class="ref-line h-line"
        :style="{
          top: item.position,
          left: item.origin,
          width: item.lineLength
        }"
      />
      <!--辅助线END-->
      <TableNode
        v-for="node in computedNodes"
        :ref="(el) => nodeMounted(node, el)"
        :key="node.table.id"
        :node="node"
        :resize-data="resizeData"
        :focused-line="hoverLine"
        @remove="removeNode($event)"
        @node-mounted="nodeMounted"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, Ref} from 'vue'
import {useI18n, useState} from '../../use/state'
import LeaderLine from '../common/leaderLine'
import {
  IRelationshipDefinition,
  ITableDefinition,
  RelationshipType
} from '@datahu/core'
import TableNode from './TableNode.vue'
interface ITableNode {
  table: ITableDefinition
  component?: any
}
interface ITableLine {
  relationship: IRelationshipDefinition
  from: ITableNode
  to: ITableNode
  line: any
}

export default defineComponent({
  name: 'EditDataSource',
  components: {TableNode},
  props: ['visible'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()

    let initStyle = () => {
      let tables = state.pkg.definition.tables
      let maxHeight = 0
      let maxWidth = 0
      for (let t of tables) {
        if (t.position) {
          if (t.position.left + t.position.width > maxWidth) {
            maxWidth = t.position.left + t.position.width
          }

          if (t.position.top + t.position.height > maxWidth) {
            maxHeight = t.position.top + t.position.height
          }
        }
      }
      for (let t of tables) {
        if (!t.position) {
          t.position = {
            left: maxWidth + 100,
            top: maxHeight + 100,
            width: 150,
            height: 300
          }
          maxWidth = t.position.width + t.position.left
        }
      }
    }
    initStyle()

    let nodes: Array<ITableNode> = []
    let lines: Array<ITableLine> = []
    let initNodes = () => {
      let tables = state.pkg.definition.tables

      // 如果有表格删除操作， 此处需检查需要删除的节点
      let removedNodes = []
      for (let node of nodes) {
        let has = false
        for (let table of tables) {
          if (table.id == node.table.id) {
            has = true
          }
        }
        if (!has) {
          removedNodes.push(node)
        }
      }
      for (let rNode of removedNodes) {
        nodes.splice(nodes.indexOf(rNode), 1)
      }

      for (let t of tables) {
        let node: ITableNode | null = null
        // 已经存在的节点不重复生成新对象
        for (let oldNode of nodes) {
          if (oldNode.table.id == t.id) {
            node = oldNode
          }
        }
        if (node == null) {
          node = {
            table: t
          }
          nodes.push(node)
        }
      }
    }

    let initLines = () => {
      // 如果有表格删除操作， 此处需检查需要删除的线条
      let relationships = state.pkg.definition.relationships
      for (let line of lines) {
        line.line.remove()
      }
      lines.splice(0)
      for (let relation of relationships) {
        let line: ITableLine | any = {relationship: relation}
        for (let n of nodes) {
          if (relation.from[0] == n.table.id) {
            line.from = n
          }
          if (relation.to[0] == n.table.id) {
            line.to = n
          }
        }
        lines.push(line)
      }
    }

    let computedNodes = computed(() => {
      initNodes()
      initLines()
      return nodes
    })

    let resizeData = reactive({
      react: null,
      vLine: [],
      hLine: []
    })

    let panelRef = ref(null)
    let hoverLine: Ref<ITableLine | null> = ref(null)
    let initLine = (tableLine: ITableLine) => {
      if (tableLine.line) {
        tableLine.line.position()
      } else {
        let startPlug =
          tableLine.relationship.type == RelationshipType.OneWay
            ? 'square'
            : 'arrow1'
        let line: any = new LeaderLine(
          tableLine.from.component.$el,
          tableLine.to.component.$el,
          {
            parent: panelRef.value,
            size: 2,
            color: '#fed666',
            dropShadow: {color: '#fed666', dx: 0, dy: 0},
            startPlug: startPlug,
            endPlug: 'arrow1'
          }
        )
        tableLine.line = line
        line.Props.svg.addEventListener('mouseenter', () => {
          hoverLine.value = tableLine
          line.setOptions({
            color: '#ec6d79',
            dropShadow: {color: '#ec6d79', dx: 0, dy: 0}
          })
        })
        line.Props.svg.addEventListener('mouseleave', () => {
          hoverLine.value = null
          line.setOptions({
            color: '#fed666',
            dropShadow: {color: '#fed666', dx: 0, dy: 0}
          })
        })
        line.Props.svg.addEventListener('dblclick', () => {
          state.showEditRelationship = true
        })
      }
    }

    let nodeMounted = (node: ITableNode) => {
      for (let tableLine of lines) {
        if (tableLine.from == node && tableLine.to.component) {
          initLine(tableLine)
        }
        if (tableLine.to == node && tableLine.from.component) {
          initLine(tableLine)
        }
      }
    }
    let removeNode = () => {
      console.log('removeNode')
    }

    return {
      i18n,
      resizeData,
      nodes,
      removeNode,
      nodeMounted,
      state,
      panelRef,
      hoverLine,
      computedNodes
    }
  }
})
</script>

<style lang="less">
.c-relationship-panel {
  width: 100%;
  height: 100%;
  overflow: overlay;
  > div {
    width: 10000px;
    height: 10000px;
    > svg {
      cursor: pointer;
    }
  }
}
</style>
