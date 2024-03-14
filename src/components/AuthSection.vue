<template>
  <div class="auth">
    <div class="container auth-container">
      <div class="auth-top">
        <div class="auth-edit" @click="onOpenFormEdit">
          <i class="fas fa-hammer"></i>
        </div>
        <div
          :class="[hasNewNotification ? 'unread' : 'read', 'auth-bell']"
          @click="onToggleNotification"
        >
          <i class="fas fa-bell"></i>
        </div>

        <div class="auth-text">
          <h4>{{ userStore.user?.name }}</h4>
          <p>{{ userStore.user?.bio }}</p>
        </div>
        <div class="auth-avatar">
          <img :src="userStore.user?.avatar" alt="peep icon handsome" />
        </div>
      </div>

      <div v-if="userStore.user?.isAdmin" class="admin">
        <CensorshipCoursesSection
          v-if="Object.keys(coursesStore.unApprovedCourses).length > 0"
        />
        <CensorshipBlogsSection
          v-if="Object.keys(blogsStore.unApprovedBlogs).length > 0"
        />
      </div>

      <div v-else class="user">
        <CoursesRegisterSection />
        <BlogsRegisterSection />
        <div class="auth-bottom">
          <div class="statistic">
            <div class="statistic-group">
              <span class="topic">Streak: </span>
              <span class="number"> {{ userStore.user?.streak }}</span>
            </div>
            <div class="statistic-group">
              <span class="topic">Courses(unlocked): </span>
              <span class="number">
                {{ Object.keys(userStore.user?.coursesUnlocked).length }}</span
              >
            </div>
            <!-- <div class="statistic-group">
              <span class="topic">Courses(completed): </span>
              <span class="number">
                {{ Object.keys(userStore.user?.coursesCompleted).length }}</span
              >
            </div> -->
          </div>
          <ChartSection />
          <div
            class="courses-unclock"
            v-if="Object.keys(userStore.user?.coursesUnlocked).length > 0"
          >
            <CoursesUnlock />
          </div>
        </div>
      </div>

      <div class="btn-signout">
        <button type="button" @click="onSignout">Sign out</button>
      </div>
    </div>
    <EditProfileSection @onOpen="onCloseFormEdit" v-show="isToggleFormEdit" />
    <NotificationsSection
      v-if="isToggleNotification"
      @onToggleNotification="onToggleNotification"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useSignoutAuth } from "../composable/useFirebaseAuth";
import NotificationsSection from "./AuthChildSections/NotificationsSection.vue";
import CoursesUnlock from "./ChildSections/CoursesUnlock.vue";
import CensorshipCoursesSection from "./AdminSections/CensorshipCoursesSection.vue";
import CensorshipBlogsSection from "./AdminSections/CensorshipBlogsSection.vue";
import ChartSection from "./AuthChildSections/ChartSection.vue";
import EditProfileSection from "./AuthChildSections/EditProfileSection.vue";
import CoursesRegisterSection from "./AuthChildSections/CoursesRegisterSection.vue";
import BlogsRegisterSection from "./AuthChildSections/BlogsRegisterSection.vue";
import { useUserStore } from "../composable/useUser";
import { useCoursesStore } from "../composable/useCourses";
import { useBlogsStore } from "../composable/useBlogs";
const blogsStore = useBlogsStore();
const userStore = useUserStore();
const coursesStore = useCoursesStore();
const isToggleFormEdit = ref(false);
const onCloseFormEdit = () => {
  isToggleFormEdit.value = !isToggleFormEdit.value;
};
const onOpenFormEdit = () => {
  isToggleFormEdit.value = !isToggleFormEdit.value;
};
// const router = useRouter();
const onSignout = () => {
  if (confirm("Are you sure you want to sign out") === true) {
    useSignoutAuth();
    window.location.reload();
  } else {
    return;
  }
};

const hasNewNotification = ref(false);

onMounted(() => {
  for (const key in userStore.user.notifications) {
    if (userStore.user.notifications[key].isRead === false) {
      hasNewNotification.value = true;
    }
  }
});

