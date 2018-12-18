<template>
  <div class="cms-new-page cms-new-page">
    <div class="cms-new-page__content cms-new-page__content--auth">
      <div class="cms-auth">
        <div class="cms-auth__title">Авторизация</div>
        <div class="cms-auth__tabs">
          <button
            type="button"
            class="cms-auth__tab"
            :class="type === 'social' ? 'cms-auth__tab--active' : ''"
            @click="switchType('social')"
          >Облачная</button>
          <button
            type="button"
            class="cms-auth__tab"
            :class="type === 'social' ? '' : 'cms-auth__tab--active'"
            @click="switchType('local')"
          >Локально</button>
        </div>
        <div v-if="type === 'social'" class="cms-auth__page">
          <button
            type="button"
            class="button cms-auth__page-button"
            @click="azure"
          >Войти с помощью Microsoft</button>
        </div>
        <div v-else class="cms-auth__page">
          <div class="cms-auth__field">
            <input type="text" name="username" placeholder="Логин" v-model="username">
          </div>
          <div class="cms-auth__field">
            <input type="password" name="password" placeholder="Пароль" v-model="password">
          </div>
          <div class="cms-auth__buttons">
            <div type="button" class="button" @click="local">Войти</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined;

export default {
  mounted() {},
  data() {
    return {
      username: '',
      password: '',
      type: 'social',
    };
  },
  methods: {
    switchType(to) {
      this.type = to;
    },
    azure() {
      this.$auth.loginWith('social');
    },
    local() {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password,
        },
      });
    },
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
