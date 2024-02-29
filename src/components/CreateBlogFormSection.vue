<template>
  <div class="blog-create">
    <div class="container blog-create-container">
      <div class="form-group">
        <input type="text" placeholder="Title..." v-model="title" />
        <div class="file-thumbnail">
          <div class="select-img">
            <input
              @change="onImage"
              type="file"
              name="file"
              ref="fileImgElement"
              id="file"
              class="inputfile"
              required
            />
            <label for="file"
              ><i class="fas fa-image"></i>
              <p>Upload image!</p></label
            >
          </div>
          <div class="img-thumbnail" v-show="imageUrlReader">
            <img :src="imageUrlReader" alt="" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="custom-select">
          <select v-model="industry">
            <option>Industry</option>
            <option>Audi</option>
            <option>BMW</option>
            <option>Citroen</option>
            <option>Ford</option>
            <option>Honda</option>
            <option>Jaguar</option>
            <option>Land Rover</option>
            <option>Mercedes</option>
            <option>Mini</option>
            <option>Nissan</option>
            <option>Toyota</option>
            <option>Volvo</option>
          </select>
        </div>
        <input
          v-model="tags"
          type="text"
          placeholder="Tags (Ex: Frontend, Backend,...)"
        />
      </div>
      <div class="text-editor">
        <QuillEditor
          v-model:content="content"
          :modules="modules"
          toolbar="full"
          :options="options"
          :content-type="'html'"
        />
      </div>
      <div class="result">
        <h3 class="topic">Your post</h3>
        <div class="result-top">
          <h2 class="title">{{ title }}</h2>
          <p class="tags">
            <span>{{ tags }}</span> <span>Full-stack</span>
          </p>
          <div class="auth">
            <div class="img">
              <img src="../images/peep-82.png" alt="" />
            </div>
            <div class="text">
              <div class="text-top">
                <span class="name">Jclahi</span>
                | <span class="type">{{ industry }}</span>
              </div>
              <div class="date">10/11/2003</div>
            </div>
          </div>
        </div>
        <div
          v-show="content !== undefined"
          class="content-editor"
          ref="contentEle"
        ></div>
        <div v-show="content === undefined" class="empty-post">
          Your post is empty! Write something above!
          {{ content }}
        </div>
        <button @click="onComplete" class="btn-complete" type="button">
          Complete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

import { QuillEditor } from "@vueup/vue-quill";
// @ts-ignore
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
// @ts-ignore
import ImageUploader from "quill-image-uploader";

import {
  useGetImageUrlStorage,
  useUploadImgStorage,
} from "../composable/useFirebaseStorage";
import { useAddBlogStore } from "../composable/useFirebaseStore";
import router from "../router";

const tags = ref("Front-end Back-end");
const title = ref("Lorem isluti lemi hioseil lami nelo!");
const industry = ref("Industry");

// INPUT FOR SELECT IMG FILE
const imageName = ref("");
const imagePath = ref("");
const imageUrlReader: any = ref("");
const fileImgElement = ref();
const onImage = () => {
  let file = fileImgElement.value.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    // GET A LINK OF VIDEO TO DISPLAY ON THE SCREEN
    imageUrlReader.value = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
  imageName.value = file.name; // GET A NAME OF THE FILE
  imagePath.value = file; // GET A PATH OF THE FILE
};

const content = ref();
const contentEle = ref();
const mediaFiles = ref<any>({});
const useSaveLinks = (imgName: string, imgPath: any) => {
  const result: any = document.querySelector(".ql-editor");
  const images: any = result.querySelectorAll(".image-uploading");
  for (let i = 0; i < images.length; i++) {
    let children = images[i].querySelector("img");
    if (children !== null && children.classList.value === "" && imgName) {
      children.classList.add(imgName);
      mediaFiles.value[imgName] = {
        fileName: imgName,
        filePath: imgPath,
      };
    }
  }
  content.value = result.innerHTML;
};

const useGetLinks = () => {
  const links = ref<any>({});
  const result: any = document.querySelector(".ql-editor");
  const images: any = result.querySelectorAll(".image-uploading");
  for (let i = 0; i < images.length; i++) {
    let children = images[i].querySelector("img");
    if (children?.classList.value) {
      if (mediaFiles.value.hasOwnProperty(children.classList.value)) {
        links.value[children.classList.value] =
          mediaFiles.value[children.classList.value];
      }
    }
  }
  return links.value;
};

