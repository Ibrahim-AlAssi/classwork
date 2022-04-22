// AXIOS GLOBALS


// GET REQUEST


function getTodos() {
  axios
    .get('http://127.0.0.1:8000/api/surveys', {         
     // code
    })
    .then(res => showALL(res))
    .catch(err => console.error(err));
}

function Search() {
  axios
    .get('http://127.0.0.1:8000/api/surveys?', {         
     // search
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}




// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCE
const axiosInstance = axios.create({
  // Other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});

function showALL(res) {
  res.data.data.forEach(data => {
    console.log(data.code);
    let code=data.code;
  document.getElementById('res').innerHTML += `
  <input type="hidden" id="custId" name="custId" value="${data.code}">
  <a href="#" onclick="codequstion();"><pre>${data.name}</pre><a>

`;

});
}

function codequstion() {
  var code = document.getElementById("custId").value;
  axios
    .get('http://127.0.0.1:8000/api/surveys/' + code)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}




function showOutput(res) {
  console.log(res.data.data.questions);

  document.getElementById('res').innerHTML =``;

  res.data.data.questions.forEach(data => {
    let ques=data.label;
    console.log(data.type);
    let id = data.id
    document.getElementById('res').innerHTML += `
    <p><label for="typee"><h3>type: ${data.type}</h3></label><br>
  <label for="fname">${ques}</label><br>
  <div id="date"></div>
  <div id="${id}"></div>
  <div id="numeric"></div>
  

`;


    if(data.type === 'qcm'){
      data.options.forEach(data => {
        console.log(data.answer);
        let check = data.answer;
        if(check===1){
          document.getElementById(id).innerHTML += `
          <p><label for="qcmQuest">${data.label}</label>
        true or false <input id="radioo" type="checkbox"  value="HTML" checked ></p>
      `;
  
        }else{

          document.getElementById(id).innerHTML += `
          <p><label for="qcmQuest">${data.label}</label>
        true or false <input id="radioo" type="checkbox" value="HTML"  ></p>
      `;
  
        }
    
      });

    }

});

  

}

function searchshowOutput(res) {
  console.log(res.data);
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
  </div>
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
    for
   <pre>${JSON.stringify(res.data,null,2)}</pre>
    </div>
  </div>
`;
}

function search() {
  var search = document.getElementById("search").value;
  axios
    .get('http://127.0.0.1:8000/api/surveys?keywords=' + search)
    .then(res => searchshowOutput(res))
    .catch(err => console.error(err));
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('headers').addEventListener('click', Search);

