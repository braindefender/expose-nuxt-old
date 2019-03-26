<template>
  <div class="list-item">
    <expo-card :title="item.title" :image="image" @click="passRedirect('Info')"/>
    <div class="list-item__info">
      <expo-date class="list-item__dates" :dates="item.dates"/>
      <div class="list-item__divider"/>
      <div v-if="!blocked" class="list-item__actions actions-block">
        <div class="actions-block__grid">
          <button
            type="button"
            v-tooltip.top="{content: 'Информация', classes: 'popover'}"
            class="actions-block__item actions-block__item--info"
            @click="redirect('Info')"
          />
          <button
            type="button"
            v-tooltip.top="{content: 'Редактирование', classes: 'popover'}"
            class="actions-block__item actions-block__item--edit"
            @click="redirect('Edit')"
          />
          <button
            type="button"
            v-tooltip.top="{content: 'Сортировка', classes: 'popover'}"
            class="actions-block__item actions-block__item--sort"
            @click="redirect('Sort')"
          />
          <button
            type="button"
            v-tooltip.top="{content: 'Предпоказ', classes: 'popover'}"
            class="actions-block__item actions-block__item--demo"
            @click="redirect('Demo')"
          />
        </div>
      </div>
      <div v-if="!blocked" class="list-item__divider"/>
      <div v-if="!blocked" class="list-item__users users-block">
        <div class="users-block__creator">
          <span>Создатель:</span>
          {{item.creator.username}}
        </div>
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
              :disabled="!canModify"
            />
          </no-ssr>
        </div>
      </div>
      <div v-if="!blocked" class="list-item__actions actions-block actions-block--grow">
        <div class="actions-block__grid">
          <button
            v-tooltip.left="{content: 'Перейти к выставке', classes: 'popover'}"
            type="button"
            class="actions-block__item actions-block__item--hide"
            @click="open"
          />
          <button
            v-if="canModify"
            v-tooltip.left="{content: 'Удалить выставку', classes: 'popover'}"
            type="button"
            class="actions-block__item actions-block__item--remove"
            @click="remove"
          />
        </div>
      </div>
      <div v-if="blocked" class="list-item__alert">
        <b>Редактирование недоступно:</b>&nbsp;выставка находится в работе.
      </div>
    </div>
  </div>
</template>

<script>
import { prettyDate } from '~/assets/scripts/util';

import ExpoCard from '~/components/common/ExpoCard';
import ExpoDate from '~/components/common/ExpoDate';

export default {
  components: { ExpoCard, ExpoDate },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  watch: {
    item(oldVal, newVal) {
      this.getSharedUsers();
    },
  },
  data() {
    return {
      sharedUsers: [],
    };
  },
  computed: {
    blocked() {
      return this.item.blocked;
    },
    image() {
      return this.item.image
        ? this.item.image
        : this.$store.state.static.sourceList[this.item.source].image;
    },
    usersList() {
      return this.$store.state.usersList.filter(
        el => el._id !== this.currentUser._id,
      );
    },
    canModify() {
      if (this.currentUser.username.substr(0, 5) === 'admin') {
        return true;
      }
      return this.currentUser._id === this.item.creator._id;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    pretty(date) {
      return prettyDate(date);
    },
    open() {
      let link = this.item.mode ? this.item.shortLink : `vnp`;
      this.$router.push(
        `/expose/${link}-${this.item.source}-${this.item._id.slice(-8)}`,
      );
    },
    onShare(value) {
      let users = [this.currentUser._id];
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
      let self = this;
      let options = {
        okcallback: () => {
          self.$store.dispatch('removeExpose', {
            _id: self.item._id,
            status: self.$store.state.currentStatus,
          });
        },
        header: 'Действительно удалить выставку?',
        canceltext: 'Нет, отменить',
        oktext: 'Да, удалить',
        showcancel: true,
        swapcolors: true,
        item: this.item,
      };
      this.prompt(options);
    },
    getSharedUsers() {
      this.sharedUsers = this.item.ownerID.filter(
        el => el._id !== this.currentUser._id,
      );
      this.sharedUsers = this.sharedUsers.filter(
        el => el.username.substr(0, 5) !== 'admin',
      );
    },
    prompt(options) {
      this.$emit('prompt', options);
    },
  },
  mounted() {
    this.getSharedUsers();
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
      flex-grow: 1
      display: grid
      grid-template-columns: 240px 31px min-content 31px min-content 1fr
      grid-template-rows: 1fr
      padding-top: 10px
      padding-bottom: 10px
      padding-right: 10px

    &__divider
      background-color: rgba(black, 0.2)
      width: 1px
      margin-left: 15px
      margin-right: 15px

    &__alert
      grid-column-start: 3
      grid-column-end: 6
      display: flex
      justify-content: center
      align-items: center

  .users-block
    font-size: 14px
    display: grid
    grid-template-rows: min-content 1fr

    &__creator, &__picker
      justify-self: start

    &__creator
      min-width: 280px
      margin: 0
      padding: 0
      margin-bottom: 10px
      span
        font-weight: bold

  .actions-block
    display: flex
    align-items: center

    &--grow
      justify-content: flex-end

    &__grid
      display: grid
      grid-auto-flow: column
      grid-template-rows: 36px
      grid-gap: 15px
      justify-items: end

    &__item
      cursor: pointer
      width: 36px
      height: 36px
      position: relative
      border-radius: 5px
      border: 1px solid rgba(black, 0.15)
      background-color: rgba(black, 0.05)
      transition: all ease-in-out 0.15s
      box-shadow: 0 2px 10px rgba(black, 0)

      &::after
        +posa(0)
        content: ''
        opacity: 0.4
        background: center no-repeat
        transition: all ease 0.15s

      &:hover
        box-shadow: 0 2px 10px rgba(black, 0.25)

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

  @media only screen and (max-width : 1600px)

    .actions-block
      &__grid
        grid-template-rows: 36px 36px
        grid-gap: 10px

  @media only screen and (max-width : 1024px)

    .list-item
      &__info
        grid-template-columns: 120px 17px min-content 17px minmax(280px, 1fr) 1fr

      &__divider
        margin-left: 8px
        margin-right: 8px

    .dates-block
      padding-left: 10px

      &__grid
        grid-template-columns: auto
        grid-gap: 5px 0px

      &__name
        text-align: left
        font-size: 13px

      &__value
        font-size: 13px
        margin-top: -5px

</style>
