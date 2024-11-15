<template>
  <div>
    <div class="user-info-head" ><img v-bind:src="options.img" title="点击上传头像" class="img-circle img-lg" /></div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      options: {
        img: store.getters.avatar
      }
    };
  },
  methods: {
  }
};
</script>
<style scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}
</style>
