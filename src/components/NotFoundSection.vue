<template>
  <div class="notfound">
    <div class="notfound-container">
      <img src="/src/images/error.png" alt="notfound" />
      <div class="status">
        <span>Opps! Not found {{ $route.fullPath }} page!</span>
        <router-link to="/"><button>Back to Home</button></router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notfound {
  min-height: 90vh;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .notfound-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50%;
    img {
      width: 50%;
    }
    .status {
      display: flex;
      flex-direction: column;
      span {
        font-weight: bold;
      }
      a {
        width: 100%;
        color: var(--text-color);
        button {
          width: 100%;

          padding: 1rem 0;
          border-bottom: 3px solid;
          font-weight: bold;
          text-transform: uppercase;
          transition: all 0.2s ease;
        }
      }
      a:hover {
        color: var(--primary-color);
        button {
          border-color: var(--primary-color) !important;
        }
      }
    }
  }
}
</style>
