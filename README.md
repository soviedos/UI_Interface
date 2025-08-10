# Sumo Sentinel Vision App

**Interfaz web para monitoreo en tiempo real de competencias de sumo robótico**

Universidad Cenfotec - Escuela de Ingeniería del Software  
Proyecto de Investigación Aplicada 2 - MISIA

## Descripción

Sumo Sentinel Vision es una aplicación web para el monitoreo en tiempo real de competencias de sumo robótico. La interfaz permite visualizar múltiples streams de video, aplicar filtros de procesamiento de imágenes, y monitorear métricas del sistema como memoria, CPU y señal WiFi.

### Características principales:

- **Visualización de streams en tiempo real** desde cámaras conectadas
- **Panel de control interactivo** con filtros de procesamiento de imagen
- **Gráficas de métricas** del sistema en tiempo real
- **Múltiples algoritmos de detección** (Hough, Contornos, Canny)
- **Interfaz responsive** con diseño de Universidad Cenfotec

## Estructura del proyecto

```
UI_Interface/
├── .git/                     # Control de versiones Git
├── .gitignore               # Archivos ignorados por Git
├── static/
│   ├── css/
│   │   └── style.css        # Estilos CSS con variables de Cenfotec
│   ├── images/
│   │   └── Logo-Blanco (1).png # Logo de Universidad Cenfotec
│   └── js/
│       └── script.js        # JavaScript para gráficas y updates
├── templates/
│   └── index.html          # Archivo HTML principal de la aplicación
├── LICENSE                 # Licencia del proyecto
└── README.md              # Documentación del proyecto
```

## Instalación y configuración

### Prerrequisitos

- VS Code con extensión Live Server (recomendado)
- Navegador web moderno
- Python 3.7+ (opcional, para servidor HTTP simple)

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd UI_Interface
```

## Ejecución de la aplicación

### Opción 1: Live Server (VS Code) - Recomendado

1. Abrir VS Code en la carpeta del proyecto
2. Hacer clic derecho en `templates/index.html`
3. Seleccionar "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

### Opción 2: Servidor HTTP simple

```bash
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000/templates/` en el navegador

## Configuración de streams

Por defecto, la aplicación está configurada para recibir streams desde:
- `http://192.168.0.74:81/stream1` - Imagen Original
- `http://192.168.0.74:81/stream2` - Imagen con Filtro  
- `http://192.168.0.74:81/stream3` - Juzgamiento

### Cambiar la IP del dispositivo:

Editar en `static/js/script.js`:
```javascript
// Cambiar esta IP por la de tu dispositivo
const metricUrl = "http://192.168.0.74:81/metrics";
```

Y en las líneas de actualización de imágenes:
```javascript
document.getElementById('video1').src = 'http://TU_IP:81/stream1?ts=' + Date.now();
```

## Filtros disponibles

### Filtros de procesamiento:
- Ajuste de brillo y contraste
- Ajuste HSV
- Transformar a escala de grises
- Ecualización de histograma
- Ajuste de Min-Max para blancos
- Filtro morfológico
- Filtro bilateral
- Filtro gaussiano

### Algoritmos de detección:
- Detección por Hough
- Detección por contornos
- Detección por Canny

## Métricas monitoreadas

La aplicación incluye un sistema de monitoreo en tiempo real que visualiza tres métricas clave del dispositivo de visión:

### Tipos de métricas:

