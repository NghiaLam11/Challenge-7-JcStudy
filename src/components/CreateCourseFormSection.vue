<template>
  <section class="registration">
    <div class="container">
      <form @submit.prevent="onSend" class="regis-form">
        <div class="form-group form-file">
          <div class="file-thumbnail">
            <div class="select-img">
              <input
                @change="onImage"
                type="file"
                name="file"
                accept="image/*"
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
            <div class="img-thumbnail">
              <img :src="imageUrlReader" alt="" />
            </div>
          </div>
          <div class="file-thumbnail">
            <div>
              <input
                @change="onVideo"
                type="file"
                name="file-video"
                ref="fileVideoElement"
                id="file-video"
                class="inputfile"
                accept="video/*"
                required
              />
              <label for="file-video"
                ><i class="fas fa-play-circle"></i>
                <p>Upload video!</p></label
              >
            </div>
            <div class="video-thumbnail">
              <video controls v-if="videoUrlReader !== ''" ref="videoElement">
                <source :src="videoUrlReader" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div class="form-group">
          <input v-model="title" type="text" placeholder="Title..." required />
          <textarea
            v-model="desc"
            placeholder="Description..."
            cols="30"
            rows="5"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <div class="custom-select">
            <select v-model="industry" required>
              <option v-for="industry in industries">{{ industry }}</option>
            </select>
          </div>
          <div class="tags">
            <input v-model="tags" type="text" placeholder="Tags..." required />
          </div>
          <div class="price">
            <input
              v-model="price"
              disabled
              type="number"
              placeholder="Free..."
            />
          </div>
        </div>
        <div class="form-group">
          <div class="create-chapter">
            <div class="amount-chapter">
              <div class="amount-left">
                <span>Create</span
                ><input
                  v-model="amountChapter"
                  placeholder="0"
                  type="number"
                  required
                /><span>chapters</span>
              </div>
              <div class="amount-right">
                <button
                  type="button"
                  @click="onCreateChapters"
                  class="btn-chapter"
                >
                  Create
                </button>
              </div>
            </div>
            <div
              class="chapter-courses"
              v-for="(chapter, keyChapter) in chapters"
            >
              <div class="chapter-title">
                <h3>Chapter {{ keyChapter }}</h3>
              </div>
              <div class="chapter-list">
                <div
                  class="chapter-item"
                  v-for="(lesson, keyLesson) in chapter"
                  :key="keyLesson"
                >
                  <div class="chapter-number">{{ keyLesson }}</div>
                  <div class="chapter-img">
                    <img :src="lesson?.thumbnailImg" alt="" />
                  </div>
                  <div class="chapter-video">
                    <video
                      class="video-lesson"
                      ref="videoLessonElement"
                      controls
                    >
                      <source :src="lesson?.thumbnailVideo" type="video/mp4" />
                    </video>
                  </div>
                  <div class="chapter-text">
                    <h4 class="multiline-ellipsis-1">{{ lesson?.title }}</h4>
                    <p class="multiline-ellipsis-1">
                      {{ lesson?.desc }}
                    </p>
                  </div>
                  <div class="chapter-btn">
                    <i
                      @click="onOpenEditLesson(keyLesson, keyChapter)"
                      class="fa-solid fa-hammer"
                    ></i>
                    <i
                      @click="onOpenDeleteLesson(keyLesson, keyChapter)"
                      class="fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="btn-add">
                <button type="button" @click="onOpenAddLesson(keyChapter)">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-btn">
          <button type="submit">Send it!</button>
        </div>
      </form>
      <AddChapterLesson
        @on-complete="onAddLesson"
        v-if="isToggleForm"
        @on-cancel="onCancelAddLesson"
      />
      <EditChapterLesson
        @on-change="onEditLesson"
        v-if="isToggleEditForm"
        @on-cancel="onCancelEditLesson"
      />
      <DeleteChapterLesson
        @on-delete="onDeleteLesson"
        v-if="isToggleDeleteForm"
        @on-cancel="onCancelDeleteLesson"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AddChapterLesson from "../components/CreateCourseChildSections/AddChapterLesson.vue";
