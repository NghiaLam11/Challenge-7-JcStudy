import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUploaderStore } from "./useLoader";
interface MediaLink {
  filePath: any;
  fileName: string;
}
export const useUploadImgStorage = async (
  mediaLink: MediaLink,
  idUser: string
) => {
  try {
    const uploaderStore = useUploaderStore();
    uploaderStore.onToggleUploading();
    const mediaImageRef = ref(
      storage,
      `images-${idUser}/${mediaLink.fileName}`
    );
    const img = await uploadBytes(mediaImageRef, mediaLink.filePath);
    return img.metadata.fullPath;
  } catch (error) {
    console.log(error);
  }
};

export const useUploadVideoStorage = async (
  mediaLink: MediaLink,
  idUser: string
) => {
  try {
    const uploaderStore = useUploaderStore();

    const mediaVideoRef = ref(
      storage,
      `videos-${idUser}/${mediaLink.fileName}`
    );
    const video = await uploadBytes(mediaVideoRef, mediaLink.filePath);
    uploaderStore.onToggleUploading();
    return video.metadata.fullPath;
  } catch (error) {
    console.log(error);
  }
};

export const useGetImageUrlStorage = async (fullPath: string) => {
  try {
    const imgUrl = await getDownloadURL(ref(storage, fullPath));
    return imgUrl;
    // console.log(imgUrl);
  } catch (error) {
    console.log(error);
  }
};

export const useGetVideoUrlStorage = async (fullPath: string) => {
  try {
    const videoUrl = await getDownloadURL(ref(storage, fullPath));
    return videoUrl;

  } catch (error) {
    console.log(error);
  }
};
