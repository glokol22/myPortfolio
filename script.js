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



document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu_icon");
    const navLinks = document.querySelector(".navlinks");
    const navLinkItems = document.querySelectorAll(".navlinks a");

    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinkItems.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  });



// document.getElementById("contact-form").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const message = document.getElementById("message").value.trim();
//     const responseEl = document.getElementById("response-message");

//     // Reset styles and hide it first
//     responseEl.classList.remove("error", "success", "show");
//     responseEl.style.display = "none";

//     fetch("http://127.0.0.1:5000/submit-form", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, message }),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         if (data.success) {
//             responseEl.innerHTML = "<span class='emoji'>😊</span> Thank you for reaching out! I will get back to you soon.";
//             responseEl.classList.add("success", "show");
//         } else {
//             responseEl.innerHTML = "<span class='emoji'>⚠️</span> Oops! Something went wrong. Please try again.";
//             responseEl.classList.add("error", "show");
//         }
//         responseEl.style.display = "block"; // Make it visible
//         document.getElementById("contact-form").reset();
//     })
//     .catch((err) => {
//         responseEl.innerHTML = "<span class='emoji'>❗</span> There was an error. Please try again later.";
//         responseEl.classList.add("error", "show");
//         responseEl.style.display = "block"; // Make it visible
//         console.error(err);
//     });
// });

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseEl = document.getElementById("response-message");

    // Reset styles and hide it first
    responseEl.classList.remove("error", "success", "show");
    responseEl.style.display = "none";

    // Get reCAPTCHA token
    grecaptcha.ready(function() {
        grecaptcha.execute('6LczMx4rAAAAANp_P7-DM_5VEAl4j6scDawzBOZ4', { action: 'submit' })
            .then(function(token) {
                // Send form data along with reCAPTCHA token to the server
                fetch("http://127.0.0.1:5000/submit-form", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, message, token }),
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        responseEl.innerHTML = "<span class='emoji'>😊</span> Thank you for reaching out! I will get back to you soon.";
                        responseEl.classList.add("success", "show");
                    } else {
                        responseEl.innerHTML = "<span class='emoji'>⚠️</span> Oops! Something went wrong. Please try again.";
                        responseEl.classList.add("error", "show");
                    }
                    responseEl.style.display = "block"; // Make it visible
                    document.getElementById("contact-form").reset();
                })
                .catch((err) => {
                    responseEl.innerHTML = "<span class='emoji'>❗</span> There was an error. Please try again later.";
                    responseEl.classList.add("error", "show");
                    responseEl.style.display = "block"; // Make it visible
                    console.error(err);
                });
            });
    });
});