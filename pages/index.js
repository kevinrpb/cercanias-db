import React from 'react'

import Form from '@components/form'

const Home = () => {
  const onSubmit = async ({ zoneID, originID, destinationID, dateString }) => {
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
