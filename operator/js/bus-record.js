document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('addBusForm');

    const extPhotoBtn = document.getElementById('extPhotoBtn');
    const intPhotoBtn = document.getElementById('intPhotoBtn');
    const extPhotoInput = document.getElementById('exteriorPhotos');
    const intPhotoInput = document.getElementById('interiorPhotos');

    const addBusBtn = document.getElementById('addBusBtn');
    if (addBusBtn) {
        addBusBtn.addEventListener('click', () => {
            form.reset();
            extPhotoBtn.classList.remove('has-file');
            extPhotoBtn.innerHTML = '<i class="fas fa-camera"></i> Exterior Photos';
            intPhotoBtn.classList.remove('has-file');
            intPhotoBtn.innerHTML = '<i class="fas fa-couch"></i> Interior Photos';
        });
    }

    extPhotoBtn.addEventListener('click', () => {
        extPhotoInput.click();
    });

    intPhotoBtn.addEventListener('click', () => {
        intPhotoInput.click();
    });

    extPhotoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            extPhotoBtn.classList.add('has-file');
            extPhotoBtn.innerHTML = `<i class="fas fa-check"></i> ${e.target.files.length} Photo(s)`;
        } else {
            extPhotoBtn.classList.remove('has-file');
            extPhotoBtn.innerHTML = '<i class="fas fa-camera"></i> Exterior Photos';
        }
    });

    intPhotoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            intPhotoBtn.classList.add('has-file');
            intPhotoBtn.innerHTML = `<i class="fas fa-check"></i> ${e.target.files.length} Photo(s)`;
        } else {
            intPhotoBtn.classList.remove('has-file');
            intPhotoBtn.innerHTML = '<i class="fas fa-couch"></i> Interior Photos';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.isAc = formData.has('isAc');
        data.mealProvided = formData.has('mealProvided');
        data.blanketPillow = formData.has('blanketPillow');
        
        console.log('Form Submitted Successfully:', data);

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            const modalElement = document.getElementById('addBusModal');
            if (modalElement && window.bootstrap) {
                const bsModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                bsModal.hide();
            }
            
            alert('Bus registered successfully!');
        }, 800);
    });

    const modForm = document.getElementById('modifyBusForm');
    const modExtPhotoBtn = document.getElementById('modExtPhotoBtn');
    const modIntPhotoBtn = document.getElementById('modIntPhotoBtn');
    const modExtPhotoInput = document.getElementById('modExteriorPhotos');
    const modIntPhotoInput = document.getElementById('modInteriorPhotos');

    if (modExtPhotoBtn && modExtPhotoInput) {
        modExtPhotoBtn.addEventListener('click', () => {
            modExtPhotoInput.click();
        });
        
        modExtPhotoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                modExtPhotoBtn.classList.add('has-file');
                modExtPhotoBtn.innerHTML = `<i class="fas fa-check"></i> ${e.target.files.length} Photo(s)`;
            } else {
                modExtPhotoBtn.classList.remove('has-file');
                modExtPhotoBtn.innerHTML = '<i class="fas fa-camera"></i> Update Exterior';
            }
        });
    }

    if (modIntPhotoBtn && modIntPhotoInput) {
        modIntPhotoBtn.addEventListener('click', () => {
            modIntPhotoInput.click();
        });
        
        modIntPhotoInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                modIntPhotoBtn.classList.add('has-file');
                modIntPhotoBtn.innerHTML = `<i class="fas fa-check"></i> ${e.target.files.length} Photo(s)`;
            } else {
                modIntPhotoBtn.classList.remove('has-file');
                modIntPhotoBtn.innerHTML = '<i class="fas fa-couch"></i> Update Interior';
            }
        });
    }

    if (modForm) {
        modForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = modForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                const modalElement = document.getElementById('modifyBusModal');
                if (modalElement && window.bootstrap) {
                    const bsModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    bsModal.hide();
                }
                
                alert('Bus modified successfully!');
            }, 800);
        });
    }
});
