let _clerkToken = null

export const auth = {
  setToken: (token) => { _clerkToken = token },
  getToken: () => _clerkToken,
  isAuthenticated: () => !!_clerkToken,
  logout: () => { _clerkToken = null },
}
