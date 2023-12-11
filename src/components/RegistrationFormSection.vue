<template>
  <section class="registration">
    <div class="container">
      <form class="regis-form">
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
      </form>
    </div>
  </section>
</template>

<style lang="scss">
.registration {
  .regis-form {
    .form-file {
      display: flex;
      justify-content: space-around;
      gap: 2rem;
      padding: 1rem;
      .file-thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% / 2);
        background-color: var(--bg-secondary);
        height: 300px;
        text-align: center;
        border: 2px solid var(--border-color);
        border-radius: 10px;
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
          font-size: 1.25rem;
          font-weight: 700;
          display: inline-block;
          cursor: pointer;
          transition: transform 0.3s linear;
        }
        label {
          i {
            font-size: 2.5rem !important;
            opacity: 0.9;
          }
          p {
            font-size: 0.9rem;
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
      input:hover,
      textarea:hover {
        border-bottom: 1px solid;
      }
    }
  }
}
</style>
