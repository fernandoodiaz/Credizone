<script>
export default {
  name: 'Dashboard Compañías',
  props: {
    account: {
      required: true,
      type: Object,
    },
    credits: null,
  },
  data() {
    return {

    };
  },
};
</script>
<template>
  <div class="dashboard">
    <h1>Credizone Business Dashboard</h1>
    <div class="">
      <h4>Bienvenido, {{account.nombre}}</h4>
      <p>Ha concedido créditos por el valor de S/ {{account.credit}}</p>
      <div class="actions">
        <Button>Revisar Solicitudes de Créditos</Button>
        <Button>Ver créditos actuales</Button>
      </div>
    </div>
    <div v-if="credits">
      <h3>Créditos aprobados:</h3>
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
          </div>
          <Divider />
        </div>
      </div>
    </div>
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