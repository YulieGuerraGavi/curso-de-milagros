// ===== Botón principal (solo si existe en la página) =====
// Cuando la página termine de cargar, revisa si existe el botón principal
document.addEventListener("DOMContentLoaded", () => {
  // Busca el botón principal en la página
  const botonCta = document.querySelector(".btn-principal");

  // Si el botón existe, le agrega la acción al hacer clic
  if (botonCta) {
    botonCta.addEventListener("click", (evento) => {
      // Evita que el botón haga lo que hace normalmente
      evento.preventDefault();
      // Muestra un mensaje en una ventanita
      alert("Has seleccionado iniciar tu postulación a la convocatoria.");
    });
  }
});

// ===== Carrusel =====
// Guarda cuál imagen se está mostrando (0 es la primera)
let slideIndex = 0;
// Guarda el reloj que cambia las imágenes solo
let timerCarrusel = null;

// Muestra la imagen que le toca y marca su puntito
function actualizarSlides() {
  // Busca todas las imágenes y todos los puntitos
  const slides = document.querySelectorAll(".slide");
  const puntos = document.querySelectorAll(".punto");

  // Si la página no tiene carrusel, no hace nada
  if (!slides.length) return;

  // Normalizar si se sale de rango
  // Si pasa de la última imagen, vuelve a la primera
  if (slideIndex >= slides.length) slideIndex = 0;
  // Si retrocede de la primera, salta a la última
  if (slideIndex < 0) slideIndex = slides.length - 1;

  // Apagar todos
  // Esconde todas las imágenes y quita la marca de todos los puntitos
  slides.forEach((s) => s.classList.remove("activa"));
  puntos.forEach((p) => p.classList.remove("activo"));

  // Encender el actual
  // Muestra solo la imagen que le toca
  slides[slideIndex].classList.add("activa");
  // Marca el puntito de esa imagen
  if (puntos[slideIndex]) {
    puntos[slideIndex].classList.add("activo");
  }
}

// Se usa en las flechas: avanza o retrocede una imagen (1 adelante, -1 atrás)
function cambiarCarrusel(n) {
  slideIndex += n;
  actualizarSlides();
  // Reinicia el reloj para que no cambie justo después de hacer clic
  reiniciarTiempo();
}

// Se usa en los puntitos: salta directo a la imagen elegida
function irACarrusel(n) {
  slideIndex = n;
  actualizarSlides();
  reiniciarTiempo();
}

// Hace que las imágenes cambien solas cada 5 segundos
function reiniciarTiempo() {
  // Detiene el reloj anterior para no tener dos funcionando a la vez
  clearInterval(timerCarrusel);
  // Inicia un reloj nuevo que pasa a la siguiente imagen cada 5 segundos
  timerCarrusel = setInterval(() => {
    slideIndex++;
    actualizarSlides();
  }, 5000);
}

// Iniciar automáticamente
// Muestra la primera imagen y arranca el cambio automático al cargar la página
actualizarSlides();
reiniciarTiempo();
