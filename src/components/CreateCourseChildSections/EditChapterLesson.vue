<template>
  <div class="add-lesson">
    <div class="container add-container">
      <div class="blur"></div>
      <div class="form-add">
        <div class="form-group form-file">
          <div class="file-thumbnail">
            <div>
              <input
                ref="fileImgElement"
                @change="onImage"
                type="file"
                accept="image/*"
                name="file-img-edit"
                id="file-img-edit"
                class="inputfile"
              />
              <label for="file-img-edit"
                ><i class="fas fa-image"></i>
                <p>Upload image!</p></label
              >
            </div>
            <div class="img-thumbnail">
              <img :src="imageUrlReader" alt="" />
            </div>
          </div>
          <div class="file-thumbnail">
            <div>
              <input
                @change="onVideo"
                ref="fileVideoElement"
                type="file"
                accept="video/*"
                name="file-video-edit"
                id="file-video-edit"
                class="inputfile"
              />
              <label for="file-video-edit"
                ><i class="fas fa-play-circle"></i>
                <p>Upload video!</p></label
              >
            </div>
            <div class="video-thumbnail">
              <video v-if="videoUrlReader !== ''" controls>
                <source :src="videoUrlReader" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input v-model="title" type="text" placeholder="Title..." />
          <textarea
            v-model="desc"
            placeholder="Description..."
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div class="form-btn">
          <button @click="onChange" type="button">Change</button>
          <button type="button" @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const emit = defineEmits(["onCancel", "onChange"]);
const onCancel = () => {
  emit("onCancel");
};
const videoName = ref("");
const videoPath = ref("");
const videoUrlReader: any = ref("");
const fileVideoElement = ref();
const onVideo = () => {
  let file = fileVideoElement.value.files[0];
  let reader = new FileReader();
  if (file.size > 5000000) {
    alert(
      "Please select a video less than 5MB because this page just is a test version"
    );
    return;
  }
  if (file) {
    reader.readAsDataURL(file);
  }
  reader.onload = function () {
    videoUrlReader.value = reader.result;
  };

  videoName.value = file.name;
  videoPath.value = file;
};

const imageName = ref("");
const imagePath = ref("");
const imageUrlReader: any = ref("");
const fileImgElement = ref();
const onImage = () => {
  let file = fileImgElement.value.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    imageUrlReader.value = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
  imageName.value = file.name;
  imagePath.value = file;
};
const title = ref("");
const desc = ref("");
const onChange = () => {
  const lessonDetails = ref({
    title: title.value,
    desc: desc.value,
    thumbnailImg: imageUrlReader.value,
    thumbnailVideo: videoUrlReader.value,
    imageName: imageName.value,
    imagePath: JSON.stringify(imagePath.value),
    videoName: videoName.value,
    videoPath: JSON.stringify(videoPath.value),
  });
  emit("onChange", lessonDetails.value);
};
</script>
<style lang="scss" scoped>
.add-lesson {
  .add-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: -1;
    }
    .form-add {
      width: 100%;
      transform: translateY(-10px);
      .form-file {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem;
        .file-thumbnail {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(100% / 4);
          height: 200px;
          text-align: center;
          border: 2px solid var(--border-color);
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          .img-thumbnail,
          .video-thumbnail {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
          }
          .video-thumbnail {
            width: 100%;
            video {
              width: 100%;
              height: 100%;
            }
          }

          .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }
          .inputfile + label {
            transform: translateY(7px);
            font-size: 1.5rem;
            font-weight: 700;
            display: inline-block;
            cursor: pointer;
            transition: transform 0.3s linear;
          }
          label {
            i {
              font-size: 1.5rem !important;
              opacity: 0.9;
            }
            p {
              font-size: 0.7rem;
              opacity: 0.5;
            }
          }
          .inputfile + label:hover {
            transform: scale(1.01) translateY(5px);
            color: var(--primary-color);
          }
        }
      }
      .form-group:nth-child(2) {
        padding: 1rem;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        width: 54%;
        margin: 0 auto;
        padding-bottom: 0 !important;
        input,
        textarea {
          padding: 0.5rem;
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          margin-bottom: 0.8rem;
          border: 1px solid;
          border-radius: 3px;
          border-bottom: 0.3rem solid;
          font-size: 0.9rem;
          outline: none;
          transition: border 0.35s ease;
        }
        input:focus,
        textarea:focus {
          border-bottom: 1px solid;
        }
      }
      .form-btn {
        text-align: start;
        width: 54%;
        margin: 0 auto;

        button {
          border-left: 1px solid;
          width: 100px;
          margin: 0 1rem;
          padding: 0.4rem;
        }
        button:active {
          transform: translateY(4px);
        }
      }
    }
  }
}
@media screen and (max-width: 734px) {
  .form-file {
    gap: 1rem !important;
  }
  .file-thumbnail {
    width: calc(100% / 2) !important;
  }
  .form-group:nth-child(2),
  .form-btn {
    width: 100% !important;
  }
}
@media screen and (max-width: 534px) {
}
</style>
