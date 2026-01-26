// declaracion de funcion para ocultar el header en la pagina
// NOTA -> INVESTIGAR LA FUNCION WINDOW. DE JS PARA PODER ENTENDER MAS LA LOGICA Y LO QUE PERMITE LA FUNCION
//------------Nueva funcion del header----------------
// const header = document.querySelector('.header');
// const container = document.querySelector('.main');
// const seccionTransparente = document.querySelector('.hero-banner');

// function actualizarHeaderSegunSeccion() {
//   const containerRect = container.getBoundingClientRect();
//   const seccionRect = seccionTransparente.getBoundingClientRect();

//   // Verifica si al menos parte de la sección está visible en el contenedor
//   const dentroVisible =
//     seccionRect.top - containerRect.top <= 100 && // ya empezó la sección
//     seccionRect.bottom - containerRect.top >= 100; // aún no termina

//   if (dentroVisible) {
//     header.classList.add('transparent');
//   } else {
//     header.classList.remove('transparent');
//   }
// }

// // Solo cambia el fondo, no oculta el header
// container.addEventListener('scroll', actualizarHeaderSegunSeccion);

// // También ejecutamos una vez al cargar
// window.addEventListener('load', () => {
//   setTimeout(actualizarHeaderSegunSeccion, 200);
// });

const header = document.querySelector('.header');
const container = document.querySelector('.main');

let lastScrollTop = 0;

// Función para verificar si estamos en hero o cobertura
function isInHeroOrCobertura() {
  const heroRect = document.getElementById('hero')?.getBoundingClientRect();
  const coberturaRect = document.getElementById('cobertura')?.getBoundingClientRect();
  
  const inHero = heroRect && heroRect.top <= 100 && heroRect.bottom >= 100;
  const inCobertura = coberturaRect && coberturaRect.top <= 100 && coberturaRect.bottom >= 100;
  
  return inHero || inCobertura;
}

