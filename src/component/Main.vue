<template>
  <div>
      {{ bonjor }}
      <v-btn dark>
          Click
      </v-btn>
  </div>
</template>

<script>
export default {
    name: "Main",

    data() {
        return {
            bonjor: 'I\'m a Main component',
        }
    },
}
</script>

<style>
</style>