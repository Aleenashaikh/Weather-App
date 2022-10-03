import React, { useEffect, useState } from 'react'
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import axios from 'axios';



const WeatherApp = () => {
  let [search, setSearch] = useState("Istanbul")
  let [data, setData] = useState([])
  let [input, setInput] = useState("")
  let componentMounted = true;
  let emoji = null;

  
  async function fetchWeather() {
    // const axios = require('axios');
    if (componentMounted){
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d54714bf25c67dba81a9cec36deeee35`
      await axios.get(apiUrl).then(async function (res)
      {
        console.log("response: ",res.data)
        
        setData(res.data) 

        console.log("data:", data)
      }).catch((err)=>console.log("err",err))
      
      
      
    }
    return ()=>{
      componentMounted= false;
    }
  }
  
  
  useEffect (()=>{
    fetchWeather();
    
    if(typeof data.main != "undefine"){
      if(data.weather[0].main==="Clouds"){
        emoji= "fa-cloud"
      }else if(data.weather[0].main==="Thunderstorm"){
        emoji= "fa-bolt"
      }else if(data.weather[0].main==="Drizzle"){
        emoji= "fa-cloud-rain"
      }else if(data.weather[0].main==="Rain"){
        emoji= "fa-cloud-shower-heavy"
      }else if(data.weather[0].main==="Snow"){
        emoji= "fa-snow-flake"
      }else{
        emoji= "fa-smog"
      }
    }else{
      return (
        <div>Loading...</div>
      )
    }
    console.log(emoji)
  },[search])

const handleSubmit = (event) =>{
  event.preventDefault();
  setSearch(input)
  console.log(input)
}

  const kelToCel = (abc) => {
    return ((abc - 273.15).toFixed(2))
  }

  return (
    <div>
      {
      console.log(data.weather[0])}



      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'url(https://source.unsplash.com/600x900/?nature,rain)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}

          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <span>
            <form onSubmit={handleSubmit}>
            <Input  placeholder='Enter City '
             width='auto' 
             color={'white'} 
             className="myinp"
             name='search'
             value={input}
             onChange={(e)=>setInput(e.target.value)}
             ></Input>
          
            <Button leftIcon={<SearchIcon />} colorScheme='teal' variant='solid' marginLeft={5} type="submit"></Button>
            </form>
          </span>
          <Stack height={'500px'} width={'300px'} spacing={6} textAlign={'center'} bg={'blackAlpha.500'}
            color={'white'}>
            <Text

              textAlign={'center'}
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              padding={'20px'}
           
            >

              <Text fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })} >{data.name}</Text>
              <br />
              <p>{data.weather[0].description}</p>
              <br />
              <hr />

              <i className={ `fas ${emoji} fa-3x` }></i>
              
              <h1 >{kelToCel(data.main.temp)}&deg;C</h1>
            </Text>

            <p className='para'>Feels Like: {kelToCel(data.main.feels_like)}&deg;C</p>
            <p className='para'>Minimum Temperature: {kelToCel(data.main.temp_min)}&deg;C</p>
            <p className='para'>Mazimum Temperature: {kelToCel(data.main.temp_max)}&deg;C</p>


          </Stack>
        </VStack>
      </Flex>


    </div>
  )
}

export default WeatherApp