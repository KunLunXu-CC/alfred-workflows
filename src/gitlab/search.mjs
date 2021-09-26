import axios from 'axios'

axios({
  url: 'https://gitlab.dxy.net/api/graphql',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Authorization: 'Bearer ou4g355zSyuCx8THENAa',
  },
  data: {
    query: `
      query {
        projects { nodes { name } }
      }
    `
  }
})
.then(function (response) {
  console.log(JSON.stringify(response.data, null, 4));
})
.catch(function (error) {
  console.log(error);
});
