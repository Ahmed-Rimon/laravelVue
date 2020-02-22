<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">User Table</h3>

            <div class="card-tools">
              <button class="btn btn-success" @click="openModal()">
                <i class="fa fa-user-plus mr-1"></i> Add users
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered At</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{user.id}}</td>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.type | upText}}</td>
                  <td>{{user.created_at | myDate}}</td>
                  <!-- <td>
                    <span class="tag tag-success">Approved</span>
                  </td>-->
                  <td>
                    <a href="#" class="mr-3" @click="editUser(user)">
                      <i class="fa fa-edit blue"></i>
                    </a>
                    <a href="#" @click="delateUser(user.id)">
                      <i class="fa fa-trash red"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-show="!editMode" class="modal-title" id="addNewLabel">
              <i class="fa fa-user-plus mr-1"></i>Add New User
            </h5>
            <h5 v-show="editMode" class="modal-title" id="addNewLabel">
              <i class="fa fa-user-edit mr-1"></i>Edit Users Info
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- Form Start here-->
          <form @submit.prevent="editMode ? updateUser() : createUser()" id="somes">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                  placeholder="UserName"
                />
                <has-error :form="form" field="name"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                  placeholder="Enter Your Valid mail"
                />
                <has-error :form="form" field="email"></has-error>
              </div>

              <div class="form-group">
                <textarea
                  v-model="form.bio"
                  name="bio"
                  id="bio"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                  placeholder="Short bio for user (Optional)"
                ></textarea>
                <has-error :form="form" field="bio"></has-error>
              </div>

              <div class="form-group">
                <select
                  v-model="form.type"
                  id="type"
                  name="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value>Select User Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">Standard User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>

              <div class="form-group">
                <input
                  v-model="form.password"
                  v-show="!editMode"
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  placeholder="Password"
                />

                <input
                  v-model="form.password"
                  v-show="editMode"
                  disabled
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                  placeholder="Password"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                <i class="fa fa-times"></i> Close
              </button>
              <button v-show="!editMode" type="submit" class="btn btn-primary" id="updateUser">
                <i class="fa fa-user-check"></i> Create User
              </button>
              <button v-show="editMode" type="submit" class="btn btn-success" id="updateUser">
                <i class="fa fa-users-cog"></i> Update User
              </button>
            </div>
          </form>
          <!-- Form End here-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: false,
      users: {},
      form: new Form({
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: ""
      })
    };
  },
  methods: {
    openModal() {
      this.form.reset();
      this.editMode = false;

      $("#addNew").modal("show");

      //   $("#addNewLabel").append('<i class="fa fa-user-plus mr-1"></i>;');
      //   $("#addNewLabel").text("Add User");
      //   $("#updateUser").text("Create user");
    },
    editUser(user) {
      this.form.reset();
      this.editMode = true;
      $("#addNew").modal("show");
      this.form.fill(user);
      //   $("#addNewLabel").text("Edit User");
      //   $("#updateUser").text("Update User");
    },
    delateUser(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.form
            .delete("api/user/" + id)
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              Fire.$emit("AfterCreate");
            })
            .catch(() => {
              Swal.fire("Failed!", "There Were Something wrong.", "warning");
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
    },
    loadUsers() {
      axios.get("api/user").then(({ data }) => (this.users = data.data));
    },
    updateUser() {
      this.$Progress.start();

      this.form.put("api/user/{user}")
      .then(()=>{
          //
      })
      .catch((){
        this.$Progress.fail();

      });
    },
    createUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          Fire.$emit("AfterCreate");
          $("#addNew").modal("hide");
          Toast.fire({
            icon: "success",
            title: "User Created successfully"
          });
          this.$Progress.finish();
        })
        .catch(() => {});
    }
  },
  created() {
    this.loadUsers();
    Fire.$on("AfterCreate", () => {
      this.loadUsers();
    });
    // if i want to reload my page after every 3 sec then i need to use set interval
    // But main problem is if i do that then if user nbot doing anything then still it will reload the page.
    // // //  // setInterval(() => this.loadUsers(), 3000);
  }
};
</script>
