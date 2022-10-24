/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import airFlowIcon from '../../images/airflow_icon.png'
import rainIcon from '../../images/rain_icon.png'
import WeatherIcon from './WeatherIcon'
import { ReactComponent as Refresh } from '../../images/redo_icon.svg'
import { ReactComponent as LoadingIcon } from '../../images/loading.svg'
import { ReactComponent as CogIcon } from '../../images/cog.svg'

const WeatherCardwrap = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  padding: 30px 15px;
`
const Location = styled.div`
  font-size: 28px;
  color: #757575;
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 18px;
  color: #828282;
  margin-bottom: 20px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`
const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`
const Celsius = styled.div`
  font-size: 42px;
`
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  color: #828282;
`
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  color: #828282;
`
const Redo = styled.div`
  display: flex;
  align-items: flex-end;
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  color: #828282;
  svg {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`
const IconCss = css`
  display: flex;
  align-items: center;
  font-weight: 300;
  color: #828282;
  width: 50px;
  height: auto;
  margin-right: 15px;
`
const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`

function WeatherCard(props) {
  const { weatherElement, moment, AllData, setCurrentPage, cityName } = props
  const {
    observationTime,
    // locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement
  return (
    <>
      <WeatherCardwrap>
        <Cog onClick={() => setCurrentPage('WeatherSetting')} />
        <Location>{cityName}</Location>
        <Description>
          {description}
          {comfortability}
        </Description>
        <CurrentWeather>
          <Temperature>
            {Math.round(temperature)}
            <Celsius>°C</Celsius>
          </Temperature>
          <WeatherIcon
            currentWeatherCode={weatherCode}
            moment={moment || 'day'}
          />
        </CurrentWeather>
        <AirFlow>
          <img css={IconCss} src={airFlowIcon} alt="airflow" />
          {windSpeed} m/h
        </AirFlow>
        <Rain>
          <img css={IconCss} src={rainIcon} alt="rain" />
          {Math.round(rainPossibility)}%
        </Rain>
        <Redo onClick={AllData} isLoading={isLoading}>
          最後觀測時間：
          {new Intl.DateTimeFormat('zh-TW', {
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(observationTime))}
          {isLoading ? <LoadingIcon /> : <Refresh />}
        </Redo>
      </WeatherCardwrap>
    </>
  )
}

export default WeatherCard
