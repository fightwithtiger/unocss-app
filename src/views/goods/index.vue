<template>
  <div w-full h-screen bg-gray-100 relative p-t-11>
    <div bg-gray-100 absolute top-0 left-0 w-full h-10>
      <Header v-model="input"></Header>
    </div>
    <div bg-white>
      <TagGroup :tags="tags" :selectedTags="selectedTags" :input="input" @selectTag="selectTag"></TagGroup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TagItem } from './types'
import Header from './components/Header.vue'
import TagGroup from './components/TagGroup.vue'

const input = ref('')

const tagsRaw = [
  {
    id: 1,
    name: '美食',
    children: [
      {
        id: 11,
        name: '火锅'
      },
      {
        id: 12,
        name: '麻辣烫'
      },
      {
        id: 13,
        name: '中餐'
      },
      {
        id: 14,
        name: '钵钵鸡'
      }
    ]
  },
  {
    id: 2,
    name: '运动',
    children: [
      {
        id: 21,
        name: '篮球'
      },
      {
        id: 22,
        name: '乒乓球'
      }
    ]
  },
  {
    id: 3,
    name: '科技',
    children: [
      {
        id: 31,
        name: '手机'
      },
      {
        id: 32,
        name: '电脑'
      }
    ]
  }
]
const tags = ref<TagItem[]>([...tagsRaw])
const selectedTags = ref<TagItem[]>([])

const selectTag = (selected: TagItem[]) => {
  selectedTags.value = [...selected]
}

</script>

<style scoped>
</style>