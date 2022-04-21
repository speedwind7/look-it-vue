<template>
  <div class="flex justify-center content-center w-full h-full">
    <video
      v-bind:src="videoPath"
      controls="controls"
    />
  </div>
</template>

<script>
export default {
  name: 'PlayVideo',
  props: {
    videoPath: String
  }
}
</script>

<style>

</style>
