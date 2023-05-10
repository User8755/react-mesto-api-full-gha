class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  register(item) {
    console.log(this._baseUrl);
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: item.password,
        email: item.email,
      }),
    }).then(this._checkRes);
  }

  signin(item) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: item.password,
        email: item.email,
      }),
    }).then(this._checkRes);
  }

  tokenValid() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._checkRes);
  }
}

const auth = new Auth('https://api.mesto.user87.nomoredomains.monster');

export default auth;
