<template>
  <div class="course-search">
    <div class="search">
      <div class="form-search">
        <input placeholder="Ex: Software" type="text" />
        <button type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.course-search {
  .search {
    margin: 0 0.5rem;
    margin-bottom: 2rem;
    .form-search {
        display: flex;
        justify-content: space-between;
        font-size: 1.1rem;
        padding: 0.5rem;
        border-right: 0.5px solid var(--border-color);
        border-top: 1px solid var(--border-color);
        border-left: 2px solid var(--border-color);
        border-bottom: 5px solid var(--border-color);
        border-radius: 5px;
        input {
            width: 90%;
            max-width: 95%;
            background-color: transparent;
            outline: none;
            border: none;
            color: var(--text-color);
        }
        button {
            margin: 0;
            border: none;
            background-color: transparent;
            i {
                font-size: 1.05rem;
            }
        }
    }
  }
}
</style>
