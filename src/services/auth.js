let _tokenGetter = null

export const auth = {
  setTokenGetter: (fn) => {
    _tokenGetter = fn
  },
  getToken: () => (_tokenGetter ? _tokenGetter() : Promise.resolve(null)),
  isAuthenticated: () => !!_tokenGetter,
  logout: () => {
    _tokenGetter = null
  },
}
