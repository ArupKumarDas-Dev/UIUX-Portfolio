document.addEventListener('DOMContentLoaded', function() {

    const videoSourceDesktop = 'Pc.mp4';
    const videoSourceMobile = 'Mobile.mp4';

    const videoElement = document.getElementById('bg-video');

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function switchVideoSource(event) {
        if (event.matches) {
            if (videoElement.src !== videoSourceMobile) {
                console.log('Switching to mobile video');
                videoElement.src = videoSourceMobile;
            }
        } else {
            if (videoElement.src !== videoSourceDesktop) {
                console.log('Switching to desktop video');
                videoElement.src = videoSourceDesktop;
            }
        }
        videoElement.load();
        videoElement.play().catch(error => {
            console.warn("Autoplay was prevented:", error);
        });
    }
    mediaQuery.addEventListener('change', switchVideoSource);

    switchVideoSource(mediaQuery);

});

document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animate sections on scroll using Intersection Observer
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you shortly.');
            this.reset(); // Clear the form
            // In a real application, you'd send this data to a server using fetch()
        });
    }

    // Set initial active nav link if scrolled past hero
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const heroSection = document.querySelector('.hero-section');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If hero is visible, no nav link is active or 'About' might be
                navLinks.forEach(link => link.classList.remove('active'));
            } else {
                // If hero is not visible, ensure 'About' or first section is active
                const firstSectionLink = document.querySelector('.main-nav ul li a[href="#about"]');
                if (firstSectionLink) {
                     firstSectionLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Observe when 50% of hero is visible

    if (heroSection) {
        navObserver.observe(heroSection);
    }
});
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbz-BOgDg2jFaNVYKCsAv0Rj1-OZpJ_v7B3ZUVQG5MIDKTTXn0J-HlTxzUII8aA3XKFSDw/exec";
      const form = document.forms["submit-to-google-sheet"];
      const msg = document.getElementById("msg");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch(scriptURL, { method: "POST", body: new FormData(form) }).then(
          (response) => console.log("Success!", response)
        );
        msg.innerHTML = "Message has been sent succesfully";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form
          .reset()

          .catch((error) => console.error("Error!", error.message));
      });