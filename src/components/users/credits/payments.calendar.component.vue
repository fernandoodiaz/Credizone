<script>
export default {
  name: "payments.component.vue",
  props: {
    mensualQuote: {
      required: true,
      type: Number
    },
    cuotas: {
      required: true,
      type: Number
    }
  },
  methods: {
    addMonths(numOfMonths) {
      let fecha = new Date();
      fecha.setMonth(fecha.getMonth() + numOfMonths);
      return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
    }
  }
}
</script>

<template>
  <div class="overlay" @click="this.$emit('close')"/>
  <div class="money-over">
    <h3>Calendario de pagos</h3>
    <table>
      <tr>
        <td><h4>Fecha</h4></td>
        <td><h4>Pago</h4></td>
      </tr>
      <tr v-for="quote in cuotas">
        <td>{{addMonths(quote)}}</td>
        <td>{{ this.mensualQuote.toFixed(2) }}</td>
      </tr>
    </table>
    <Button label="Volver" @click="this.$emit('close')"/>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 52; /* Asegúrate de que esté por encima de otros elementos */
}
td{
  text-align: center;
  padding: 0 0.5rem;
}
.money-over {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;

  background-color: white;
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 53; /* Asegúrate de que esté por encima del fondo */
}
</style>