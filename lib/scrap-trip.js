import fetch from 'node-fetch'

const TRIPS_URL = 'https://horarios.renfe.com/cer/HorariosServlet'

const buildBody = ({ zoneID, originID, destinationID, dateString }) => {
  return {
    nucleo: zoneID,
    origen: originID,
    destino: destinationID,
    fchaViaje: dateString.replaceAll('-', ''),

    horaViajeOrigen: '00',
    horaViajeLlegada: '26',
    servicioHorarios: 'VTI',
    validaReglaNegocio: 'false',
    tiempoReal: 'true',
    accesibilidadTrenes: 'true'
  }
}

const parseTrips = ({ zoneID, originID, destinationID, dateString }, { horario }) => {
  let trips = horario.map((entry) => {
    // * Add :00+01:00 at the end to set the timezone to Spain
    let tripDeparture = new Date(Date.parse(`${dateString}T${entry.horaSalida}:00+01:00`))
    let tripArrival = new Date(Date.parse(`${dateString}T${entry.horaLlegada}:00+01:00`))

    var lastOrigin = originID
    var lastLine = entry.linea || '?'
    var lastDeparture = tripDeparture

    var segments = (entry.trans ||[]).map((transfer) => {
      let arrival = new Date(Date.parse(`${dateString}T${transfer.horaLlegada}:00+01:00`))
      let departure = new Date(Date.parse(`${dateString}T${transfer.horaSalida}:00+01:00`))

      let segment = {
        origin: lastOrigin,
        destination: transfer.cdgoEstacion,
        departure: lastDeparture.toISOString(),
        arrival: arrival.toISOString(),
        line: lastLine
      }

      lastOrigin = transfer.cdgoEstacion
      lastLine = transfer.linea
      lastDeparture = departure

      return segment
    })

    segments.push({
      origin: lastOrigin,
      destination: destinationID,
      departure: lastDeparture.toISOString(),
      arrival: tripArrival.toISOString(),
      line: lastLine
    })

    return {
      date: dateString,
      region: zoneID,
      origin: originID,
      destination: destinationID,
      departure: tripDeparture.toISOString(),
      arrival: tripArrival.toISOString(),
      segments: segments,
      isCivis: (entry.civis ?? "") == "CIVIS",
      isAccessible: entry.accesible ?? false
    }
  })

  return trips
}

const getTrips = async (search) => {
  const body = buildBody(search)
  const response = await fetch(TRIPS_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(body)
  })
  const result = await response.json()

  if (result != null) {
    const trips = parseTrips(search, result)
    return trips
  } else {
    return []
  }
}

export default getTrips
