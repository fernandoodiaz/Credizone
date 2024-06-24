<script>
import {calcula_cuota, tiposInteres} from "@/services/finance/finance.service.js";
import paymentsCalendarComponent from "@/components/users/credits/payments.calendar.component.vue";
export default {
  name: "credits.component.vue",
  components: {paymentsCalendarComponent},
  props: {
    user: {
      required: true,
      type: Object,
    }
  },
  methods: {
    generateCreditFromUser() {
      if (this.selectedBusiness && this.monto > 0 && this.cuotas) {
        this.$emit('generateCreditFromUser', this.monto, this.user, this.selectedBusiness, this.cuotas, this.selectedBusiness.tasaInteres, this.selectedBusiness.tipoInteres)
      } else {
        alert("Por favor, seleccione una empresa e ingrese un monto válido.");
      }
    },
    recalcMensualQuote(){
      if (this.monto > 0 && this.cuotas !== null && this.selectedBusiness!==null) {
        this.processedMensualQuote = calcula_cuota(this.selectedBusiness.tasaInteres, this.selectedBusiness.tipoInteres, this.monto, this.cuotas, 0)
      }
    },
    addMonths(numOfMonths) {
      let fecha = new Date();
      fecha.setMonth(fecha.getMonth() + numOfMonths);
      return `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`
    }
  },
  data() {
    return {
      business: JSON.parse(localStorage.getItem('business')) || [],
      selectedBusiness: null,
      monto: null,
      possibleCreditcuotas: [1,2,3,6,12,24],
      cuotas: null,
      processedMensualQuote: null,
      showPaymentsCalendar: false,
      tiposInteres: tiposInteres,

      tipoInteres: null,
      tasaInteres: null,
    }
  },
  watch: {
    monto(newValue, oldValue) {
      this.recalcMensualQuote()
    },
    cuotas(newValue, oldValue) {
      this.recalcMensualQuote()
    },
    selectedBusiness: {
      handler(newValue, oldValue){
        this.recalcMensualQuote()
        this.tipoInteres = newValue.tipoInteres;
        this.tasaInteres = newValue.tasaInteres;
      },
      deep: true
    },
  },
}
</script>

<template>
  <div class="overlay" @click="this.$emit('close')"/>
  <div class="credit-generator">
    <h2>Solicitud de Crédito</h2>
    <p>Cliente: {{ user.nombre }}</p>
    <Dropdown v-model="selectedBusiness" :options="business" optionLabel="nombre" placeholder="Seleccione una empresa"/>

    <InputText v-model="tipoInteres" disabled/>
    <InputNumber v-model="tasaInteres" :useGrouping="false" suffix="%" disabled/>

    <InputNumber v-model="monto" placeholder="Ingrese el monto" :max-fraction-digits="2" :min-fraction-digits="2" prefix="S/ "/>
    <div v-tooltip="'Las cuotas se pagan en periodos mensuales'" type="text" class="p-dropdown">
      <Dropdown v-model="cuotas" :options="possibleCreditcuotas" placeholder="Elija la cantidad de cuotas"/>
    </div>
    <Button label="Mostrar calendario de pagos" @click="showPaymentsCalendar = true" v-if="this.processedMensualQuote"/>
    <Button label="Registrar Préstamo" @click="generateCreditFromUser"/>
  </div>



  <paymentsCalendarComponent :mensual-quote="processedMensualQuote" :cuotas="cuotas" @close="this.showPaymentsCalendar = false" v-if="showPaymentsCalendar"/>
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
  z-index: 50; /* Asegúrate de que esté por encima de otros elementos */
}
td{
  text-align: center;
  padding: 0 0.5rem;
}
.credit-generator {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;

  background-color: white;
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 51; /* Asegúrate de que esté por encima del fondo */
}
.black-over{
  z-index: 52;
}
.money-over{
  width: auto;
  z-index: 53;
}
.credit-generator .p-dropdown,
.credit-generator .p-inputnumber,
.credit-generator .p-inputtext {
  width: 100%;
}
</style>