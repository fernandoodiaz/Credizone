<script>
export default {
  name: "credits.component.vue",
  props: {
    user: {
      required: true,
      type: Object,
    }
  },
  methods: {
    generateCreditFromUser() {
      if (this.selectedBusiness && this.amount > 0) {
        this.$emit('generateCreditFromUser', this.amount, this.user, this.selectedBusiness)
      } else {
        alert("Por favor, seleccione una empresa e ingrese un monto válido.");
      }
    }
  },
  data() {
    return {
      business: JSON.parse(localStorage.getItem('business')) || [],
      selectedBusiness: null,
      amount: 0,
    }
  }
}
</script>

<template>
  <div class="overlay" @click="this.$emit('close')"/>
  <div class="credit-generator">
    <h2>Solicitud de Crédito</h2>
    <p>Cliente: {{ user.nombre }}</p>
    <Dropdown v-model="selectedBusiness" :options="business" optionLabel="nombre" placeholder="Seleccione una empresa" />
    <InputNumber v-model="amount" placeholder="Ingrese el monto" :useGrouping="false" :minFractionDigits="2" :maxFractionDigits="2"/>
    <Button label="Registrar Préstamo" @click="generateCreditFromUser"/>
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
  z-index: 999; /* Asegúrate de que esté por encima de otros elementos */
}

.credit-generator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  background-color: white;
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 1000; /* Asegúrate de que esté por encima del fondo */
}
</style>