<template>
  <div class="home">
    <Container msg="Welcome to Your Vue.js App">
      <template v-slot:main>
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body"></div>
        </div>
      </template>
    </Container>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue'

export default {
  name: 'HomeView',
  components: {
    Container
  }
}
</script>
