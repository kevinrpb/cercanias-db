import admin from '@lib/firebase/nodeApp'

export const createDocument = async (col, id, data, merge=true) => {
  console.warn('HEY! Consider using the batch version of this function to reduce quota usage')
  const db = admin.firestore()
  const collection = db.collection(col)
  const document = collection.doc(id)

  const result = await document.set(data, { merge })
  return result
}

export const batchCreateDocuments = async (elements) => {
  const db = admin.firestore()
  const batch = db.batch()

  for (let element of elements) {
    const { col, id, data, merge=true } = element

    const collection = db.collection(col)
    const document = collection.doc(id)

    batch.set(document, data, { merge })
  }

  return await batch.commit()
}

export const createNestedDocument = async (col, id, ncol, nid, data, merge=true) => {
  console.warn('HEY! Consider using the batch version of this function to reduce quota usage')
  const db = admin.firestore()
  const collection = db.collection(col)
  const document = collection.doc(id)

  const nested_collection = document.collection(ncol)
  const nested_document = nested_collection.doc(nid)

  const result = await nested_document.set(data, { merge })
  return result
}

export const batchCreateNestedDocuments = async (elements) => {
  const db = admin.firestore()
  const batch = db.batch()

  for (let element of elements) {
    const { col, id, ncol, nid, data, merge=true } = element

    const collection = db.collection(col)
    const document = collection.doc(id)

    const nested_collection = document.collection(ncol)
    const nested_document = nested_collection.doc(nid)

    batch.set(nested_document, data, { merge })
  }

  return await batch.commit()
}
