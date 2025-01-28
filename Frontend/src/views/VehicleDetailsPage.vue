<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>Detalhes do Veículo</h2>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <p><strong>Placa:</strong> {{ detailsVehicle.plate }}</p>
        <p><strong>Marca:</strong> {{ detailsVehicle.brand }}</p>
        <p><strong>Modelo:</strong> {{ detailsVehicle.model }}</p>
        <p><strong>Propriedade de Uso:</strong> {{ detailsVehicle.usage }}</p>
        <p><strong>Localização:</strong> {{ detailsVehicle.latitude }}, {{ detailsVehicle.longitude }}</p>
        <div id="map" class="map"></div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  props: {
    detailsVehicle: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    if (this.detailsVehicle.latitude && this.detailsVehicle.longitude) {
      const map = L.map("map").setView(
        [this.detailsVehicle.latitude, this.detailsVehicle.longitude],
        15
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      L.marker([this.detailsVehicle.latitude, this.detailsVehicle.longitude]).addTo(map);
    }
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.map {
  height: 300px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
