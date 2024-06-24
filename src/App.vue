<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
  components: { RouterLink, RouterView },
  data(){
    return{
      logged_entity: null,
      credits: null
    }
  },
  methods:{
    checkAndAddDefaultUsers() {
      let forceOverwrite = false

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
          }
        ]
        localStorage.setItem('business', JSON.stringify(business));
      }
      if (!credits || credits.length < 5 || forceOverwrite){
        credits = [
          {
            business_name: "root",
            business_id: 1,
            user_name: "admin",
            user_id: 1,
            amount: 1000.00,
            date: Date.now()
          },
          {
            business_name: "Tarket",
            business_id: 2,
            user_name: "admin",
            user_id: 1,
            amount: 455.90,
            date: Date.now()
          },
          {
            business_name: "huacariz",
            business_id: 3,
            user_name: "fernando",
            user_id: 2,
            amount: 390.00,
            date: Date.now()
          },
          {
            business_name: "huacariz",
            business_id: 3,
            user_name: "maria",
            user_id: 3,
            amount: 500.00,
            date: Date.now()
          },
          {
            business_name: "Tarket",
            business_id: 2,
            user_name: "fernando",
            user_id: 2,
            amount: 850.00,
            date: Date.now()
          }
        ]
        localStorage.setItem('credits', JSON.stringify(credits));
      }
    },
    userLogged(user){
      //alert(usuario)
      this.logged_entity = user
      const credits = JSON.parse(localStorage.getItem('credits')) || [];
      this.credits = credits.filter(credit => credit.user_id === user.id);
      this.logged_entity.credit = 0
      for (let i = 0; i < this.credits.length; i++) {
        this.logged_entity.credit += this.credits[i].amount;
        console.log(this.credits[i].amount)
      }
      this.$router.push("/users/dashboard")
    },
    businessLogged(business){
      this.logged_entity = business
      const credits = JSON.parse(localStorage.getItem('credits')) || [];
      this.credits = credits.filter(credit => credit.business_id === business.id);
      this.logged_entity.credit = 0
      for (let i = 0; i < this.credits.length; i++) {
        this.logged_entity.credit += this.credits[i].amount;
      }
      this.$router.push("/business/dashboard")
    },
    generateCreditFromUser(amount, user, business) {
      let credits = JSON.parse(localStorage.getItem('credits')) || [];
      const newCredit = {
        business_name: business.nombre,
        business_id: business.id,
        user_name: user.nombre,
        user_id: user.id,
        amount: amount,
        date: Date.now(),
      };
      credits.push(newCredit);
      console.log(newCredit)
      localStorage.setItem('credits', JSON.stringify(credits));
      this.userLogged(user)
    },
    logOut(){
      this.logged_entity = null;
      this.$router.push('/type-selection')
      localStorage.removeItem("logged_entity")
    }
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
        :account="logged_entity"
        :credits="credits"
    />
  </main>
  <footer>
    ©copyright CrediZone 2024
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
</style>