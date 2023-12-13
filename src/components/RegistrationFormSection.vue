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
        <div class="form-group">
          <div class="custom-select">
            <select>
              <option value="0">Industry</option>
              <option value="1">Audi</option>
              <option value="2">BMW</option>
              <option value="3">Citroen</option>
              <option value="4">Ford</option>
              <option value="5">Honda</option>
              <option value="6">Jaguar</option>
              <option value="7">Land Rover</option>
              <option value="8">Mercedes</option>
              <option value="9">Mini</option>
              <option value="10">Nissan</option>
              <option value="11">Toyota</option>
              <option value="12">Volvo</option>
            </select>
          </div>
          <div class="tags">
            <input type="text" placeholder="Tags..." />
          </div>
          <div class="price">
            <input type="number" placeholder="Price..." />
          </div>
        </div>
        <div class="form-group">
          <div class="create-chapter">
            <div class="amount-chapter">
              <div class="amount-left">
                <span>Create</span><input placeholder="0" type="number" /><span
                  >chapter</span
                >
              </div>
              <div class="amount-right">
                <button type="button">Create</button>
              </div>
            </div>
            <div class="chapter-courses" v-for="c in 2" :key="c">
              <div class="chapter-title">
                <h3>Chapter {{ c }}</h3>
              </div>
              <div class="chapter-list">
                <div class="chapter-item" v-for="n in 3" :key="n">
                  <div class="chapter-number">{{ n }}</div>
                  <div class="chapter-img">
                    <img
                      src="../images/florian-olivo-4hbJ-eymZ1o-unsplash.jpg"
                      alt=""
                    />
                  </div>
                  <div class="chapter-video">
                    <video controls>
                      <source
                        src="../videos/video-1645947165.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div class="chapter-text">
                    <h4 class="multiline-ellipsis-1">Lorem ilsum uilo tileo</h4>
                    <p class="multiline-ellipsis-1">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Id cupiditate, in, dicta dolore reiciendis quam expedita,
                      obcaecati aut consequuntur eos eveniet! Magni fuga est
                      libero aut velit, non iste praesentium.
                    </p>
                  </div>
                  <div class="chapter-btn">
                    <button type="button">Edit</button>
                  </div>
                </div>
              </div>
              <div class="btn-add">
                <button type="button">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-btn">
          <button type="button">Send it!</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss">
