<template>
  <div class="utilities">
    <div class="utilities-container container">
      <div class="utilities-group">
        <div class="utilities-item">
          <div>
            <span>Notes</span>
            <i class="fa-solid fa-clipboard"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item">
          <div>
            <span>Timetable</span>
            <i class="far fa-calendar-alt"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item">
          <div>
            <span>Task</span>
            <i class="fas fa-clipboard-list"></i>
          </div>
          <span>+</span>
        </div>
        <div class="utilities-item">
          <div>
            <span>Flashcard</span>
            <i class="fas fa-dice-d6"></i>
          </div>
          <span>+</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped lang="scss">
.utilities {
  min-height: 100vh;
  padding-top: 3rem;
  .utilities-container {
    .utilities-group {
      display: flex;
      gap: 1rem;
      .utilities-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% / 4);
        border-radius: 5px;
        padding: 1.5rem 2.5rem;
        background-image: linear-gradient(
          to bottom right,
          var(--utility-color-first) 15%,
          var(--utility-color-second)
        );
        transition: all 0.3s linear;
        overflow: hidden;
        div {
          span,
          i {
            font-size: 1.1rem;
            font-weight: 600;
          }
          i {
            margin: 0 0.2rem;
          }
        }
        span {
          transform: translateY(150%);
          font-weight: 300;
          font-size: 2rem;
          scale: 1.2;
          transition: all 0.25s ease-in-out;
        }
      }
      .utilities-item:hover {
        transform: scale(1.02) translateY(-3px);
        cursor: pointer;
        span {
          transform: translateY(0);
        }
      }
    }
  }
}
</style>