container.addEventListener('scroll', () => {
  const currentScroll = container.scrollTop;
  const isScrollingDown = currentScroll > lastScrollTop;

  // Solo ocultar el header si NO estamos en hero o cobertura
  if (!isInHeroOrCobertura()) {
    if (isScrollingDown) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }
  } else {
    // Si estamos en hero o cobertura, siempre mostrar el header
    header.classList.remove('header-hidden');
  }

  // Actualiza el último valor de scroll
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


  //----------- logica del carrusel ---------------------------------- 

  const track = document.querySelector('.carousel__clientes-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  const carouselSection = document.getElementById('quienesSomos');
  const heroSectionRef = document.getElementById('hero');
  const experienciasSection = document.getElementById('experiencias');
  const mainContainer = document.querySelector('.main');
  
  let currentIndex = 0;
  let isScrollingCarousel = false;
  let carouselScrollPosition = 0;
  const lastSlideIndex = slides.length - 1;

  function animateSlideElements(slideIndex) {
    const slide = slides[slideIndex];
    if (!slide) return;

    const targets = Array.from(
      slide.querySelectorAll('*:not(.slide-inner):not(.slide2-inner):not(.slide3-inner):not(.slide4-inner)')
    );

    targets.forEach((el, index) => {
      const style = getComputedStyle(el);
      const hasBackground =
        style.backgroundImage !== 'none' ||
        (style.backgroundColor &&
          style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          style.backgroundColor.toLowerCase() !== 'transparent');

      if (hasBackground && el.classList.contains('slide-inner')) return;
      if (hasBackground && el.classList.contains('slide2-inner')) return;
      if (hasBackground && el.classList.contains('slide3-inner')) return;
      if (hasBackground && el.classList.contains('slide4-inner')) return;

      el.classList.remove('animate__animated', 'animate__fadeInUp');
      el.style.removeProperty('--animate-duration');
      el.style.animationDelay = '';

      void el.offsetWidth;

      el.classList.add('animate__animated', 'animate__fadeInUp');
      el.style.setProperty('--animate-duration', '0.6s');
      el.style.animationDelay = `${Math.min(index * 60, 360)}ms`;
    });
  }

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
    animateSlideElements(currentIndex);
  }

  function isCarouselInView() {
    const rect = carouselSection.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
  }

  // Bloquear scroll vertical cuando estamos en el carrusel
  mainContainer.addEventListener('scroll', (e) => {
    if (isScrollingCarousel && isCarouselInView()) {
      // Mantener el scroll en la posición del carrusel
      mainContainer.scrollTop = carouselScrollPosition;
    } else if (isCarouselInView()) {
      // Guardar la posición del scroll cuando estamos en el carrusel
      carouselScrollPosition = mainContainer.scrollTop;
    }
  });

  // Control del wheel para navegar los slides
  mainContainer.addEventListener('wheel', (e) => {
    const inCarousel = isCarouselInView();
    
    if (!inCarousel) return;

    e.preventDefault();

    if (isScrollingCarousel) return;

    const delta = e.deltaY;
    isScrollingCarousel = true;

    if (delta > 0) {
      // Scroll hacia abajo
      if (currentIndex < lastSlideIndex) {
        currentIndex++;
        updateCarousel();
        setTimeout(() => { isScrollingCarousel = false; }, 500);
      } else if (currentIndex === lastSlideIndex) {
        // Último slide: permite pasar a experiencias
        isScrollingCarousel = false;
        experienciasSection?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (delta < 0) {
      // Scroll hacia arriba
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        setTimeout(() => { isScrollingCarousel = false; }, 500);
      } else if (currentIndex === 0) {
        // Primer slide: permite pasar al hero
        isScrollingCarousel = false;
        heroSectionRef?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, { passive: false });

  nextButton.addEventListener('click', () => {
    if (currentIndex < lastSlideIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  if (slides.length > 0) {
    animateSlideElements(0);
  }

  //--------- Fin del carrusel ----------------------------------------

// En este bloque de codigo se hace el scroll sueve en la navegacion del header 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
//--- fin del scroll suave en la barra de navegacion ------------------

// -----------funcion dle header dinamico-------------------

const headerHero = document.getElementById("header");
const headerGeneral= document.getElementById("header__secundario");
const heroSection = document.getElementById("hero");
const coberturaSection = document.getElementById("cobertura");

// Mostrar el header de hero al cargar la página
if (headerHero) {
  headerHero.classList.remove("hidden");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.id === "hero" || entry.target.id === "cobertura") {
      if (entry.isIntersecting) {
        // Mostrar header especial (primario/blanco) en hero y cobertura
        headerGeneral.classList.add("hidden");
        headerHero.classList.remove("hidden");
      } else {
        // Mostrar header general
        headerHero.classList.add("hidden");
        headerGeneral.classList.remove("hidden");
      }
    }
  });
}, { threshold: 0.6 });

observer.observe(heroSection);
observer.observe(coberturaSection);

// Ciclo de palabras del título del hero
const rotatingWords = Array.from(document.querySelectorAll('.hero-title--rotating .rotating-word'));
let rotatingIndex = 0;
const rotationDelay = 2600;

function cycleRotatingWords() {
  if (rotatingWords.length <= 1) return;

  const currentWord = rotatingWords[rotatingIndex];
  const nextIndex = (rotatingIndex + 1) % rotatingWords.length;
  const nextWord = rotatingWords[nextIndex];

  currentWord.classList.remove('enter');
  currentWord.classList.add('leave');

  nextWord.classList.remove('leave');
  nextWord.classList.add('active', 'enter');

  setTimeout(() => {
    currentWord.classList.remove('active', 'leave');
  }, 550);

  rotatingIndex = nextIndex;
}

if (rotatingWords.length) {
  rotatingWords[0].classList.add('active', 'enter');
  if (rotatingWords.length > 1) {
    setInterval(cycleRotatingWords, rotationDelay);
  }
}

// Animaciones on-scroll con animate.css
const scrollSections = document.querySelectorAll('main section');
const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const targets = Array.from(
        entry.target.querySelectorAll(
          '*:not(.hero-title):not(.hero-title--rotating):not(.rotating-word)'
        )
      );

      targets.forEach((el, index) => {
        const style = getComputedStyle(el);
        const hasBackground =
          style.backgroundImage !== 'none' ||
          (style.backgroundColor &&
            style.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
            style.backgroundColor.toLowerCase() !== 'transparent');

        const isExperienciasGrid =
          entry.target.id === 'experiencias' &&
          ['div1', 'div2', 'div3', 'div4', 'div5', 'div6'].some((cls) =>
            el.classList.contains(cls)
          );

        if (hasBackground && !isExperienciasGrid) return; // no animar contenedores que pintan el fondo (excepto grid experiencias)

        if (el.dataset.animating === 'true') return; // evita reinicios mientras corre
        el.dataset.animating = 'true';

        el.classList.add('animate__animated', 'animate__fadeInUp');
        el.style.setProperty('--animate-duration', '0.6s');
        el.style.animationDelay = `${Math.min(index * 60, 360)}ms`;

        const handleAnimationEnd = () => {
          el.classList.remove('animate__animated', 'animate__fadeInUp');
          el.style.removeProperty('--animate-duration');
          el.style.animationDelay = '';
          el.dataset.animating = '';
          el.removeEventListener('animationend', handleAnimationEnd);
        };

        el.addEventListener('animationend', handleAnimationEnd);
      });
    });
  },
  { threshold: 0.3 }
);

