<template>
  <div class="list-item">
    <div class="expo-card" :style="`background-image: url('${item.image}');`" @click="redirect">
      <p class="expo-card__title">{{item.title}}</p>
    </div>
    <div class="list-item__info">
      <div class="list-item__dates dates-block">
        <div class="dates-block__grid">
          <p class="dates-block__name">Создано:</p>
          <p class="dates-block__value">{{item.dates.create}}</p>
          <p class="dates-block__name">Обновлено:</p>
          <p class="dates-block__value">{{item.dates.update}}</p>
          <p class="dates-block__name">Опубликовано:</p>
          <p class="dates-block__value">{{item.dates.public}}</p>
        </div>
      </div>
      <div class="list-item__divider"/>
      <div class="list-item__users users-block">
        <p class="users-block__creator">
          <span>Создатель:</span>
          {{item.creator}}
        </p>
        <div class="users-block__picker">
          <no-ssr>
            <multiselect
              v-model="ownerList"
              selectLabel
              deselectLabel
              placeholder="Добавить пользователя"
              :options="userList"
              :multiple="true"
              :hideSelected="true"
              :close-on-select="false"
              label="name"
              track-by="_id"
              @input="() => {}"
              :disabled="true"
            />
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      userList: [
        {
          _id: '00000',
          name: 'user name 0',
        },
        {
          _id: '00001',
          name: 'user name 1',
        },
        {
          _id: '00002',
          name: 'user name 2',
        },
      ],
      ownerList: [],
    };
  },
  computed: {
    date_public() {
      let p = this.item.dates.public.split('-');
      return '';
    },
    date_update() {
      let p = this.item.dates.public.split('-');
      return '';
    },
    date_create() {
      let p = this.item.dates.public.split('-');
      return '';
    },
  },
  methods: {
    redirect() {
      this.$store.dispatch('fetchState', this.item._id).then(res => {
        this.$router.push({ name: 'cms-Info', params: { fromcms: true } });
      });
    },
  },
};
</script>

<style lang="sass">
  @import '~/styles/multiselect.sass'

  .list-item
    display: flex
    flex-direction: row
    align-items: center
    min-height: 100px
    background-color: white
    border-radius: 5px
    border: 1px solid rgba(black, 0.1)
    &__info
      display: flex
      flex-direction: row
      flex-grow: 1
      padding-top: 15px
      padding-bottom: 15px
    &__divider
      background-color: rgba(black, 0.2)
      width: 1px

  .dates-block
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding-left: 15px
    padding-right: 15px
    color: rgba(black, 0.8)
    &__grid
      display: grid
      grid-template-columns: auto auto
      align-content: center
      align-items: center
      justify-content: center
      grid-gap: 5px 10px
    &__name
      font-weight: bold
      font-size: 14px
      text-align: right
    &__value
      font-size: 14px

  .users-block
    padding-left: 15px
    padding-right: 15px
    font-size: 14px
    &__creator
      margin: 0
      padding: 0
      margin-bottom: 10px
      span
        font-weight: bold

  .expo-card
    margin: -1px
    flex: 0 0 auto
    display: flex
    justify-content: center
    align-items: center
    min-height: 100px
    min-width: 300px
    max-width: 300px
    border-radius: 5px
    background: #333 center center no-repeat
    background-size: cover
    color: white
    font-weight: bold
    font-size: 16px
    line-height: 18px
    position: relative
    cursor: pointer
    padding-left: 20px
    padding-right: 20px
    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: rgba(black, 0.5)
      border-radius: inherit
    &__title
      white-space: pre-wrap
      position: relative
      z-index: 1
      margin: 0
      padding: 0
</style>
