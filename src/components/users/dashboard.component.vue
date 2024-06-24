<script>
import {calcula_cuota} from "@/services/finance/finance.service.js";
import creditsComponent from "@/components/users/credits/credits.component.vue";
import paymentsCalendarComponent from "@/components/users/credits/payments.calendar.component.vue";
export default {
  name: 'Dashboard Clientes',
  components: {creditsComponent, paymentsCalendarComponent},
  props: {
    account: {
      required: true,
      type: Object,
    },
    credits: {
      required: false,
      type: Array,
    }
  },
  methods: {
    calcula_cuota: calcula_cuota,
    openSupportPage(){
      window.open("https://web.whatsapp.com/send?phone=51933284911", '_blank');
    },
    returnWeekDay(day){
      console.log(day)
      switch (day) {
        case 1: return 'Lunes';
        case 2: return 'Martes';
        case 3: return 'Miércoles';
        case 4: return 'Jueves';
        case 5: return 'Viernes';
        case 6: return 'Sábado';
        case 0: return 'Domingo';
        default: return 'Día no válido';
      }

    },
    generateCreditFromUser(monto, usuario, negocio, cuotas, tasaInteres, tipoInteres){
      this.createNewCredit = false;
      this.$emit('generateCreditFromUser', monto, usuario, negocio, cuotas, tasaInteres, tipoInteres)
    },
    formatTimestamp(timestamp) {
      const fecha = new Date(timestamp);
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, '0');
      const day = String(fecha.getDate()).padStart(2, '0');
      const weekday = this.returnWeekDay(fecha.getDay());
      //const hours = String(fecha.getHours()).padStart(2, '0');
      //const minutes = String(fecha.getMinutes()).padStart(2, '0');
      //const seconds = String(fecha.getSeconds()).padStart(2, '0');
      return `${weekday}, ${day}/${month}/${year}`; // - ${hours}:${minutes}:${seconds}
    },
    ellaYaNoMeAmaPeroConseguireAOtra(credit){
      this.$emit('payCredit', credit)
    }
  },
  data() {
    return {
      createNewCredit: false,
      selectedCredit: false,
    };
  },
};
</script>
<template>
  <div class="dashboard">
    <h1>Credizone Clients Dashboard</h1>
    <h4>Bienvenido, {{account.nombre}}</h4>
    <p>Su crédito actual es de S/ {{account.credit}}</p>
    <div class="actions">
      <Button @click="createNewCredit = true">Solicitar nuevo crédito</Button>
    </div>
    <div v-if="credits" class="credit-dashboard">
      <h3 align="center">Créditos solicitados:</h3>
      <div class="credit-container">
        <Divider/>
        <div class="credit">
          <Divider layout="vertical"/>
          <div class="credit-part">Nombre de la Compañía</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Monto del Préstamo</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Fecha del Préstamo</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Ver calendario de pagos</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Pagar una cuota</div>
          <Divider layout="vertical"/>
        </div>
        <Divider/>
        <div v-for="credit in credits" :key="credit.id">
          <div  class="credit">
            <Divider layout="vertical"/>
            <div class="credit-part">
              {{credit.nombre_empresa}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              S/. {{credit.monto}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              {{formatTimestamp(credit.fecha)}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              <Button label="Ver pagos pendientes" @click="selectedCredit = credit"/>
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              <Button label="Realizar un pago" @click="ellaYaNoMeAmaPeroConseguireAOtra(credit)"/>
            </div>
            <Divider layout="vertical"/>
          </div>
          <Divider/>
        </div>
      </div>
    </div>
  </div>
  <div class="fly-right" @click="openSupportPage">
    <img src="/support.png" height="50">
    <div>Soporte Tecnico</div>
  </div>
  <paymentsCalendarComponent
      :mensual-quote="calcula_cuota(selectedCredit.tasaInteres, selectedCredit.tipoInteres, selectedCredit.montoOriginal, selectedCredit.cuotas, 0)"
      :cuotas="selectedCredit.cuotas - selectedCredit.cuotasPagadas"
      @close="selectedCredit = false"
      v-if="selectedCredit"
  />
  <creditsComponent :user="account" @generateCreditFromUser="generateCreditFromUser" @close="this.createNewCredit = false" v-if="createNewCredit"/>
</template>
<style scoped>
.tabs button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.dashboard{
  width: 92%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.credit-dashboard{
  width: 80%;
}
.actions{
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  gap: 0.5rem;
}
.credit-container{
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
}
.credit{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}
.credit-part{
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem;
}
.p-divider{
  margin: 0;
}
.p-divider-horizontal{
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  width: auto;
}
.p-divider-vertical{
  margin-left: 0;
  margin-right: 0;
  width: 2rem;
}
.fly-right{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
}
</style>