import EditChapterLesson from "../components/CreateCourseChildSections/EditChapterLesson.vue";
import DeleteChapterLesson from "../components/CreateCourseChildSections/DeleteChapterLesson.vue";
import {
  useUploadImgStorage,
  useUploadVideoStorage,
} from "../composable/useFirebaseStorage";
import { useAddCourseStore } from "../composable/useFirebaseStore";
import { useRouter } from "vue-router";
import { useUploaderStore } from "../composable/useLoader";
const router = useRouter();

// CREATE CHAPTERS
const amountChapter = ref(0);
const chapters = ref<any>({});

const onCreateChapters = () => {
  chapters.value = {}; // RESET CHAPTERS = EMPTY

  for (let i = 0; i < amountChapter.value; i++) {
    chapters.value[i] = [];
  } // AFTER RESET => CREATE .../NUMBERS/... CHAPTERS BY amountChapter
  console.log(chapters.value);
};
// TOGGLE HIDE/DISPLAY CREATE LESSON FORM
const isToggleForm = ref(false);
const onCancelAddLesson = () => {
  isToggleForm.value = !isToggleForm.value;
};
// OPEN CREATE LESSON FORM
const chapterKey = ref(0);
const onOpenAddLesson = (chapterKeyVal: number) => {
  isToggleForm.value = !isToggleForm.value;
  console.log(chapterKeyVal);
  chapterKey.value = Number(chapterKeyVal); // GET A KEY OF THE CHAPTER WHEN USER OPEN CREATE FORM
};
// ADD NEW LESSSON
const onAddLesson = (lessonDetails: any) => {
  chapters.value[chapterKey.value].push(lessonDetails); // ADD LESSON TO THE CHAPTER(GOT A KEY ABOVE)
  isToggleForm.value = !isToggleForm.value;
  console.log(chapters.value);
};
// TOGGLE HIDE/DISPLAY EDIT FORM
const isToggleEditForm = ref(false);
const onCancelEditLesson = () => {
  isToggleEditForm.value = !isToggleEditForm.value;
};

// OPEN EDIT FORM
// Position of the chapter user want to edit data
const editChapterNumber = ref<number>(0);
// Position of the lesson user want to edit data
const editLessonNumber = ref<number>(0);
const onOpenEditLesson = (
  lessonNumberVal: number,
  chapterNumberVal: number
) => {
  isToggleEditForm.value = !isToggleEditForm.value;
  editChapterNumber.value = Number(chapterNumberVal); // GET A KEY OF THE CHAPTER
  editLessonNumber.value = lessonNumberVal; // GET A KEY OF THE LESSON
  console.log("EDIT: " + lessonNumberVal + chapterNumberVal);
};
// EDIT LESSON
const videoLessonElement = ref<any>();
const onEditLesson = (lessonDetails: any) => {
  // RELOAD SRC OF VIDEOS WHEN CHANGED URL
  for (let i = 0; i < videoLessonElement.value.length; i++) {
    videoLessonElement.value[i].load();
  }
  // REPLACE OLD LESSON BY NEW LESSON
  chapters.value[editChapterNumber.value][editLessonNumber.value] =
    lessonDetails;
  isToggleEditForm.value = !isToggleEditForm.value;
};

// OPEN EDIT's DELETE FORM
// Position of the chapter user want to delete data
const deleteChapterNumber = ref<number>(0);
// Position of the lesson user want to delete data
const deleteLessonNumber = ref<number>(0);
const onOpenDeleteLesson = (
  lessonNumberVal: number,
  chapterNumberVal: number
) => {
  deleteChapterNumber.value = Number(chapterNumberVal); // GET A KEY OF THE CHAPTER
  deleteLessonNumber.value = lessonNumberVal; // GET A KEY OF THE LESSON
  console.log("DELETE: " + lessonNumberVal + chapterNumberVal);
  isToggleDeleteForm.value = !isToggleDeleteForm.value;
};

// DELETE LESSON
const onDeleteLesson = () => {
  let index = chapters.value[deleteChapterNumber.value].indexOf(
    chapters.value[deleteChapterNumber.value][deleteLessonNumber.value]
  ); // GET INDEX OF THE LESSON
  const itemSpliced = chapters.value[deleteChapterNumber.value].splice(
    index,
    1
  ); // FROM THE POSITON SPLICE ONE ITEM
  console.log(itemSpliced);
  isToggleDeleteForm.value = !isToggleDeleteForm.value;
};

// TOGGLE HIDE/DISPLAY DELETE FORM
const isToggleDeleteForm = ref(false);
const onCancelDeleteLesson = () => {
  isToggleDeleteForm.value = !isToggleDeleteForm.value;
};

