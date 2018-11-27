<template>
  <div class="cms-new-page cms-new-page">
    <div class="cms-new-page__content cms-new-page__content--auth">
      <div class="cms-auth">
        <div class="cms-auth__title">Авторизация</div>
        <div class="cms-auth__field">
          <input
            type="text"
            name="username"
            placeholder="Логин"
            v-model="username">
        </div>
        <div class="cms-auth__field">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            v-model="password">
        </div>
        <div class="cms-auth__buttons">
          <div
            type="button"
            class="button"
            @click="authorize">
            Войти
          </div>
          <div
            type="button"
            class="button"
            @click="test">
            Тестинг
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  mounted() {
    // if (this.user === 'user') {
    //   if (this.pass === 'pass') {
    //     this.$router.push('/cms/list');
    //   }
    // }
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    test() {
      this.$axios.$get('/user').then(res => {
        console.log(res);
      });
    },
    authorize() {
      this.$axios
        .$post('/cms/login', {
          username: this.username,
          password: this.password,
        })
        .then(({ user, token }) => {
          console.log(user, token);
          Cookie.set('auth', token);
          this.$store.commit('setAuth', token);
          this.$store.commit('setUser', user);
          this.$router.push('/cms/list');
        })
        .catch(err => {
          if (err.response.status === 401) {
            // this.notifyError()
          }
        });
    },
  },
};
</script>


<style lang="sass">
  @import '~/styles/vars.sass'

  .cms-new-page
    &__content--auth
      justify-content: center
      align-items: center
  .cms-auth
    margin: 0 auto
    width: 320px
    padding: 20px
    background-color: rgba(black, 0.01)
    border-radius: 5px
    box-shadow: 0 25px 65px rgba(black, 0.1), 0 5px 75px rgba(black, 0.05)
    border: 2px solid rgba(black, 0.1)
    &__title
      text-align: center
      font-weight: bold
      margin-bottom: 20px
      font-size: 18px
    &__field
      margin-bottom: 20px
      input
        width: 100%
        height: 36px
        border: none
        border-radius: 5px
        border: 2px solid rgba(black, 0.15)
        padding-left: 15px
        transition: all ease-in-out 0.15s
        &:focus
          border: 0
          outline: 0
          border: 2px solid rgba($color-accent, 1)
    &__buttons
      .button
        height: 36px
        font-size: 16px
        margin-bottom: 10px
        &:last-child
          margin-bottom: 0
</style>
