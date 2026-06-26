fetch("https://api.open-meteo.com/v1/forecast/Abohar")
.then(res => res.json())
.then(data => console.log(data))