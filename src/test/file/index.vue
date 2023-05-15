<script setup lang="ts">
</script>

<template>
  <div class="news"></div>
</template>

<style lang="scss">
.news {
  .news-info {
    .news-content {
      p {
        margin: 20px 0;
        font-size: 18px;
      }

      img {
        width: 100%;
        margin: 5px 0;
        object-fit: cover;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.news {
  display: flex;
  min-height: 500px;
  flex-direction: column;

  .banner {
    width: 100%;
    height: 600px;
  }

  .breadcrumb {
    height: 56px;
    background-color: #fafafa;

    .content {
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
  }

  .news-info {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    display: flex;
    padding-top: 50px;
    flex-direction: column;
    padding-bottom: 80px;

    .date {
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 30px;
    }

    .news-content {
      font-size: 18px;
      margin-top: 44px;
      font-weight: 500;
      line-height: 36px;
    }
  }

  .list {
    width: 1200px;
    margin: 0 auto;
    display: grid;
    padding: 80px 0;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);

    .news-item {
      flex: 1;
      cursor: pointer;
      height: 350px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;

      &:hover {
        .news-title {
          color: var(--theme-color);
        }
      }

      .news-img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        flex-shrink: 0;
      }

      .news-content {
        height: calc(100% - 200px);
        display: flex;
        padding: 18px 20px;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: space-between;
        background-color: #fafafa;

        .news-title {
          display: inline-block;
          display: -webkit-box;
          overflow: hidden;
          font-size: 26px;
          transition: all 0.2s ease;
          transition: all 0.2s ease;
          font-weight: bold;
          margin-bottom: 10px;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;

          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .date-text {
          color: #666666;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }

  .more-button {
    cursor: pointer;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    justify-content: center;
  }
}
</style>
