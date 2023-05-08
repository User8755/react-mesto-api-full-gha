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
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: item.password,
        email: item.email,
      }),
    }).then(this._checkRes);
  }

  signin(item) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: item.password,
        email: item.email,
      }),
    }).then(this._checkRes);
  }

  tokenValid(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkRes);
  }
}

const auth = new Auth("https://auth.nomoreparties.co");

export default auth;
