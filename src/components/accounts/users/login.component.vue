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
      nombre_administrador: '',
      contrasenna: '',
      invalid: false,
    };
  },
  methods: {
    login() {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usuarioEncontrado = users.find(
            user =>
                user.nombre === this.nombre_administrador &&
                user.Contrasena === this.contrasenna
        );

        if (usuarioEncontrado) {
          this.invalid = false;
          localStorage.setItem('logged_entity', JSON.stringify(usuarioEncontrado))
          this.$emit('userLogged',usuarioEncontrado)
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
      <h1>Login Usuarios</h1>
      <InputText v-model="nombre_administrador" placeholder="Usuario" :invalid="invalid"/>
      <Password v-model="contrasenna" placeholder="Contraseña" :invalid="invalid"/>
      <small v-if="invalid" style="color: red;">Usuario o contraseña incorrectos</small>
      <Button type="submit" label="Iniciar Sesión"/>
      <p @click="$router.push('/users/register')" class="text-button">¿No tienes una cuenta?</p>
      <p @click="$router.push('/business/login')" class="text-button">¿Eres una compañía?</p>
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