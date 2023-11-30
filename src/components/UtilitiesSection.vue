<template>
  <div class="utilities">
    <div class="utilities-container container">
      <div class="utilities-list">
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
      <div class="utilities-group">
        <div class="utilities-notes">
          <h3>Notes</h3>
          <div class="notes-list">
            <div v-for="n in 12" :key="n" class="notes-item">
              <h4 class="multiline-ellipsis-3">Lorem iplem litsto elit.</h4>
              <p class="multiline-ellipsis-10">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptate eligendi eum minus perferendis excepturi ea
                voluptatibus vero quis eaque, autem maxime nihil in? Recusandae
                ab repellendus perferendis magni ullam tempora. -Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Ullam beatae at
                aliquid veritatis itaque placeat ipsam pariatur sequi quae nihil
                dolores nisi tempore ut, ex doloribus repellat temporibus quia
                odio!
              </p>
            </div>
          </div>
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
    .utilities-list {
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
    .utilities-group {
      margin: 1rem 0;
      .utilities-notes {
        h3 {
          margin-bottom: 0.5rem;
        }
        .notes-list {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;

          .notes-item {
            width: calc(100% / 6 - 1rem);
            border: 1px solid;
            padding: 1rem;
            border-radius: 7px;
            box-shadow: -1px 2px 5px 1px rgba(0, 0, 0, 0.2);
            height: 100%;
            h4 {
              font-size: 1.1rem;
              line-height: 1.5rem;
              letter-spacing: 1px;
              margin-top: 0.5rem;
              margin-bottom: 0.7rem;
            }
            p {
              font-size: 0.8rem;
              line-height: 1.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
