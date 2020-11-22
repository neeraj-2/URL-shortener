<template>
 <div>
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Shortly</a>
    </nav>
    <div class="container">
      <home />
    </div>
  </div>
</template>

<script>
import Home from './components/Home'
export default {
  name:"App",
  components:{
    Home
  }
  
}
</script>

<style scoped>

</style>