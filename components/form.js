import React from 'react'

import { createFirebaseApp } from '@lib/firebase/clientApp'

import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'

const Select = ({ id, loading, elements, register }) => (
  <select
    id={id}
    {...register(id, { required: '' })}
  >
    {loading &&
      <option key='loading' value='loading'>Loading...</option>
    }
    {elements && elements.map((element) => (
      <option key={element.id} value={element.id}>{element.name}</option>
    ))}
  </select>
)

const Form = (props) => {
  const { onSubmit, onError } = props

  const app = createFirebaseApp()
  const db = getFirestore(app)

  const zonesCollection = collection(db, 'zones')
  const [zones, zonesLoading, zonesError, zonesSnapshot] = useCollectionData(zonesCollection)

  const stationsCollection = collection(db, 'stations')
  const [stations, stationsLoading, stationsError, stationsSnapshot] = useCollectionData(stationsCollection)

  const {
    handleSubmit,
    register,
    formState,
  } = useForm()

  const ZoneSelect = () => (
    <Select
      id='zoneID'
      loading={zonesLoading}
      elements={zones}
      register={register}
    />
  )

  const OriginSelect = () => (
    <Select
      id='originID'
      loading={stationsLoading}
      elements={stations}
      register={register}
    />
  )

  const DestinationSelect = () => (
    <Select
      id='destinationID'
      loading={stationsLoading}
      elements={stations}
      register={register}
    />
  )

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} {...props}>
      <ZoneSelect />
      <OriginSelect />
      <DestinationSelect />

      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form
