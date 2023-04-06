// GET REQUEST
function getTodos() {
  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(result => showOutput(result))
    .catch(error => console.error(error))
}

// POST REQUEST
function addTodo() {
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'tahir',
      completed: false
    }
  })
    .then(result => showOutput(result))
    .catch(error => console.error(error))
}

// PUT/PATCH REQUEST // put actually replace the whole data block and patch just update items in the block. 
function updateTodo() {
  axios({
    method: 'patch',
    url: 'https://jsonplaceholder.typicode.com/todos/201',
    data: {
      title: 'wani wani',
      completed: false
    }
  })
    .then(result => showOutput(result))
    .catch(error => console.error(error))
}

// DELETE REQUEST  
function removeTodo() {
  axios
    .delete('https://jsonplaceholder.typicode.com/todos/201')
    .then(result => showOutput(result))
    .catch(error => console.error(error))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos/'),
    axios.get('https://jsonplaceholder.typicode.com/posts/'),
  ])
    .then(axios.spread((todos, posts) => {
      showOutput(posts);
    }))
    .catch(error => console.error(error))
}

// CUSTOM HEADERS
function customHeaders() {
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'tahir',
      completed: false
    },
    headers: {
      'content-type': 'application/json',
      Authorization: 'sometoken'
    }
  })
    .then(result => showOutput(result))
    .catch(error => console.error(error))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use((config) => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
  return config;
}, (error) => { return Promise.reject(error) })
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
