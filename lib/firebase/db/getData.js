import admin from '@lib/firebase/nodeApp'

export const getCollection = (id) => {
  const db = admin.firestore()

  return db.collection(id)
}

export const getCollectionDocuments = async (id) => {
  const collection = getCollection(id)
  const snapshot = await collection.get()
  const documents = snapshot.docs.map((doc) => doc.data())

  return documents
}

export const getDocument = async (col, id) => {
  const collection = getCollection(col)
  const document = await collection.doc(id).get()

  if (!document.exists) return null

  return document.data()
}

export const getZones = async () => {
  const zones = getCollectionDocuments('zones')

  return zones
}

export const getZoneStations = async (zoneID) => {
  const collection = getCollection('stations')
  const query = collection.where('zoneID', '==', zoneID)
  const snapshot = await query.get()
  const documents = snapshot.docs.map((doc) => doc.data())

  return documents
}
