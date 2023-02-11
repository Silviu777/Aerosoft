<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Add a new airline</h1>
            <form @submit.prevent="handleSubmitForm()">

                <div class="form-group">
                    <label for="name">Flight Number</label>
                    <input type="text" class="form-control" v-model="flight.flightNumber" required>
                </div>
                <div class="form-group">
                    <label for="date">Flight Date</label>
                    <input type="date" class="form-control" v-model="flight.date" required>
                </div>
                <div class="form-group">
                    <label for="name">Origin</label>
                    <input type="text" class="form-control" v-model="flight.origin.name" required>
                </div>
                <div class="form-group">
                    <label for="name">Destination</label>
                    <input type="text" class="form-control" v-model="flight.destination.name" required>
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
            flight: {
                flightNumber: '',
                date: '',
                origin: {},
                destination: {}
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = `http://localhost:8080/api/airlines/${this.$route.params.id}/flights`;
            const token = localStorage.getItem('jwt');
            axios.post(apiURL, this.flight, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(() => {
                this.$router.push('/view');
                this.flight = {
                    flightNumber: '',
                    date: '',
                    origin: '',
                    destination: ''
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
}
</script>