<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Add a new airline</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="name">Id</label>
                    <input type="number" class="form-control" v-model="airline.id" required>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" v-model="airline.name" required>
                </div>
                <div class="form-group">
                    <label for="date">Founded</label>
                    <input type="date" class="form-control" v-model="airline.founded" required>
                </div>
                <div class="form-group">
                    <label for="number">Destinations</label>
                    <input type="number" class="form-control" v-model="airline.destinations" required>
                </div>
                <div class="form-group">
                    <label for="number">Fleet size</label>
                    <input type="number" class="form-control" v-model="airline.fleetSize" required>
                </div>
                <div class="form-group">
                    <label for="name">Homebase</label>
                    <input type="text" class="form-control" v-model="airline.homebase" required>
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
            airline: {
                id: '',
                name: '',
                founded: '',
                destinations: '',
                fleetSize: '',
                homebase: '',
                flights: []
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:8080/api/airlines';
            const token = localStorage.getItem('jwt');
            axios.post(apiURL, this.airline, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(() => {
                this.$router.push('/view');
                this.airline = {
                    id: '',
                    name: '',
                    founded: '',
                    destinations: '',
                    fleetSize: '',
                    homebase: '',
                    flights: ''
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>