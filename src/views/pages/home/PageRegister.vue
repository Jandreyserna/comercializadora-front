<template>
    <div class="container-form">
        <div class="container-form-register">
            <h2>Registro</h2>

            <p>Ten en cuenta que la información solicitada en los campos con este símbolo "*" es obligatoria.</p>
            <form @submit.prevent="handleRegister">
              <div class="form-group">
                <label for="idType">Tipo de identificación: (<span class="error">*</span>)</label>
                <select id="idType" v-model="idType" @blur="validateSelect('idType')" @change="validateSelect('idType')" required>
                  <option value="0" disabled>Seleccione uno</option>
                  <option v-for="id_type in idTypes.data" :key= "id_type.id_type" :value= "id_type.id_type">
                    {{id_type.short_name}} - {{ id_type.type }}
                  </option>
                </select>
                <span v-if="idTypeError" class="error">{{ idTypeError }}</span>
              </div>

                <div class="form-group">
                  <label for="identification">Número de identificación: (<span class="error">*</span>)</label>
                  <input type="text" 
                    id="identification" 
                    v-model="identification" 
                    :maxlength="10"
                    @input="fieldNoNull($event, 'identification')"
                    required
                  />
                  <span v-if="identificationError" class="error">{{ identificationError }}</span>
                </div>

                <div class="form-group">
                  <label for="firstName">Nombre: (<span class="error">*</span>)</label>
                  <input type="text" 
                    id="firstName" 
                    v-model="firstName"
                    @input="fieldNoNull($event, 'firstName')"  
                    required
                    />
                  <span v-if="firstNameError" class="error">{{ firstNameError }}</span>
                </div>

                <div class="form-group">
                  <label for="lastName">Apellido: (<span class="error">*</span>)</label>
                  <input type="text" 
                    id="lastName" 
                    v-model="lastName"
                    @input="fieldNoNull($event, 'lastName')" 
                    required
                  />
                  <span v-if="lastNameError" class="error">{{ lastNameError }}</span>
                </div>

                <div class="form-group">
                  <label for="email">Correo electrónico: (<span class="error">*</span>)</label>
                  <input type="email" 
                    id="email" 
                    v-model="email" 
                    @input="fieldNoNull($event, 'email')"
                    required
                  />
                  <span v-if="emailError" class="error">{{ emailError }}</span>
                </div>

                <div class="form-group">
                    <label for="genero">Género: (<span class="error">*</span>)</label>
                    <select id="genero" v-model="genero" @blur="validateSelect('genero')" @change="validateSelect('genero')" required>
                        <option value="0"  disabled> Seleccione uno</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="female">No especificado</option>
                    </select>
                    <span v-if="generoError" class="error">{{ generoError }}</span>
                </div>

                <div class="form-group">
                  <label for="city">Lugar de residencia: (<span class="error">*</span>)</label>
                  <input type="text" 
                    id="city" 
                    v-model="city" 
                    @input="fieldNoNull($event, 'city')"
                    required
                  />
                  <span v-if="cityError" class="error">{{ cityError }}</span>
                </div>

                <div class="form-group">
                  <label for="phoneNumber">Número celular: (<span class="error">*</span>)</label>
                  <input type="text" 
                    id="phoneNumber" 
                    v-model="phoneNumber" 
                    :minlength="10"
                    :maxlength="10"
                    @blur="validateNumeric($event, 'phoneNumber')" 
                    required
                  />
                  <span v-if="phoneNumberError" class="error">{{ phoneNumberError }}</span>
                </div>

                <div class="form-group">
                  <label for="birthDate">Fecha de nacimiento: (<span class="error">*</span>)</label>
                  <input type="date" 
                    id="birthDate" 
                    v-model="birthDate" 
                    @blur="validateAge" 
                    required
                  />
                  <span v-if="birthDateError" class="error">{{ birthDateError }}</span>
                </div>

                <button type="submit">Registrar</button>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import axiosInstance from '../../../services/axiosInstanceService/axiosInstance';

  const DEFAULT_FORM_VALUES = {
  idType: '0',
  identification: '',
  firstName: '',
  lastName: '',
  genero: '0',
  city: '',
  email: '',
  phoneNumber: '',
  birthDate: '',
};

