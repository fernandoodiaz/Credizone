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
      edad: null,
      dni: '',
      correo: '',
      celular: '',
      estado_usuario: true,
    };
  },
  methods: {
    registerUser() {
      try {
        // Obtener usuarios existentes desde localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Obtener el ID más alto y asignar un nuevo ID
        const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
        const id = maxId + 1;

        // Crear un nuevo usuario
        const newUser = {
          id,
          nombre: this.nombre,
          Contrasena: this.Contrasena,
          Fecha_creacion: new Date().toISOString(),
          estado_usuario: this.estado_usuario,
          edad: this.edad,
          dni: this.dni,
          correo: this.correo,
          celular: this.celular,
          credito: 0.0,
        };

        // Añadir el nuevo usuario a la lista de usuarios
        users.push(newUser);

        // Guardar la lista actualizada en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Usuario registrado con éxito');
        this.$router.push("/users/login")
      } catch (error) {
        console.error('Error registrando usuario:', error);
        alert('Hubo un error al registrar el usuario.');
      }
    }
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="registerUser">
      <h1>Registro de Usuarios</h1>
      <InputText v-model="nombre" placeholder="Nombre"></InputText>
      <InputText v-model="Contrasena" placeholder="Contraseña"></InputText>
      <InputNumber v-model="edad" placeholder="Edad" :useGrouping="false"></InputNumber>
      <InputText v-model="dni" placeholder="DNI"></InputText>
      <InputText v-model="correo" placeholder="Correo"></InputText>
      <InputText v-model="celular" placeholder="Celular"></InputText>
      <Button type="submit" label="Registrar"></Button>
    </form>
  </div>
  <p @click="$router.push('/users/login')" class="text-button">Tengo una cuenta</p>
</template>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>