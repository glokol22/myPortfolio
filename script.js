const canvasContainer = document.getElementById('header-canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

let points = [];

function resizeCanvas() {
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;
    generatePoints(canvas.width, canvas.height);
}

function generatePoints(width, height) {
    points = [];
    for (let i = 0; i < width / 50; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
        ctx.fill();

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x > canvas.width) p1.x = 0;
        if (p1.x < 0) p1.x = canvas.width;
        if (p1.y > canvas.height) p1.y = 0;
        if (p1.y < 0) p1.y = canvas.height;

        for (let j = i + 1; j < points.length; j++) {
            const p2 = points[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 0, 0, ${(1 - dist / 100) * 0.5})`;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
draw();






// Contact Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/send-email', { // Replace with your server-side endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

/** creating a button to toggle the navbar */
var menu_icon = document.querySelector('.menu_icon');
var nav = document.querySelector('.navlinks');
var links = document.querySelector('.navlinks li');

menu_icon.addEventListener('click', function(){
    this.classList.toggle('click');
    nav.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('.input', {
        strings: ["Data Analyst", "Web Developer", "Researcher"],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true,
        cursorChar: '|',
        smartBackspace: true 
    });
});



const skills = [
    "SQL", "Python (Pandas, NumPy)", "Data Visualization (Power BI, Tableau)", 
    "Machine Learning", "Exploratory Data Analysis", "A/B Testing", 
    "Big Data (Spark, Hadoop)", "Cloud Platforms (AWS, Google Cloud)", 
    "Business Intelligence", "Statistical Modeling"
];

const textContainer = document.getElementById("scrolling-text");

// Join skills with the diamond icon separator and duplicate for seamless looping
const textContent = skills.join(" 🔶 ");
textContainer.innerHTML = `<span>${textContent} 🔶 ${textContent}</span>`;





document.addEventListener('DOMContentLoaded', function() {
    const readMoreButtons = document.querySelectorAll('.read-more-button');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleUrl = this.getAttribute('data-article');
            // Open the article in a new tab
            window.open(articleUrl, '_blank');
        });
    });
});