const DEFAULT_ERRORS = {
  phoneNumberError: '',
  idTypeError: '',
  generoError: '',
  cityError: '',
  emailError: '',
  identificationError: '',
  firstNameError: '',
  lastNameError: '',
  birthDateError: '',
};

export default {
  name: 'PageRegister',

  data() {
    return {
      ...DEFAULT_FORM_VALUES,
      ...DEFAULT_ERRORS,
    };
  },

  computed: {
    ...mapGetters({
      idTypes: 'loadTypeId/idTypes',
    }),

    isFormValid() {
      return (
        this.idType !== '0' &&
        this.identification !== '' &&
        this.firstName !== '' &&
        this.lastName !== '' &&
        this.genero !== '0' &&
        this.city !== '' &&
        this.email !== '' &&
        this.phoneNumber.length >= 10 &&
        this.birthDate !== ''
      );
    },

  },

  created() {
    this.fetchIdTypes();
  },

  methods: {
    ...mapActions('loadTypeId', ['fetchIdTypes']),

    async loadData() {
      try {
        const datos = await this.fetchIdTypes();
        this.idTypes = datos;     
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },

    validateNumeric(event, field) {
      const value = event.target.value || '';
      const numericValue = String(value).replace(/[^0-9]/g, '');
      this[field] = numericValue;

      this[`${field}Error`] = numericValue.length === 10 ? '' : 'El numero debe tener una longitud de 10 digitos';
    },

    validateSelect(field) {
      this[`${field}Error`] = this[field] === '0' ? 'Debe seleccionar una opción válida' : '';
    },

    validateAge() {
      const birthDate = new Date(this.birthDate);
      const specificDate = new Date('2024-11-09T00:00:00Z');
      const ageDiffMs = specificDate - birthDate.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      if (age > 110) {
        alert('Raango de edad no valido.');
        this.birthDate = '';
      }
    },

    fieldNoNull(event, field) {
      this[`${field}Error`] = event.target.value === '' ? 'Este campo no puede estar vacio' : '';
    },

    validateForm() {
      /* this.isFormValid = true; */
      this.validateSelect('idType');
      this.validateSelect('genero');

      this.validateNumeric({ target: { value: this.phoneNumber || '' } }, 'phoneNumber');

      ['identification', 'firstName', 'lastName', 'city', 'email', 'birthDate'].forEach(field => {
        this.fieldNoNull({ target: { value: this[field] || '' } }, field);
      });
    },

    handleRegister() {
      this.validateForm();
      console.log(this.isFormValid);

      if (!this.isFormValid || this.isFormValid === undefined) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
      }

      
      const data = {
        idType: this.idType,
        identification: this.identification,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        genero: this.genero,
        city: this.city,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate,
      };

      axiosInstance.post('/register/submit-form', data)
        .then(response => {
          if (response.data.success) {
            alert(response.data.message);
            this.resetForm();
          } else {
            const message = JSON.stringify(response.data.message);
            alert(message);
          }
        })
        .catch(error => {
          console.error('Error al enviar el formulario:', error);
          alert('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
        });
    },

    resetForm() {
      Object.assign(this.$data, { ...DEFAULT_FORM_VALUES, ...DEFAULT_ERRORS });
    },
  },
};
  </script>
  
  <style scoped>
    .container-form{
        display: flex;
        justify-content: center;
    }

    .container-form-register {
        width: 100%;
        max-width: 400px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    .container-form-register h2 {
        text-align: center;
    }
    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      margin-right: 15px;
    }

    .checkbox-group label p {
      margin: 0 5px 0 0;
    }

    

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007BFF;
      border: none;
      color: #fff;
      cursor: pointer;
      border-radius: 5px;
      font-size: 16px;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error {
      color: red;
      font-size: 0.9em;
    }
  </style>
  