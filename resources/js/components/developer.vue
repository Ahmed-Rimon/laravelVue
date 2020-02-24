<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12" v-if="$gate.isAdmin()">
        <passport-clients></passport-clients>
        <passport-authorized-clients></passport-authorized-clients>
        <passport-personal-access-tokens></passport-personal-access-tokens>
      </div>
    </div>
    <!-- page not Found -->
    <div v-if="!$gate.isAdmin()">
      <not-found></not-found>
    </div>
    <!-- page not Found End Here-->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Component mounted.");
  }
};
</script>
