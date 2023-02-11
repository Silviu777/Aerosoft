<template>
  <div>
    <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
      <div class="container">
        <router-link to="/" class="navbar-brand float-left">Aerosoft</router-link>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link to="/add" class="nav-link px-3">Add Airline</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/view" class="nav-link">View Airlines & Flights</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pilots" class="nav-link">View Pilots</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addPilot" class="nav-link">Add Pilot</router-link>
          </li>
        </ul>
      </div>
    </nav>


    <div class="container mt-5">
      <router-view>

      </router-view>
    </div>
  </div>

</template>
<style>
@import 'assets/style.css';
</style>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem('isAuthenticated')) {
      this.$router.push({ name: 'login' });
    }
  }
}
</script>