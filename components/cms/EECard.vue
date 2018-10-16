<template>
  <div class="ee-card" v-if="item && item.selected">

    <div class="ee-card__top">
      <div class="ee-card__label">Редактирование записи</div>
      <div class="ee-card__controls">
        <input
          class="hidden"
          id="xml"
          type="file"
          ref="xml"
          @input="loadXML"/>
        <label for="xml" class="button">Загрузить XML</label>
        <div class="button" type="button">Сохранить</div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-content ee-card__images">

        <div class="ee-image-block">
          <div class="ee-image-block__images">
            <image-picker
              :prefill="cover"
              :meta="metadata"
              @change="onPICoverChange"
              @remove="onCoverRemove"/>
          </div>
          <div class="ee-image-block__title">Обложка</div>
        </div>

        <div class="ee-image-block">
          <div class="ee-image-block__images">
            <div class="ee-image-picker">
              <div class="ee-image-picker__image">
                <image-blur
                  :image="cover"
                  :meta="metadata"
                  :options="{ width: 125 }"/>
              </div>
              <div class="ee-image-picker__controls">
                <div class="ee-image-picker__button ee-image-picker__button--add"></div>
                <div class="ee-image-picker__button ee-image-picker__button--del"></div>
              </div>
            </div>
            <div class="ee-image-picker">
              <div class="ee-image-picker__image">
                <image-blur
                  :image="cover"
                  :meta="metadata"
                  :options="{ width: 125 }"/>
              </div>
              <div class="ee-image-picker__controls">
                <div class="ee-image-picker__button ee-image-picker__button--add"></div>
                <div class="ee-image-picker__button ee-image-picker__button--del"></div>
              </div>
            </div>
          </div>
          <div class="ee-image-block__title">Дополнительные изображения</div>
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
          ref="annotation" name="annotation" id="ee-annotation"
          placeholder="Аннотация не указана" cols="30" rows="1"
          @input="changeAnnotation" :value="item.annotation"
          v-autosize="item.annotation">
        </textarea>
      </div>
    </div>

    <div
      v-if="item.info"
      class="ee-card__item"
      >
      <div class="ee-card__item-title">Информация об издании:</div>
      <div class="ee-card__item-content ee-card__info">
        <div
          v-for="(info, index) in item.info"
          :key="index"
          class="ee-card__info-line">
          <div class="ee-card__info-cell bold">{{ info.name }}</div>
          <div class="ee-card__info-cell">{{ info.value }}</div>
        </div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Дополнительные изображения:</div>
      <div class="ee-card__item-content ee-card__images">
        <div class="ee-card__images-container">
          <div class="ee-card__image"
            v-for="(image, index) in images"
            :key="index">
            <button
              @click="removeImageAt(index)"
              class="button-remove"
              type="button"></button>
            <img :src="image" alt="">
          </div>
          <div class="ee-card__image ee-card__image--transparent">
            <picture-input
              ref="piImage"
              width="125"
              height="180"
              accept="image/jpeg,image/jpg,image/png"
              size="2"
              button-class="ee-card__image-upload"
              :zIndex=200
              :plain="true"
              :hideChangeButton="true"
              :prefill="undefined"
              @change="onPIImageChange">
            </picture-input>
          </div>
        </div>
      </div>
    </div>

    <div class="ee-card__item">
      <div class="ee-card__item-title">Содержание:</div>
      <div class="ee-card__item-content">
        <textarea
          :value="item.contents"
          @input="changeContents"
          v-autosize="item.contents"
          class="ee-card__contents"
          placeholder="Содержание не указано"
          name="contents" cols="60" rows="1"></textarea>
      </div>
    </div>

  </div>
  <div class="ee-card" v-else>
    <div class="ee-card__not-found">
      Здесь ничего нет. Пожалуйста, выберите документ слева
    </div>
  </div>
</template>


<script>
import testCover from '~/assets/covers/public01032012112432_b.jpg';

import { mapState } from 'vuex';

import ImageBlur from '~/components/ImageBlur';
import ImagePicker from '~/components/cms/common/ImagePicker';

