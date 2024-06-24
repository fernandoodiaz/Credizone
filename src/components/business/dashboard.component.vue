<script>
import {calcula_cuota} from "@/services/finance/finance.service.js";
import paymentsCalendarComponent from "@/components/users/credits/payments.calendar.component.vue";
export default {
  components: {paymentsCalendarComponent},
  name: 'Dashboard Compañías',
  props: {
    account: {
      required: true,
      type: Object,
    },
    credits: null,
  },
  methods: {
    calcula_cuota: calcula_cuota,
    openSupportPage(){
      window.open("https://web.whatsapp.com/send?phone=51933284911", '_blank');
    },
  },
  data(){
    return {
      selectedCredit: null,
    }
  }
};
</script>
<template>
  <div class="dashboard">
    <h1>Credizone Business Dashboard</h1>
    <h4>Bienvenido, {{account.nombre}}</h4>
    <p>Ha concedido créditos por el valor de S/ {{account.credit}}</p>
    <h3>Créditos aprobados:</h3>
    <div v-if="credits">
      <div class="credit-container">
        <Divider/>
        <div class="credit">
          <Divider layout="vertical"/>
          <div class="credit-part">Nombre de la Compañía</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Nombre del Usuario</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Monto del Préstamo</div>
          <Divider layout="vertical"/>
          <div class="credit-part">Ver pagos pendientes</div>
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
              {{credit.nombre_usuario}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              S/. {{credit.monto}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              <Button label="Ver pagos pendientes" @click="selectedCredit = credit"/>
            </div>
            <Divider layout="vertical"/>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  </div>
  <paymentsCalendarComponent
      :mensual-quote="calcula_cuota(selectedCredit.tasaInteres, selectedCredit.tipoInteres, selectedCredit.montoOriginal, selectedCredit.cuotas, 0)"
      :cuotas="selectedCredit.cuotas - selectedCredit.cuotasPagadas"
      @close="selectedCredit = false"
      v-if="selectedCredit"
  />
  <div class="fly-right" @click="openSupportPage">
    <img src="/support.png" height="50">
    <div>Soporte Tecnico</div>
  </div>
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