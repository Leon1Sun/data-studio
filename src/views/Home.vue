<template>
  <div class="home">
    <DrawBoard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DrawBoard from '@/components/draw-board'; // @ is an alias to /src

@Component({
  components: {
    DrawBoard,
  },
})
export default class Home extends Vue {

}
</script>
