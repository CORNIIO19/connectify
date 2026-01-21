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

container.addEventListener('scroll', () => {
  const currentScroll = container.scrollTop;

  const isScrollingDown = currentScroll > lastScrollTop;

  if (isScrollingDown) {
    header.classList.add('header-hidden');
  } else {
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
  let currentIndex = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
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

  // window.addEventListener('resize', updateCarousel); // Para adaptarse si cambia el tamaño
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.id === "hero") {
      if (entry.isIntersecting) {
        // Mostrar header especial
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
