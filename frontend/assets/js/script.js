$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

    // ==========================================================================
    // THEME SWITCHER CONTROLLER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        // Switch particles to white
        if (window.initParticles) {
            window.initParticles('#ffffff');
        }
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        if (window.initParticles) {
            window.initParticles('#000000');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (window.initParticles) window.initParticles('#ffffff');
        } else {
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (window.initParticles) window.initParticles('#000000');
        }
    });

    // ==========================================================================
    // INTERACTIVE retro DEVELOPER TERMINAL CLI
    // ==========================================================================
    const termBtn = document.getElementById('terminal-widget-button');
    const termWindow = document.getElementById('terminal-widget-window');
    const termCloseBtn = termWindow.querySelector('.terminal-close-btn');
    const termInput = document.getElementById('terminal-input');
    const termOutput = termWindow.querySelector('.terminal-output');
    const termChips = termWindow.querySelectorAll('.terminal-chip');
    const termBody = termWindow.querySelector('.terminal-body');
    const termCaret = termWindow.querySelector('.terminal-caret');

    // Welcome Message
    const welcomeMessage = `Welcome to Prem's Interactive Portfolio CLI (v1.0.0)
Type 'help' to see list of available commands or click on shortcut chips below.

visitor@prem-portfolio:~$ `;

    let isTerminalOpen = false;

    // Custom caret positioning
    const updateCaretPosition = () => {
        const textLength = termInput.value.length;
        // Approximation of character width in Courier New (approx 8.1px)
        const charWidth = 8.1;
        termCaret.style.left = (textLength * charWidth) + 'px';
    };

    termInput.addEventListener('input', updateCaretPosition);
    termInput.addEventListener('keydown', (e) => {
        setTimeout(updateCaretPosition, 0);
    });

    const focusTerminal = () => {
        termInput.focus();
        setTimeout(updateCaretPosition, 50);
    };

    termBody.addEventListener('click', focusTerminal);

    const toggleTerminal = () => {
        isTerminalOpen = !isTerminalOpen;
        if (isTerminalOpen) {
            termWindow.classList.add('open');
            termBtn.classList.add('active');
            termBtn.querySelector('i').className = 'fas fa-times';
            focusTerminal();
            
            // Initial welcome text
            if (termOutput.children.length === 0) {
                printWelcomeText();
            }
        } else {
            termWindow.classList.remove('open');
            termBtn.classList.remove('active');
            termBtn.querySelector('i').className = 'fas fa-terminal';
            termInput.blur();
        }
    };

    termBtn.addEventListener('click', toggleTerminal);
    termCloseBtn.addEventListener('click', toggleTerminal);

    const printWelcomeText = () => {
        const lines = welcomeMessage.split('\n');
        lines.forEach(line => {
            if (line.trim().startsWith('visitor@')) {
                return;
            }
            addLine(line, 'accent');
        });
    };

    const addLine = (text, type = '') => {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = text;
        termOutput.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    };

    // Commands implementation
    const commands = {
        help: () => {
            addLine('Available commands:', 'accent');
            addLine('  <span class="accent">about</span>       - Who is Prem Agravat?');
            addLine('  <span class="accent">skills</span>      - Technical skill metrics');
            addLine('  <span class="accent">projects</span>    - Showcase developed applications');
            addLine('  <span class="accent">experience</span>  - Industry work experience history');
            addLine('  <span class="accent">contact</span>     - How to get in touch');
            addLine('  <span class="accent">matrix</span>      - Simulate digital code rain canvas');
            addLine('  <span class="accent">clear</span>       - Clear the screen output');
            addLine('  <span class="accent">exit</span>        - Close this interactive console');
        },
        about: () => {
            addLine('=== About Prem Agravat ===', 'accent');
            addLine('Prem is a Computer Engineering student (B.Tech, 2025-2028) with a strong foundation in full-stack web development and cross-platform mobile apps.');
            addLine('He specializes in building scalable products using modern technologies like Flutter, PHP, JavaScript, and database systems.');
            addLine('He is currently a student at RK University, Rajkot, Gujarat, India, and has completed a Diploma in ICT from AVPTI.');
        },
        skills: () => {
            addLine('=== Tech Stack & Skills ===', 'accent');
            addLine('• Flutter / Dart   [====================] 100%');
            addLine('• Web Dev (PHP/JS) [==================  ] 90%');
            addLine('• Databases        [=================   ] 85%');
            addLine('• Git & GitHub     [====================] 100%');
            addLine('• UI Design Figma  [===============     ] 75%');
            addLine('Key Techs: PostgreSQL, MySQL, Firebase, Bootstrap, jQuery, Java.');
        },
        projects: () => {
            addLine('=== Featured Projects ===', 'accent');
            addLine('1. <span class="accent">BloodBridge</span> (Web App) - Real-time Blood Donor & Hospital matching. <a href="https://github.com/Prem-Agravat/BloodBridge" target="_blank">GitHub Link</a>');
            addLine('2. <span class="accent">NexusAI Universe</span> (Web App) - Futuristic AI-powered learning workspace. <a href="https://github.com/Prem-Agravat/nexusai-universe" target="_blank">GitHub Link</a>');
            addLine('3. <span class="accent">Akshar Sofa Showroom</span> (Interactive Website) - Premium furniture portfolio. <a href="https://akshar-sofa.vercel.app" target="_blank">Live Link</a>');
            addLine('4. <span class="accent">Clinic WhatsApp AI Agent</span> (AI Backend) - Medical scheduling assistant. <a href="https://github.com/Prem-Agravat/clinic-whatsapp-ai-agent" target="_blank">GitHub Link</a>');
            addLine('5. <span class="accent">ExpenSave Mobile App</span> (Flutter) - Personal finance tracking tool. <a href="https://github.com/Prem-Agravat/expen_save" target="_blank">GitHub Link</a>');
        },
        experience: () => {
            addLine('=== Industry Experience ===', 'accent');
            addLine('🏢 <span class="accent">9Brainz, Rajkot</span> - Web Developer Intern (PHP)');
            addLine('   Dec 2024 - Apr 2025 | Rajkot, India');
            addLine('   - Developed fundamental programming & logic logic-building.');
            addLine('   - Built full CRUD web features using PHP, Bootstrap, jQuery, AJAX, and PostgreSQL.');
            addLine('   - Implemented user authorization, form validation, and database schemas.');
        },
        contact: () => {
            addLine('=== Contact Information ===', 'accent');
            addLine('📧 Email:    <a href="mailto:agravatprem00@gmail.com">agravatprem00@gmail.com</a>');
            addLine('📞 Phone:    +91 9081959277');
            addLine('📍 Location: Rajkot, Gujarat, India');
            addLine('🔗 LinkedIn: <a href="https://www.linkedin.com/in/prem-agravat/" target="_blank">linkedin.com/in/prem-agravat/</a>');
            addLine('💻 GitHub:   <a href="https://github.com/Prem-Agravat" target="_blank">github.com/Prem-Agravat</a>');
        },
        clear: () => {
            termOutput.innerHTML = '';
        },
        exit: () => {
            toggleTerminal();
        },
        matrix: () => {
            startMatrixRain();
        }
    };

    const handleCommand = (rawInput) => {
        const input = rawInput.trim().toLowerCase();
        
        // Show entered command in terminal history
        addLine(`visitor@prem-portfolio:~$ ${rawInput}`, 'command-entered');

        if (!input) return;

        if (commands[input]) {
            commands[input]();
        } else {
            addLine(`Command not found: '${rawInput}'. Type 'help' to see list of available commands.`, 'error');
        }
    };

    termInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const val = termInput.value;
            termInput.value = '';
            handleCommand(val);
            focusTerminal();
        }
    });

    // Handle chips clicks
    termChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            handleCommand(cmd);
            focusTerminal();
        });
    });

    // === Matrix Falling Code Canvas Animation ===
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    const exitHint = document.querySelector('.matrix-exit-hint');
    let matrixInterval = null;
    let isMatrixRunning = false;

    const startMatrixRain = () => {
        isMatrixRunning = true;
        canvas.style.display = 'block';
        exitHint.style.display = 'block';
        
        // Hide terminal window temporarily so user can see fullscreen matrix
        termWindow.classList.remove('open');

        // Set dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const alphabet = katakana.split('');

        const fontSize = 16;
        const columns = canvas.width / fontSize;

        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet[Math.floor(Math.random() * alphabet.length)];
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        matrixInterval = setInterval(drawMatrix, 30);
    };

    const stopMatrixRain = () => {
        if (!isMatrixRunning) return;
        
        isMatrixRunning = false;
        clearInterval(matrixInterval);
        canvas.style.display = 'none';
        exitHint.style.display = 'none';
        
        // Reopen terminal
        termWindow.classList.add('open');
        focusTerminal();
    };

    // Click or keypress on canvas exits matrix
    canvas.addEventListener('click', stopMatrixRain);
    window.addEventListener('keydown', (e) => {
        if (isMatrixRunning) {
            stopMatrixRain();
            e.preventDefault();
        }
    });

    window.addEventListener('resize', () => {
        if (isMatrixRunning) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Prem Agravat";
            $("#favicon").attr("href", "assets/images/hero.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Computer Engineering"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        const techBadges = project.tech ? project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('') : '';
        projectHTML += `
        <div class="box tilt">
          <div class="img-container">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
          </div>
          <div class="content">
            <h3>${project.name}</h3>
            <p class="desc">${project.desc}</p>
            <div class="tech-stack">
              ${techBadges}
            </div>
            <div class="btns">
              <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
              <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
            </div>
          </div>
        </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();

// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .instagram', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });