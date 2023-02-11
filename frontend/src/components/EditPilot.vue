<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1>Edit Pilot Information</h1>
            <form @submit.prevent="handleUpdateForm">
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
                    <button class="btn btn-primary btn-block w-100" type="submit">Update</button>
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
            pilot: {}
        }
    },
    created() {
        let apiURL = `http://localhost:8080/api/pilots/${this.$route.params.id}`;
        const token = localStorage.getItem('jwt');
        axios.get(apiURL, {
            headers: {
                Authorization: `Bearer ${token}`,
            }

        }).then((res) => {
            this.pilot = res.data
            this.pilot.hiringDate = new Date(this.pilot.hiringDate).toLocaleDateString('fr-CA');
        })
    },

    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:8080/api/pilots/edit/${this.$route.params.id}`;
            const token = localStorage.getItem('jwt');
            axios.patch(apiURL, this.pilot, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res)
                this.$router.push('/pilots')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>