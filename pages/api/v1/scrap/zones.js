import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { createDocument } from '@db/postData'

import ZONES from '@data/zones.json'

const handler = async (req, res) => {
  try {
    ZONES.forEach(async (zone) => {
      await createDocument('zones', zone.id, zone)
    })

    res.status(StatusCodes.OK).json(ZONES)
  } catch (error) {
    console.error(error)

    const code = StatusCodes.INTERNAL_SERVER_ERROR
    const reason = ReasonPhrases.INTERNAL_SERVER_ERROR
    const message = error.message

    res.status(code).json({ code, reason, message })
  }
}

export default handler
