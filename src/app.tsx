import Router, { route } from "preact-router";
import { Login } from "./pages/LoginUp";
import { SignUp } from "./pages/SignUp";
import { TablesView } from "./pages/TablesView";
import { UserPage } from "./pages/UserPage";
import { useEffect, useState } from "preact/hooks";
import { apiClient } from "./api/client";
import { ApiUser } from "./api";


export function App() {
  
  if (location.pathname === '/' || location.pathname === '') route('/tables')

  const [user, setUser] = useState<ApiUser>()
  useEffect(() => {
    apiClient.getUser().then(res => {
      if (res.meta.status === 401) {
        route('/signup', true)
      } else if (res.meta.status === 200) {
        setUser(res.data)
        // route('/tables')
      } else {
        route('/signup', true)
      }
    })
  }, [])

  return (
    <Router>
      <SignUp path="/signup" />
      <Login path="/login" />

      <UserPage path="/user" user={user} />
      <TablesView user={user} path="/tables/:tabel?" />
    </Router>
  )
}
