<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Add a new pilot</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="name">Pilot Id</label>
                    <input type="number" class="form-control" v-model="pilot.id" required>
                </div>
                <div class="form-group">
                    <label for="name">First Name</label>
                    <input type="text" class="form-control" v-model="pilot.firstName" required>
                </div>
                <div class="form-group">
                    <label for="name">Last Name</label>
                    <input type="text" class="form-control" v-model="pilot.lastName" required>
                </div>
                <div class="form-group">
                    <label for="date">Hiring Date</label>
                    <input type="date" class="form-control" v-model="pilot.hiringDate" required>
                </div>
                <div class="form-group">
                    <label for="number">Age</label>
                    <input type="number" class="form-control" v-model="pilot.age" required>
                </div>
                <div class="form-group">
                    <label for="number">Phone Number</label>
                    <input type="text" class="form-control" v-model="pilot.phoneNumber" required>
                </div>
                <div class="form-group">
                    <label for="name">Homebase</label>
                    <input type="text" class="form-control" v-model="pilot.homebase" required>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary btn-block w-100" type="submit">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            pilot: {
                id: '',
                firstName: '',
                lastName: '',
                hiringDate: '',
                age: '',
                phoneNumber: '',
                Homebase: ''
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:8080/api/pilots';
            const token = localStorage.getItem('jwt');
            axios.post(apiURL, this.pilot, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(() => {
                this.$router.push('/pilots');
                this.pilot = {
                    id: '',
                    firstName: '',
                    lastName: '',
                    hiringDate: '',
                    age: '',
                    phoneNumber: '',
                    Homebase: ''
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>