<template>
  <div class="censorship">
    <div class="container">
      <div class="censorship-moderate">
        <div class="content-moderate">
          <div class="courses">
            <div class="topic">Courses Moderation</div>
            <Carousel
              :items-to-show="2"
              :snap-align="'start'"
              :breakpoints="breakpoints"
            >
              <Slide
                v-for="course in coursesStore.unApprovedCourses"
                :key="course.id"
              >
                <div class="card-item">
                  <div class="thumbnail">
                    <img :src="mediaLinks[course.thumbnailImg]" alt="" />
                  </div>
                  <div class="card-right bg-primary">
                    <div>
                      <h3 class="multiline-ellipsis-1">
                        {{ course.title }}
                      </h3>
                      <p class="multiline-ellipsis-4">
                        {{ course.desc }}
                      </p>
                    </div>

                    <button>More details...</button>
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
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useCoursesStore } from "../../composable/useCourses";
import { useGetImageUrlStorage } from "../../composable/useFirebaseStorage";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// breakpoint of slide vue-carousel
const breakpoints = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  768: {
    autoplay: 3000,
    itemsToShow: 2,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});

const coursesStore = useCoursesStore();
// {Key is the name of the img, the value is the link to firebase storage.
// Set key = img name to use the name (v-for) at SRC to get the link}
const mediaLinks = ref<any>({});
// GET URL OF IMG ALL COURSES
coursesStore.unApprovedCourses.forEach(async (course: any) => {
  const imgUrl = await useGetImageUrlStorage(
    `images-${course.idUser}/${course.thumbnailImg}`
  );
  // SET A MAP OF URL
  mediaLinks.value[course.thumbnailImg] = imgUrl;
});
</script>
<style lang="scss" scoped>
.censorship {
  .btn-censorship {
    margin-top: 3rem;
    padding: 2rem 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 50px;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      p {
        font-size: 1.1rem;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      .plus {
        margin-left: 2rem;
        margin-right: 1rem;
        transform: scale(1.5);
        font-weight: 400;
        transition: all 0.2s ease;
      }
    }
  }
  .btn-censorship:hover {
    cursor: pointer;
    color: var(--primary-color);

    .plus {
      transform: scale(2);
      font-weight: 200;
    }
    p:last-child {
      transform: translateX(10px);
      font-weight: 500;
    }
  }
  .censorship-moderate {
    margin: 3rem 0;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 40px;
    .topic {
      margin: 0.7rem 1rem;
    }

    .courses {
      margin-bottom: 0.5rem;
      margin-top: 0;
      .topic {
        margin-left: 1rem;
        font-weight: 500;
      }
      .card-item {
        display: flex;
        cursor: pointer;
        width: 100%;
        height: 100%;
        .thumbnail {
          width: 40%;
          height: 100%;
          padding: 0.5rem;
          transition: all 0.35s ease;
          filter: grayscale(1);
          img {
            object-fit: cover;
            width: 100%;
            max-height: 200px;
            height: 100%;
            border-radius: 5px;
          }
        }
        .card-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 60%;
          text-align: start;
          transition: all 0.35s ease;
          padding: 1rem;
          padding-left: 0.2rem;
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
          button {
            width: 150px;
          }
        }
      }
      .card-item:hover .card-right {
        transform: translateX(-50%);
        padding-left: 1rem;
        border-radius: 5px;
      }
      .card-item:hover .thumbnail {
        filter: grayscale(0);
      }
    }
  }
}
</style>
