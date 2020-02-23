<style>
.widget-user-header {
  background-position: center center;
  background-size: cover;
}
.widget-user .widget-user-header {
  height: 300px;
}
.widget-user .card-footer {
  padding-top: 10px;
}
.widget-user .widget-user-image > img {
  width: 150px;
}
</style>
<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-12 mt-3">
        <div class="card card-widget widget-user">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div class="widget-user-header text-white" style="background-image:url('./img/back.jpg')">
            <h3 class="widget-user-username text-left">Elizabeth Pierce</h3>
            <h5 class="widget-user-desc text-left">Web Designer</h5>
          </div>
          <div class="widget-user-image">
            <img class="img-circle" src="img/my.jpg" alt="User Avatar" />
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
      </div>
    </div>

    <!--Profile details -->

    <div>
      <div class="card">
        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" href="#activity" data-toggle="tab">Activity</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#settings" data-toggle="tab">Settings</a>
            </li>
          </ul>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <div class="tab-content">
            <div class="active tab-pane" id="activity">
              <!-- /.post -->
              <h5>My activity</h5>
            </div>

            <div class="tab-pane" id="settings">
              <form class="form-horizontal">
                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">Name</label>
                  <div class="col-sm-10">
                    <input
                      class="form-control"
                      v-model="form.name"
                      id="inputName"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                  <div class="col-sm-10">
                    <input
                      type="email"
                      class="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      v-model="form.email"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputExperience" class="col-sm-2 control-label">Experience</label>
                  <div class="col-sm-10">
                    <textarea
                      class="form-control"
                      id="inputExperience"
                      placeholder="Experience"
                      v-model="form.bio"
                    ></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label for="photo" class="col-sm-2 control-label">Profile Photo</label>
                  <div class="col-sm-12">
                    <input type="file" name="photo" class="form-input" @change="updateImage" />
                  </div>
                </div>

                <div class="form-group">
                  <label
                    for="password"
                    class="col-sm-12 control-label"
                  >Passport (leave empty if not changing)</label>
                  <div class="col-sm-12">
                    <input
                      v-model="form.password"
                      type="password"
                      name="photo"
                      id="password"
                      class="form-control"
                      placeholder="Passport"
                    />
                  </div>
                </div>

                <!--  <div class="form-group">
                  <div class="offset-sm-2 col-sm-10">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" /> I agree to the
                        <a href="#">terms and conditions</a>
                      </label>
                    </div>
                  </div>
                </div>-->
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-12">
                    <button type="submit" @click.prevent="updateInfo" class="btn btn-success">Update</button>
                  </div>
                </div>
              </form>
            </div>
            <!-- /.tab-pane -->
          </div>
          <!-- /.tab-content -->
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.nav-tabs-custom -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods: {
    updateInfo() {
      this.$Progress.start();
      this.form
        .put("api/profile")
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "User Updated successfully"
          });
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    updateImage(e) {
      let file = e.target.files[0];
      //   console.log(file);
      let reader = new FileReader();
      if (file["size"] < 2111775) {
        reader.onloadend = file => {
          // console.log("RESULT", reader.result);
          this.form.photo = reader.result;
        };

        reader.readAsDataURL(file);
      } else {
        Swal.fire("Oops...", "File size is more then 2 MB", "error");
      }
    }
  },
  created() {
    axios.get("api/profile").then(({ data }) => this.form.fill(data));
  }
};
</script>
