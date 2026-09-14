document.addEventListener('DOMContentLoaded', () => {

    const manifestData = {
        'MH-01-1234_Oct12': {
            route: 'New York \u2192 Washington',
            details: 'Oct 12, 22:00 | Bus: MH-01-1234',
            passengers: [
                { seat: 'L12', name: 'John Doe', ageGender: '34/M', boarding: 'Times Square', dropping: 'Union Station' },
                { seat: 'L13', name: 'Jane Doe', ageGender: '32/F', boarding: 'Times Square', dropping: 'Union Station' },
                { seat: 'U01', name: 'Mark Smith', ageGender: '45/M', boarding: 'Penn Station', dropping: 'Union Station' }
            ]
        },
        'DL-10-9876_Oct12': {
            route: 'Boston \u2192 New York',
            details: 'Oct 12, 14:00 | Bus: DL-10-9876',
            passengers: [
                { seat: 'U04', name: 'Sarah Jenkins', ageGender: '28/F', boarding: 'South Station', dropping: 'Port Authority' }
            ]
        }
    };

    const searchInput = document.getElementById('bookingSearch');
    const tableRows = document.querySelectorAll('#bookingTable tbody tr');

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const query = this.value.toLowerCase();
            tableRows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    const viewButtons = document.querySelectorAll('.view-manifest-btn');
    const manifestTableBody = document.querySelector('#manifestTable tbody');
    const manifestRoute = document.getElementById('manifestRoute');
    const manifestDetails = document.getElementById('manifestDetails');
    const manifestTotalPax = document.getElementById('manifestTotalPax');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tripId = this.getAttribute('data-trip');
            const data = manifestData[tripId];

            if (data) {
                manifestRoute.innerHTML = data.route;
                manifestDetails.innerHTML = data.details;
                manifestTotalPax.innerText = data.passengers.length;

                manifestTableBody.innerHTML = '';
                data.passengers.forEach(pax => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="fw-bold">${pax.seat}</td>
                        <td>${pax.name}</td>
                        <td>${pax.ageGender}</td>
                        <td>${pax.boarding}</td>
                        <td>${pax.dropping}</td>
                    `;
                    manifestTableBody.appendChild(tr);
                });
            } else {
                manifestTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No passenger data available.</td></tr>';
                manifestTotalPax.innerText = '0';
            }
        });
    });

    const printBtn = document.getElementById('printManifestBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '../index.html';
        });
    }
});
