<template>
  <div class="header">
    <div class="nav container">
      <ul class="nav-list">
        <li class="nav-logo"><a href="" class="logo nav-link">JcStudy</a></li>
      </ul>
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Courses</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Roadmap</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">Contact</router-link>
        </li>
      </ul>
      <ul class="nav-list">
        <li class="nav-theme">
          <div class="theme">
            <img src="../images/sun.png" alt="" />
            <!-- <img src="../images/full-moon (1).png" alt="" /> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
@use "../styles/variable";
.header {
  background-color: rgb(0, 0, 0, 0.1);
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-list {
      list-style: none;
      .nav-item,
      .nav-logo,
      .nav-theme {
        padding: 1rem;
        .nav-link {
          text-decoration: none;
          color: inherit;
          padding: 0 1rem;
        }
        .theme {
          img {
            width: 45px;
            // transform: translateY(100px) translateX(10px);
            animation: themeAni 1.3s ease-in-out;
          }
          @keyframes themeAni {
            from {
              transform: translateY(-100px) translateX(30px) rotate(90deg);
            }
            to {
              transform: translateY(0px) translateX(0px) rotate(0);
            }
          }
        }
      }
      .nav-logo {
        font-size: 1.5rem;
        font-weight: bold;
        .nav-link {
          font-family: monospace;
          background: -webkit-linear-gradient(#facc15, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .nav-item:hover {
        color: variable.$primary-color;
      }
    }
    .nav-list:nth-child(2) {
      display: flex;
      align-items: center;
      padding: 1rem 0;
    }
  }
}
</style>
