// app.js
document.addEventListener('DOMContentLoaded', () => {
  const coinsContainer = document.getElementById('coins');
  const coinsCards = document.getElementById('coinsCards');
  let searchValues = document.getElementById('searchValue');
  const searchInput = document.getElementById('search-input');
  let coins = [];



  const fetchCoins = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false');
      coins = await response.json();
      displayCoins(coins);
      displayCards(coins);
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  };


  const displayCoins = (coins) => {
    coinsContainer.innerHTML = '';
    let i = 1;
    coins.forEach(coin => {
      const coinElement = document.createElement('tr');
      coinElement.classList.add('table-row');
      coinElement.innerHTML = `

              <td class="table-data">
              </td>

              <th class="table-data rank" scope="row">${i++}</th>

              <td class="table-data">
                <div class="wrapper">
                  <img src="${coin.image}" width="20" height="20" alt="Bitcoin logo" class="img">

                  <h3>
                    <a href="#" class="coin-name">${coin.name} <span class="span">${coin.symbol.toUpperCase()}</span></a>
                  </h3>
                </div>
              </td>

              <td class="table-data last-price">$${coin.current_price}</td>

              <td class="table-data last-update ${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}">${coin.price_change_percentage_24h.toFixed(2)}%</td>

              <td class="table-data market-cap">$${coin.market_cap.toLocaleString()}</td>

              <td class="table-data">
                <img src="${coin.price_change_percentage_24h < 0 ? './assets/images/chart-2.svg' : './assets/images/chart-1.svg'}" width="100" height="40" alt="profit chart" class="chart">
              </td>
      `;
      coinsContainer.appendChild(coinElement);
    });
  };

  /// Display Cards at the Top
  const displayCards = (coins) => {
    coinsCards.innerHTML = '';
    const displayedCoins = coins.slice(0, 4);  // Only take the first 4 coins
    displayedCoins.forEach((coin,index) => {
      const coinElement = document.createElement('li');
      coinElement.innerHTML = `
            <div class="trend-card">

              <div class="card-title-wrapper">
                <img src="${coin.image}" width="24" height="24" alt="bitcoin logo">

                <a href="#" class="card-title">
                 ${coin.name} <span class="span">${coin.symbol.toUpperCase()}/USD</span>
                </a>
              </div>

              <data class="card-value">USD <br>${coin.market_cap.toLocaleString()}</data>

              <div class="card-analytics">
                <data class="current-price">$${coin.current_price}</data>

                <div class="badge ${coin.price_change_percentage_24h < 0 ? 'red' : 'green'}">${coin.price_change_percentage_24h.toFixed(2)}%</div>
              </div>

            </div>
      `;
      coinsCards.appendChild(coinElement);
    });
  };

  searchInput.addEventListener('click', () => {
    let searchValue = searchValues.value.toLowerCase();
    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(searchValue) || coin.symbol.toLowerCase().includes(searchValue));
    displayCoins(filteredCoins);
    searchValues.value = '';
  });


  fetchCoins();
});
