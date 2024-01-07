import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

export const useAddImgStorage = async (
  mediaLink: any,
  idUser: string
) => {
  const mediaImageRef = ref(storage, `images-${idUser}/${mediaLink.fileName}`);
  const imgUrl = await uploadBytes(mediaImageRef, mediaLink.filePath);
  return imgUrl;
};

export const useAddVideoStorage = async (
  mediaLink: any,
  idUser: string
) => {
  const mediaVideoRef = ref(storage, `videos-${idUser}/${mediaLink.fileName}`);
  const videoUrl = await uploadBytes(mediaVideoRef, mediaLink.filePath);
  return videoUrl;
};



