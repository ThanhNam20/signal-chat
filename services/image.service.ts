import * as ImagePicker from "expo-image-picker";


const pickImage = async () => {
  // Permissions request is necessary for launching the image library

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });
  return result;
};

const takePhoto = async () => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });

  return result;
};

const getImageBlob = async (image: any) => {
  if (!image) return null;
  const response = await fetch(image);
  const blob = await response.blob();
  return blob;
}

export const ImageService = { pickImage, takePhoto, getImageBlob }