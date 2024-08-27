<template>
    <div class="content-form-login">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" 
            id="username" 
            v-model="username" 
            placeholder="id"
            required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" 
            id="password" 
            v-model="password"
            placeholder="Password" 
            required>
        </div>
        <span>
          <a href="#">Forgot my password</a>
        </span>
        <br>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
      name: 'PageLogin',
      data() {
        return {
          username: '',
          password: ''
        };
      },    
      methods: {
        ...mapActions(['closedModalLogin']),
        handleLogin() {
          // Aquí puedes agregar la lógica para manejar el login
          console.log(`Username: ${this.username}, Password: ${this.password}`);
        }
      }
    };
    </script>
    
    <style scoped>
    .form-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
    }
    
    input {
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
    </style>
    