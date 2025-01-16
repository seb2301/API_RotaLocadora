<template>
    <div>
      <Navbar />
      <h2>Detalhes do Veículo</h2>
      <p>Placa: {{ vehicle.plate }}</p>
      <p>Marca: {{ vehicle.brand }}</p>
      <p>Modelo: {{ vehicle.model }}</p>
      <p>Localização:</p>
      <div id="map" style="height: 400px;"></div>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  import { MapContainer, TileLayer, Marker, Popup } from 'leaflet';
  
  export default {
    components: { Navbar },
    data() {
      return {
        vehicle: {},
      };
    },
    async mounted() {
      const response = await this.$api.get(`/vehicles/${this.$route.params.id}`);
      this.vehicle = response.data;
  
      const map = new MapContainer('map').setView([this.vehicle.latitude, this.vehicle.longitude], 13);
      new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      new Marker([this.vehicle.latitude, this.vehicle.longitude]).addTo(map).bindPopup('Localização do veículo');
    },
  };
  </script>
  