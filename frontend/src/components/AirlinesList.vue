<template>
    <div class="justify-content-center">
        <h1>Airlines</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive" style="width:112%">
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Airline Id</th>
                                <th>Name</th>
                                <th>Founded</th>
                                <th class="text-center">Destinations</th>
                                <th>Fleet size</th>
                                <th>Homebase</th>
                                <th class="text-center">Flights</th>
                                <th class="text-center">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="airline in Airlines" :key="airline.id">
                                <td>{{ airline.id }}</td>
                                <td>{{ airline.name }}</td>
                                <td>{{ new Date(airline.founded).toLocaleDateString('fr-CA') }}</td>
                                <td class="text-center">{{ airline.destinations }}</td>
                                <td class="text-center">{{ airline.fleetSize }}</td>
                                <td>{{ airline.homebase }}</td>

                                <td>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Flight Number</th>
                                                <th>Origin</th>
                                                <th>Destination</th>
                                                <th>Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(flight, i) in airline.flights.flightsList" :key="i">
                                                <td>{{ flight.flightNumber }}</td>
                                                <td>{{ flight.origin.name }}</td>
                                                <td>{{ flight.destination.name }}</td>
                                                <td class="text-center">
                                                    <router-link
                                                        :to="{ name: 'flight', params: { id: airline.id, flightNo: flight.flightNumber } }"
                                                        class="btn btn-success me-2">
                                                        Edit
                                                    </router-link>
                                                    <button
                                                        @click.prevent="deleteFlight(airline.id, flight.flightNumber)"
                                                        class="btn btn-danger">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </td>
                                <td class="text-center">
                                    <router-link :to="{ name: 'addFlight', params: { id: airline.id } }"
                                        class="btn btn-success me-2">
                                        Add flight
                                    </router-link>
                                    <router-link :to="{ name: 'edit', params: { id: airline.id } }"
                                        class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteAirline(airline.id)" class="btn btn-danger">
                                        Delete
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
            Airlines: [],
        })

        const computed = {
            flightsList() {
                return data.Airlines.flights.flightsList;
            },
        };

        const axiosGet = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/airlines');
                data.Airlines = res.data;
            } catch (error) {
                console.error(error);
            }
        };

        axiosGet();

        return { ...toRefs(data), ...computed };
    },

    methods: {
        deleteAirline(id) {
            let apiURL = `http://localhost:8080/api/airlines/delete/${id}`;
            let indexOfArrayItem = this.Airlines.findIndex(i => i.id === id);
            const token = localStorage.getItem('jwt');

            if (window.confirm("Are you sure you want to remove this airline?")) {
                axios.delete(apiURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }

                }).then(() => {
                    this.Airlines.splice(indexOfArrayItem, 1)

                }).catch(error => {
                    console.log(error)
                })
            }
        },

        deleteFlight(airlineId, flightNo) {
            let apiURL = `http://localhost:8080/api/airlines/${airlineId}/flights/${flightNo}`;
            let airlinesArray = Object.values(this.Airlines);
            let indexOfArrayItem = airlinesArray.findIndex(airline => {
                return airline.flights && airline.flights.flightsList && airline.flights.flightsList.findIndex(i => i.flightNo === flightNo) !== -1;
            });
            const token = localStorage.getItem('jwt');

            if (window.confirm("Are you sure you want to remove this flight?")) {
                axios.delete(apiURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }

                }).then(() => {
                    if (this.Airlines && this.Airlines.flights) {
                        this.Airlines.flights.flightsList.splice(indexOfArrayItem, 1);
                        this.$router.push('/view')

                        this.$set(this.Airlines.flights.flightsList, 'flightsList', this.Airlines.flights.flightsList);
                        this.$forceUpdate();
                    }

                }).catch(error => {
                    console.log(error)
                })
            }
        },

    }
});
</script>