// INPUT FILE FOR SELECT VIDEO
const videoName = ref("");
const videoPath = ref("");
const videoUrlReader: any = ref("");
const fileVideoElement = ref();
const videoElement = ref();
// GET A VIDEO BY ONCHANGE
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
    // GET A LINK OF VIDEO TO DISPLAY ON THE SCREEN
    videoUrlReader.value = reader.result;
  };
  console.log(file.name, file.size);

  videoName.value = file.name; // GET A NAME OF THE FILE
  videoPath.value = file; // GET A PATH OF THE FILE
};
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
  console.log(file.name, file);
  imageName.value = file.name; // GET A NAME OF THE FILE
  imagePath.value = file; // GET A PATH OF THE FILE
};
// OTHER INFORMATIONS OF THE COURSE
const tags = ref("");
const title = ref("");
const desc = ref("");
const price = ref();
const industry = ref("Industry");
const industries = ref([
  "Industry",
  "Accounting",
  "Airlines/Aviation",
  "Alternative Dispute Resolution",
  "Alternative Medicine",
  "Animation",
  "Apparel & Fashion",
  "Architecture & Planning",
  "Arts & Crafts",
  "Automotive",
  "Aviation & Aerospace",
  "Banking",
  "Biotechnology",
  "Broadcast Media",
  "Building Materials",
  "Business Supplies & Equipment",
  "Capital Markets",
  "Chemicals",
  "Civic & Social Organization",
  "Civil Engineering",
  "Commercial Real Estate",
  "Computer & Network Security",
  "Computer Games",
  "Computer Hardware",
  "Computer Networking",
  "Computer Software",
  "Construction",
  "Consumer Electronics",
  "Consumer Goods",
  "Consumer Services",
  "Cosmetics",
  "Dairy",
  "Defense & Space",
  "Design",
  "Education Management",
  "E-learning",
  "Electrical & Electronic Manufacturing",
  "Entertainment",
  "Environmental Services",
  "Events Services",
  "Executive Office",
  "Facilities Services",
  "Farming",
  "Financial Services",
  "Fine Art",
  "Fishery",
  "Food & Beverages",
  "Food Production",
  "Fundraising",
  "Furniture",
  "Gambling & Casinos",
  "Glass, Ceramics & Concrete",
  "Government Administration",
  "Government Relations",
  "Graphic Design",
  "Health, Wellness & Fitness",
  "Higher Education",
  "Hospital & Health Care",
  "Hospitality",
  "Human Resources",
  "Import & Export",
  "Individual & Family Services",
  "Industrial Automation",
  "Information Services",
  "Information Technology & Services",
  "Insurance",
  "International Affairs",
  "International Trade & Development",
  "Internet",
  "Investment Banking/Venture",
  "Investment Management",
  "Judiciary",
  "Law Enforcement",
  "Law Practice",
  "Legal Services",
  "Legislative Office",
  "Leisure & Travel",
  "Libraries",
  "Logistics & Supply Chain",
  "Luxury Goods & Jewelry",
  "Machinery",
  "Management Consulting",
  "Maritime",
  "Marketing & Advertising",
  "Market Research",
  "Mechanical or Industrial Engineering",
  "Media Production",
  "Medical Device",
  "Medical Practice",
  "Mental Health Care",
  "Military",
  "Mining & Metals",
  "Motion Pictures & Film",
  "Museums & Institutions",
  "Music",
  "Nanotechnology",
  "Newspapers",
  "Nonprofit Organization Management",
  "Oil & Energy",
  "Online Publishing",
  "Outsourcing/Offshoring",
  "Package/Freight Delivery",
  "Packaging & Containers",
  "Paper & Forest Products",
  "Performing Arts",
  "Pharmaceuticals",
  "Philanthropy",
  "Photography",
  "Plastics",
  "Political Organization",
  "Primary/Secondary",
  "Printing",
  "Professional Training",
  "Program Development",
  "Public Policy",
  "Public Relations",
  "Public Safety",
  "Publishing",
  "Railroad Manufacture",
  "Ranching",
  "Real Estate",
  "Recreational",
  "Facilities & Services",
  "Religious Institutions",
  "Renewables & Environment",
  "Research",
  "Restaurants",
  "Retail",
  "Security & Investigations",
  "Semiconductors",
  "Shipbuilding",
  "Sporting Goods",
  "Sports",
  "Staffing & Recruiting",
  "Supermarkets",
  "Telecommunications",
  "Textiles",
  "Think Tanks",
  "Tobacco",
  "Translation & Localization",
  "Transportation/Trucking/Railroad",
  "Utilities",
  "Venture Capital",
  "Veterinary",
  "Warehousing",
  "Wholesale",
  "Wine & Spirits",
  "Wireless",
  "Writing & Editing",
]);
// SEND TO THE MODERATION
const onSend = async () => {
  const uploaderStore = useUploaderStore();
  uploaderStore.isUploading = true;
  console.log("SENDED");
  const mediaImgLink = ref({
    filePath: imagePath.value,
    fileName: imageName.value,
  });
  const mediaVideoLink = ref({
    filePath: videoPath.value,
    fileName: videoName.value,
  });
  // UPLOAD IMAGE/VIDEO OF COURSE THUMBNAIL
  const idUser: any = localStorage.getItem("idUser");
  const imgUrlCourse = await useUploadImgStorage(mediaImgLink.value, idUser);
  const videoUrlCourse = await useUploadVideoStorage(
    mediaVideoLink.value,
    idUser
  );
  // UPLOAD ALL IMAGES/VIDEOS OF THE LESSONS
  for (const i in chapters.value) {
    for (let j = 0; j < chapters.value[i].length; j++) {
      const imgUrl = await useUploadImgStorage(
        {
          fileName: chapters.value[i][j].imageName,
          filePath: chapters.value[i][j].imagePath,
        },
        idUser
      );
      const videoUrl = await useUploadVideoStorage(
        {
          fileName: chapters.value[i][j].videoName,
          filePath: chapters.value[i][j].videoPath,
        },
        idUser
      );
      delete chapters.value[i][j].thumbnailImg;
      delete chapters.value[i][j].thumbnailVideo;
      delete chapters.value[i][j].imagePath;
      delete chapters.value[i][j].videoPath;
    }
  }
  console.log(chapters.value, "ENDING");
  const data = ref({
    title: title.value,
    desc: desc.value,
    tags: tags.value,
    industry: industry.value,
    thumbnailImg: imageName.value,
    thumbnailVideo: videoName.value,
    price: 0,
    idUser: idUser,
    countUnlocked: 0,
    quiz: {},
    chapters: chapters.value,
    isApproved: false,
    createdAt: new Date().toLocaleDateString(),
  });
  await useAddCourseStore(data.value);
  router.push("/");
  uploaderStore.isUploading = false;
};
</script>

