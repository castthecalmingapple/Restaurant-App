import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState({})
  const [restaurants, setRestaurants] = useState([])
  const { ipAddress, cityName, regionName, zipCode, longitude, latitude } = data

  function fetchIpData(){
    fetch('https://freeipapi.com/api/json')
    .then(response => response.json())
    .then(data => setData(data))
  }

  
  function getRestaurants(lat, long){
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '50890871cdmsh47c3ff33de8f1e6p1568adjsn01eacb52e9f1',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    }

    fetch(`https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=${lat}&longitude=${long}&limit=5&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US`, options)
	  .then(response => response.json())
	  .then(data => setRestaurants(data.data.map(restaurant => {
      console.log(restaurant)
      return(
        <div key={restaurant.location_id}>
          <h1>{restaurant.name}</h1>
          <h3>{restaurant.address}</h3>
        </div>
      )
      })))
    }
    
   
  useEffect(() => {
    fetchIpData()
    getRestaurants(latitude, longitude)
  },[])
  
  return (
    <div>
      <h1>Your IP Address Is:</h1>
      <h2>{ipAddress}</h2>
      <h3>{`${cityName}, ${regionName} ${zipCode}`}</h3>
      {restaurants}
    </div>
  )
}

export default App;

/*{
  "ipVersion": 4,
  "ipAddress": "24.189.176.57",
  "latitude": 40.76413,
  "longitude": -73.518967,
  "countryName": "United States of America",
  "countryCode": "US",
  "timeZone": "-05:00",
  "zipCode": "11801",
  "cityName": "Hicksville",
  "regionName": "New York"
}*/
