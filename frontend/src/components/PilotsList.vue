<template>
    <div class="justify-content-center">
        <h1>Pilots</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th class="text-center">Id</th>
                                <th class="text-center">First Name</th>
                                <th class="text-center">Last Name</th>
                                <th class="text-center">Hiring Date</th>
                                <th class="text-center">Age</th>
                                <th class="text-center">Phone Number</th>
                                <th class="text-center">Homebase</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pilot in Pilots" :key="pilot.id">
                                <td class="text-center">{{ pilot.id }}</td>
                                <td class="text-center">{{ pilot.firstName }}</td>
                                <td class="text-center">{{ pilot.lastName }}</td>
                                <td class="text-center">{{ new Date(pilot.hiringDate).toLocaleDateString('fr-CA') }}
                                </td>
                                <td class="text-center">{{ pilot.age }}</td>
                                <td class="text-center">{{ pilot.phoneNumber }}</td>
                                <td class="text-center">{{ pilot.homebase }}</td>

                                <td>
                                    <router-link :to="{ name: 'pilot/edit', params: { id: pilot.id } }"
                                        class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deletePilot(pilot.id)" class="btn btn-danger">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import axios from "axios";

export default defineComponent({
    setup() {
        const data = reactive({
            Pilots: [],
        })

        const computed = {
            pilotsList() {
                return data;
            },
        };

        const axiosGet = async () => {
            try {
                let apiUrl = 'http://localhost:8080/api/pilots'
                const token = localStorage.getItem('jwt');
                const res = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }

                });
                data.Pilots = res.data;
            } catch (error) {
                console.error(error);
            }
        };

        axiosGet();

        return { ...toRefs(data), ...computed };
    },

    methods: {
        deletePilot(id) {
            let apiURL = `http://localhost:8080/api/pilots/delete/${id}`;
            let indexOfArrayItem = this.Pilots.findIndex(i => i.id === id);
            const token = localStorage.getItem('jwt');
            if (window.confirm("Are you sure you want to remove this pilot?")) {
                axios.delete(apiURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }

                }).then(() => {
                    this.Pilots.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
})
</script>