const isToggleNotification = ref(false);
const onToggleNotification = () => {
  isToggleNotification.value = !isToggleNotification.value;
};
</script>
<style lang="scss" scoped>
.auth {
  padding: 2rem;
  .auth-container {
    .btn-signout {
      margin: 2rem 0;
      text-align: center;
    }
    .auth-top {
      display: flex;
      align-items: center;
      padding: 5rem 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
      position: relative;
      .auth-edit {
        position: absolute;
        top: 30px;
        right: 35px;
        transform: scaleX(-1);
        font-size: 1.2rem;
        opacity: 0.3;
      }
      .auth-edit:hover {
        opacity: 1;
        cursor: pointer;
        animation: shakeHammer 2s ease;
      }
      @keyframes shakeHammer {
        0% {
          rotate: 0deg;
        }
        30% {
          rotate: 40deg;
        }
        60% {
          rotate: -20deg;
        }
        100% {
          rotate: 0deg;
        }
      }

      .auth-bell {
        position: absolute;
        top: 30px;
        left: 35px;
        transform: scaleX(-1);
        font-size: 1.2rem;
        opacity: 0.3;
      }

      .unread {
        color: red;
        animation: shakeHammer 2s ease infinite;
      }
      .read {
        color: inherit;
        animation: none;
      }
      .auth-bell:hover {
        opacity: 1;
        cursor: pointer;
        animation: shakeHammer 2s ease;
      }
      @keyframes shakeBell {
        0% {
          rotate: 0deg;
        }
        30% {
          rotate: 40deg;
        }
        60% {
          rotate: -20deg;
        }
        100% {
          rotate: 0deg;
        }
      }
      .auth-text {
        width: 50%;
        text-align: center;
        h4 {
          font-size: 1.5rem;
          letter-spacing: 1px;
        }
        p {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      }
      .auth-avatar {
        width: 50%;

        img {
          transform: scaleX(-1);
          width: 250px;
          height: 250px;
          max-width: 250px;
          max-height: 250px;
          object-fit: cover;
          margin: 0 auto;
          padding: 1rem;
          border-radius: 50%;
          // border: 0.1px solid;
          //   border-top: 4px solid;
          //   border-left: 2px solid;

          box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
        }
      }
    }
    .auth-bottom {
      margin: 3rem 0;
      padding: 1rem;
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
      border-radius: 50px;
      .statistic {
        padding-top: 1rem;
        display: flex;
        margin-left: 2rem;
        .statistic-group {
          padding: 0.5rem 1rem;
          span {
            font-weight: 500;
            letter-spacing: 0.3px;
          }
          .number {
            font-weight: 700;
          }
        }
        .statistic-group:first-child {
          span {
            color: var(--primary-color);
          }
        }
      }
      .courses-unclock {
        padding: 1.1rem;
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .auth-top {
    padding: 3rem 1rem !important;
    .auth-text {
      h4 {
        font-size: 1.2rem !important;
      }
      p {
        font-size: 0.7rem !important;
      }
    }
    .auth-avatar {
      img {
        width: 150px !important;
        height: 150px !important;
      }
    }
  }
  .statistic {
    padding: 0.5rem !important;
    margin-left: 0 !important;
    .statistic-group {
      padding: 0.3rem 0.5rem !important;
      span {
        font-size: 0.8rem !important;
      }
    }
  }
  .courses-unclock {
    padding: 0.5rem !important;
  }
}
@media screen and (max-width: 534px) {
  .auth {
    padding: 1rem !important;
  }
  .auth-top {
    padding: 3rem 1rem !important;
    border-radius: 10px !important;
    .auth-edit {
      font-size: 0.9rem !important;
      top: 10px !important;
      right: 14px !important;
    }
    .auth-text {
      h4 {
        font-size: 1rem !important;
      }
      p {
        font-size: 0.6rem !important;
      }
    }
    .auth-avatar {
      img {
        width: 100px !important;
        height: 100px !important;
      }
    }
  }
  .auth-bottom {
    border-radius: 10px !important;
    margin-top: 1rem !important;
    padding: 0.5rem !important;
  }
  .statistic {
    padding: 0.3rem !important;
    margin-left: 0 !important;
    flex-direction: column !important;
    .statistic-group {
      padding: 0rem 0.2rem !important;
      span {
        font-size: 0.8rem !important;
      }
    }
  }
  .courses-unclock {
    padding: 0rem !important;
  }
  .regis-moderate {
    margin: 1rem 0 !important;
    padding: 0.5rem !important;
    border-radius: 10px !important;
  }
  .btn-regis {
    padding: 1rem !important;
    margin-top: 1rem !important;
    p {
      font-size: 0.7rem !important;
    }
    .plus {
      margin-left: 0.5rem !important;
    }
  }
}
</style>
