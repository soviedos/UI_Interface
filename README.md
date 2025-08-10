# Sumo Sentinel Vision App 🥋

**Interfaz web para monitoreo en tiempo real de competencias de sumo robótico**

Universidad Cenfotec - Escuela de Ingeniería del Software  
Proyecto de Investigación Aplicada 2 - MISIA

## 📖 Descripción

Sumo Sentinel Vision es una aplicación web para el monitoreo en tiempo real de competencias de sumo robótico. La interfaz permite visualizar múltiples streams de video, aplicar filtros de procesamiento de imágenes, y monitorear métricas del sistema como memoria, CPU y señal WiFi.

### Características principales:

- 🎥 **Visualización de streams en tiempo real** desde cámaras conectadas
- 🎛️ **Panel de control interactivo** con filtros de procesamiento de imagen
- 📊 **Gráficas de métricas** del sistema en tiempo real
- 🖼️ **Múltiples algoritmos de detección** (Hough, Contornos, Canny)
- 🎨 **Interfaz responsive** con diseño de Universidad Cenfotec

## 🏗️ Estructura del proyecto

```
UI_Interface/
├── static/
│   ├── css/
│   │   └── style.css          # Estilos CSS con variables de Cenfotec
│   ├── images/
│   │   └── Logo-Blanco (1).png # Logo de Universidad Cenfotec
│   └── js/
│       └── script.js          # JavaScript para gráficas y updates
├── templates/
│   └── index.html            # Template principal de Flask
├── app.py                    # Servidor Flask
├── index.html               # Archivo HTML estático
└── README.md               # Este archivo
```

## 🚀 Instalación y configuración

### Prerrequisitos

- Python 3.7+
- VS Code con extensión Live Server (opcional)
- Navegador web moderno

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd UI_Interface
```

2. **Instalar dependencias Python (si usas Flask):**
```bash
pip install flask
```

## 🖥️ Ejecución del servidor

### Opción 1: Live Server (VS Code) - Recomendado para desarrollo

1. Abrir VS Code en la carpeta del proyecto
2. Hacer clic derecho en `index.html`
3. Seleccionar "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

### Opción 2: Servidor Flask

```bash
python3 app.py
```

La aplicación estará disponible en `http://localhost:5000`

### Opción 3: Servidor HTTP simple

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000` en el navegador

## 🎛️ Configuración de streams

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

## 🎨 Filtros disponibles

### Filtros de procesamiento:
- ✨ Ajuste de brillo y contraste
- 🌈 Ajuste HSV
- ⚫ Transformar a escala de grises
- 📈 Ecualización de histograma
- ⚪ Ajuste de Min-Max para blancos
- 🔧 Filtro morfológico
- 🌊 Filtro bilateral
- 🌀 Filtro gaussiano

### Algoritmos de detección:
- 🔍 Detección por Hough
- 🎯 Detección por contornos
- ⚡ Detección por Canny

## 📊 Métricas monitoreadas

La aplicación muestra gráficas en tiempo real de:
- 💾 **Memoria libre** del sistema
- ⚙️ **Carga de CPU** (idle_count)
- 📶 **Señal RSSI WiFi**

Las gráficas se actualizan automáticamente cada 3.5 segundos.

## 🛠️ Tecnologías utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6
- **Gráficas:** Chart.js
- **Backend:** Flask (Python)
- **Estilos:** CSS Variables, Flexbox, Grid
- **Servidor de desarrollo:** Live Server (VS Code)

## 📱 Compatibilidad

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔧 Desarrollo

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

## 🐛 Troubleshooting

### Los streams no cargan:
1. Verificar que el dispositivo esté conectado a la red
2. Comprobar la IP en `script.js`
3. Verificar que los puertos 81 estén abiertos

### Las gráficas no se actualizan:
1. Verificar la conexión a `/metrics` endpoint
2. Revisar la consola del navegador para errores
3. Comprobar que Chart.js se carga correctamente

### Problemas de CORS:
Si usas Live Server, los requests externos pueden fallar. Usar Flask para desarrollo completo.

## 👥 Contribuidores

- **Universidad Cenfotec** - Escuela de Ingeniería del Software
- **MISIA** - Proyecto de Investigación Aplicada 2

## 📄 Licencia

Este proyecto es desarrollado como parte del programa académico de Universidad Cenfotec.

---

**© 2025 Universidad Cenfotec | Escuela de Ingeniería del Software**