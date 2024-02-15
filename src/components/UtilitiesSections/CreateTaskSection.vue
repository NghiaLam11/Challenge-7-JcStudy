<template>
  <div class="create-task">
    <div class="create-task-container">
      <div class="blur"></div>
      <div class="form-create">
        <input type="text" placeholder="Title..." class="title" />
        <div class="tasks">
          <form class="add-task">
            <input type="text" placeholder="New task..." /><button>Add</button>
          </form>
        </div>
        <div class="btn-group">
          <button>Complete</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-task {
  .create-task-container {
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
      .tasks {
        width: 100%;
        min-height: 50vh;
        padding: 0.5rem;
        background-color: rgb(255, 255, 255, 0.1);
        color: inherit;
        margin-bottom: 0.8rem;
        border: 1px solid;
        position: relative;
        .add-task {
          display: flex;
          justify-content: space-between;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgb(255, 255, 255, 0.1);

          border: 1px solid;

          input {
            width: 100%;
            outline: none;
            border: none;
            color: inherit;
            background: transparent;
            padding-left: 0.4rem;
            border-top: 1px solid;
            font-size: 0.8rem;
          }
          button {
            border: 0 !important;
            margin: 0 !important;
            padding: 0.5rem 1rem;
            background-color: var(--primary-color);
          }
        }
      }
      .title {
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
      .title:focus {
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
