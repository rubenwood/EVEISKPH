document.addEventListener('DOMContentLoaded', () => {
    // Search listeners
    document.getElementById('get-systems-btn').addEventListener('click', async () => fetchSystemIds());

    document.getElementById('get-system-details-btn').addEventListener('click', async () => fetchSystemDetails(30000001));
    
});

async function fetchSystemIds() {
    console.log("getting systems");

    try {
        const response = await fetch('/api/getSystemIds', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('System IDs:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Pass in the desired system Id
async function fetchSystemDetails(inSystemId) {
    console.log("getting system details for ", inSystemId);

    try {
        const response = await fetch('/api/getSystemDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                systemId: inSystemId
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('System Details', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}