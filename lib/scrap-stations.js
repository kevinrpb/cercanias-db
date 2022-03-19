import fetch from 'node-fetch'
import { Iconv } from 'iconv'
import * as cheerio from 'cheerio'

import ZONES from '@data/zones.json'

const BASE_STATIONS_URL = 'https://horarios.renfe.com/cer/hjcer300.jsp?NUCLEO='

const zoneStationURL = (id) => `${BASE_STATIONS_URL}${id}`

const scrapStations = (body) => {
  const $ = cheerio.load(body)

  const options = $('select#o').find('option')

  return options
    .map((i, element) => {
      let option = $(element),
        id = option.attr('value'),
        name = option.text().trim()

      return id === '?' ? null : { id, name }
    })
    .filter((element) => element != null)
    .get()
}

const getZoneStations = async (zone) => {
  const zoneID = zone.id

  const url = zoneStationURL(zoneID)
  const response = await fetch(url)
  const body = await response.text()

  const ic = new Iconv('iso-8859-1', 'utf-8')
  const buf = ic.convert(body)
  const utf8Body = buf.toString('utf-8')

  const stations = scrapStations(utf8Body)
    .map(({ id, name }) => ({ id, name, zoneID}))
  return stations
}

const getStations = async () => {
  const all = await Promise.all(
    ZONES.map(async zone => await getZoneStations(zone))
  )

  return all.flat()
}

export default getStations
