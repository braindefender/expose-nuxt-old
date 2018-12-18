<template>
  <div class="cms-new-page">
    <div class="cms-new-page__content cms-new-page__content--auth">
      <div class="cms-auth">
        <div class="cms-auth__title">Авторизация</div>
        <div class="cms-auth__page">Выполняется вход</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'callback',
  data() {
    return {
      success: false,
    };
  },
  mounted() {
    let code = this.$route.query.code;
    this.$auth
      .loginWith('local', {
        data: { username: 'token', password: code },
      })
      .then(res => {
        this.$router.push('/cms/list');
      });
  },
};
</script>

<style lang="sass">
  @import '~/styles/auth.sass'

  .cms-new-page
    &__content--auth
      justify-content: center
      align-items: center
</style>
