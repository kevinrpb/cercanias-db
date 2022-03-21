import React from 'react'

import { createFirebaseApp } from '@lib/firebase/clientApp'

import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useForm } from 'react-hook-form'

const Select = ({ id, title, loading, elements, register }) => (<>
  <label htmlFor={id}>{title}</label>
  <select
    id={id}
    name={id}
    {...register(id, { required: '' })}
  >
    {loading &&
      <option key="loading" value="loading">Loading...</option>
    }
    {!loading &&
      <option key="none" value="none" disabled>Select {title}</option>
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
  const [zones, zonesLoading, zonesError, zonesSnapshot] = useCollectionDataOnce(zonesCollection)

  const stationsCollection = collection(db, 'stations')
  const [stations, stationsLoading, stationsError, stationsSnapshot] = useCollectionDataOnce(stationsCollection)

  const TODAY = new Date()
  const minDate = TODAY.toISOString().split('T')[0]
  const TWO_WEEKS = new Date(TODAY.getTime() + (14*24*60*60*1000))
  const maxDate = TWO_WEEKS.toISOString().split('T')[0]

  const {
    handleSubmit,
    register,
    formState,
  } = useForm({
    defaultValues: {
      zoneID: zones ? zones[0].id : null,
      originID: 'none',
      destinationID: 'none',
      dateString: minDate
    }
  })

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
    <label htmlFor="dateString">Date</label>
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

      {zonesError &&
        <span>Zones: {zonesError.message}</span>
      }
      {stationsError &&
        <span>Stations: {stationsError.message}</span>
      }
    </form>
  )
}

export default Form
