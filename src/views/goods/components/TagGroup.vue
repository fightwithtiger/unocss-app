<template>
  <div px-2>
    <div v-for="tag of tags" :key="tag.id">
      <Tag :tag="tag" :selectedTags="selectedTags" :input="input" :searchedTags="searchedTags" @selectTag="selectTag"></Tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TagItem } from '../types'
import Tag from './Tag.vue'

interface Props {
  tags: TagItem[]
  selectedTags: TagItem[]
  input: string
}
const props = withDefaults(defineProps<Props>(), {
  tags: () => ([]),
  selectedTags: () => ([]),
  input: ''
})

const emit = defineEmits(['selectTag'])

const searchedTags = ref<TagItem[]>([])

watch(() => props.input, (val) => {
  handleSearchedTags(val.trim())
})

const selectTag = (tags: TagItem[]) => {
  emit('selectTag', tags)
}

const handleSearchedTags = (value: string) => {
  if(!value) {
    searchedTags.value = []
    return
  }

  const all = []
  for(let item of props.tags) {
    if(item.name.includes(value) && item.children) {
      all.push(...item.children)
      continue
    }

    if(item.children) {
      for(let tag of item.children) {
        if(tag.name.includes(value)) {
          all.push(tag)
        }
      }
    }
  }

  searchedTags.value = [...all]
}

</script>

<style scoped>
</style>