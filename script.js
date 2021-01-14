const app = new Vue({
  el: '#app',
  data: {
    baseUrl: "",
    backlogs: [
      {
        "email": "phitonthel@mail.com",
        "title": "Lorem ipsum dolor sit amet."
      },
      {
        "email": "admin@mail.com",
        "title": "Lorem ipsum dolor sit amet."
      }
    ],
    products: [
      {
        email: 'phitonthel@mail.com',
        title: 'Lorem ipsum dolor sit amet.'
      }
    ],
    developments: [],
    dones: [],
    page: 'login',
  },
  methods: {
    changeDirectory(page) {
      this.page = page
    },
    login() {
      localStorage.access_token = 'access_token'
      console.log(`login`);
      this.changeDirectory('kanban')
    },
    logout() {
      localStorage.clear()
      this.changeDirectory('login')
    },
    fetchTasks() {
      axios({
        url: this.baseUrl + "/tasks",
      })
    }
  },
  created() {
    if (localStorage.access_token) {
      this.changeDirectory('kanban')
    }
    else {
      this.changeDirectory('login')
    }
  }

})