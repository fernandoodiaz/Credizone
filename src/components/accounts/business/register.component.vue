<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

export default {
  name: 'RegisterUser',
  components: {
    InputText,
    InputNumber,
    Button,
  },
  data() {
    return {
      nombre: '',
      Contrasena: '',
      ruc: '',
      correo: '',
      celular: '',
      estado_negocio: true,
    };
  },
  methods: {
    registerUser() {
      try {
        // Obtener usuarios existentes desde localStorage
        let business = JSON.parse(localStorage.getItem('business')) || [];

        // Obtener el ID más alto y asignar un nuevo ID
        const maxId = business.reduce((max, user) => Math.max(max, user.id), 0);
        const business_id = maxId + 1;

        // Crear un nuevo usuario
        const newUser = {
          id: business_id,
          nombre: this.nombre,
          Contrasena: this.Contrasena,
          Fecha_creacion: new Date().toISOString(),
          estado_usuario: this.estado_negocio,
          ruc: this.ruc,
          correo: this.correo,
          celular: this.celular,
          credit: 0.0,
        };

        // Añadir el nuevo usuario a la lista de usuarios
        business.push(newUser);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('business', JSON.stringify(business));
        alert('Compañía registrada con éxito');
        this.$router.push("/business/login")
      } catch (error) {
        console.error('Error registrando compañía:', error);
        alert('Hubo un error al registrar la compañía.');
      }
    }
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="registerUser">
      <h1>Registro de Compañías</h1>
      <InputText v-model="nombre" placeholder="Nombre"></InputText>
      <InputText v-model="Contrasena" placeholder="Contraseña"></InputText>
      <InputText v-model="ruc" placeholder="RUC"></InputText>
      <InputText v-model="correo" placeholder="Correo"></InputText>
      <InputText v-model="celular" placeholder="Celular"></InputText>
      <Button type="submit" label="Registrar"></Button>
    </form>
  </div>
  <p @click="$router.push('/business/login')" class="text-button">Tengo una cuenta</p>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>