<style lang="scss" scoped>
.registration {
  user-select: none;
  .regis-form {
    .form-file {
      display: flex;
      justify-content: space-around;
      gap: 2rem;
      padding: 1rem;
      .file-thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% / 2);
        height: 300px;
        text-align: center;
        border: 2px solid var(--border-color);
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        .img-thumbnail,
        .video-thumbnail {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
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
          font-size: 1.25rem;
          font-weight: 700;
          display: inline-block;
          cursor: pointer;
          transition: transform 0.3s linear;
        }
        label {
          i {
            font-size: 2.5rem !important;
            opacity: 0.9;
          }
          p {
            font-size: 0.9rem;
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
      // padding-top: 0;
      display: flex;
      flex-direction: column;
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
    .form-group:nth-child(3) {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      padding-top: 0;
      .custom-select,
      .tags,
      .price {
        width: calc(100% / 3);
        margin-bottom: 0.8rem;
      }
      .custom-select {
        select {
          width: 100%;
          padding: 0.5rem;
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
      }
      .tags,
      .price {
        input {
          width: 100%;
          padding: 0.5rem;
          padding-right: 2rem;
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
      }
      .price {
        position: relative;
      }
      .price::after {
        content: "$";
        position: absolute;
        top: 7px;
        right: 10px;
      }
    }
    .form-group:nth-child(4) {
      padding: 1rem;
      padding-top: 0;
      .create-chapter {
        border: 1px solid;
        border-radius: 3px;
        padding: 1rem;
        .amount-chapter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .amount-left {
            display: flex;
            align-items: center;
            font-weight: 500;
            input {
              width: 3rem;
              background-color: var(--bg-secondary);
              outline: none;
              border: none;
              padding: 0.2rem 0.4rem;
              color: var(--text-color);
              margin: 0 0.3rem;
            }
            input::placeholder {
              opacity: 0.5;
            }
          }
          .amount-right {
            button {
              border-left: 1px solid;
              transition: border 0.35s ease;
            }
            button:hover {
              color: var(--primary-color);
              border-color: var(--primary-color) !important;
            }
          }
        }
        .chapter-courses {
          // display: none;
          border: 1px solid;
          margin: 1.5rem 0;
          border-radius: 5px;
          background-color: var(--footer-color);

          .chapter-title {
            text-align: center;
            padding: 1rem;
            border-bottom: 4px solid var(--border-color);
          }
          .chapter-list {
            .chapter-item {
              display: flex;
              align-items: center;
              border: 1px solid;
              margin: 1rem;
              padding: 0.5rem;
              border-radius: 5px;
              .chapter-number {
                width: 5%;
                text-align: center;
                font-weight: 700;
              }
              .chapter-img {
                width: 20%;
                height: 60px;
                margin: 0 0.3rem;
                overflow: hidden;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 3px;
                  object-fit: cover;
                }
              }
              .chapter-video {
                width: 20%;
                height: 60px;
                margin: 0 0.5rem;
                border-radius: 3px;
                overflow: hidden;
                background-color: black;
                video {
                  width: 100%;
                  height: 100%;
                }
              }
              .chapter-text {
                padding: 0 1rem;
                min-width: 60%;
                h4 {
                  margin-left: 0.2rem;
                  letter-spacing: 0.5px;
                }
                p {
                  font-size: 0.8rem;
                  letter-spacing: 0.5px;
                  opacity: 0.6;
                }
              }
              .chapter-btn {
                margin-right: 0.5rem;
                display: flex;
                align-items: center;
                opacity: 0.3;
                i {
                  font-size: 1.2rem;
                  padding: 0 0.3rem;
                  opacity: 0.3;
                }
                i:hover {
                  opacity: 1;
                }
                i:first-child {
                  transform: scaleX(-1);
                }
                i:first-child:hover {
                  color: var(--primary-color);
                }
                i:last-child:hover {
                  color: red;
                }
              }
            }
            .chapter-item:hover {
              box-shadow: 1px 1px 3px 0px var(--border-color);
              cursor: pointer;
              .chapter-btn {
                opacity: 1;
              }
            }
          }
          .btn-add {
            text-align: center;
            margin: 1.5rem 0;
            button {
              margin-top: 0 !important;
              border: 0;
              font-size: 1.5rem !important;
              font-weight: 300;
              width: 100px;
              transition: transform 0.3s ease;
              background-color: var(--bg-secondary);
            }
            button:hover {
              color: var(--primary-color);
              transform: scale(1.1);
            }
            button:active {
              transform: scale(1);
            }
          }
        }
      }
    }
    .form-btn {
      text-align: center;
      margin: 1rem 0 2rem 0;
      button {
        border-left: 1px solid;
        padding: 0.5rem 3rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      button:hover {
        color: var(--primary-color);
        border-color: var(--primary-color) !important;
      }
      button:active {
        margin-bottom: 4px;
        transform: translateY(4px);
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .form-file {
    gap: 1rem !important;
  }
  .chapter-courses {
    .chapter-list {
      .chapter-item {
        .chapter-img {
          width: 100% !important;
        }
        .chapter-video {
          width: 100% !important;
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .form-file {
    flex-direction: column;
    gap: 1rem !important;
    .file-thumbnail {
      width: 100% !important;
      height: 200px !important;
    }
  }
  .form-group:nth-child(3) {
    flex-direction: column;
    .price,
    .tags,
    .custom-select {
      width: 100% !important;
      margin-bottom: 0.1rem !important;
    }
  }
  .chapter-courses {
    .chapter-list {
      .chapter-item {
        margin: 0.5rem !important;
        .chapter-img {
          width: 100% !important;
        }
        .chapter-video {
          width: 100% !important;
          margin: 0 0.1rem !important;
        }
        .chapter-text {
          padding: 0 0.3rem !important;
        }
        .chapter-btn {
          margin-right: 0.1rem !important;
          button {
            font-size: 0.6rem !important;
            width: 50px !important;
          }
        }
      }
    }
    .btn-add {
      margin-bottom: 1rem !important;
      button {
        width: 50px !important;
      }
    }
  }
}
</style>