.registration {
  user-select: none;
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
      // padding-top: 0;
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
      input:focus,
      textarea:focus {
        border-bottom: 1px solid;
      }
    }
    .form-group:nth-child(3) {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      padding-top: 0;
      .custom-select,
      .tags,
      .price {
        width: calc(100% / 3);
        margin-bottom: 0.8rem;
      }
      .custom-select {
        select {
          width: 100%;
          padding: 0.5rem;
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          border: 1px solid;
          border-radius: 3px;
          border-bottom: 0.3rem solid;
          font-size: 0.9rem;
          outline: none;
          transition: border 0.35s ease;
          option {
            background-color: var(--bg-secondary);
            color: var(--text-color);
            padding: 3rem;
          }
        }
      }
      .tags,
      .price {
        input {
          width: 100%;
          padding: 0.5rem;
          padding-right: 2rem;
          background-color: rgb(255, 255, 255, 0.1);
          color: inherit;
          border: 1px solid;
          border-radius: 3px;
          border-bottom: 0.3rem solid;
          font-size: 0.9rem;
          outline: none;
          transition: border 0.35s ease;
        }
        input:focus {
          border-bottom: 1px solid;
        }
      }
      .price {
        position: relative;
      }
      .price::after {
        content: "$";
        position: absolute;
        top: 7px;
        right: 10px;
      }
    }
    .form-group:nth-child(4) {
      padding: 1rem;
      padding-top: 0;
      .create-chapter {
        border: 1px solid;
        border-radius: 3px;
        padding: 1rem;
        .amount-chapter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .amount-left {
            display: flex;
            align-items: center;
            font-weight: 500;
            input {
              width: 3rem;
              background-color: var(--bg-secondary);
              outline: none;
              border: none;
              padding: 0.2rem 0.4rem;
              color: var(--text-color);
              margin: 0 0.3rem;
            }
            input::placeholder {
              opacity: 0.5;
            }
          }
          .amount-right {
            button {
              border-left: 1px solid;
              transition: border 0.35s ease;
            }
            button:hover {
              color: var(--primary-color);
              border-color: var(--primary-color) !important;
            }
          }
        }
        .chapter-courses {
          // display: none;
          border: 1px solid;
          margin: 1.5rem 0;
          border-radius: 5px;
          background-color: var(--footer-color);

          .chapter-title {
            text-align: center;
            padding: 1rem;
            border-bottom: 4px solid var(--border-color);
          }
          .chapter-list {
            .chapter-item {
              display: flex;
              align-items: center;
              border: 1px solid;
              margin: 1rem;
              padding: 0.5rem;
              border-radius: 5px;
              .chapter-number {
                width: 5%;
                text-align: center;
                font-weight: 700;
              }
              .chapter-img {
                width: 20%;
                height: 60px;
                margin: 0 0.3rem;
                overflow: hidden;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 3px;
                }
              }
              .chapter-video {
                width: 20%;
                height: 60px;
                margin: 0 0.5rem;
                border-radius: 3px;
                overflow: hidden;
                background-color: black;
                video {
                  width: 100%;
                  height: 100%;
                }
              }
              .chapter-text {
                padding: 0 1rem;
                h4 {
                  margin-left: 0.2rem;
                  letter-spacing: 0.5px;
                }
                p {
                  font-size: 0.8rem;
                  letter-spacing: 0.5px;
                  opacity: 0.6;
                }
              }
              .chapter-btn {
                margin-right: 0.5rem;
                button {
                  border-left: 1px solid;
                  width: 80px;
                }
              }
            }
            .chapter-item:hover {
              box-shadow: 1px 1px 3px 0px var(--border-color);
              cursor: pointer;
            }
          }
          .btn-add {
            text-align: center;
            margin-bottom: 1.5rem;
            button {
              border: 0;
              font-size: 1.5rem !important;
              font-weight: 300;
              width: 100px;
              transition: transform 0.3s ease;
              background-color: var(--bg-secondary);
            }
            button:hover {
              color: var(--primary-color);
              transform: scale(1.1);
            }
            button:active {
              transform: scale(1);
            }
          }
        }
      }
    }
    .form-btn {
      text-align: center;
      margin: 1rem 0 2rem 0;
      button {
        border-left: 1px solid;
        padding: 0.5rem 3rem;
        font-weight: 700;
        text-transform: uppercase;
      }
      button:hover {
        color: var(--primary-color);
        border-color: var(--primary-color) !important;
      }
      button:active {
        margin-bottom: 4px;
        transform: translateY(4px);
      }
    }
  }
}
@media screen and (min-width: 534px) and (max-width: 734px) {
  .form-file {
    gap: 1rem !important;
  }
  .chapter-courses {
    .chapter-list {
      .chapter-item {
        .chapter-img {
          width: 100% !important;
        }
        .chapter-video {
          width: 100% !important;
        }
      }
    }
  }
}
@media screen and (max-width: 534px) {
  .form-file {
    flex-direction: column;
    gap: 1rem !important;
    .file-thumbnail {
      width: 100% !important;
      height: 200px !important;
    }
  }
  .form-group:nth-child(3) {
    flex-direction: column;
    .price, .tags, .custom-select {
      width: 100% !important;
      margin-bottom: 0.1rem !important; 
    }
  }
  .chapter-courses {
    .chapter-list {
      .chapter-item {
        margin: 0.5rem !important;
        .chapter-img {
          width: 100% !important;
        }
        .chapter-video {
          width: 100% !important;
          margin: 0 0.1rem !important;
        }
        .chapter-text {
          padding: 0 0.3rem !important;
        }
        .chapter-btn {
          margin-right: 0.1rem !important;
          button {
            font-size: 0.6rem !important;
            width: 50px !important;
          }
        }
      }
    }
    .btn-add {
      margin-bottom: 1rem !important;
      button {
        width: 50px !important;
      }
    }
  }
}
</style>
