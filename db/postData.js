import admin from '@firebase/nodeApp'

export const createDocument = async (col, id, data) => {
  const db = admin.firestore()
  const collection = db.colleciton(col)
  const document = await collection.doc(id).get()

  if (!document.exists) return null

  return document.data()
}
