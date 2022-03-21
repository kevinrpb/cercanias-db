import admin from '@firebase/nodeApp'

export const createDocument = async (col, id, data, merge=true) => {
  const db = admin.firestore()
  const collection = db.collection(col)
  const document = collection.doc(id)

  const result = await document.set(data, { merge })
  return result
}

export const createNestedDocument = async (col, id, ncol, nid, data, merge=true) => {
  const db = admin.firestore()
  const collection = db.collection(col)
  const document = collection.doc(id)

  const nested_collection = document.collection(ncol)
  const nested_document = nested_collection.doc(nid)

  const result = await nested_document.set(data, { merge })
  return result
}
