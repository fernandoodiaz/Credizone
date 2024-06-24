<script>
import creditsComponent from "@/components/users/credits/credits.component.vue";

export default {
  name: 'Dashboard Clientes',
  components: {creditsComponent},
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
    generateCreditFromUser(a,b,c){
      this.createNewCredit = false;
      this.$emit('generateCreditFromUser',a,b,c)
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }
  },
  data() {
    return {
      createNewCredit: false
    };
  },
};
</script>
<template>
  <div class="dashboard">
    <h1>Credizone Clients Dashboard</h1>
    <div class="">
      <h4>Bienvenido, {{account.nombre}}</h4>
      <p>Su crédito actual es de S/ {{account.credit}}</p>
      <div class="actions">
        <Button>Realizar un pago</Button>
        <Button @click="createNewCredit = true">Solicitar créditos</Button>
      </div>
    </div>
    <div v-if="credits">
      <h3>Créditos solicitados:</h3>
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
          <div class="credit-part">Fecha del Préstamo</div>
          <Divider layout="vertical"/>
        </div>
        <Divider/>
        <div v-for="credit in credits" :key="credit.id">
          <div  class="credit">
            <Divider layout="vertical"/>
            <div class="credit-part">
              {{credit.business_name}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              {{credit.user_name}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              S/. {{credit.amount}}
            </div>
            <Divider layout="vertical"/>
            <div class="credit-part">
              {{formatTimestamp(credit.date)}}
            </div>
            <Divider layout="vertical"/>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  </div>
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
  width: 92%
}
.actions{
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  gap: 0.5rem;
}
.credit-container{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 0.5rem;
  gap: 0.5rem;
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
}
.p-divider{
  margin: 0;
}
.p-divider-horizontal{
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: auto;
}
.p-divider-vertical{
  margin-left: 0;
  margin-right: 0;
  width: 2rem;
}
</style>