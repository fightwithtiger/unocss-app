<template>
  <div w-full h-full flex justify-center items-center box-border p-2>
    <div i-carbon-search color-gray></div>
    <input block w-full h-full bg-gray-100 text-4 type="text" placeholder="请输入搜索标签" :value="modelValue" @keyup.enter="handleInput" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string
}

withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e: any) => {
  emit('update:modelValue', e.target.value)
}

</script>

<style scoped>
</style>