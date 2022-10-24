import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// 局屬氣象站資料(現在天氣觀測報告) 地區名稱
const currentWeatherData = async (locationName) => {
  let response = await axios.get(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-A7B895E8-9208-4F77-A6C0-00F9FE7EC56B&locationName=${locationName}`
  )
  const locationData = response.data.records.location[0]

  // 取出風速（WDSD）、氣溫（TEMP）和濕度（HUMD）資料
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
      if (['WDSD', 'TEMP', 'HUMD'].includes(item.elementName)) {
        neededElements[item.elementName] = item.elementValue
      }
      return neededElements
    },
    {}
  )
  // 回傳新的資料狀態回去
  return {
    observationTime: locationData.time.obsTime,
    locationName: locationData.locationName,
    temperature: weatherElements.TEMP,
    windSpeed: weatherElements.WDSD,
    humid: weatherElements.HUMD,
  }
  // console.log(weatherElement)
  // console.log(weatherElements)
}

// 一般天氣預報(今明 36 小時天氣預報)
const weatherForecastData = async (cityName) => {
  let response = await axios.get(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-A7B895E8-9208-4F77-A6C0-00F9FE7EC56B&locationName=${cityName}`
  )

  const locationData = response.data.records.location[0]
  const weatherElements = locationData.weatherElement.reduce(
    (neededElements, item) => {
      if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
        neededElements[item.elementName] = item.time[0].parameter
      }
      return neededElements
    },
    {}
  )

  // 回傳新的資料狀態回去
  return {
    description: weatherElements.Wx.parameterName,
    weatherCode: weatherElements.Wx.parameterValue,
    rainPossibility: weatherElements.PoP.parameterName,
    comfortability: weatherElements.CI.parameterName,
  }
}

function useWeatherApi(currentLocation) {
  const { locationName, cityName } = currentLocation
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    humid: 0,
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
  })
  const AllData = useCallback(() => {
    const AllDataItem = async () => {
      // Promise.all 兩個 API 都取得回應後才繼續
      const [currentWeather, weatherForecast] = await Promise.all([
        //局屬氣象站資料(現在天氣觀測報告) 地區名稱
        currentWeatherData(locationName),

        //一般天氣預報(今明 36 小時天氣預報) 地區名稱
        weatherForecastData(cityName),
      ])
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false,
      })
    }
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,
    }))

    AllDataItem()
    // AllDataItem 沒有相依到 React 組件中的資料狀態，所以 dependencies 陣列中不帶入元素
  }, [locationName, cityName])

  useEffect(() => {
    AllData()
  }, [AllData])
  return [weatherElement, AllData]
}

export default useWeatherApi
