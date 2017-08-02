{
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew',
        username: '',
        photo: '',
        location: '',
        background: '',
        home: '',
        short_description: '',
        saved_users: []
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'Confusion about Flux and Relay',
        author: 2
      },
      100: {
        id: 100,
        title: 'Creating a Simple Application Using React JS and Flux Architecture',
        author: 2
      }
    }
  },
  mainUser: {
    isFetching: true,
    id: 2,
    username: '',
  },
  savedUsers: {
    isFetching: false,
    lastUpdated: 1439478405547,
    items: [ 42, 100 ]
  }
}
