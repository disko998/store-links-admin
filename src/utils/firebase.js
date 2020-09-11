import { storage } from '../config'

export const uploadStoreImages = async (storeId, logo, image) => {
    try {
        // get ref
        const ref = storage.ref(`store/${storeId}`)

        // store images
        const logoSnap = await ref.child('logo.png').putString(logo, 'data_url')
        const imageSnap = await ref.child('image.png').putString(image, 'data_url')

        //get url
        const logoURL = await logoSnap.ref.getDownloadURL()
        const imageURL = await imageSnap.ref.getDownloadURL()

        return { logoURL, imageURL }
    } catch (error) {
        throw error
    }
}

export const updateImageFile = async (storeId, picture, pathname) => {
    try {
        // get ref
        const ref = storage.ref(`store/${storeId}`)

        // store images
        const snapshot = await ref.child(`${pathname}.png`).put(picture)

        //get url
        const pictureURL = await snapshot.ref.getDownloadURL()

        return { [pathname]: pictureURL }
    } catch (error) {
        throw error
    }
}

export const deleteFileStory = async folder => {
    try {
        const ref = storage.ref('story')

        console.log(ref)

        return await ref.child(folder).delete()
    } catch (error) {
        throw error
    }
}
