import React from 'react'
import styled from '@emotion/styled'
import { useState, useRef } from 'react'
import { availableLocations } from './utils'

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 20px;
`
const Title = styled.div`
  font-size: 28px;
  color: '#212121';
  margin-bottom: 30px;
`
const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: #828282;
  margin-bottom: 15px;
`
const StyledInputList = styled.input`
  display: block;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #828282;
  outline: none;
  width: 100%;
  max-width: 100%;
  color: #828282;
  font-size: 16px;
  padding: 7px 10px;
  margin-bottom: 40px;
  &:focus {
    outline: 1px solid #828282;
    box-shadow: none;
  }
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    margin: 0;
    letter-spacing: 0.3px;
    line-height: 1;
    cursor: pointer;
    overflow: visible;
    text-transform: none;
    border: 1px solid transparent;
    background-color: transparent;
    height: 35px;
    width: 80px;
    border-radius: 5px;

    &:focus,
    &.focus {
      outline: 0;
      box-shadow: none;
    }

    &::-moz-focus-inner {
      padding: 0;
      border-style: none;
    }
  }
`
const Back = styled.button`
  && {
    color: #828282;
    border-color: #828282;
  }
`
const Save = styled.button`
  && {
    color: white;
    background-color: #40a9f3;
  }
`

const locations = availableLocations.map((location) => location.cityName)

function WeatherSetting({ setCurrentPage, cityName, setCurrentCity }) {
  const [locationName, setLocationName] = useState(cityName)
  const inputLocationRef = useRef(null)

  const handleChange = (e) => {
    setLocationName(e.target.value)
  }

  const handleSave = () => {
    // ?????? inputLocationRef.current ?????????????????? input ??????
    // ?????? inputLocationRef.current.value ??????????????? input ????????????
    const locationName = inputLocationRef.current.value

    if (locations.includes(locationName)) {
      console.log(`???????????????????????????${locationName}`)
      setCurrentCity(locationName)
      setCurrentPage('WeatherCard')
    } else {
      alert(`???????????? ${locationName} ?????????????????????`)
      return
    }
  }

  return (
    <>
      <WeatherSettingWrapper>
        <Title>?????????????????????</Title>
        <StyledLabel htmlFor="location">??????</StyledLabel>
        <StyledInputList
          list="location-list"
          id="location"
          name="location"
          placeholder="Search..."
          ref={inputLocationRef}
          defaultValue={locationName}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave()
          }}
        />
        <datalist id="location-list">
          {locations.map((location) => (
            <option value={location} key={location} />
          ))}
        </datalist>
        <ButtonGroup>
          <Back onClick={() => setCurrentPage('WeatherCard')}>??????</Back>
          <Save onClick={handleSave}>??????</Save>
        </ButtonGroup>
      </WeatherSettingWrapper>
    </>
  )
}

export default WeatherSetting
