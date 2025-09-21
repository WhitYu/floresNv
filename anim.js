// Sincronización de letras con la canción
const audio = document.getElementById("audio");
const btn = document.getElementById("playMusic");

btn.addEventListener("click", () => {
  // Siempre intenta poner el tiempo antes de reproducir
  audio.currentTime = 30;

  // Por si el audio no está listo aún
  audio.addEventListener('loadedmetadata', function setStartTime() {
    audio.currentTime = 4;
    audio.removeEventListener('loadedmetadata', setStartTime);
  });

  audio.muted = false;
  audio.volume = 1;
  audio.play();
  btn.style.display = "none";
});
const lyrics = document.querySelector("#lyrics");



// Animar letras con fade in/out suave
function updateLyrics() {
  const time = Math.floor(audio.currentTime);
  const currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    const fadeInDuration = 0.5;
    const fadeOutDuration = 1.5;
    let opacity = 1;

    if (time - currentLine.time < fadeInDuration) {
      opacity = (time - currentLine.time) / fadeInDuration;
    } else if (currentLine.time + 6 - time < fadeOutDuration) {
      opacity = (currentLine.time + 6 - time) / fadeOutDuration;
    }

    lyrics.style.opacity = Math.max(0, Math.min(1, opacity));
    lyrics.innerHTML = currentLine.text;
  } else {
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 200);

// Ocultar título después de 216 segundos
function ocultarTitulo() {
  const titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(() => {
    titulo.style.display = "none";
  }, 3000);
}
setTimeout(ocultarTitulo, 216000);

// Animación flotante para flores y pétalos
function addFloatyAnimation() {
  document.querySelectorAll('.flower').forEach(flower => {
    flower.classList.add('floaty');
  });
  document.querySelectorAll('.petal').forEach(petal => {
    petal.classList.add('floaty');
  });
}

// Espera a que las flores hayan crecido (ajusta el tiempo si tu animación es diferente)
setTimeout(addFloatyAnimation, 800);

// Crear pétalos animados flotantes
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // Tamaño aleatorio
  const size = Math.random() * 20 + 20;
  petal.style.width = `${size * 1.5}px`;
  petal.style.height = `${size}px`;

  // Posición inicial
  petal.style.top = `${Math.random() * 80 + 10}vh`;
  petal.style.left = "100vw";

  // Animación de brisa + flotación
  const duration = Math.random() * 10 + 12;
  petal.style.animation = `breeze ${duration}s linear forwards, floaty ${Math.random() * 2 + 4}s ease-in-out infinite alternate`;

  // Retraso aleatorio
  petal.style.animationDelay = `${Math.random() * 5}s, ${Math.random() * 2}s`;

  // Añadir al DOM
  document.body.appendChild(petal);

  // Eliminar cuando termina
  setTimeout(() => {
    petal.remove();
  }, (duration + 5) * 1000);
}

// Crear pétalos continuamente
setInterval(createPetal, 300);

// Opcional: animar hojas o centro de la flor
function animateLeavesAndCenter() {
  document.querySelectorAll('.flower__leaf, .flower__white-circle').forEach(el => {
    el.classList.add('floaty');
  });
}
setTimeout(animateLeavesAndCenter, 3000);


function mostrarMensajeFinal() {
  document.getElementById('mensaje-final').style.display = 'block';
  // Opcional: hacer scroll suave hacia el mensaje
  setTimeout(() => {
    document.getElementById('mensaje-final').scrollIntoView({ behavior: 'smooth' });
  }, 500);
}

setTimeout(mostrarMensajeFinal, 10000);

