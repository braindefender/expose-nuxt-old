<template>
  <div class="ip">
    <div class="ip__image">
      <canvas ref="refImage" width="125" height="180"></canvas>
    </div>
    <div class="ip__controls">
      <div
        class="ip__button ip__button--add"
        :class="prefill ? 'ip__button--off' : ''">
        <picture-input
          ref="pi"
          width="70"
          height="70"
          accept="image/jpeg,image/jpg,image/png"
          size="2"
          button-class="button"
          :prefill="undefined"
          :zIndex=200
          :plain="true"
          :hideChangeButton="true"
          @change="onChange">
        </picture-input>
      </div>
      <div
        v-if="prefill"
        class="ip__button ip__button--del"
        @click="onRemove"></div>
    </div>
  </div>
</template>

<script>
import noImage from '~/assets/default/white.svg';
import ImageBlur from '~/components/ImageBlur';

export default {
  name: 'ImagePicker',
  props: ['prefill'],
  components: { ImageBlur },
  watch: {
    prefill(newValue, oldValue) {
      if (newValue) {
        this.setImage(newValue)
      }
    }
  },
  data() {
    return {
      ctx: '',
      imageObject: {},
      imagePreview: {},
      aspectRatio: 1,
    };
  },
  mounted() {
    this.ctx = this.$refs.refImage.getContext('2d');
    if (this.prefill) {
      this.setImage(this.prefill);
    }
  },
  methods: {
    setImage(file) {
      const img = new Image();
      const self = this;
      img.onload = function() {
        if (self.$refs.refImage) {
          self.aspectRatio = img.height / img.width;
          self.$refs.refImage.height = self.$refs.refImage.width * self.aspectRatio;
          self.ctx.drawImage(img, 0, 0, 125, self.$refs.refImage.height);
          self.imagePreview = self.$refs.refImage.toDataURL();
          self.$emit('crop', self.imagePreview);
        }
      };
      img.src = file;
    },
    onChange(image) {
      if (image) {
        this.$emit('change', image);
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },
    onRemove() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.$refs.refImage.height = 180;
      this.setImage(noImage);
      this.$emit('remove');
    },
  },
};
</script>

<style lang="sass">

  @import '@/styles/mixins.sass'
  @import '@/styles/vars.sass'

  .ip
    position: relative
    display: flex
    flex-display: column
    align-items: center
    justify-content: center
    &__image
      font-size: 0
      border: 1px solid rgba(black, 0.25)
      border-radius: 5px
      overflow: hidden
    &__image-no
      width: 125px
      height: 180px
      background-color: #d9d9d9
      border: 2px dashed rgba(black, 1)
      opacity: 0.25
      border-radius: 5px
    &__controls
      +posa(0)
      z-index: 10000
      display: flex
      justify-content: center
      align-items: center
    &__button
      width: 70px
      height: 70px
      border-radius: 50%
      background-color: white
      cursor: pointer
      position: absolute
      &::before, &::after
        content: ''
        position: absolute
        top: 50%
        left: 50%
      &::before
        margin-top: -20px
        margin-left: -20px
        width: 40px
        height: 40px
        border-radius: 50%
      &::after
        width: 24px
        height: 24px
        margin-top: -12px
        margin-left: -12px
      &--off
        // display: none
        pointer-events: none
        opacity: 0
      &--add
        transition: 0.25s ease-in-out
        &:hover
          transform: scale(1.05)
        &::before
          background-color: $color-accent
          box-shadow: 0 5px 15px rgba($color-accent, 0.25)
        &::after
          background: url('~assets/sidebar/sidebar-icon-add.svg') center center no-repeat
      &--del
        opacity: 0
        transform: scale(0.95)
        transition: 0.25s ease-in-out
        &:hover
          opacity: 1
          transform: scale(1)
        &::before
          background-color: $color-error
          box-shadow: 0 5px 15px rgba($color-error, 0.25)
        &::after
          background: url('~assets/sidebar/sidebar-icon-add.svg') center center no-repeat
          transform: rotate(-45deg)
      >.picture-input
        padding: 0
        width: 70px
        height: 70px
        border-radius: 50%
        overflow: hidden
        .picture-preview
          background-color: transparent
          width: 70px
          height: 70px
          border-radius: 50%
          overflow: hidden
          opacity: 0
</style>
