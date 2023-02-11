<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit Airline Data</h1>
            <form @submit.prevent="handleUpdateForm">
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
            airline: {}
        }
    },
    created() {
        let apiURL = `http://localhost:8080/api/airlines/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.airline = res.data
            this.airline.founded = new Date(this.airline.founded).toLocaleDateString('fr-CA');
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:8080/api/airlines/edit/${this.$route.params.id}`;
            const token = localStorage.getItem('jwt');
            axios.patch(apiURL, this.airline, {
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