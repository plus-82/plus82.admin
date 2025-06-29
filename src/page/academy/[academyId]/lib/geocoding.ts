import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useRef } from 'react'

import { Location } from '@/type/code'

export const convertToLocationType = (sido: string) => {
  switch (sido) {
    case '서울':
      return Location.SEOUL
    case '부산':
      return Location.BUSAN
    case '대구':
      return Location.DAEGU
    case '인천':
      return Location.INCHEON
    case '광주':
      return Location.GWANGJU
    case '대전':
      return Location.DAEJEON
    case '울산':
      return Location.ULSAN
    case '세종특별자치시':
      return Location.SEJONG
    case '경기':
      return Location.GYEONGGI
    case '강원특별자치도':
      return Location.GANGWON
    case '충북':
      return Location.CHUNGBUK
    case '충남':
      return Location.CHUNGNAM
    case '전북특별자치도':
      return Location.JEONBUK
    case '전남':
      return Location.JEONNAM
    case '경북':
      return Location.GYEONGBUK
    case '경남':
      return Location.GYEONGNAM
    case '제주특별자치도':
      return Location.JEJU
    default:
      return null
  }
}

export const useGeocoding = () => {
  const lib = useMapsLibrary('geocoding')
  const geocoder = useRef<google.maps.Geocoder | null>(null)

  useEffect(() => {
    if (lib) {
      geocoder.current = new lib.Geocoder()
    }
  }, [lib])

  const geocode = async (
    address: string,
    callback: (result: { lat: number; lng: number }) => void,
  ) => {
    if (!geocoder.current) return null

    console.log(geocoder.current)

    await geocoder.current.geocode({ address }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        console.log(results[0])
        const { location } = results[0].geometry

        callback({
          lat: location.lat(),
          lng: location.lng(),
        })
      }
    })
  }

  return { geocode }
}
