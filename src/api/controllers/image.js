const fs = require('fs')
const path = require('path')

async function uploadImage(imageFile) {
    const extension = path.extname(imageFile.originalname)
    const oldPath = imageFile.path
    const newPath = path.join(__dirname, '../../resources/' + imageFile.filename + extension)

    fs.promises.rename(oldPath, newPath)

    const image = imageFile.filename + extension

    return {
        code: 200,
        message: "Upload successful",
        image: "resources/" + image
    }
}

async function uploadMultipleImages(imageFiles) {
    const uploadedImages = []

    for(const file of imageFiles) {
        const extension = path.extname(file.originalname)
        const oldPath = file.path
        const newPath = path.join(__dirname, '../../resources/', file.filename + extension)

        await fs.promises.rename(oldPath, newPath)

        const imageUrl = "resources/" + file.filename + extension
        uploadedImages.push(imageUrl);
    }

    return {
        code: 200,
        message: "Upload successful",
        images: uploadedImages
    }
}

module.exports = {
    uploadImage,
    uploadMultipleImages
}