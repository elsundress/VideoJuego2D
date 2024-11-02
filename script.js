const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
const balls = []; // Aquí almacenarás las pelotas
const backgroundImage = new Image();
backgroundImage.src = 'assets/cancha.png'; // Cambia 'background.png' al nombre de tu imagen de fondo

// Función para crear una nueva pelota
function createBall() {
    const ball = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20, // Radio de la pelota de tenis
        dx: (Math.random() - 0.5) * 5,
        dy: (Math.random() - 0.5) * 5
    };
    balls.push(ball);
}

// Función para dibujar la pelota de tenis
function drawTennisBall(ball) {
    // Dibuja el círculo de la pelota
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false); // Dibuja el círculo
    ctx.fillStyle = '#A6D55C'; // Color amarillo verdoso de la pelota de tenis
    ctx.fill(); // Rellena el círculo

    // Dibuja las costuras de la pelota
    ctx.strokeStyle = '#FFFFFF'; // Color blanco para las costuras
    ctx.lineWidth = 4; // Grosor de las líneas
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI, false); // Parte superior de la costura
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, Math.PI, Math.PI * 2, false); // Parte inferior de la costura
    ctx.stroke();
}

// Función para actualizar el juego
function update() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Dibujar el fondo
    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Colisiones con los bordes
        if (ball.x < 0 || ball.x > canvas.width) ball.dx = -ball.dx;
        if (ball.y < 0 || ball.y > canvas.height) ball.dy = -ball.dy;

        // Dibujar la pelota como una pelota de tenis
        drawTennisBall(ball);
    });
}

// Evento para eliminar pelotas con clic
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    balls.forEach((ball, index) => {
        const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
        if (distance < ball.radius) {
            balls.splice(index, 1); // Eliminar la pelota
            score++;
            document.getElementById('score').innerText = `Puntuación: ${score}`;
        }
    });
});

// Mover el cursor personalizado
const customCursor = document.getElementById('customCursor');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    customCursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`; // Ajusta el puntero al centro
});

// Bucle del juego
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

// Inicialización
setInterval(createBall, 1000); // Crear una nueva pelota cada segundo
gameLoop();
