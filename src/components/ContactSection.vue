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
        ul {
          padding-left: 1rem;
        }
      }
    }
  }
}
</style>
