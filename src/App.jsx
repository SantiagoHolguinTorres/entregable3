
import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './hoocks/useFetch'
import getRandomNumbers from './services/getRandomNumbers'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'

function App() {

  const randomLocation = getRandomNumbers(126)
  const [locationSelected, setLocationSelected] = useState(randomLocation)  
  const url = `https://rickandmortyapi.com/api/location/${locationSelected || getRandomNumbers(126)}`
  const [ location, getLocation, hasError ] = useFetch(url)

  

  useEffect(() => {

    getLocation()
   
  }, [locationSelected])
 

  return (
   <div className='app'> 
    <h1 className='app__title'><img src="/title.jpg" alt="" /></h1>
    <FormSearch
    setLocationSelected = {setLocationSelected}
    />
    {
      hasError
        ? <h2 className='app__error'>❌ Hey! You must provide an id from 1 to 126 🥱</h2>
        : (
          <>
          <LocationInfo
    location = {location}
    />
    <div className='container-resident'>
      {
        location?.residents.map( url => (
          <ResidentCard
            key = {url}
            url = {url}
          />
        ))
      }
    </div>
    </>
        )
    }
    
   </div>
  )
}

export default App
