import React, { useState } from 'react'

import Form from '@components/form'

const Home = () => {
  const [dateString, setDateString] = useState(null)
  const [zoneID, setZoneID] = useState(null)
  const [originID, setOriginID] = useState(null)
  const [destinationID, setDestinationID] = useState(null)

  const onSubmit = async ({ dateString, zoneID, originID, destinationID }) => {
    const tripID = `${dateString}_${zoneID}_${originID}_${destinationID}`
    const url = `/api/v1/trips/${tripID}`
    // const responseData = await fetch(url)

    console.log(url)
  }

  const onError = (errors) => {
    console.error(errors)
  }

  return (<>
    <Form id="tripForm" onSubmit={onSubmit} onError={onError} />

    <main>
      <p>Search for a trip</p>
    </main>
  </>)
}

export default Home
