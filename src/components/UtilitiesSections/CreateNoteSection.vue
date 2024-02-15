<template>
  <div class="create-note">
    <div class="create-note-container">
      <div class="blur"></div>
      <form class="form-create">
        <input type="text" placeholder="Title..." />
        <textarea cols="10" rows="12" placeholder="Note"></textarea>
        <div class="btn-group">
          <button>Complete</button>
          <button>Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-note {
  .create-note-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    .blur {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: -1;
    }
    .form-create {
      // background-color: var(--bg-secondary);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 70%;
      transform: translateY(-10px);
      padding: 2rem;
      input,
      textarea {
        width: 100%;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        margin-bottom: 0.8rem;
        border: 1px solid;
        border-radius: 3px;
        border-bottom: 0.3rem solid;
        font-size: 0.9rem;
        outline: none;
        transition: border 0.35s ease;
      }
      input:focus,
      textarea:focus {
        border-bottom: 1px solid;
      }
      .btn-group {
        margin-right: auto;
        button {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