#### 1. **Memoria libre del sistema**
- **Descripción:** Cantidad de memoria RAM disponible en el dispositivo
- **Unidad:** Bytes
- **Color de gráfica:** Azul (#006aea)
- **Propósito:** Monitorear el consumo de memoria para detectar posibles fugas o problemas de rendimiento

#### 2. **Carga de CPU (idle_count)**
- **Descripción:** Contador de ciclos inactivos del procesador
- **Unidad:** Conteo de ciclos
- **Color de gráfica:** Rojo (#A80000 - color institucional Cenfotec)
- **Propósito:** Evaluar la carga de procesamiento y detectar picos de actividad

#### 3. **Señal RSSI WiFi**
- **Descripción:** Intensidad de la señal WiFi recibida
- **Unidad:** dBm (decibelios-milivatios)
- **Color de gráfica:** Amarillo (#FFD600)
- **Propósito:** Monitorear la calidad de la conexión de red

### Funcionamiento técnico:

#### Recolección de datos:
1. **Endpoint de métricas:** `http://192.168.0.74:81/metrics`
2. **Frecuencia de actualización:** Cada 3.5 segundos
3. **Método de solicitud:** HTTP GET requests con JavaScript

#### Visualización con Chart.js:
```javascript
// Configuración de gráficas en tiempo real
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
    responsive: true,
    scales: {
      x: { display: false },  // Sin etiquetas de tiempo
      y: { beginAtZero: true } // Escala desde cero
    }
  }
});
```

#### Proceso de actualización:
1. **Solicitud HTTP:** JavaScript realiza petición al endpoint de métricas
2. **Parsing de datos:** Se extraen los valores de memoria, CPU y RSSI
3. **Actualización de gráficas:** Los nuevos datos se agregan a las series de Chart.js
4. **Renderizado:** Las gráficas se redibujan automáticamente

#### Características de las gráficas:
- **Tipo:** Gráficas de línea en tiempo real
- **Sin animaciones:** Para mejor rendimiento
- **Puntos invisibles:** Solo se muestra la línea de tendencia
- **Escala automática:** Se ajusta según los valores recibidos
- **Responsive:** Se adaptan al tamaño de la pantalla

### Configuración del endpoint:

Para cambiar la IP del dispositivo que proporciona las métricas, editar en `static/js/script.js`:

```javascript
// Cambiar esta IP por la de tu dispositivo
const metricUrl = "http://192.168.0.74:81/metrics";
```

### Solución de problemas de métricas:

#### Si las gráficas no se actualizan:
1. Verificar conectividad al endpoint `/metrics`
2. Comprobar que el dispositivo esté en la red local
3. Revisar la consola del navegador para errores de CORS
4. Confirmar que Chart.js se carga correctamente

#### Formato esperado del endpoint:
El endpoint debe retornar datos en formato JSON con la estructura:
```json
{
  "free_memory": 12345,
  "cpu_idle_count": 67890,
  "wifi_rssi": -45
}
```

Las gráficas se actualizan automáticamente cada 3.5 segundos y mantienen un historial visual de las últimas mediciones.

## Tecnologías utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6
- **Gráficas:** Chart.js
- **Estilos:** CSS Variables, Flexbox, Grid
- **Servidor de desarrollo:** Live Server (VS Code) / HTTP Server

## Compatibilidad

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Desarrollo

### Variables CSS principales:
```css
:root {
  --cenfo-red: #A80000;      /* Rojo institucional */
  --cenfo-dark: #0F111A;     /* Fondo oscuro */
  --cenfo-gray: #A1A6B4;     /* Gris neutro */
  --cenfo-light: #E4E4E4;    /* Texto claro */
  --panel-bg: #1C1F2A;       /* Fondo del panel */
}
```

### Estructura de componentes:
- `cenfo-header`: Encabezado con logo y título
- `cenfo-main`: Contenido principal con videos y panel
- `cenfo-panel`: Panel de control lateral
- `cenfo-footer`: Pie de página institucional

## Troubleshooting

### Los streams no cargan:
1. Verificar que el dispositivo esté conectado a la red
2. Comprobar la IP en `script.js`
3. Verificar que los puertos 81 estén abiertos

### Las gráficas no se actualizan:
1. Verificar la conexión a `/metrics` endpoint
2. Revisar la consola del navegador para errores
3. Comprobar que Chart.js se carga correctamente

### Problemas de CORS:
Los requests a URLs externas pueden fallar debido a políticas CORS del navegador. Para desarrollo local, usar Live Server o un servidor HTTP.

## Contribuidores

- **Sergio Oviedo Seas** - Desarrollador Principal
- **Universidad Cenfotec** - Escuela de Ingeniería del Software
- **MISIA** - Proyecto de Investigación Aplicada 2

## Licencia

Este proyecto es desarrollado como parte del programa académico de Universidad Cenfotec.

---

**© 2025 Universidad Cenfotec | Escuela de Ingeniería del Software**