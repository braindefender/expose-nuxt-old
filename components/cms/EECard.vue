<template>
  <div class="ee-card">

    <div class="ee-card__top">
      <div class="ee-card__label">Редактирование записи</div>
      <div class="ee-card__controls">
        <div class="button button--outline" type="button">Загрузить XML</div>
        <div class="button" type="button">Сохранить</div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Обложка:</div>
      <div class="ee-card__item-content ee-card__cover">
        <div class="book-image">
          <div class="book-image__blur">
            <div class="book-image__blur-container">
              <img :src="item.cover" :alt="metadata">
            </div>
          </div>
          <div class="book-image__image">
            <img :src="item.cover" :alt="metadata">
          </div>
        </div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__authors">{{ authors }}</div>
      <div class="ee-card__title">{{ item.title }}</div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Аннотация:</div>
      <div class="ee-card__item-content ee-card__annotation">
        <textarea
          ref="annotation"
          name="annotation"
          id="ee-annotation"
          placeholder="Аннотация не указана"
          cols="30"
          rows="1"
          v-model="annotation">
        </textarea>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Информация об издании:</div>
      <div class="ee-card__item-content ee-card__info">
        <p class="bold">Тип документа:</p>
        <p>Статья, документ или книга</p>
        <p class="bold">Тип документа:</p>
        <p>Статья, документ или книга</p>
        <p class="bold">Информация<br>об источнике:</p>
        <p>Статья, документ или книга</p>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Дополнительные изображения:</div>
      <div class="ee-card__item-content ee-card__images">
        <div class="ee-card__images-container">
          <div class="ee-card__image">
            <button class="button-remove" type="button"></button>
            <img :src="item.image" alt="">
          </div>
          <div class="ee-card__image">
            <button class="button-remove" type="button"></button>
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Содержание:</div>
      <div class="ee-card__item-content ee-card__contents">
        <div class="ee-card__contents-text">
          {{ contents }}
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'EECard',
  props: ['item'],
  data() {
    return {
      annotation: this.item.annotation,
      contents: this.item.contents,
    };
  },
  computed: {
    authors() {
      return this.item.authors
        ? this.item.authors.join(', ')
        : 'Авторы не указаны';
    },
    metadata() {
      return `${this.authors} - ${this.item.title}`;
    },
  },
};
</script>


<style lang="sass">

  @import '@/styles/mixins.sass'

  .ee-card
    box-sizing: border-box
    display: flex
    flex-direction: column
    background-color: white
    border-radius: 5px
    overflow: hidden
    padding-top: 15px
    padding-bottom: 15px
    padding-left: 20px
    padding-right: 20px
    &__label
      font-size: 16px
      font-weight: bold
    &__top
      height: 32px
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      margin-bottom: 15px
    &__controls
      display: flex
      flex-direction: row
      align-items: center
      .button
        margin-right: 10px
        &:last-child
          margin-right: 0
    &__item
      margin-bottom: 20px
    &__item-title
      font-size: 14px
      line-height: 20px
      font-weight: bold
      margin-bottom: 5px
    &__title
      font-size: 15px
      line-height: 20px
      font-weight: bold
      margin-bottom: -12px
      max-width: 400px
    &__authors
      max-width: 400px
      font-size: 14px
      line-height: 20px
      margin-bottom: 5px
    &__contents
      color: rgba(black, 0.8)
      font-size: 12px
      line-height: 15px
      font-family: 'PT Mono'
      +outline-card(5px)
      padding: 15px
      text-align: center
      &-text
        display: inline-block
        text-align: left
    &__cover
      width: 125px
    &__images
      +outline-card(5px)
      padding: 15px
    &__images-container
      overflow-x: scroll
      padding-bottom: 10px
      display: flex
      flex-direction: row
      flex-wrap: nowrap
    &__image
      border-radius: 5px
      max-width: 120px
      min-height: 120px
      background-color: #333
      position: relative
      display: flex
      align-items: center
      justify-content: center
      flex: 0 0 auto
      overflow: hidden
      margin-right: 15px
      .button-remove
        position: absolute
        top: 15px
        right: 15px
      img
        width: 100%
    &__info
      +outline-card(5px)
      padding: 15px
      font-size: 14px
      line-height: 16px
      display: grid
      grid-template-columns: auto 1fr
      grid-template-rows: 1fr
      grid-column-gap: 10px
      grid-row-gap: 6px
      align-items: end
      justify-content: center
      grid-auto-columns: min-content
      p
        margin: 0
        padding: 0
        &:nth-child(odd)
          text-align: right
        &:last-child
          margin-right: 0
    &__annotation
      textarea
        +outline-card(5px)
        font-family: 'PT Sans'
        font-style: italic
        font-size: 14px
        resize: none
        padding: 15px
        width: 100%
        &::placeholder
          color: rgba(black, 0.4)
</style>
