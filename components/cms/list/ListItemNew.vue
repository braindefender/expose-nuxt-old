<template>
  <div class="list-item">
    <div
      class="expo-card"
      :style="`background-image: url('${image}');`"
      @click="passRedirect('Info')"
    >
      <p class="expo-card__title">{{item.title}}</p>
    </div>
    <div v-if="!blocked" class="list-item__info">
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
      <div class="list-item__actions actions-block">
        <div class="actions-block__grid">
          <button
            type="button"
            class="actions-block__item actions-block__item--info"
            @click="redirect('Info')"
          />
          <button
            type="button"
            class="actions-block__item actions-block__item--edit"
            @click="redirect('Edit')"
          />
          <button
            type="button"
            class="actions-block__item actions-block__item--sort"
            @click="redirect('Sort')"
          />
          <button
            type="button"
            class="actions-block__item actions-block__item--demo"
            @click="redirect('Demo')"
          />
        </div>
      </div>
      <div class="list-item__divider"/>
      <div class="list-item__users users-block">
        <p class="users-block__creator">
          <span>Создатель:</span>
          {{item.creator.username}}
        </p>
        <div class="users-block__picker">
          <no-ssr>
            <multiselect
              selectLabel
              deselectLabel
              placeholder="Добавить пользователя"
              v-model="sharedUsers"
              :options="usersList"
              :multiple="true"
              :hideSelected="true"
              :close-on-select="false"
              track-by="_id"
              label="username"
              @input="onShare"
              :disabled="!isCreator"
            />
          </no-ssr>
        </div>
      </div>
      <div class="list-item__actions actions-block actions-block--grow">
        <div class="actions-block__grid">
          <button
            v-if="isCreator"
            type="button"
            class="actions-block__item actions-block__item--remove"
            @click="remove"
          />
          <button
            v-if="isCreator"
            type="button"
            class="actions-block__item actions-block__item--hide"
            @click="hide"
          />
        </div>
      </div>
    </div>
    <div v-else class="list-item__info">
      <div class="list-item__alert">
        <b>Редактирование недоступно:</b>&nbsp;выставка находится в работе.
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
  watch: {
    item(oldVal, newVal) {
      this.sharedUsers = this.item.ownerID.filter(
        el => el._id !== this.creatorID,
      );
    },
  },
  data() {
    return {
      sharedUsers: [],
    };
  },
  computed: {
    blocked() {
      console.log(this.item.blocked);
      console.log(this.item.workerID);
      return this.item.blocked;
    },
    image() {
      return this.item.image
        ? this.item.image
        : this.$store.state.static.sourceList[this.item.source].image;
    },
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
    usersList() {
      return this.$store.state.usersList.filter(
        el => el._id !== this.creatorID,
      );
    },
    isCreator() {
      return this.creatorID === this.item.creator._id;
      // return true;
    },
    creatorID() {
      return this.$store.state.auth.user._id;
    },
  },
  methods: {
    hide() {
      this.$store.dispatch('hideExpose', {
        _id: this.item._id,
        status: this.$store.state.currentStatus,
      });
    },
    onShare(value) {
      let users = [this.creatorID];
      users = users.concat(this.sharedUsers.map(el => el._id));
      this.$axios.$post('/cms/users', {
        id: this.item._id,
        users,
      });
    },
    passRedirect(to) {
      if (!this.blocked) {
        this.redirect(to);
      }
    },
    redirect(to) {
      this.$store.dispatch('fetchState', this.item._id).then(res => {
        this.$router.push({ name: `cms-${to}`, params: { fromcms: true } });
      });
    },
    remove() {
      this.$store.dispatch('removeExpose', {
        _id: this.item._id,
        status: this.$store.state.currentStatus,
      });
    },
  },
  mounted() {
    this.sharedUsers = this.item.ownerID.filter(
      el => el._id !== this.creatorID,
    );
  },
};
</script>

<style lang="sass">

  @import '~/styles/multiselect.sass'
  @import '~/styles/mixins.sass'
  @import '~/styles/vars.sass'

  .list-item
    display: flex
    flex-direction: row
    align-items: stretch
    min-height: 100px
    background-color: white
    border-radius: 5px
    border: 1px solid rgba(black, 0.1)
    &__info
      display: flex
      flex-direction: row
      flex-grow: 1
      padding-top: 10px
      padding-bottom: 10px
      padding-right: 10px
    &__divider
      background-color: rgba(black, 0.2)
      width: 1px
      margin-left: 15px
      margin-right: 15px
    &__alert
      display: flex
      justify-content: center
      align-items: center
      padding: 15px


  .dates-block
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    padding-left: 15px
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
    font-size: 14px
    display: flex
    flex-direction: column
    justify-content: center
    &__creator
      margin: 0
      padding: 0
      margin-bottom: 10px
      span
        font-weight: bold

  .actions-block
    &--grow
      flex-grow: 1
    &__grid
      display: grid
      grid-auto-flow: column
      grid-template-rows: 36px 36px
      grid-gap: 10px
      justify-items: end
    &__item
      cursor: pointer
      width: 36px
      height: 36px
      position: relative
      border-radius: 5px
      border: 1px solid rgba(black, 0.15)
      background-color: rgba(black, 0.05)
      &::after
        +posa(0)
        content: ''
        opacity: 0.4
        background: center no-repeat
        transition: all ease 0.15s
      &:hover
        &::after
          opacity: 0.8
      &--info
        &::after
          background-image: url('~/assets/icons/info.svg')
      &--sort
        &::after
          background-image: url('~/assets/icons/sort.svg')
      &--edit
        &::after
          background-image: url('~/assets/icons/edit.svg')
      &--demo
        &::after
          background-image: url('~/assets/icons/demo.svg')
      &--hide
        &::after
          background-image: url('~/assets/icons/hide.svg')
      &--remove
        background-color: rgba($color-error, 0.15)
        border: 1px solid rgba($color-error, 0.4)
        &::after
          background-image: url('~/assets/icons/remove--color.svg')
          opacity: 1

  .expo-card
    margin: -1px
    flex: 0 0 auto
    display: flex
    justify-content: center
    align-items: center
    min-height: 100px
    width: 300px
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
