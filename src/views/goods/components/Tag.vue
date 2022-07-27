<template>
  <div>
    <div :class="[tagNameClass, activedClass, searchedClass]"
      @click.stop="handleSelectTag(tag)">
      {{ tag.name }}
    </div>

    <template v-if="tag.children && tag.children.length">
      <div flex flex-wrap>
        <div flex-shrink-0 v-for="item of tag.children" :key="item.id" :tag="item">
          <Tag :tag="item" :selectedTags="selectedTags" :searchedTags="searchedTags" @select="select"></Tag>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { TagItem } from '../types'

interface Props {
  tag: TagItem,
  selectedTags: TagItem[]
  searchedTags: TagItem[]
}

const props = withDefaults(defineProps<Props>(), {
  tag: () => ({ id: -1, name: '' }),
  selectedTags: () => ([]),
  searchedTags: () => ([])
})

const emit = defineEmits(['select', 'selectTag'])

const tagNameClass = computed(() => {
  const tagClass = 'text-4 py-1 px-6 b-1 b-gray-100 bg-gray-100 b-rd-1 mr-3 mb-3 text-gray-400 '
  return props.tag.children ? 'text-4 font-600 p-2' : tagClass
})
const activedClass = computed(() => {
  return isActivedTag(props.tag) ? 'text-white bg-sky b-color-sky' : ''
})
const searchedClass = computed(() => {
  return isSearchedTag(props.tag) ? 'b-sky text-sky' : ''
})

const isActivedTag = (tag: TagItem) => {
  return props.selectedTags.find(i => i.id === tag.id)
}

const isSearchedTag = (tag: TagItem) => {
  return props.searchedTags.find(i => i.id === tag.id)
}

const handleSelectTag = (tag: TagItem) => {
  if (tag.children) {
    return
  }

  let selectedTags: TagItem[] = []
  if (isActivedTag(tag)) {
    selectedTags = [...props.selectedTags.filter(i => i.id !== tag.id)]
  } else {
    selectedTags = [...props.selectedTags, tag]
  }

  emit('select', selectedTags)
}

const select = (tags: TagItem[]) => {
  emit('selectTag', tags)
}
</script>

<style scoped>
</style>