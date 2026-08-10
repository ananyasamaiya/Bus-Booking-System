// Nav links functionality (for index.html)
document.addEventListener('DOMContentLoaded', () => {
    // Search form submission functionality (for index.html)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            window.location.href = 'searchResults.html';
        });
    }

    document.querySelectorAll('.nav-link-custom').forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link-custom').forEach(el => el.classList.remove('active', 'text-dark'));
            document.querySelectorAll('.nav-link-custom').forEach(el => el.classList.add('text-dark'));

            // Add active class to clicked link and remove text-dark
            this.classList.add('active');
            this.classList.remove('text-dark');
        });
    });

    // Password toggle functionality (for signIn.html)
    const togglePassword = document.querySelector('#togglePassword');
    const passwordInput = document.querySelector('#loginPassword');
    const toggleIcon = document.querySelector('#togglePasswordIcon');

    if (togglePassword && passwordInput && toggleIcon) {
        togglePassword.addEventListener('click', function (e) {
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye / eye slash icon
            if (type === 'password') {
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            } else {
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            }
        });
    }

    // Password toggle functionality (for signUp.html)
    const toggleSignupPassword = document.querySelector('#toggleSignupPassword');
    const signupPasswordInput = document.querySelector('#signupPassword');
    const toggleSignupIcon = document.querySelector('#toggleSignupPasswordIcon');

    if (toggleSignupPassword && signupPasswordInput && toggleSignupIcon) {
        toggleSignupPassword.addEventListener('click', function (e) {
            const type = signupPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            signupPasswordInput.setAttribute('type', type);
            
            if (type === 'password') {
                toggleSignupIcon.classList.remove('fa-eye-slash');
                toggleSignupIcon.classList.add('fa-eye');
            } else {
                toggleSignupIcon.classList.remove('fa-eye');
                toggleSignupIcon.classList.add('fa-eye-slash');
            }
        });
    }

    // Password toggle functionality (for operator modal)
    const toggleOperatorPassword = document.querySelector('#toggleOperatorPassword');
    const operatorPasswordInput = document.querySelector('#operatorPassword');
    const toggleOperatorIcon = document.querySelector('#toggleOperatorPasswordIcon');

    if (toggleOperatorPassword && operatorPasswordInput && toggleOperatorIcon) {
        toggleOperatorPassword.addEventListener('click', function (e) {
            const type = operatorPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            operatorPasswordInput.setAttribute('type', type);
            
            if (type === 'password') {
                toggleOperatorIcon.classList.remove('fa-eye-slash');
                toggleOperatorIcon.classList.add('fa-eye');
            } else {
                toggleOperatorIcon.classList.remove('fa-eye');
                toggleOperatorIcon.classList.add('fa-eye-slash');
            }
        });
    }
});

// Traveler Signup Modal Multi-Step Logic
function goToStep(stepNumber) {
    // Hide all steps
    const step1 = document.getElementById('modalStep1');
    const step2 = document.getElementById('modalStep2');
    const step3 = document.getElementById('modalStep3');
    
    if (step1) step1.classList.add('d-none');
    if (step2) step2.classList.add('d-none');
    if (step3) step3.classList.add('d-none');

    // Show the target step
    const targetStep = document.getElementById('modalStep' + stepNumber);
    if (targetStep) targetStep.classList.remove('d-none');

    // Update Step Indicator Text
    const indicatorText = document.getElementById('stepIndicatorText');
    if (indicatorText) indicatorText.innerText = `Step ${stepNumber} of 3`;

    // Update Progress Bar Line
    const progressBar = document.getElementById('stepperLineActive');
    if (progressBar) {
        if (stepNumber === 1) progressBar.style.width = '0%';
        else if (stepNumber === 2) progressBar.style.width = '50%';
        else if (stepNumber === 3) progressBar.style.width = '100%';
    }

    // Update Circles
    for (let i = 1; i <= 3; i++) {
        const circle = document.getElementById('stepCircle' + i);
        if (circle) {
            if (i < stepNumber) {
                circle.classList.add('completed');
                circle.classList.remove('active');
            } else if (i === stepNumber) {
                circle.classList.add('active');
                circle.classList.remove('completed');
            } else {
                circle.classList.remove('active', 'completed');
            }
        }
    }
}

// Operator Signup Modal Multi-Step Logic
function goToOperatorStep(stepNumber) {
    // Hide all steps
    const step1 = document.getElementById('opModalStep1');
    const step2 = document.getElementById('opModalStep2');
    const step3 = document.getElementById('opModalStep3');
    
    if (step1) step1.classList.add('d-none');
    if (step2) step2.classList.add('d-none');
    if (step3) step3.classList.add('d-none');

    // Show the target step
    const targetStep = document.getElementById('opModalStep' + stepNumber);
    if (targetStep) targetStep.classList.remove('d-none');

    // Update Step Indicator Text
    const indicatorText = document.getElementById('opStepIndicatorText');
    if (indicatorText) indicatorText.innerText = `Step ${stepNumber} of 3`;

    // Update Progress Bar Line
    const progressBar = document.getElementById('opStepperLineActive');
    if (progressBar) {
        if (stepNumber === 1) progressBar.style.width = '0%';
        else if (stepNumber === 2) progressBar.style.width = '50%';
        else if (stepNumber === 3) progressBar.style.width = '100%';
    }

    // Update Circles
    for (let i = 1; i <= 3; i++) {
        const circle = document.getElementById('opStepCircle' + i);
        if (circle) {
            if (i < stepNumber) {
                circle.classList.add('completed');
                circle.classList.remove('active');
            } else if (i === stepNumber) {
                circle.classList.add('active');
                circle.classList.remove('completed');
            } else {
                circle.classList.remove('active', 'completed');
            }
        }
    }
}

// OTP Input Auto-focus Logic
document.addEventListener('DOMContentLoaded', () => {
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });
});
