      const hamburger = document.getElementById("burger");
      const navMenu = document.getElementById("nav-menu");
      const navBar = document.querySelector(".navbar");
      const socialIcons = document.querySelector(".social-icons");
      const aboutSection = document.querySelector(".about-section");
      const heroSection = document.querySelector(".hero-section");
      const burger = document.querySelector(".burger");
      const header = document.getElementById("header");

      //hamburger button toggle effect
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        burger.classList.toggle("fa-bars");
        burger.classList.toggle("fa-times");
      });

      // Close navMenu when nav link clicked
     document.querySelectorAll("#nav-menu ul li a").forEach((link) => {
       link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.add("fa-bars");
        hamburger.classList.remove("fa-times");
       });
      });

      const listT = document.querySelectorAll(".transition");

      function transition() {
        listT.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const top = window.innerHeight - rect.top;
          if (top > 50) {
            element.classList.add("show");
          } else {
            element.classList.remove("show");
          }
        });
      }

      window.addEventListener("scroll", transition);
      window.addEventListener("resize", transition);
      transition();

       const listA = document.querySelectorAll(".animation");

      function animation() {
        const windowHeight = window.innerHeight;

        listA.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const triggerPoint = windowHeight - rect.height * 0.2;

          if (rect.top < triggerPoint) {
            element.classList.add("visible");
          } else {
            element.classList.remove("visible");
          }
        });
      }

      window.addEventListener("scroll", animation);
      window.addEventListener("resize", animation);
      animation();

       //smmoth scroll for anchor links
      document.querySelectorAll('#nav-menu ul li a').forEach(anchor => {
       anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
            }
         });
        });
        
      //live anchor link animation
     function activeMenuAnimation(eventType) {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('#nav-menu a');
    
      window.addEventListener(eventType, function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
          });
         });
        }
        activeMenuAnimation('scroll');
        activeMenuAnimation('resize');


    
      /* AOS.init({
        duration: 1000,
        once: true,
      }); */
/* _______________________________________________________________________________________________________________________ */

      function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            let isValid = true;
            
            if (name.trim() === '') {
                isValid = false;
                showError('name', 'Please enter your name');
            } else {
                removeError('name');
            }
            
            if (email.trim() === '' || !isValidEmail(email)) {
                isValid = false;
                showError('email', 'Please enter a valid email');
            } else {
                removeError('email');
            }
            
            if (subject.trim() === '') {
                isValid = false;
                showError('subject', 'Please enter a subject');
            } else {
                removeError('subject');
            }
            
            if (message.trim() === '') {
                isValid = false;
                showError('message', 'Please enter your message');
            } else {
                removeError('message');
            }
            
            // Submit form if valid
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Prepare template parameters
                const templateParams = {
                    to_email: 'mskkumudesh4900@gmail.com',
                    email: email, // user email
                    name: name,
                    title: subject,
                    message: message,
                };
                
                // Send email using EmailJS
                emailjs.send('default_service', 'template_contact', templateParams)
                    .then(function(response) {
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Your message has been sent successfully!';
                        contactForm.appendChild(successMessage);
                        
                        // Reset form
                        contactForm.reset();
                        
                        // Reset button
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        
                        // Remove success message after 3 seconds
                        setTimeout(() => {
                            successMessage.remove();
                        }, 5000);
                    })
                    .catch(function(error) {
                        // Show error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message form-error';
                        errorMessage.textContent = 'Oops! Something went wrong sending your message. Please try again later.';
                        contactForm.appendChild(errorMessage);
                        
                        // Reset button
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        
                        // Remove error message after 5 seconds
                        setTimeout(() => {
                            errorMessage.remove();
                        }, 5000);
                        
                        console.error('EmailJS error:', error);
                    });
            }
        });
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Function to show error message
    function showError(inputId, message) {
        const inputElement = document.getElementById(inputId);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Remove any existing error message
        removeError(inputId);
        
        // Add error class to input
        inputElement.classList.add('input-error');
        
        // Add error message after input
        inputElement.parentNode.appendChild(errorMessage);
    }
    
    // Function to remove error message
    function removeError(inputId) {
        const inputElement = document.getElementById(inputId);
        const existingError = inputElement.parentNode.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        inputElement.classList.remove('input-error');
    }
}
setupContactForm();
/* ________________________________________________________________________________________________________ */



// Back to top button functionality
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
setupBackToTop();

    