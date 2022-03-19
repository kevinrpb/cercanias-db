import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import getStations from '@lib/scrap-stations'

const handler = async (req, res) => {
  try {
    const stations = await getStations()

    res.status(StatusCodes.OK).json(stations)
  } catch (error) {
    console.error(error)

    const code = StatusCodes.INTERNAL_SERVER_ERROR
    const reason = ReasonPhrases.INTERNAL_SERVER_ERROR
    const message = error.message

    res.status(code).json({ code, reason, message })
  }
}

export default handler
