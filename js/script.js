let usersPosts = document.getElementById('posts-wrapper');

//get users api
function getUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

//display users in cards
function showUsers(users) {
  let usersContainer = document.querySelector('.users-container');
  let usersHTML = '';
  users.forEach((user) => {
    usersHTML += ` <div class="user-card">
      <div class="description">
        <div class="user-name">
        Name : ${user.name}
        </div>
      <div class="user-email">
      Email : ${user.email}
      </div>
      </div>
      <div class="posts-button" onclick="getUserPosts(${user.id})">
        Get User’s Posts 
      </div>
  </div>`;
  });
  usersContainer.innerHTML = usersHTML;
}

//When the page loads
getUsers().then((data) => {
  showUsers(data);
});

//display user's posts
function getUserPosts(id) {
  fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      if (posts.length > 0) {
        let postsHtml = '';
        posts.forEach((post) => {
          postsHtml += `
         <div class="post-card">
          <h2>
              ${post.title}
          </h2>
          <p>
              ${post.body}
          </p>
      </div>
      `;
        });
        document.getElementById('post-container').innerHTML = postsHtml;
      }
      usersPosts.style.display = 'block';
    });
}

//search a user
document.querySelector('.button-container').addEventListener('click', () => {
  let text = document.getElementById('filter-users').value;
  getUsers().then((users) => {
    let filteredUsers = filterUsers(users, text);
    showUsers(filteredUsers);
  });
});

//filter the searched users
function filterUsers(users, searchText) {
  if (searchText) {
    let filteredUsers = users.filter((user) => {
      if (
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredUsers;
  } else {
    return users;
  }
}

//close user's post
window.onclick = function(event) {
  if (event.target == usersPosts) {
    usersPosts.style.display = "none";
  }
}
