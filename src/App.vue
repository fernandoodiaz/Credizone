<script>
import { RouterLink, RouterView } from 'vue-router'
import {tiposInteres} from "@/services/finance/finance.service.js";
export default {
  components: { RouterLink, RouterView },
  data(){
    return{
      logged_entity: null,
      credits: null,
    }
  },
  methods:{
    checkAndAddDefaultUsers() {
      let forceOverwrite = true
      let users = JSON.parse(localStorage.getItem('users'));
      let business = JSON.parse(localStorage.getItem('business'));
      let credits = JSON.parse(localStorage.getItem('credits'))
      if (!users || users.length < 3 || forceOverwrite) {
        users = [
          {
            id: 1,
            nombre: 'admin',
            Contrasena: 'admin',
            edad: 40,
            dni: '12345678',
            correo: 'admin@empresa.com',
            celular: '123456789',
            estado_usuario: true,
          },
          {
            id: 2,
            nombre: 'fernando',
            Contrasena: 'diaz',
            edad: 25,
            dni: '87654321',
            correo: 'f.diaz@gmail.com',
            celular: '0987654321',
            estado_usuario: true,
          },
          {
            id: 3,
            nombre: 'maria',
            Contrasena: 'maria456',
            edad: 30,
            dni: '11223344',
            correo: 'maria.garcia@hotmail.com',
            celular: '1122334455',
            estado_usuario: true,
          }
        ];
        localStorage.setItem('users', JSON.stringify(users));
      }
      if (!business || business.length < 3 || forceOverwrite) {
        business = [
          {
            id: 1,
            nombre: 'root',
            Contrasena: 'root',
            Fecha_creacion: new Date().toISOString(),
            estado_usuario: true,
            ruc: '12345678901',
            correo: 'root@empresa.com',
            celular: '123456789',
            tasaInteres: 0.2,
            tipoInteres: tiposInteres[0],
          },
          {
            id: 2,
            nombre: 'tarket',
            Contrasena: 'tarket',
            Fecha_creacion: new Date().toISOString(),
            estado_usuario: true,
            ruc: '10987654321',
            correo: 'carlos.perez@gmail.com',
            celular: '0987654321',
            tasaInteres: 0.16,
            tipoInteres: tiposInteres[1],
          },
          {
            id: 3,
            nombre: 'huacariz',
            Contrasena: 'huacariz',
            Fecha_creacion: new Date().toISOString(),
            estado_usuario: true,
            ruc: '11223344556',
            correo: 'maria.garcia@hotmail.com',
            celular: '1122334455',
            tasaInteres: 0.4,
            tipoInteres: tiposInteres[2],
          }
        ]
        localStorage.setItem('business', JSON.stringify(business));
      }
      if (!credits || credits.length < 5 || forceOverwrite){
        credits = [
          {
            nombre_empresa: business[0].nombre,
            id_empresa: business[0].id,
            nombre_usuario: users[0].nombre,
            id_usuario: users[0].id,
            monto: 1000.00,
            montoOriginal: 1000.00,
            fecha: Date.now(),
            cuotas: 3,
            cuotasPagadas: 0,
            tipoInteres: business[0].tipoInteres,
            tasaInteres: business[0].tasaInteres,
          },
          {
            nombre_empresa: business[1].nombre,
            id_empresa: business[1].id,
            nombre_usuario: users[0].nombre,
            id_usuario: users[0].id,
            monto: 455.90,
            montoOriginal: 455.90,
            fecha: Date.now(),
            cuotas: 6,
            cuotasPagadas: 0,
            tipoInteres:  business[1].tipoInteres,
            tasaInteres: business[1].tasaInteres,
          },
          {
            nombre_empresa: business[2].nombre,
            id_empresa: business[2].id,
            nombre_usuario: users[1].nombre,
            id_usuario: users[1].id,
            monto: 390.00,
            montoOriginal: 390.00,
            fecha: Date.now(),
            cuotas: 12,
            cuotasPagadas: 0,
            tipoInteres:  business[2].tipoInteres,
            tasaInteres: business[2].tasaInteres,
          },
          {
            nombre_empresa: business[2].nombre,
            id_empresa: business[2].id,
            nombre_usuario: users[2].nombre,
            id_usuario: users[2].id,
            monto: 500.00,
            montoOriginal: 500.00,
            fecha: Date.now(),
            cuotas: 12,
            cuotasPagadas: 0,
            tipoInteres:  business[2].tipoInteres,
            tasaInteres: business[2].tasaInteres,
          },
          {
            nombre_empresa: business[1].nombre,
            id_empresa: business[1].id,
            nombre_usuario: users[1].nombre,
            id_usuario: users[1].id,
            monto: 850.00,
            montoOriginal: 850.00,
            fecha: Date.now(),
            cuotas: 12,
            cuotasPagadas: 0,
            tasaInteres: business[1].tasaInteres,
            tipoInteres: business[1].tipoInteres,
          }
        ]
        localStorage.setItem('credits', JSON.stringify(credits));
      }
    },
    userLogged(user){
      //alert(usuario)
      this.logged_entity = user
      const credits = JSON.parse(localStorage.getItem('credits')) || [];
      this.credits = credits.filter(credit => credit.id_usuario === user.id);
      this.logged_entity.credit = 0
      for (let i = 0; i < this.credits.length; i++) {
        this.logged_entity.credit += this.credits[i].monto;
        console.log(this.credits[i].monto)
      }
      this.$router.push("/users/dashboard")
    },
    businessLogged(business){
      this.logged_entity = business
      const credits = JSON.parse(localStorage.getItem('credits')) || [];
      this.credits = credits.filter(credit => credit.id_empresa === business.id);
      this.logged_entity.credit = 0
      for (let i = 0; i < this.credits.length; i++) {
        this.logged_entity.credit += this.credits[i].monto;
      }
      this.$router.push("/business/dashboard")
    },
    generateCreditFromUser(monto, usuario, negocio, cuotas, tasaInteres, tipoInteres) {
      let credits = JSON.parse(localStorage.getItem('credits')) || [];
      const newCredit = {
        nombre_empresa: negocio.nombre,
        id_empresa: negocio.id,
        nombre_usuario: usuario.nombre,
        id_usuario: usuario.id,
        monto: monto,
        montoOriginal: monto,
        fecha: Date.now(),
        cuotas: cuotas,
        cuotasPagadas: 0,
        tasaInteres: tasaInteres,
        tipoInteres: tipoInteres,
      };
      credits.push(newCredit);
      localStorage.setItem('credits', JSON.stringify(credits));
      this.userLogged(usuario)
    },
    payCredit(toBePaid){
      let credits = JSON.parse(localStorage.getItem('credits')) || [];
      let index = credits.findIndex(credit =>
          credit.id_usuario === toBePaid.id_usuario &&
          credit.id_empresa === toBePaid.id_empresa &&
          credit.fecha === toBePaid.fecha
      );
      if(index === -1) {
        alert("Ocurrio un error extraño al tratar de pagar el credito. " +
            "Prueba iniciar sesión nuevamente y volver a intentarlo");
        return
      }
      credits[index].cuotasPagadas = (toBePaid.cuotasPagadas || 0) + 1;
      //Si ya se pagaron todos los creditos, sacalo
      if(credits[index].cuotasPagadas === credits[index].cuotas)
        credits.splice(index, 1);
      localStorage.setItem('credits', JSON.stringify(credits));
      alert("Pago realizado con éxito")
      if(this.logged_entity.dni)
        this.userLogged(this.logged_entity)
      else
        this.businessLogged(this.logged_entity)
    },
    logOut(){
      this.logged_entity = null;
      this.$router.push('/type-selection')
      localStorage.removeItem("logged_entity")
    },
  },
  created() {
    this.checkAndAddDefaultUsers();
    this.logged_entity = JSON.parse(localStorage.getItem('logged_entity')) || null;
    if(this.logged_entity === null){
      this.$router.push("/type-selection")
    }
    else if(this.logged_entity.dni) this.userLogged(this.logged_entity);
    else this.businessLogged(this.logged_entity);
  }
}
</script>

<template>
  <header>
    <img src="/logo.jpg" style="height: 100%">
    <h1>Credizone</h1>
    <div class="navbar-separator" v-if="logged_entity"/>
    <Button v-if="logged_entity" @click="logOut">Cerrar Sesión</Button>
  </header>
  <main>
    <RouterView
        @userLogged="userLogged"
        @businessLogged="businessLogged"
        @generateCreditFromUser="generateCreditFromUser"
        @payCredit="payCredit"
        :account="logged_entity"
        :credits="credits"
    />
  </main>
  <footer>
    <div class="flex-row">
       ©CrediZone 2024 - Todos los derechos reservados
    </div>
  </footer>
</template>

<style>
.navbar-separator{
  margin:auto;
}
h1, h2, h3, h4, h5, h6, p, body{
  margin: 0;
  padding: 0;
  border: 0;
}
footer, header{
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  height: 8rem;
  background-color: #031a33;
  color: white;
  gap: 2rem;
  padding: 0 3rem;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin: auto;
  min-height: calc(100vh - 8rem);
}
.flex-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  gap: 0.1rem;
  width: 100%;
}
</style>