scrollSections.forEach((section) => animateObserver.observe(section));

// --------- Highlight Active Section in Header ---------
const headerLinks = document.querySelectorAll('[data-section]');
const sections = {
  quienesSomos: document.getElementById('quienesSomos'),
  experiencias: document.getElementById('experiencias'),
  servicios: document.getElementById('servicios'),
  cobertura: document.getElementById('cobertura')
};

function highlightActiveLink() {
  let currentSection = null;
  let maxVisibility = 0;

  // Detectar cuál sección está más visible
  for (const [sectionName, sectionEl] of Object.entries(sections)) {
    if (!sectionEl) continue;
    
    const rect = sectionEl.getBoundingClientRect();
    const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
    
    if (visible > maxVisibility) {
      maxVisibility = visible;
      currentSection = sectionName;
    }
  }

  // Actualizar estilos de los links
  headerLinks.forEach(link => {
    if (link.getAttribute('data-section') === currentSection) {
      link.classList.add('active-section');
    } else {
      link.classList.remove('active-section');
    }
  });
}

// Ejecutar al hacer scroll
mainContainer.addEventListener('scroll', highlightActiveLink);
window.addEventListener('load', highlightActiveLink);
// --------- Fin Highlight Active Section ---------


// ====== animacion mapa cobertura =====

// Obtener el documento SVG del embed
const mapaEmbed = document.getElementById("mapa");

// Esperar a que el SVG se cargue
if (mapaEmbed) {
  mapaEmbed.addEventListener("load", function() {
    try {
      const svgDoc = mapaEmbed.getSVGDocument();
      if (svgDoc) {
        const estados = svgDoc.querySelectorAll("path");

        estados.forEach(e => {
          e.addEventListener("click", function() {
            // Remover clase activo de todos
            estados.forEach(x => {
              x.classList.remove("activo");
            });
            // Agregar a este
            e.classList.add("activo");
            // Mostrar nombre del estado
            const id = this.id || "Estado desconocido";
            document.getElementById("info").innerText = `Región: ${id}`;
          });
          
          e.addEventListener("mouseenter", function() {
            this.style.cursor = "pointer";
          });
        });
      }
    } catch (err) {
      console.log("SVG cargado correctamente");
    }
  });
}

// ======= fin mapa cobertura =======