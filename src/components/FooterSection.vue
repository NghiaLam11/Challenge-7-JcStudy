<template>
  <div class="footer footer-bg-color">
    <div class="footer-wrapper container">
      <div class="footer-logo">
        <h2 class="gradient-color-text">JcStudy</h2>
      </div>
      <ul class="footer-list">
        <h4 class="footer-topic">Pages</h4>
        <li class="footer-item">
          <router-link to="/" class="footer-link">Home</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/" class="footer-link">Courses</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/" class="footer-link">News</router-link>
        </li>
        <li class="footer-item">
          <router-link to="/" class="footer-link">Blogs</router-link>
        </li>
      </ul>
      <ul class="footer-list">
        <h4 class="footer-topic">Links</h4>

        <li class="footer-item">
          <a href="/" class="footer-link">Company</a>
        </li>
        <li class="footer-item">
          <a href="/" class="footer-link">License</a>
        </li>
        <li class="footer-item">
          <a href="/" class="footer-link">Legal</a>
        </li>
      </ul>
      <ul class="footer-list">
        <li class="footer-item">
          <a href="/" class="footer-link"
            ><i class="fab fa-facebook-square"></i
          ></a>
          <a href="/" class="footer-link"
            ><i class="fab fa-instagram-square"></i
          ></a>
          <a href="/" class="footer-link"><i class="fab fa-linkedin"></i></a>
          <a href="/" class="footer-link"
            ><i class="fab fa-github-square"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/variable";
.footer {
  padding: 2rem;
  box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.1);
  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    .footer-logo {
      h2 {
        font-size: 1.7rem;
        font-family: monospace;
      }
    }
    .footer-list {
      display: flex;
      flex-direction: column;
      list-style: none;
      .footer-topic {
        font-size: 1.2rem;
      }
      .footer-item {
        padding: 0.2rem 0.1rem;
        .footer-link {
          text-decoration: none;
          color: inherit;
          opacity: 0.6;
        }
        .footer-link:hover {
          text-decoration: underline;
          opacity: 0.8;
        }
      }
    }
    .footer-list:last-child {
      .footer-item {
        .footer-link {
          padding: 0.2rem;
          i {
            font-size: 1.7rem;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .footer {
    padding: 0rem;
  }
  .footer-wrapper {
    flex-direction: column;
    .footer-list {
      padding-left: 0;
      padding: 1rem 0;
    }
  }
}
</style>
