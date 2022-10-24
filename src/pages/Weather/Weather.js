/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { useState, useMemo } from 'react'
import axios from 'axios'
import './_weather.scss'
import WeatherCard from './WeatherCard'
import sunriseAndSunsetData from './sunrise-sunset.json'
import useWeatherApi from './useWeatherApi'
import WeatherSetting from './WeatherSetting'
import { findLocation } from './utils'

const Container = styled.div`
  background-color: #ededed;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const getMoment = (locationName) => {
  // 從日出日落時間中找出符合的地區
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  )
  if (!location) return null
  const now = new Date()

  // 格式 2022-10-22
  const nowDate = Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .replace(/\//g, '-')

  // 從地區中找對應的日期
  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate)

  // 日出日落以及當前時間轉成時間戳記（TimeStamp）
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime()

  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime()

  const nowTimeStamp = now.getTime()

  // 當前時間介於日出和日落中間，則為白天，否則為晚上
  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? 'day'
    : 'night'
}

function Weather() {
  const storageCity = localStorage.getItem('cityName')
  const [currentCity, setCurrentCity] = useState(storageCity || '臺北市')
  const currentLocation = findLocation(currentCity) || {}
  const [weatherElement, AllData] = useWeatherApi(currentLocation)
  const [currentPage, setCurrentPage] = useState('WeatherCard')

  //根據日出日落資料的地區名稱，找出對應的日出日落時間
  const moment = useMemo(
    () => getMoment(currentLocation.sunriseCityName),
    [currentLocation.sunriseCityName]
  )
  useEffect(() => {
    localStorage.setItem('cityName', currentCity)
  }, [currentCity])

  return (
    <>
      <div className="weather">
        <Container>
          {currentPage === 'WeatherCard' && (
            <WeatherCard
              weatherElement={weatherElement}
              AllData={AllData}
              moment={moment}
              setCurrentPage={setCurrentPage}
              cityName={currentLocation.cityName}
            />
          )}

          {currentPage === 'WeatherSetting' && (
            <WeatherSetting
              setCurrentPage={setCurrentPage}
              setCurrentCity={setCurrentCity}
              cityName={currentLocation.cityName}
            />
          )}
        </Container>
      </div>
    </>
  )
}

export default Weather
