document.addEventListener('DOMContentLoaded', () => {

    const freqBtns = document.querySelectorAll('.freq-btn');
    freqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    const calcFareBtn = document.getElementById('calcFareBtn');
    const farePopover = document.getElementById('farePopover');
    const closePopover = document.getElementById('closePopover');
    const applyFareBtn = document.getElementById('applyFareBtn');
    const baseFareInput = document.getElementById('baseFareInput');
    const busSelect = document.getElementById('busSelect');

    let calculatedTotal = 0;

    calcFareBtn.addEventListener('click', () => {

        let distCharge = 25.00;
        let structCharge = 5.00;
        let spaceCharge = 0.00;
        let amenitiesCharge = 5.00;

        if (busSelect.value && busSelect.value.includes('Sleeper')) {
            spaceCharge = 10.00;
        } else if (busSelect.value && busSelect.value.includes('Seater')) {
            spaceCharge = 2.00;
        }

        document.getElementById('spaceCharge').textContent = `$${spaceCharge.toFixed(2)}`;
        
        calculatedTotal = distCharge + structCharge + spaceCharge + amenitiesCharge;
        document.getElementById('totalCalc').textContent = `$${calculatedTotal.toFixed(2)}`;

        farePopover.classList.add('show');
    });

    closePopover.addEventListener('click', () => {
        farePopover.classList.remove('show');
    });

    applyFareBtn.addEventListener('click', () => {
        baseFareInput.value = calculatedTotal.toFixed(2);
        farePopover.classList.remove('show');
    });

    const form = document.getElementById('scheduleForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const activeDays = Array.from(document.querySelectorAll('.freq-btn.active')).map(btn => btn.dataset.day);
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.activeDays = activeDays;
            
            console.log('Schedule Submitted:', data);

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                const modalElement = document.getElementById('scheduleModal');
                if (modalElement && window.bootstrap) {
                    const bsModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    bsModal.hide();
                }
                
                alert('Schedule created successfully!');
                form.reset();
            }, 800);
        });
    }

    const modCalcFareBtn = document.getElementById('modCalcFareBtn');
    const modFarePopover = document.getElementById('modFarePopover');
    const modClosePopover = document.getElementById('modClosePopover');
    const modApplyFareBtn = document.getElementById('modApplyFareBtn');
    const modBaseFareInput = document.getElementById('modBaseFareInput');
    const modBusSelect = document.getElementById('modBusSelect');
    
    let modCalculatedTotal = 0;

    if (modCalcFareBtn) {
        modCalcFareBtn.addEventListener('click', () => {
            let distCharge = 25.00;
            let structCharge = 5.00;
            let spaceCharge = 0.00;
            let amenitiesCharge = 5.00;

            if (modBusSelect.value && modBusSelect.value.includes('Sleeper')) {
                spaceCharge = 10.00;
            } else if (modBusSelect.value && modBusSelect.value.includes('Seater')) {
                spaceCharge = 2.00;
            }

            document.getElementById('modSpaceCharge').textContent = `$${spaceCharge.toFixed(2)}`;
            modCalculatedTotal = distCharge + structCharge + spaceCharge + amenitiesCharge;
            document.getElementById('modTotalCalc').textContent = `$${modCalculatedTotal.toFixed(2)}`;
            modFarePopover.classList.add('show');
        });
    }

    if (modClosePopover) {
        modClosePopover.addEventListener('click', () => {
            modFarePopover.classList.remove('show');
        });
    }

    if (modApplyFareBtn) {
        modApplyFareBtn.addEventListener('click', () => {
            modBaseFareInput.value = modCalculatedTotal.toFixed(2);
            modFarePopover.classList.remove('show');
        });
    }

    const modForm = document.getElementById('modifyScheduleForm');
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
                
                const modalElement = document.getElementById('modifyScheduleModal');
                if (modalElement && window.bootstrap) {
                    const bsModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    bsModal.hide();
                }
                
                alert('Schedule modified successfully!');
            }, 800);
        });
    }
});
