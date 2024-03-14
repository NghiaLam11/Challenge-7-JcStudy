<template>
  <div class="change-route">
    <div class="change-route-wrapper">
      <div class="dark-blob">
        <svg
          class="blob-top"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#10B981"
            d="M30.1,-53.1C42.1,-45.1,57.1,-43.4,62.3,-35.6C67.4,-27.8,62.8,-13.9,59.8,-1.7C56.8,10.4,55.5,20.9,51.6,30.8C47.6,40.8,41,50.2,32,56.7C23,63.1,11.5,66.6,0.8,65.2C-9.9,63.9,-19.9,57.8,-27.1,50.3C-34.3,42.8,-38.8,33.9,-45.2,25.3C-51.6,16.7,-59.8,8.3,-66.1,-3.6C-72.3,-15.5,-76.5,-31.1,-70.1,-39.6C-63.7,-48.2,-46.6,-49.7,-33.2,-56.9C-19.7,-64.1,-9.9,-76.9,-0.4,-76.2C9,-75.4,18,-61.1,30.1,-53.1Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          class="blob-bottom"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#10B981"
            d="M30.1,-53.1C42.1,-45.1,57.1,-43.4,62.3,-35.6C67.4,-27.8,62.8,-13.9,59.8,-1.7C56.8,10.4,55.5,20.9,51.6,30.8C47.6,40.8,41,50.2,32,56.7C23,63.1,11.5,66.6,0.8,65.2C-9.9,63.9,-19.9,57.8,-27.1,50.3C-34.3,42.8,-38.8,33.9,-45.2,25.3C-51.6,16.7,-59.8,8.3,-66.1,-3.6C-72.3,-15.5,-76.5,-31.1,-70.1,-39.6C-63.7,-48.2,-46.6,-49.7,-33.2,-56.9C-19.7,-64.1,-9.9,-76.9,-0.4,-76.2C9,-75.4,18,-61.1,30.1,-53.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="light-blob">
        <svg
          class="blob-top"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FBBF24"
            d="M33.1,-59.5C43.2,-51.4,51.9,-43.2,59.7,-33.3C67.5,-23.4,74.2,-11.7,73.8,-0.2C73.3,11.2,65.7,22.4,59.5,34.9C53.2,47.4,48.3,61.2,38.6,68.4C28.9,75.7,14.4,76.3,1.1,74.4C-12.3,72.6,-24.6,68.2,-36.2,62.1C-47.8,56,-58.7,48.1,-61.6,37.4C-64.5,26.8,-59.4,13.4,-55.3,2.4C-51.1,-8.6,-48,-17.3,-46.4,-30.2C-44.8,-43.1,-44.8,-60.3,-37.3,-69.9C-29.9,-79.5,-14.9,-81.4,-1.7,-78.4C11.5,-75.4,22.9,-67.5,33.1,-59.5Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          class="blob-bottom"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FBBF24"
            d="M30.1,-53.1C42.1,-45.1,57.1,-43.4,62.3,-35.6C67.4,-27.8,62.8,-13.9,59.8,-1.7C56.8,10.4,55.5,20.9,51.6,30.8C47.6,40.8,41,50.2,32,56.7C23,63.1,11.5,66.6,0.8,65.2C-9.9,63.9,-19.9,57.8,-27.1,50.3C-34.3,42.8,-38.8,33.9,-45.2,25.3C-51.6,16.7,-59.8,8.3,-66.1,-3.6C-72.3,-15.5,-76.5,-31.1,-70.1,-39.6C-63.7,-48.2,-46.6,-49.7,-33.2,-56.9C-19.7,-64.1,-9.9,-76.9,-0.4,-76.2C9,-75.4,18,-61.1,30.1,-53.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.change-route {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 199;
  .change-route-wrapper {
    .dark-blob {
      display: none;
    }
    .dark-blob,
    .light-blob {
      .blob-top,
      .blob-bottom {
        position: absolute;
        rotate: 180deg;
        transition: animation 4s ease;
      }
      .blob-top {
        top: -100%;
        left: -40%;
        transform: translateX(100%) scale(0);

        animation: scaleTopAni 4s ease forwards;
        animation-delay: 1.2s;
      }
      .blob-bottom {
        bottom: -110%;
        right: -40%;
        transform: translateX(-100%) scale(0);

        animation: scaleBottomAni 4s ease forwards;
        animation-delay: 1.2s;
      }
      @keyframes scaleTopAni {
        0% {
          transform: translateX(100%) scale(0);
        }
        30%,
        50% {
          transform: translateX(0%) scale(3);
        }
        100% {
          transform: translateX(100%) scale(0);
          display: none;
        }
      }
      @keyframes scaleBottomAni {
        0% {
          transform: translateX(-100%) scale(0);
        }
        30%,
        50% {
          transform: translateX(0%) scale(3);
        }
        100% {
          transform: translateX(-100%) scale(0);
          display: none;
        }
      }
    }
  }
}
</style>
