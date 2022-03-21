import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getZoneStations } from '@db/getData'
import { createNestedDocument } from '@db/postData'
import { cartesian } from '@lib/utils'
import getTrips from '@lib/scrap-trip'


const handler = async (req, res) => {
  try {
    const { dateString, zoneID } = req.query

    const stations = await getZoneStations(zoneID)
    const ids = stations.map(({ id }) => id)

    const searches = cartesian(ids, ids)
      .filter(pair => pair[0] != pair[1])
      .map((pair) => {
        const originID = pair[0]
        const destinationID = pair[1]
        const tripID = `${dateString}_${zoneID}_${originID}_${destinationID}`

        return { zoneID, originID, destinationID, dateString, tripID }
      })

    console.log(`Processing ${searches.length} searches`)
    searches.forEach(async ({ zoneID, originID, destinationID, dateString, tripID }) => {
      const trips = await getTrips({ zoneID, originID, destinationID, dateString })

      if (trips.length > 0) {
        const _ = await createNestedDocument('trips', dateString, zoneID, tripID, {
          id: tripID,
          trips
        })
      } else {
        console.log(`> ${tripID} - Got 0 trips`)
      }
    })

    res.status(StatusCodes.OK).json({
      dateString,
      zoneID,
      searches: searches.length
    })
  } catch (error) {
    console.error(error)

    const code = StatusCodes.INTERNAL_SERVER_ERROR
    const reason = ReasonPhrases.INTERNAL_SERVER_ERROR
    const message = error.message

    res.status(code).json({ code, reason, message })
  }
}

export default handler