export default {
  name: 'EECard',
  components: { ImageBlur, ImagePicker },
  data() {
    return {
      // annotation: this.item.annotation,
      file: '',
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
    ...mapState({
      item: state => state.edit.selected,
      images: state => state.edit.selected.images,
      cover: state => state.edit.selected.cover,
    }),
  },
  methods: {
    loadXML() {
      this.file = this.$refs.xml.files[0];
      this.$refs.xml.type = 'text';
      this.$refs.xml.type = 'file';
      this.uploadXML();
    },
    uploadXML() {
      this.$store.dispatch('syncState');
      let formData = new FormData();
      formData.append('file', this.file);
      formData.append('id', this.item._id);
      formData.append('exposeid', this.$store.state.info._id);
      this.$axios
        .$post('/cms/edit/xml', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          this.$store.commit('setState', res);
          console.log('Uploaded XML');
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeAnnotation(e) {
      this.$store.commit('edit/set', {
        item: this.item,
        field: 'annotation',
        to: e.target.value,
      });
    },
    changeContents(e) {
      this.$store.commit('edit/set', {
        item: this.item,
        field: 'contents',
        to: e.target.value,
      });
    },
    onPICoverChange(image) {
      if (image) {
        console.log('Picture loaded.');
        this.$store.commit('edit/set', {
          item: this.item,
          field: 'cover',
          to: image,
        });
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    onPIImageChange(image) {
      if (image) {
        console.log('Picture loaded.');
        if (!this.item.images) {
          this.$store.commit('edit/set', {
            item: this.item,
            field: 'images',
            to: [],
          });
        }
        this.$store.commit('edit/addImage', image);
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    removeImageAt(index) {
      this.$store.commit('edit/removeImageAt', index);
    },
    onCoverRemove() {
      this.$store.commit('edit/set', {
        item: this.item,
        field: 'cover',
        to: undefined,
      });
    },
  },
};
</script>


<style lang="sass">

  @import '@/styles/mixins.sass'
  @import '@/styles/vars.sass'

  .ee-card
    box-sizing: border-box
    display: flex
    flex-direction: column
    background-color: white
    overflow: hidden
    padding-top: 15px
    padding-bottom: 15px
    padding-left: 20px
    padding-right: 20px
    &__cover
      width: 100%
      display: flex
      flex-direction: row
      justify-content: flex-start
    &__cover-input
      margin-left: 10px
      flex: 0 0 auto
      height: 32px
      width: 172px
    &__not-found
      padding-top: 40px
      padding-bottom: 40px
      font-size: 16px
      font-weight: bold
      text-align: center
      color: rgba(black, 0.4)
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
      user-select: none
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
      outline: none
      border: none
      +outline-card(5px)
      padding: 15px
      padding-left: 13px
      text-align: left
      resize: none
      width: 100%
      min-height: 44px
      display: flex
      white-space: pre
    &__images
      display: flex
      flex-direction: row
    &__images-container
      overflow-x: scroll
      padding-bottom: 10px
      display: flex
      flex-direction: row
      flex-wrap: nowrap
    &__image
      border-radius: 5px
      width: 125px
      height: 180px
      background-color: #333
      position: relative
      display: flex
      align-items: center
      justify-content: center
      flex: 0 0 auto
      overflow: hidden
      margin-right: 10px
      &--transparent
        background: none
      .button-remove
        position: absolute
        top: 15px
        right: 15px
      img
        width: 100%
      >.picture-input
        margin: 0
        padding: 0
        width: 125px
        height: 180px
        border-radius: 5px
        overflow: hidden
        transition: all ease 0.15s
        .picture-preview
          background: none
          // display: none
          border-radius: 10px
        .preview-container
          position: relative
          overflow: hidden
          &::before
            pointer-events: none
            position: absolute
            top: 50%
            left: 50%
            margin-left: -24px
            margin-top: -24px
            z-index: 6000
            content: ''
            width: 48px
            height: 48px
            border-radius: 11px
            transition: all ease 0.15s
            background: url('~/assets/icon-image-add.svg') center center no-repeat
          &::after
            +posa(0)
            padding-bottom: 4px
            z-index: 5000
            pointer-events: none
            content: ''
            background-color: white
            border: 2px dashed rgba(black, 0.15)
            border-radius: 5px
            transition: all ease 0.15s
            box-shadow: 0px 3px 6px rgba($color-accent, 0)
          &:hover
            &::before
              box-shadow: 0px 3px 6px rgba($color-accent, 0.4)
            &::after
              border-radius: 10px
          &:active
            &::before
              transform: scale(0.95)
    &__info
      +outline-card(5px)
      padding: 15px
      font-size: 14px
      line-height: 16px
      display: flex
      flex-direction: column
    &__info-line
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      margin-bottom: 6px
      &:last-child
        margin-bottom: 0
    &__info-cell
      font-size: 14px
      line-height: 16px
      &:first-child
        text-align: left
      &:last-child
        text-align: right
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

  .ee-image-block
    border: 1px solid rgba(black, 0.2)
    border-radius: 5px
    padding: 10px
    display: flex
    flex-direction: column
    &__images
      display: flex
      flex-direction: row
    &__title
      text-align: center
      padding-top: 10px
      font-size: 14px

</style>
