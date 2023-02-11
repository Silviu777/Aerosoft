<template>
    <div class="login-form">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="login">
            <div class="form-group mb-3 w-50 center-block">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" class="form-control" required>
            </div>
            <div class="form-group mb-3 w-50 center-block">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary center-block">Submit</button>
        </form>
    </div>
</template>

<style>
.center-block {
    margin: 0 auto;
    display: block;
}

.login-form {
    background: linear-gradient(90deg, rgba(70, 146, 219, 1) 29%, rgba(34, 112, 201, 1) 41%, rgba(36, 107, 136, 1) 72%, rgba(10, 67, 107, 1) 98%, rgba(12, 53, 99, 1) 100%);
    ;
}

h2 {
    color: white;
}

label[for="email"],
label[for="password"] {
    color: white;
}
</style>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('http://localhost:8080/api/login', {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('isAuthenticated', true);
                this.$router.push('/view');

            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>