document.addEventListener('DOMContentLoaded', () => {
  // Manejo de clic en el botón principal para desplazamiento suave
  const botonCta = document.querySelector('.btn-principal');

  botonCta.addEventListener('click', (evento) => {
    evento.preventDefault();
    alert('Has seleccionado iniciar tu postulación a la convocatoria.');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const diapositivas = document.querySelectorAll('.slide');
  const puntos = document.querySelectorAll('.punto');
  const botonPrev = document.querySelector('.btn-prev');
  const botonNext = document.querySelector('.btn-next');

  if (!diapositivas.length) return;

  let indiceActual = 0;
  let temporizador;

  function cambiarSlide(nuevoIndice) {
    diapositivas[indiceActual].classList.remove('activa');
    if (puntos[indiceActual]) puntos[indiceActual].classList.remove('activo');

    indiceActual = (nuevoIndice + diapositivas.length) % diapositivas.length;

    diapositivas[indiceActual].classList.add('activa');
    if (puntos[indiceActual]) puntos[indiceActual].classList.add('activo');
  }

  function siguiente() {
    cambiarSlide(indiceActual + 1);
  }

  function anterior() {
    cambiarSlide(indiceActual - 1);
  }

  function iniciarAutoPlay() {
    temporizador = setInterval(siguiente, 6000);
  }

  function reiniciarAutoPlay() {
    clearInterval(temporizador);
    iniciarAutoPlay();
  }

  botonNext.addEventListener('click', () => {
    siguiente();
    reiniciarAutoPlay();
  });

  botonPrev.addEventListener('click', () => {
    anterior();
    reiniciarAutoPlay();
  });

  puntos.forEach((punto) => {
    punto.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-indice'), 10);
      cambiarSlide(idx);
      reiniciarAutoPlay();
    });
  });

  iniciarAutoPlay();
});

// Función para inicializar el carrusel
function inicializarCarrusel() {
  const slides = document.querySelectorAll('.slide');
  const puntos = document.querySelectorAll('.punto');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  if (slides.length === 0) {
    console.warn('No se encontraron diapositivas (.slide) en el DOM.');
    return;
  }

  let indiceActual = 0;
  let temporizador = null;

  function mostrarSlide(nuevoIndice) {
    // Quitar estado activo de la diapositiva y punto actual
    slides[indiceActual].classList.remove('activa');
    if (puntos[indiceActual]) {
      puntos[indiceActual].classList.remove('activo');
    }

    // Calcular el siguiente índice circularmente (0 a n)
    indiceActual = (nuevoIndice + slides.length) % slides.length;

    // Activar nueva diapositiva y punto
    slides[indiceActual].classList.add('activa');
    if (puntos[indiceActual]) {
      puntos[indiceActual].classList.add('activo');
    }
  }

  function avanzar() {
    mostrarSlide(indiceActual + 1);
  }

  function retroceder() {
    mostrarSlide(indiceActual - 1);
  }

  function reiniciarTimer() {
    clearInterval(temporizador);
    temporizador = setInterval(avanzar, 5000); // Cambia cada 5 segundos
  }

  // Eventos de los botones de navegación
  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      avanzar();
      reiniciarTimer();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      retroceder();
      reiniciarTimer();
    });
  }

  // Eventos de los puntos indicadores
  puntos.forEach((punto, i) => {
    punto.addEventListener('click', (e) => {
      e.stopPropagation();
      mostrarSlide(i);
      reiniciarTimer();
    });
  });

  // Iniciar pase automático
  reiniciarTimer();
  console.log('Carrusel iniciado exitosamente con', slides.length, 'imágenes.');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarCarrusel);
} else {
  inicializarCarrusel();
}