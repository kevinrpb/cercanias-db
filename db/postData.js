import admin from '@firebase/nodeApp'

export const createDocument = async (col, id, data, merge=true) => {
  const db = admin.firestore()
  const collection = db.collection(col)
  const document = collection.doc(id)

  const result = await document.set(data, { merge })

  return result
}
