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
      </div>
      <div class="hero-right">
        <img src="../images/peep-94.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
}
.hero-right {
  img {
    transform: scaleX(-1);
    height: 500px;
    padding: 3rem;
    margin: 0 auto;
    // clip-path: polygon(50% 0%, 96% 0, 100% 99%, 0 95%, 0% 38%);
    // clip-path: polygon(58% 0, 100% 0, 100% 100%, 41% 64%, 0 0);
    // clip-path: polygon(58% 0, 100% 0, 100% 100%, 56% 45%, 0 0);
    // clip-path: polygon(58% 0, 100% 0, 100% 100%, 69% 32%, 0 0);
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
.hero-right,
.hero-left {
  width: 50%;
}
</style>
