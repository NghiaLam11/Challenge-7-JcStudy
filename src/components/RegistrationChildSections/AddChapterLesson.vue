<template>
  <div class="add-lesson">
    <div class="container add-container">
      <div class="blur"></div>
      <div class="form-add">
        <div class="form-group form-file">
          <div class="file-thumbnail">
            <div>
              <input type="file" name="file" id="file" class="inputfile" />
              <label for="file"
                ><i class="fas fa-image"></i>
                <p>Upload image!</p></label
              >
            </div>
            <!-- <div class="img-thumbnail">
              <img
                src="../images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg"
                alt=""
              />
            </div> -->
          </div>
          <div class="file-thumbnail">
            <div>
              <input type="file" name="file" id="file" class="inputfile" />
              <label for="file"
                ><i class="fas fa-play-circle"></i>
                <p>Upload video!</p></label
              >
            </div>
            <!-- <div class="video-thumbnail">
              <video controls>
                <source src="../videos/video-1645947165.mp4" type="video/mp4" />
                <source src="movie.ogg" type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            </div> -->
          </div>
        </div>
        <div class="form-group">
          <input type="text" placeholder="Title..." />
          <textarea placeholder="Description..." cols="30" rows="5"></textarea>
        </div>
        <div class="form-btn">
          <button type="button">Complete</button>
          <button type="button" @click="onCancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineEmits } from "vue";
const emit = defineEmits(["onCancel"]);
const onCancel = () => {
  emit("onCancel");
};
</script>
<style lang="scss" scoped>
.add-lesson {
  .add-container {
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
    .form-add {
      width: 100%;
      transform: translateY(-10px);
      .form-file {
        display: flex;
        justify-content: center;
        gap: 2rem;
        padding: 1rem;
        .file-thumbnail {
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(100% / 4);
          background-color: var(--bg-secondary);
          height: 200px;
          text-align: center;
          border: 2px solid var(--border-color);
          border-radius: 5px;
          overflow: hidden;
          .video-thumbnail {
            background-color: var(--bg-secondary);
            width: 100%;
            video {
              width: 100%;
            }
          }

          .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }
          .inputfile + label {
            transform: translateY(7px);
            font-size: 1.5rem;
            font-weight: 700;
            display: inline-block;
            cursor: pointer;
            transition: transform 0.3s linear;
          }
          label {
            i {
              font-size: 1.5rem !important;
              opacity: 0.9;
            }
            p {
              font-size: 0.7rem;
              opacity: 0.5;
            }
          }
          .inputfile + label:hover {
            transform: scale(1.01) translateY(5px);
            color: var(--primary-color);
          }
        }
      }
      .form-group:nth-child(2) {
        padding: 1rem;
        padding-top: 0;
        display: flex;
        flex-direction: column;
        width: 54%;
        margin: 0 auto;
        padding-bottom: 0 !important;
        input,
        textarea {
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
      }
      .form-btn {
        text-align: start;
        width: 54%;
        margin: 0 auto;

        button {
          border-left: 1px solid;
          width: 100px;
          margin: 0 1rem;
          padding: 0.4rem;
        }
        button:active {
          transform: translateY(4px);
        }
      }
    }
  }
}
@media screen and (max-width: 734px) {
  .form-file {
    gap: 1rem !important;
  }
  .file-thumbnail {
    width: calc(100% / 2) !important;
  }
  .form-group:nth-child(2),
  .form-btn {
    width: 100% !important;
  }
}
@media screen and (max-width: 534px) {
}
</style>
