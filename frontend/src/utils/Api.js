class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  userInfoApi(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  updateUserInfo(item, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(this._checkRes);
  }

  loadImg(item, jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
      body: JSON.stringify({
        name: item.name.current.value,
        link: item.link.current.value,
      }),
    }).then(this._checkRes);
  }

  deleteCards(cardId, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  loadAvatar(link, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
      body: JSON.stringify({
        avatar: link.avatar.current.value,
      }),
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...this._headers,
      },
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.user87.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
