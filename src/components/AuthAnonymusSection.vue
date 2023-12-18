<template>
  <div class="auth-anonymus">
    <div class="container">
      <div class="auth-top">
        <div class="auth-text">
          <h4>Jcstudy-er</h4>
          <p>This is my bio!</p>
        </div>
        <div class="auth-avatar">
          <img src="../images/peep-54.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.auth-anonymus {
    padding: 1rem;
  .auth-top {
    display: flex;
    align-items: center;
    padding: 5rem 1rem;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
    border-radius: 50px;
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
}
@media screen and (max-width: 534px) {
  .auth-top {
    padding: 3rem 1rem !important;
    border-radius: 10px !important;
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
}
</style>
