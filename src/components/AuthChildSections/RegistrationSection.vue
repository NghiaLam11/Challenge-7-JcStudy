<template>
  <div class="registration">
    <div class="container">
      <div class="btn-regis">
        <router-link to="/course-register">
          <p class="plus">+</p>
          <p>Register your course!</p>
        </router-link>
      </div>
      <div class="regis-moderate">
        <div class="content-moderate">
          <ContentModerationSection />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ContentModerationSection from "./ContentModerationSection.vue";
</script>
<style lang="scss">
.registration {
  .btn-regis {
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
  .btn-regis:hover {
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
  .regis-moderate {
    margin: 3rem 0;
    padding: 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 40px;
    .topic {
      margin: 0.7rem 1rem;
    }
  }
}
</style>
