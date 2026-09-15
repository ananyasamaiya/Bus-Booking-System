document.addEventListener('DOMContentLoaded', () => {

    const layout_json = {
        busType: 'sleeper', 
        configuration: { columns: 3, rows: 6 }, 
        decks: {
            lower: [
                { id: 'L1', type: 'sleeper', row: 1, col: 1 },
                { id: 'L2', type: 'sleeper', row: 1, col: 3 },
                { id: 'L3', type: 'sleeper', row: 2, col: 1 },
                { id: 'L4', type: 'sleeper', row: 2, col: 3 },
                { id: 'L5', type: 'sleeper', row: 3, col: 1 },
                { id: 'L6', type: 'sleeper', row: 3, col: 3 },
                { id: 'L7', type: 'sleeper', row: 4, col: 1 },
                { id: 'L8', type: 'sleeper', row: 4, col: 3 },
                { id: 'L9', type: 'sleeper', row: 5, col: 1 },
                { id: 'L10', type: 'sleeper', row: 5, col: 3 },
                { id: 'L11', type: 'sleeper', row: 6, col: 1 }, 
                { id: 'L12', type: 'sleeper', row: 6, col: 3 },
            ],
            upper: [
                { id: 'U1', type: 'sleeper', row: 1, col: 1 },
                { id: 'U2', type: 'sleeper', row: 1, col: 3 },
                { id: 'U3', type: 'sleeper', row: 2, col: 1 },
                { id: 'U4', type: 'sleeper', row: 2, col: 3 },
                { id: 'U5', type: 'sleeper', row: 3, col: 1 },
                { id: 'U6', type: 'sleeper', row: 3, col: 3 },
                { id: 'U7', type: 'sleeper', row: 4, col: 1 },
                { id: 'U8', type: 'sleeper', row: 4, col: 3 },
                { id: 'U9', type: 'sleeper', row: 5, col: 1 },
                { id: 'U10', type: 'sleeper', row: 5, col: 3 },
                { id: 'U11', type: 'sleeper', row: 6, col: 1 }, 
                { id: 'U12', type: 'sleeper', row: 6, col: 3 },
            ]
        }
    };

    const reserved_seats = [
        { id: 'L2', status: 'occupied' },
        { id: 'L3', status: 'occupied' },
        { id: 'L11', status: 'occupied' },
        { id: 'U4', status: 'occupied' },
        { id: 'U9', status: 'occupied' },
    ];

    const seatGrid = document.getElementById('seatGrid');
    const selectedSeatsElement = document.getElementById('selectedSeatsList');
    const basePriceElement = document.getElementById('basePrice');
    const taxesElement = document.getElementById('taxes');
    const totalAmountElement = document.getElementById('totalAmount');
    
    const btnLowerDeck = document.getElementById('btnLowerDeck');
    const btnUpperDeck = document.getElementById('btnUpperDeck');
    
    const BASE_FARE_PER_SEAT = 45.00;
    const TAX_RATE = 0.10;
    let selectedSeats = [];
    let currentDeck = 'lower';

    function renderSeats() {
        seatGrid.innerHTML = '';
        seatGrid.style.gridTemplateColumns = `repeat(${layout_json.configuration.columns}, auto)`;

        const currentSeats = layout_json.decks[currentDeck];

        for (let r = 1; r <= layout_json.configuration.rows; r++) {
            for (let c = 1; c <= layout_json.configuration.columns; c++) {
                
                if (c === 2) {
                    const aisle = document.createElement('div');
                    aisle.className = 'aisle';
                    aisle.style.width = '30px';
                    seatGrid.appendChild(aisle);
                    continue;
                }

                const seatData = currentSeats.find(s => s.row === r && s.col === c);
                
                if (seatData) {
                    const seatEl = document.createElement('div');
                    seatEl.className = `seat ${seatData.type}`;
                    seatEl.dataset.id = seatData.id;
                    seatEl.innerText = seatData.id;

                    const reservation = reserved_seats.find(rs => rs.id === seatData.id);
                    if (reservation) {
                        seatEl.classList.add('occupied');
                    }
                    
                    if (selectedSeats.includes(seatData.id)) {
                        seatEl.classList.add('selected');
                    }

                    seatEl.addEventListener('click', () => toggleSeat(seatEl, seatData.id));
                    seatGrid.appendChild(seatEl);
                } else {
                    const empty = document.createElement('div');
                    empty.className = 'empty-space';
                    seatGrid.appendChild(empty);
                }
            }
        }
    }

    function toggleSeat(seatEl, seatId) {
        if (seatEl.classList.contains('occupied')) return;

        if (selectedSeats.includes(seatId)) {
            selectedSeats = selectedSeats.filter(id => id !== seatId);
            seatEl.classList.remove('selected');
        } else {
            if (selectedSeats.length >= 6) {
                alert('You can only select up to 6 seats.');
                return;
            }
            selectedSeats.push(seatId);
            seatEl.classList.add('selected');
        }
        updatePricing();
    }

    function updatePricing() {
        if (selectedSeats.length === 0) {
            selectedSeatsElement.innerText = 'None';
            basePriceElement.innerText = '$0.00';
            taxesElement.innerText = '$0.00';
            totalAmountElement.innerText = '$0.00';
            return;
        }

        selectedSeatsElement.innerText = selectedSeats.join(', ');
        
        const subtotal = selectedSeats.length * BASE_FARE_PER_SEAT;
        const taxes = subtotal * TAX_RATE;
        const total = subtotal + taxes;

        basePriceElement.innerText = `$${subtotal.toFixed(2)}`;
        taxesElement.innerText = `$${taxes.toFixed(2)}`;
        totalAmountElement.innerText = `$${total.toFixed(2)}`;
    }

    
    if (btnLowerDeck && btnUpperDeck) {
        btnLowerDeck.addEventListener('click', () => {
            currentDeck = 'lower';
            btnLowerDeck.classList.add('active');
            btnUpperDeck.classList.remove('active');
            renderSeats();
        });

        btnUpperDeck.addEventListener('click', () => {
            currentDeck = 'upper';
            btnUpperDeck.classList.add('active');
            btnLowerDeck.classList.remove('active');
            renderSeats();
        });
    }

    const btnCheckout = document.getElementById('btnCheckout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            if (selectedSeats.length === 0) {
                alert('Please select at least one seat before proceeding.');
                return;
            }
            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
            window.location.href = 'checkout.html';
        });
    }

    
    renderSeats();
});
