<template>
  <div/>
</template>


<script>
export default {
  name: 'callback',
  data() {
    return {};
  },
  mounted() {
    let code = this.$route.query.code;
    let addr = 'https://login.microsoftonline.com/common/oauth2/token';
    let client_id = '5e1f8950-7cb1-4674-84dc-40e6013fe7da';
    let redir = 'http://localhost:3000/cms/Test';
    let path = `${addr}?client_id=${client_id}&code=${code}&redirect_uri=${redir}`;
    this.$axios.post(path);
    // this.$auth.loginWith('local', { token: code });
  },
};
</script>
