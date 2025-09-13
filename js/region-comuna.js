// Comunas por región
const comunasPorRegion = {
  metropolitana: ["Santiago", "Puente Alto", "Maipú", "Las Condes"],
  valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  biobio: ["Concepción", "Talcahuano", "Coronel", "Los Ángeles"],
  araucania: ["Temuco", "Padre Las Casas", "Angol", "Victoria"]
};

document.addEventListener('DOMContentLoaded', function() {
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');

  regionSelect.addEventListener('change', function() {
    const region = this.value;
    comunaSelect.innerHTML = '<option value="" disabled selected>Comuna</option>';
    if (comunasPorRegion[region]) {
      comunasPorRegion[region].forEach(comuna => {
        const option = document.createElement('option');
        option.value = comuna.toLowerCase().replace(/ /g, "_");
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
});