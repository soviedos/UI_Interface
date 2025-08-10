// === Actualiza imágenes cada 3.5s ===
setInterval(() => {
    document.getElementById('video1').src = 'http://192.168.0.74:81/stream1?ts=' + Date.now();
    document.getElementById('video2').src = 'http://192.168.0.74:81/stream2?ts=' + Date.now();
    document.getElementById('video3').src = 'http://192.168.0.74:81/stream3?ts=' + Date.now();
}, 3500);

// === Gráficas Chart.js ===
const metricUrl = "http://192.168.0.74:81/metrics"; // Cambia la IP si es necesario

const cenfoRed = "#A80000";
const cenfoBlue = "#006aea";
const cenfoYellow = "#FFD600";

const createChart = (ctx, label, color) => new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: label,
      data: [],
      borderColor: color,
      backgroundColor: 'rgba(0,0,0,0)',
      fill: false,
      tension: 0.15,
      pointRadius: 0
    }]
  },
  options: {
    animation: false,
    plugins: { legend: { display: false } },
    responsive: true,
    scales: {
      x: { display: false },
      y: { beginAtZero: true }
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  // Espera que los canvas existan antes de crear las gráficas
  const memoryChart = createChart(
    document.getElementById('memoryChart').getContext('2d'),
    'Memoria libre (bytes)',
    cenfoBlue
  );
  const cpuChart = createChart(
    document.getElementById('cpuChart').getContext('2d'),
    'CPU idle_count',
    cenfoRed
  );
  const rssiChart = createChart(
    document.getElementById('rssiChart').getContext('2d'),
    'WiFi RSSI (dBm)',
    cenfoYellow
  );

  setInterval(() => {
    fetch(metricUrl)
      .then(res => res.json())
      .then(d => {
        const now = new Date().toLocaleTimeString();

        // Memoria
        if (memoryChart.data.labels.length > 30) {
          memoryChart.data.labels.shift();
          memoryChart.data.datasets[0].data.shift();
        }
        memoryChart.data.labels.push(now);
        memoryChart.data.datasets[0].data.push(d.free_memory);
        memoryChart.update();

        // CPU
        if (cpuChart.data.labels.length > 30) {
          cpuChart.data.labels.shift();
          cpuChart.data.datasets[0].data.shift();
        }
        cpuChart.data.labels.push(now);
        cpuChart.data.datasets[0].data.push(d.idle_count);
        cpuChart.update();

        // RSSI
        if ('rssi' in d) {
          if (rssiChart.data.labels.length > 30) {
            rssiChart.data.labels.shift();
            rssiChart.data.datasets[0].data.shift();
          }
          rssiChart.data.labels.push(now);
          rssiChart.data.datasets[0].data.push(d.rssi);
          rssiChart.update();
        }
      });
  }, 1000);
});
