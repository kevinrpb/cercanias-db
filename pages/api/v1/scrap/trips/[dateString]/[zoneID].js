import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getZoneStations } from '@lib/firebase/db/getData'
import { batchCreateNestedDocument } from '@lib/firebase/db/postData'
import { cartesian } from '@lib/utils'
import getTrips from '@lib/scrap-trip'


const handler = async (req, res) => {
  try {
    const { dateString, zoneID } = req.query

    const stations = await getZoneStations(zoneID)
    const ids = stations.map(({ id }) => id)

    const elements = cartesian(ids, ids)
      .filter(pair => pair[0] != pair[1])
      .flatMap(async (pair) => {
        const originID = pair[0]
        const destinationID = pair[1]
        const tripID = `${dateString}_${zoneID}_${originID}_${destinationID}`

        const trips = await getTrips({ zoneID, originID, destinationID, dateString })

        if (trips.length < 1) {
          console.log(`> ${tripID} - Got 0 trips`)
          return null
        }

        return {
          col: 'trips',
          id: dateString,
          ncol: zoneID,
          nid: tripID,
          data: trips
        }
      })

    const result = await batchCreateNestedDocument(elements)

    res.status(StatusCodes.OK).json({
      dateString,
      zoneID,
      searches: elements.length,
      result
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
