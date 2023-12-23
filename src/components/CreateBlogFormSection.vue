<template>
  <div class="blog-create">
    <div class="container blog-create-container">
      <div class="form-group">
        <input type="text" placeholder="Title..." />
        <div class="file-thumbnail">
          <!-- <div>
            <input type="file" name="file" id="file" class="inputfile" />
            <label for="file"
              ><i class="fas fa-image"></i>
              <p>Upload image!</p></label
            >
          </div> -->
          <div class="img-thumbnail">
            <img
              src="../images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <div class="custom-select">
          <select>
            <option value="0">Industry</option>
            <option value="1">Audi</option>
            <option value="2">BMW</option>
            <option value="3">Citroen</option>
            <option value="4">Ford</option>
            <option value="5">Honda</option>
            <option value="6">Jaguar</option>
            <option value="7">Land Rover</option>
            <option value="8">Mercedes</option>
            <option value="9">Mini</option>
            <option value="10">Nissan</option>
            <option value="11">Toyota</option>
            <option value="12">Volvo</option>
          </select>
        </div>
        <input type="text" placeholder="Tags (Ex: Frontend, Backend,...)" />
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
          <h2 class="title">Lorem isluti lemi hioseil lami nelo!</h2>
          <p class="tags"><span>Front-end</span> <span>Back-end</span></p>
          <div class="auth">
            <div class="img">
              <img src="../images/peep-82.png" alt="" />
            </div>
            <div class="text">
              <div class="text-top">
                <span class="name">Jclahi</span>
                | <span class="type">Software</span>
              </div>
              <div class="date">10/11/2003</div>
            </div>
          </div>
        </div>
        <div v-show="content !== undefined" class="content-editor" ref="contentEle"></div>
        <div v-show="content === undefined" class="empty-post">
          Your post is empty! Write something above!
          {{ content }}
        </div>
        <button class="btn-complete" type="button">Complete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import BlotFormatter from "quill-blot-formatter";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const content = ref();
const contentEle = ref();

watch(content, (val: any) => {
  console.log(val);
  contentEle.value.innerHTML = val;
});
// const onTest = (val: any) => {
//   console.log(val.value.className);
// };
// const onTest2 = (val: any) => {
//   console.log(val);
// };
const modules = {
  name: "blotFormatter",
  module: BlotFormatter,
};
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
        background-color: var(--footer-color);
        height: 70px;
        text-align: center;
        border: 2px dashed var(--border-color);
        border-radius: 5px;
        overflow: hidden;
        .video-thumbnail {
          background-color: var(--bg-secondary);
          width: 100%;
          video {
            width: 100%;
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
      height: 70vh;
      min-height: 70vh;
      margin-bottom: 5rem;
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
@media screen and (min-width: 534px) and (max-width:1245px){
  .text-editor {
    margin-bottom: 8rem !important;
  }
}
@media screen and (max-width: 534px) {
  .text-editor {
    margin-bottom: 10rem !important;
  }
  .result-top {
    .title {
      font-size: 2rem !important;
      line-height: 2.3rem !important;
    }
  }
}

@media screen and (max-width: 374px) {
  .text-editor {
    margin-bottom: 13rem !important;
  }
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