const useChangeBase64 = () => {
  const result: any = document.querySelector(".ql-editor");
  const images: any = result.querySelectorAll(".image-uploading");
  for (let i = 0; i < images.length; i++) {
    let children = images[i].querySelector("img");
    if (children != null) {
      children.src = "https://unsplash.com/photos/text-jf1EomjlQi0";
    }
  }
};
const onComplete = async () => {
  useChangeBase64();
  const idUser: any = localStorage.getItem("idUser");
  const fullPathThumbnail: any = await useUploadImgStorage(
    { filePath: imagePath.value, fileName: imageName.value },
    idUser
  );
  const imgThumbnail = await useGetImageUrlStorage(fullPathThumbnail);

  const links = useGetLinks();

  const imgUrls = ref<any>({});
  for (const key in links) {
    const fullPath: any = await useUploadImgStorage(links[key], idUser);
    const url = await useGetImageUrlStorage(fullPath);
    imgUrls.value[key] = url;
  }

  const result: any = document.querySelector(".ql-editor");
  const data = ref({
    content: result.innerHTML,
    images: imgUrls.value,
    title: title.value,
    industry: industry.value,
    tags: tags.value,
    imgUrl: imgThumbnail,
    isApproved: false,
    createdAt: new Date().toLocaleDateString(),
    view: 0,
    idUser: idUser,
  });
  await useAddBlogStore(data.value);
  await router.push("/");
};
watch(content, (val: any) => {
  contentEle.value.innerHTML = val;
});
const modules = [
  {
    name: "blotFormatter",
    module: BlotFormatter,
  },
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file: any) => {
        setTimeout(() => {
          useSaveLinks(file.name, file);
        }, 500);
      },
    },
  },
];
const options = {
  debug: "info",
  // readOnly: true,
  placeholder: "Compose an epic...",
  theme: "snow",
};
</script>

<style lang="scss" scoped>
.blog-create {
  min-height: 100vh;
  .blog-create-container {
    padding: 1rem;
    .form-group {
      padding: 1rem 0;
      padding-top: 0;
      display: flex;
      gap: 1rem;
      margin: 1rem auto;
      padding-bottom: 0 !important;
      .file-thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 70px;
        text-align: center;
        border: 2px dashed var(--border-color);
        border-radius: 5px;
        position: relative;
        overflow: hidden;
        .img-thumbnail {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: -1;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
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
            transform: translateY(-7px);
            font-size: 1rem !important;
            opacity: 0.9;
          }
          p {
            transform: translateY(-10px);

            font-size: 0.5rem;
            opacity: 0.5;
          }
        }
        .inputfile + label:hover {
          transform: scale(1.01) translateY(5px);
          color: var(--primary-color);
        }
      }
      input {
        width: 80%;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        border: 1px solid;
        border-radius: 3px;
        border-bottom: 0.3rem solid;
        font-size: 1rem;
        outline: none;
        transition: border 0.35s ease;
      }
      input:focus {
        border-bottom: 1px solid;
      }
    }
    .form-group:nth-child(2) {
      padding: 1rem 0;
      padding-top: 0;
      display: flex;
      margin: 1rem auto;
      padding-bottom: 0 !important;
      .custom-select {
        width: 50%;
        select {
          width: 100%;
          padding: 0.5rem;

          cursor: pointer;

          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          border: 1px solid;
          border-radius: 3px;
          border-bottom: 0.3rem solid;
          font-size: 0.9rem;
          outline: none;
          transition: border 0.35s ease;
          option {
            background-color: var(--bg-secondary);
            color: var(--text-color);
            padding: 3rem;
          }
        }
        select:focus {
          border-bottom: 1px solid;
        }
      }
      input {
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        border: 1px solid;
        border-radius: 3px;
        border-bottom: 0.3rem solid;
        font-size: 0.9rem;
        outline: none;
        transition: border 0.35s ease;
      }
      input:focus {
        border-bottom: 1px solid;
      }
      input::placeholder {
        opacity: 0.5;
      }
    }
    .text-editor {
      margin-bottom: 2rem;
    }
    .result {
      max-width: 889px;
      margin: 1.5rem auto;
      .result-top {
        margin-top: 1rem;
        .title {
          font-size: 3rem;
          letter-spacing: 1.5px;
          line-height: 3.3rem;
        }
        .tags {
          span {
            font-size: 0.8rem;
          }
        }
        .auth {
          margin: 2rem 0;
          display: flex;
          align-items: center;
          .img {
            padding: 0.2rem;

            border: 1px solid;
            border-radius: 50%;
            img {
              padding-bottom: 0.3rem;
              width: 40px;
              height: 40px;
              object-fit: cover;
            }
          }
          .text {
            padding-left: 0.5rem;
            .text-top {
              display: flex;
              align-items: center;
              span {
                padding: 0 0.2rem;
              }
              .name {
                font-weight: bold;
                font-size: 1.1rem;
              }
              .type {
                font-weight: 400;
                font-size: 0.9rem;
              }
            }
            .date {
              padding: 0 0.2rem;
              font-size: 0.7rem;
              opacity: 0.7;
            }
          }
        }
      }
      .empty-post {
        font-style: italic;
        margin-bottom: 1rem;
        opacity: 0.7;
      }
      .content-editor {
        margin-bottom: 1rem;
        margin-left: 0.2rem;
      }
      .btn-complete:active {
        margin-bottom: 4px;
        margin-left: 2px;
        transform: translateY(4px) translateX(-2px);
      }
    }
  }
}

@media screen and (max-width: 534px) {
  .result-top {
    .title {
      font-size: 2rem !important;
      line-height: 2.3rem !important;
    }
  }
}

@media screen and (max-width: 374px) {
  .topic {
    font-size: 0.9rem !important;
  }
  .result-top {
    .title {
      font-size: 1.5rem !important;
      line-height: 1.8rem !important;
      letter-spacing: 0.2px !important;
    }
  }
}
</style>
