<script>
import {tiposInteres} from "@/services/finance/finance.service.js";
export default {
  name: 'RegisterUser',
  data() {
    return {
      nombre: '',
      Contrasena: '',
      ruc: '',
      correo: '',
      celular: '',
      estado_negocio: true,
      tasaInteres: null,
      tipoInteres: null,
      tiposInteres: tiposInteres,
    };
  },
  methods: {
    registerUser() {
      try {
        // Obtener usuarios existentes desde localStorage
        let business = JSON.parse(localStorage.getItem('business')) || [];

        // Obtener el ID más alto y asignar un nuevo ID
        const maxId = business.reduce((max, user) => Math.max(max, user.id), 0);
        const id_empresa = maxId + 1;

        // Crear un nuevo usuario
        const newUser = {
          id: id_empresa,
          nombre: this.nombre,
          Contrasena: this.Contrasena,
          Fecha_creacion: new Date().toISOString(),
          estado_usuario: this.estado_negocio,
          ruc: this.ruc,
          correo: this.correo,
          celular: this.celular,
          credit: 0.0,
          tipoInteres: this.tipoInteres,
          tasaInteres: this.tasaInteres,
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
      <Dropdown v-model="tipoInteres" :options="tiposInteres" placeholder="Seleccione un tipo de tasa"/>
      <InputNumber v-model="tasaInteres" :useGrouping="false" :minFractionDigits="0" :maxFractionDigits="4" :min="0.0001" suffix="%" placeholder="Ingrese el porcentaje de la tasa"/>
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