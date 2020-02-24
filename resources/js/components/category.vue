<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8" v-if="$gate.isAdmin()">
        <div class="card">
          <div class="card-header">Category Component</div>

          <div class="card-body">
            <button class="btn btn-success">
              <i class="fa fa-paperclip"></i> Click me
            </button>
          </div>
        </div>
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
