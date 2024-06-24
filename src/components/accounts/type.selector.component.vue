<script>
export default {
  name: "type.selector.component.vue"
}
</script>

<template>
  <h2>
    ¡Bienvenido a Credizone!
  </h2>
  <p>Para empezar, selecciona que usuario eres</p>
  <div class="separator"/>
  <div class="max-width">
    <Button label="Soy un usuario" @click="this.$router.push('/users/login')"/>
    <Button label="Soy una compañia" @click="this.$router.push('/business/login')"/>
  </div>
</template>

<style scoped>
.max-width{
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 1rem;
}
.separator{
  height: 1rem;
}
</style>