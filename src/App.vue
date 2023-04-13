<template>
  <div id="app">
    <router-view ></router-view>
    
  </div>
</template>

<script>


export default { 
  name: 'App'
}
</script>


<style>
*{
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #d1d1eb;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
</style>
