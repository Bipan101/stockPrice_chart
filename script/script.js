async function fetchData() {
    const url = 'https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&datatype=json';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '3ff5b494e5mshc2d0637295cf090p1d84dejsnf04a61e54357',
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        if (!result || !result['Time Series (Daily)']) {
            throw new Error('Unexpected API response format');
        }

        const timeSeries = result['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).reverse();
        const closingPrices = dates.map(date => parseFloat(timeSeries[date]['4. close']));

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'MSFT Closing Prices',
                    data: closingPrices,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        alert('Failed to fetch data: ' + error.message);
    }
}

fetchData();