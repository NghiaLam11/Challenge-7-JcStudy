<template>
  <div class="details-form">
    <div class="container form-container">
      <div class="blur"></div>
      <div class="confirm-details">
        <div
          class="message-list"
          v-if="Object.keys(userStore.user.notifications).length > 0"
        >
          <div
            :class="[message.isRead === true ? '' : 'unread', 'message-item']"
            v-for="(message, key) in userStore.user.notifications"
            :key="key"
          >
            <span class="message"
              >Your
              <b
                ><i>{{ message.title }}</i></b
              >
              was {{ message.isApproved === true ? "approved" : "denied" }}
              <small>({{ message.notificationText }})</small></span
            >
            <div>
              <span
                v-if="message.isRead === false"
                class="maskasread"
                @click="onMaskAsRead(key)"
                >Mask as read</span
              >
              <span class="remove" @click="onRemove(key)">Remove</span>
            </div>
          </div>
        </div>
        <div v-else>Empty!</div>
        <div class="btn-group">
          <button @click="onToggleNotification" type="button">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css";
import { useUserStore } from "../../composable/useUser";
import { useUpdateUserStore } from "../../composable/useFirebaseStore";
const emit = defineEmits(["onToggleNotification"]);
const userStore = useUserStore();
const onToggleNotification = () => {
  emit("onToggleNotification");
};
const idUser = localStorage.getItem("idUser");
const onMaskAsRead = (key: any) => {
  userStore.user.notifications[key].isRead = true;
  useUpdateUserStore({ notifications: userStore.user.notifications }, idUser);
};
const onRemove = (key: any) => {
  delete userStore.user.notifications[key];
  useUpdateUserStore({ notifications: userStore.user.notifications }, idUser);
};
</script>

<style lang="scss" scope>
.details-form {
  .form-container {
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
      background-color: rgba(0, 0, 0, 0.6);
      z-index: -1;
    }
    .confirm-details {
      background-color: var(--bg-secondary);
      width: 75vw;
      border: 1px solid;
      padding: 2rem;
      border-radius: 3px;
      .message-list {
        height: 70vh;
        overflow-y: scroll;
        .unread {
          background-color: var(--bg-reply);
        }
        .message-item {
          border: 1px solid;
          border-radius: 0.5rem;
          padding: 0.8rem;
          display: flex;
          justify-content: space-between;
          .message {
            margin-right: 0.2rem;
            font-weight: 500;
          }
          .remove,
          .maskasread {
            font-size: 0.7rem;
            padding: 0.3rem;
            margin: 0 0.3rem;
            // border: 1px solid;
            box-shadow: 1px 1px 1px 1px var(--border-color);
            border-radius: 0.1rem;
            cursor: pointer;
            font-weight: 600;
          }
          .remove:hover {
            color: red;
            box-shadow: 1px 1px 1px 1px red;
          }
          .maskasread:hover {
            color: var(--primary-color);
            box-shadow: 1px 1px 1px 1px var(--primary-color);
          }
        }
      }
      ::-webkit-scrollbar {
        display: none;
      }
      .btn-group {
        margin-top: 1rem;
        .btn-remove {
          margin-right: 1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .confirm-details {
    width: 95vw !important;
    padding: 1rem !important;
  }
}
</style>
../../types/Course
