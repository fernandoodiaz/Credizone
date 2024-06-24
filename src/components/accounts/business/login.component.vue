<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

export default {
  name: 'Login',
  components: {
    InputText,
    Password,
    Button,
  },
  data() {
    return {
      nombre: '',
      contrasena: '',
      invalid: false,
    };
  },
  methods: {
    login() {
      try {
        const users = JSON.parse(localStorage.getItem('business')) || [];
        const negocioEncontrado = users.find(
            user =>
                user.nombre === this.nombre &&
                user.Contrasena === this.contrasena
        );

        if (negocioEncontrado) {
          this.invalid = false;
          localStorage.setItem('logged_entity', JSON.stringify(negocioEncontrado))
          this.$emit('businessLogged',negocioEncontrado)
        } else {
          this.invalid = true;
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.invalid = true;
      }
    }
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="login">
      <h1>Login Compañías</h1>
      <InputText v-model="nombre" placeholder="Usuario" :invalid="invalid"/>
      <Password v-model="contrasena" placeholder="Contraseña" :invalid="invalid"/>
      <small v-if="invalid" style="color: red;">Usuario o contraseña incorrectos</small>
      <Button type="submit" label="Iniciar Sesión"/>
      <p @click="$router.push('/business/register')" class="text-button">¿No tienes una cuenta?</p>
      <p @click="$router.push('/users/login')" class="text-button">¿Eres un usuario?</p>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>