<template>
  <div class="home container">
    <div class="hero">
      <div class="hero-left">
        <h2>Let's study with JcStudy!</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
          itaque quos accusamus voluptatibus perspiciatis est blanditiis aut
          rem. Numquam optio distinctio a similique eos incidunt vel ut aliquam
          quae facilis.
        </p>
        <button @click="onDiscover" class="btn-hero">
          <span v-if="isDiscover">Discover</span
          ><i v-else class="fas fa-motorcycle"></i>
        </button>
      </div>
      <div class="hero-right">
        <img src="../images/peep-94.png" alt="" />
      </div>
    </div>
    <div class="courses">
      <div class="topic">
        <h3>Courses</h3>
      </div>
      <Carousel
        :items-to-show="2"
        :snap-align="'start'"
        :breakpoints="breakpoints"
      >
        <Slide v-for="slide in 10" :key="slide">
          <div class="card-item">
            <div class="thumbnail">
              <img
                src="../images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                alt=""
              />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">Lorem islem posile delao</h3>
              <p class="multiline-ellipsis-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                eos voluptatem iusto delectus, minus sapiente! Distinctio atque
                dolore reprehenderit laboriosam? Sit et possimus assumenda! Quas
                aspernatur dolore nulla cumque odio.
              </p>
              <button @click="onUnlock">Unlock (Free)</button>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="courses-unlock">
      <div class="topic">
        <h3>Courses unlock</h3>
      </div>
      <Carousel :breakpoints="breakpointsunlock">
        <Slide v-for="slide in 10" :key="slide">
          <div class="card-item">
            <div class="thumbnail">
              <img
                src="../images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg"
                alt=""
              />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">Lorem islem posile delao</h3>
              <p class="multiline-ellipsis-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                eos voluptatem iusto delectus, minus sapiente! Distinctio atque
                dolore reprehenderit laboriosam? Sit et possimus assumenda! Quas
                aspernatur dolore nulla cumque odio.
              </p>
              <div class="card-progress">
                <progress class="accent-color" value="32" max="100"></progress>
                <span class="percent">32%</span>
              </div>

              <button @click="onUnlock">Continue ...</button>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>

    <div class="blogs">
      <div class="topic">
        <h3>Blogs</h3>
      </div>
      <Carousel :breakpoints="breakpointsblogs">
        <Slide v-for="slide in 10" :key="slide">
          <div class="card-item">
            <div class="thumbnail">
              <img
                src="../images/jackson-sophat-wUbNvDTsOIc-unsplash.jpg"
                alt=""
              />
            </div>
            <div class="card-right bg-primary">
              <h3 class="multiline-ellipsis-1">
                Lorem islem posile delao adipisicing elit!
              </h3>
              <p class="multiline-ellipsis-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                eos voluptatem iusto delectus, minus sapiente! Distinctio atque
                dolore reprehenderit laboriosam? Sit et possimus assumenda! Quas
                aspernatur dolore nulla cumque odio.
              </p>
              <div class="card-auth">
                <div class="wrapper-img">
                  <img src="../images/peep-82.png" alt="" />
                </div>

                <span>Jclahi</span>
              </div>
              <div><button @click="onUnlock">Read more...</button></div>
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
</template>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useSound } from "../pinia";
// ------------------------- START HERO SECTION -----------------------
const router = useRouter();
const isDiscover = ref(true);
const onDiscover = () => {
  isDiscover.value = !isDiscover.value;
  setTimeout(() => {
    router.push("/courses");
  }, 2000);
};
// ------------------------- END HERO SECTION -----------------------
// ------------------------- START COURSES SECTION -----------------------
const theme = localStorage.getItem("theme");
onMounted(() => {
  // Set color of the carousel icon when render
  const iconNext: any = document.querySelectorAll(".carousel__next");
  const iconPrev: any = document.querySelectorAll(".carousel__prev");
  console.log(iconNext.length, iconPrev.length);
  if (theme === "dark") {
    for (let i = 0; i < iconNext.length; i++) {
      iconNext[i].style.color = "white";
      iconPrev[i].style.color = "white";
      iconNext[i].style.scale = "1.5";
      iconPrev[i].style.scale = "1.5";
    }
  } else {
    for (let i = 0; i < iconNext.length; i++) {
      iconNext[i].style.color = "black";
      iconPrev[i].style.color = "black";
      iconNext[i].style.scale = "1.5";
      iconPrev[i].style.scale = "1.5";
    }
  }
});
// Play sound when btn is clicked
const soundStore = useSound();
const onUnlock = () => {
  soundStore.playSound();
};
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
const breakpointsunlock = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    itemsToShow: 2,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  889: {
    autoplay: 5000,
    itemsToShow: 4,
    snapAlign: "start",
    pauseAutoplayOnHover: true,
  },
});
const breakpointsblogs = ref({
  0: {
    itemsToShow: 1,
    snapAlign: "center",
  },
  534: {
    itemsToShow: 2,
    snapAlign: "start",
    autoplay: 3000,
    pauseAutoplayOnHover: true,
  },
  889: {
    autoplay: 4000,
    itemsToShow: 3,
    pauseAutoplayOnHover: true,
    snapAlign: "start",
  },
});
// ------------------------- END COURSES SECTION -----------------------
</script>

