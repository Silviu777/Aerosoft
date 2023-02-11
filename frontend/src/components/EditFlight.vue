<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit Airline Data</h1>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label for="name">Flight Number</label>
                    <input type="text" class="form-control" v-model="flight.flightNumber" required>
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
                    <button class="btn btn-primary btn-block w-100" type="submit">Update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            flight: {}
        }
    },
    created() {
        let apiURL = `http://localhost:8080/api/airlines/${this.$route.params.id}/flights/${this.$route.params.flightNo}`;
        axios.get(apiURL).then((res) => {
            this.flight = res.data
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:8080/api/airlines/${this.$route.params.id}/flights/${this.$route.params.flightNo}`;
            const token = localStorage.getItem('jwt');
            axios.patch(apiURL, this.flight, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res)
                this.$router.push('/view')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>