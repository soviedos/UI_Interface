const img = document.getElementById('main-video');
const radios = document.querySelectorAll('input[name="img-select"]');

// URLs para cada imagen (ajusta los endpoints según tu servidor)
const sources = {
  original: "http://192.168.0.78:81/",
  ajustada: "http://192.168.0.78:82/",
  juzgamiento: "http://192.168.0.78:83/"
};

// Función para construir la URL con filtros y parámetros
function buildUrl(baseUrl) {
  const params = [];
  document.querySelectorAll('.toggle-switch').forEach(input => {
    if (input.checked) params.push(`${input.name}=1`);
  });
  document.querySelectorAll('.cenfo-panel-sliders input[type="range"]').forEach(input => {
    params.push(`${input.name}=${input.value}`);
  });
  params.push(`t=${new Date().getTime()}`);
  return `${baseUrl}?${params.join('&')}`;
}

// Cambia la imagen al seleccionar un switch
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    img.src = buildUrl(sources[radio.value]);
  });
});

// Actualiza la imagen cuando cambian los filtros o sliders
document.querySelectorAll('.toggle-switch, .cenfo-panel-sliders input[type="range"]').forEach(input => {
  input.addEventListener('change', () => {
    const selectedRadio = document.querySelector('input[name="img-select"]:checked');
    img.src = buildUrl(sources[selectedRadio.value]);
  });
  input.addEventListener('input', () => {
    const selectedRadio = document.querySelector('input[name="img-select"]:checked');
    img.src = buildUrl(sources[selectedRadio.value]);
  });
});

// Refresca la imagen cada 2 minutos
setInterval(() => {
  const selectedRadio = document.querySelector('input[name="img-select"]:checked');
  img.src = buildUrl(sources[selectedRadio.value]);
}, 120000);