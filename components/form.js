import React from 'react'

import { createFirebaseApp } from '@lib/firebase/clientApp'

import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'

const Select = ({ id, title, loading, elements, register }) => (<>
  <label for={id}>{title}</label>
  <select
    id={id}
    name={id}
    {...register(id, { required: '' })}
  >
    {loading &&
      <option key="loading" value="loading">Loading...</option>
    }
    {elements && elements.map((element) => (
      <option key={element.id} value={element.id}>{element.name}</option>
    ))}
  </select>
</>)

const Form = (props) => {
  const { onSubmit, onError, ...otherProps } = props

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

  const TODAY = new Date()
  const minDate = TODAY.toISOString().split('T')[0]
  const TWO_WEEKS = new Date(TODAY.getTime() + (14*24*60*60*1000))
  const maxDate = TWO_WEEKS.toISOString().split('T')[0]

  const ZoneSelect = () => (
    <Select
      id="zoneID"
      title="Zone"
      loading={zonesLoading}
      elements={zones}
      register={register}
    />
  )

  const OriginSelect = () => (
    <Select
      id="originID"
      title="Origin"
      loading={stationsLoading}
      elements={stations}
      register={register}
    />
  )

  const DestinationSelect = () => (
    <Select
      id="destinationID"
      title="Destination"
      loading={stationsLoading}
      elements={stations}
      register={register}
    />
  )

  const DateInput = () => (<>
    <label for="dateString">Date</label>
    <input
      id="dateString"
      name="dateString"
      type="date"
      min={minDate}
      max={maxDate}
      {...register("dateString", { required: '' })}
    />
  </>)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} {...otherProps}>
      <ZoneSelect />
      <OriginSelect />
      <DestinationSelect />
      <DateInput />

      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form
