<template>
  <div class="expose-block expose-block--info">
    <h3 class="expose-block__heading">Информация</h3>
    <a :href="info.web.link" class="expose-block-info">
      <div class="expose-block-info__icon expose-block-info__icon--web"></div>
      <div class="expose-block-info__link">{{ info.web.title }}</div>
    </a>
    <a :href="`mailto://${info.email.link}`" class="expose-block-info">
      <div class="expose-block-info__icon expose-block-info__icon--email"></div>
      <div class="expose-block-info__link">{{ info.web.title }}</div>
    </a>
    <a :href="`phoneto://${info.phone.link}`" class="expose-block-info">
      <div class="expose-block-info__icon expose-block-info__icon--phone"></div>
      <div class="expose-block-info__link">{{ info.web.title }}</div>
    </a>
  </div>
</template>

<script>
/*
info: {
  web | email | phone: {
    title: "Сайт Отделения ГПНТБ СО РАН" | "branchconfhall@gpntbsib.ru" | "+7 (383) 330-17-59",
    link: "http://prometeus.nsc.ru/" | "mail_to" | "phone_to"
  }
}
*/

export default {
  props: {
    info: Object,
  },
};
</script>

<style lang="sass">

@import '~/styles/expose/expose-block.sass'

.expose-block-info
  display: flex
  align-items: center

  &__link
    text-decoration: none
    font-size: 13px
    margin-left: 10px
    color: $expose-info-link-color

  &__icon
    border-radius: 5px
    width: 32px
    height: 32px
    background: center no-repeat
    background-size: contain

    &--web
      background-image: url('~/assets/expose/info-web.svg')

    &--email
      background-image: url('~/assets/expose/info-email.svg')

    &--phone
      background-image: url('~/assets/expose/info-phone.svg')

</style>
