<template>
  <div class="contact">
    <div class="container contact-container">
      <div class="contact-address">
        <ul class="address-list">
          <h4 class="title">Contact List &#129310;</h4>
          <li class="address-item">
            <span class="topic">Address:</span>
            <span class="detail">Hẻm 48, Bùi Thị Xuân &#128576;</span>
          </li>
          <li class="address-item">
            <span class="topic">Email:</span>
            <span class="detail">lamxxxxxxxxx@gmail.com &#128231;</span>
          </li>
          <li class="address-item">
            <span class="topic">Phone:</span>
            <span class="detail">0101101110 &#128241;</span>
          </li>
          <li class="address-item">
            <span class="topic">Website:</span>
            <span class="detail"
              ><a href="https://jclahi.web.app/#/">https://jclahi.web.app</a
              >&#127757;</span
            >
          </li>
        </ul>
        <form @submit.prevent="onSubmit" class="contact-form">
          <h3>Send Message &#128236;</h3>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              v-model="name"
              placeholder="Ex: John Smith"
              class="name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              v-model="message"
              placeholder="Ex: Write your message!"
              class="message"
              type="text"
              required
              cols="20"
              rows="9"
            ></textarea>
          </div>
          <div class="form-btn">
            <button>
              <span>Send </span><i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
      <div class="contact-map">
        <div
          style="overflow: hidden; max-width: 100%; width: 100vw; height: 500px"
        >
          <div
            id="embed-ded-map-canvas"
            style="height: 100%; width: 100%; max-width: 100%"
          >
            <iframe
              style="height: 100%; width: 100%; border: 0"
              frameborder="0"
              src="https://www.google.com/maps/embed/v1/place?q=Vietnam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAddMessageStore } from "../composable/useFirebaseStore";

const name = ref();
const message = ref();

const onSubmit = () => {
  if (
    name.value.split(" ").length < 20 &&
    message.value.split(" ").length < 1000
  ) {
    useAddMessageStore({ name: name.value, message: message.value });
  }
  name.value = "";
  message.value = "";
};
</script>

<style lang="scss" scoped>
.contact {
  padding: 2rem;
  .contact-container {
    display: flex;
    .contact-map,
    .contact-address {
      width: 50%;
    }
    .contact-address {
      .contact-form {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        h3 {
          font-size: 1.4rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;

          textarea,
          input::placeholder {
            font-size: 0.8rem;
            padding: 0.3rem;
          }
          textarea,
          input {
            padding: 0.2rem 0.3rem;
            color: inherit;
            background-color: rgba(118, 117, 117, 0.1);
            border: 1px solid;
            border-bottom: 0.3rem solid;
            border-radius: 4px;
            outline: none;
            transition: all 0.1s ease-in-out;
          }
          textarea:hover {
            border-bottom: 0.1rem solid;
          }
          input:hover {
            border-bottom: 0.1rem solid;
          }
        }
        .form-btn {
          margin-top: 1rem;
          button {
            width: 100px;
          }
        }
      }
      .address-list {
        .title {
          font-size: 1.5rem;
        }
        .address-item {
          padding: 0.2rem 0.1rem;
          .topic {
            margin-right: 0.2rem;
            font-weight: 600;
            font-size: 1.1rem;
          }
          .detail {
            font-weight: 700;
            font-style: italic;
            opacity: 0.9;
            a {
              color: inherit;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .contact {
    padding: 1rem;
    padding-top: 0;

    .contact-container {
      flex-direction: column;
      .contact-map,
      .contact-address {
        width: 100%;
        max-width: 100vw;
      }
      .contact-address {
        margin-bottom: 2rem;
        .contact-form {
          margin: 1rem 0;
          padding: 0;
        }
        ul {
          padding-left: 1rem;
        }
      }
    }
  }
}
</style>
