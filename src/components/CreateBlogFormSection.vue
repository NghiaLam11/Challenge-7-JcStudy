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
        <div class="result-bottom">
          <div class="reaction">
            <span class="icon heart"
              ><i class="fas fa-heart"></i><span>1</span></span
            >
            <span class="icon comment"
              ><i class="fas fa-comment"></i><span>1</span></span
            >
          </div>
          <div class="relate-blogs">
            <h3>The others by Author</h3>
            <div class="relate-list">
              <Carousel :breakpoints="breakpointsblogs">
                <Slide v-for="slide in 10" :key="slide">
                  <div class="card-item">
                    <div class="thumbnail">
                      <img
                        src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div class="card-right bg-primary">
                      <h3 class="multiline-ellipsis-1">
                        Lorem islem posile delao adipisicing elit!
                      </h3>
                      <p class="multiline-ellipsis-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet eos voluptatem iusto delectus, minus sapiente!
                        Distinctio atque dolore reprehenderit laboriosam? Sit et
                        possimus assumenda! Quas aspernatur dolore nulla cumque
                        odio.
                      </p>
                      <div class="card-auth">
                        <div class="wrapper-img">
                          <img src="/src/images/peep-82.png" alt="" />
                        </div>

                        <span>Jclahi</span>
                      </div>
                      <div><button>Read more...</button></div>
                    </div>
                  </div>
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
          </div>
          <div class="relate-blogs">
            <h3>#Related</h3>
            <div class="relate-list">
              <Carousel :breakpoints="breakpointsblogs">
                <Slide v-for="slide in 10" :key="slide">
                  <div class="card-item">
                    <div class="thumbnail">
                      <img
                        src="/src/images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                        alt=""
                      />
                    </div>
                    <div class="card-right bg-primary">
                      <h3 class="multiline-ellipsis-1">
                        Lorem islem posile delao adipisicing elit!
                      </h3>
                      <p class="multiline-ellipsis-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Amet eos voluptatem iusto delectus, minus sapiente!
                        Distinctio atque dolore reprehenderit laboriosam? Sit et
                        possimus assumenda! Quas aspernatur dolore nulla cumque
                        odio.
                      </p>
                      <div class="card-auth">
                        <div class="wrapper-img">
                          <img src="/src/images/peep-82.png" alt="" />
                        </div>

                        <span>Jclahi</span>
                      </div>
                      <div><button>Read more...</button></div>
                    </div>
                  </div>
                </Slide>

                <template #addons>
                  <Navigation />
                  <Pagination />
                </template>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
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

const breakpointsblogs = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  534: {
    itemsToShow: 2,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  1024: {
    autoplay: 4000,
    itemsToShow: 3,
    pauseAutoplayOnHover: true,
    snapAlign: "start",
  },
});
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
      margin: 0 auto;
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
      .result-bottom {
        .reaction {
          display: flex;
          align-items: center;
          span.icon {
            padding: 0.3rem 0.5rem;
            span {
              padding: 0 0.3rem;
            }
          }
          .heart {
            i {
              color: red;
            }
          }
          .comment {
            i {
              color: aqua;
            }
          }
        }
        .relate-blogs {
          margin: 1rem 0;
          .card-item {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            padding-bottom: 2rem;
            padding-top: 0;
            .thumbnail {
              width: 100%;
              height: 100%;
              padding: 0.5rem;
              border-radius: 5px;
              overflow: hidden;
              filter: grayscale(1);
              img {
                transition: all 0.9s ease;

                object-fit: cover;
                width: 100%;
                min-height: 180px;
                height: 100%;
                border-radius: 5px;
              }
            }
            .card-right {
              width: 100%;
              text-align: start;
              transition: all 0.8s ease;
              padding: 0 1rem;
              h3 {
                font-size: 1.3rem;
                line-height: 1.8rem;
                margin-bottom: 0.2rem;
              }
              p {
                font-size: 0.8rem;
                line-height: 1.2rem;
                opacity: 0.7;
              }

              .card-auth {
                display: inline-flex;
                align-items: center;
                padding: 0.2rem;
                margin: 0.5rem 0;
                .wrapper-img {
                  width: 35px;
                  height: 35px;
                  padding: 0.2rem;
                  position: relative;
                  padding-bottom: 0.4rem;
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.35s ease;
                  }
                }

                .wrapper-img::after {
                  content: "";
                  position: absolute;
                  z-index: 2;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  scale: 1.03;
                  border-radius: 50%;
                  border: 1px dashed;
                  transition: all 0.35s ease;
                }
                span {
                  margin-left: 0.3rem;
                  font-weight: bold;
                  font-size: 1.1rem;
                }
              }
              .card-auth:hover .wrapper-img img {
                scale: 1.05;
              }
              .card-auth:hover .wrapper-img::after {
                scale: 1.1;
                animation: spinAni 10s ease-in-out infinite;
              }
              @keyframes spinAni {
                from {
                  transform: rotate(0);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            }
          }
          .card-item:hover .card-right {
            transform: translateY(1.5rem);
            border-radius: 5px;
          }
          .card-item:hover .thumbnail {
            filter: grayscale(0);
          }
        }
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