<style scoped lang="scss">
// ---------------------------------------------- START HERO SCSS STYLE
.hero {
  display: flex;
  align-items: center;
  .hero-right {
    img {
      transform: scaleX(-1);
      height: 500px;
      padding: 3rem;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 1rem 0 4rem;
    h2 {
      font-size: 3rem;
      line-height: 3.5rem;
    }
    p {
      line-height: 1.5rem;
    }
  }
  .btn-hero {
    cursor: pointer;
    padding: 0.2rem 1rem;
    width: 100px;
    background-color: rgb(255, 255, 255, 0.1);
    color: inherit;
    margin-top: 1rem;
    border: 1px solid;
    border-radius: 3px;
    border-bottom: 0.3rem solid;
    transition: all 0.2s linear;
    overflow: hidden;
    position: relative;
    i {
      animation: SlideIn 3s ease-in-out;
    }
    @keyframes SlideIn {
      0% {
        transform: translateY(40px);
      }
      20% {
        transform: translateY(0px);
      }
      40% {
        transform: translateX(-10px);
      }
      60% {
        transform: translateX(100px);
      }
      80% {
        transform: scaleX(-1);
      }
      100% {
        transform: translateX(0px);
      }
    }
  }
  .btn-hero::after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    // transform: translateX(100px);
    background-color: rgba(134, 133, 133, 0.2);
    transition: all 0.3s linear;
  }
  .btn-hero:hover.btn-hero::after {
    right: 0;
    z-index: -1;
  }
  .btn-hero:hover {
    border-bottom: 0.1rem solid;
    box-shadow: 0 0 2rem 1px rgb(255, 255, 255, 0.2);
  }
  .hero-right,
  .hero-left {
    width: 50%;
  }
}

// ------------------------------- END HERO CSS STYLE----------------------------
// ------------------------------- START COURSES CSS STYLE----------------------------
.courses {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    cursor: pointer;
    .thumbnail {
      width: 50%;
      height: 100%;
      padding: 1rem;
      transition: all 0.35s ease;
      filter: grayscale(1);
      img {
        object-fit: cover;
        width: 100%;
        min-height: 180px;
        height: 100%;
        border-radius: 5px;
      }
    }
    .card-right {
      width: 50%;
      text-align: start;
      transition: all 0.35s ease;
      padding: 1rem;
      padding-left: 0;
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
        margin-top: 1rem;
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
// ---------------------------------- END COURSE CSS STYLE----------------------------------------------
// ------------------------------- START COURSES UNLOCK CSS STYLE------------------------------------------------
.courses-unlock {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .thumbnail {
      width: 100%;
      height: 100%;
      padding: 0.7rem;
      transition: all 0.9s ease;
      filter: grayscale(1);
      img {
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
      transition: all 0.35s ease;
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

      .percent {
        font-size: 0.6rem;
        opacity: 0.7;
        margin-left: 2px;
      }
      progress {
        height: 10px;
        margin-bottom: 1.5px;
        outline: none;
        opacity: 0.7;
      }
    }
  }
  .card-item:hover .card-right {
    transform: translateY(-50%);
    padding-left: 1.5rem;
    border-radius: 5px;
  }
  .card-item:hover .thumbnail {
    filter: grayscale(0);
    transform: rotateY(360deg);
  }
}
// ------------------------------- END COURSES UNLOCK CSS STYLE------------------------------------------------
// ------------------------------- START Blogs CSS STYLE------------------------------------------------

.blogs {
  margin: 2rem 0;
  .topic {
    margin-left: 1rem;
  }
  .card-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding-bottom: 2rem;
    padding-top: 0;
    .thumbnail {
      width: 100%;
      height: 100%;
      padding: 0.7rem;
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
// ------------------------------- END Blogs CSS STYLE------------------------------------------------
@media screen and (min-width: 538px) and (max-width: 889px) {
  .hero-right,
  .hero-left {
    width: 50%;
  }
  .hero-right {
    img {
      transform: scaleX(-1);
      width: 100%;
      object-fit: cover;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 0rem 0 2rem;
    h2 {
      font-size: 2.5rem;
      line-height: 2.8rem;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.3rem;
    }
  }
}
@media screen and (max-width: 538px) {
  .hero {
    flex-direction: column-reverse;
  }
  .hero-right,
  .hero-left {
    width: 100%;
  }
  .hero-right {
    img {
      transform: scaleX(-1);
      height: 300px;
      padding: 2rem;
      margin: 0 auto;
    }
  }
  .hero-left {
    padding: 0 1rem 0 1rem;
  }
}
</style>
