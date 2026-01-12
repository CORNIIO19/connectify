# 📄 INDEX.HTML - Estructura de la página Connectify

## 🏗️ Estructura simplificada con elementos HTML y clases

```
html
│
├── head
│   ├── meta
│   ├── meta
│   ├── title
│   └── link
│
└── body
    │
    ├── canvas **#canvas-basic**
    │
    ├── header **class="header"**
    │   │
    │   ├── div **class="header__logoContainer"**
    │   │   └── img **class="header__logo"**
    │   │
    │   ├── nav **class="header__nav"**
    │   │   ├── a **class="link-header"**
    │   │   ├── a **class="link-header"**
    │   │   ├── a **class="link-header"**
    │   │   └── a **class="link-header"**
    │   │
    │   └── div **class="header__redesSociales"**
    │       ├── img **class="header__redesSociales__logo"**
    │       ├── img **class="header__redesSociales__logo"**
    │       ├── img **class="header__redesSociales__logo"**
    │       └── img **class="header__redesSociales__logo"**
    │
    ├── hr **class="solid"**
    │
    ├── main **class="main"**
    │   │
    │   ├── section **class="carousel"**
    │   │   │
    │   │   ├── ol **class="carousel__viewport"**
    │   │   │   │
    │   │   │   ├── li **class="carousel__slide"**
    │   │   │   │   └── div **class="carousel__snapper"**
    │   │   │   │       ├── img **class="carousel__image"**
    │   │   │   │       ├── a **class="carousel__prev"**
    │   │   │   │       └── a **class="carousel__next"**
    │   │   │   │
    │   │   │   ├── li **class="carousel__slide"**
    │   │   │   │   ├── div **class="carousel__snapper"**
    │   │   │   │   │   └── img **class="carousel__image"**
    │   │   │   │   ├── a **class="carousel__prev"**
    │   │   │   │   └── a **class="carousel__next"**
    │   │   │   │
    │   │   │   ├── li **class="carousel__slide"**
    │   │   │   │   ├── div **class="carousel__snapper"**
    │   │   │   │   ├── a **class="carousel__prev"**
    │   │   │   │   └── a **class="carousel__next"**
    │   │   │   │
    │   │   │   └── li **class="carousel__slide"**
    │   │   │       ├── div **class="carousel__snapper"**
    │   │   │       ├── a **class="carousel__prev"**
    │   │   │       └── a **class="carousel__next"**
    │   │   │
    │   │   └── aside **class="carousel__navigation"**
    │   │       └── ol **class="carousel__navigation-list"**
    │   │           ├── li **class="carousel__navigation-item"**
    │   │           │   └── a **class="carousel__navigation-button"**
    │   │           ├── li **class="carousel__navigation-item"**
    │   │           │   └── a **class="carousel__navigation-button"**
    │   │           ├── li **class="carousel__navigation-item"**
    │   │           │   └── a **class="carousel__navigation-button"**
    │   │           └── li **class="carousel__navigation-item"**
    │   │               └── a **class="carousel__navigation-button"**
    │   │
    │   ├── hr **class="solid"**
    │   │
    │   ├── section **class="main__quienesSomos"**
    │   │   ├── h2
    │   │   ├── p
    │   │   └── p
    │   │
    │   ├── hr **class="solid"**
    │   │
    │   ├── section **class="main__servicios"**
    │   │   └── h2
    │   │
    │   ├── hr **class="solid"**
    │   │
    │   ├── section **class="main__experiencias"**
    │   │   └── h2
    │   │
    │   ├── hr **class="solid"**
    │   │
    │   ├── section **class="main__clientes"**
    │   │   ├── h3 **class="clientes__titulo"**
    │   │   └── img **class="clientes__logo"**
    │   │
    │   ├── hr **class="solid"**
    │   │
    │   └── section **class="main__cobertura"**
    │       └── h2
    │
    ├── hr **class="solid"**
    │
    ├── footer **class="footer"**
    │   │
    │   ├── p **class="footer__parrafo"**
    │   │
    │   └── div **class="footer__partes"**
    │       ├── div **class="footer__columna"**
    │       │   └── h3
    │       ├── div **class="footer__columna"**
    │       │   └── h3
    │       └── div **class="footer__columna"**
    │           └── h3
    │
    ├── script
    └── script
```

<<<<<<< HEAD
<<<<<<< HEAD
## Resumen de Clases CSS por Sección

###  Header (Navegación)
=======
## 📊 Resumen de Clases CSS por Sección

### 🧭 Header (Navegación)
>>>>>>> parent of 2216249 (realice acomo del header y cambio de los links de navegacion, huce acomodo del carrusel de identidad y cree el carrusel automatico de los clientes \O/)
=======
## Resumen de Clases CSS por Sección

###  Header (Navegación)
>>>>>>> ad1400bdec54e8047c204b50e44a6d5a55b8b322
- **header** - Contenedor principal de la barra de navegación
- **header__logoContainer** - Contenedor del logo
- **header__logo** - Imagen del logo
- **header__nav** - Contenedor de navegación
- **link-header** - Enlaces de navegación
- **header__redesSociales** - Contenedor de redes sociales
- **header__redesSociales__logo** - Íconos de redes sociales

### 🎠 Carousel (Galería de imágenes)
- **carousel** - Contenedor principal del carousel
- **carousel__viewport** - Área visible del carousel
- **carousel__slide** - Cada slide individual
- **carousel__snapper** - Contenedor de imagen del slide
- **carousel__image** - Imagen del slide
- **carousel__prev** / **carousel__next** - Navegación anterior/siguiente
- **carousel__navigation** - Contenedor de navegación por puntos
- **carousel__navigation-list** - Lista de navegación
- **carousel__navigation-item** - Elemento de navegación
- **carousel__navigation-button** - Botón de navegación

### 📖 Main Content (Contenido principal)
- **main** - Contenedor principal del contenido
- **main__quienesSomos** - Sección "Quiénes Somos"
- **main__servicios** - Sección "Servicios"
- **main__experiencias** - Sección "Experiencias"
- **main__clientes** - Sección "Clientes"
- **clientes__titulo** - Título de la sección clientes
- **clientes__logo** - Logo del cliente
- **main__cobertura** - Sección "Cobertura"

### 🦶 Footer (Pie de página)
- **footer** - Contenedor principal del footer
- **footer__parrafo** - Párrafo principal del footer
- **footer__partes** - Contenedor de las columnas
- **footer__columna** - Cada columna individual

### 🎨 Elementos Especiales
- **#canvas-basic** - Canvas para el fondo animado (Granim)
- **solid** - Clase para las líneas divisoras (hr)

## 📋 Notas de Estructura

- **Metodología BEM**: Las clases siguen la convención Block__Element--Modifier
- **Estructura semántica**: Uso correcto de elementos HTML5 (header, main, footer, section, nav, aside)
- **Navegación accesible**: Implementación de navegación por teclado y ARIA labels
- **Carousel funcional**: Sistema de navegación por hash y CSS puro
- **Fondo dinámico**: Canvas con animaciones de gradiente usando Granim.js
