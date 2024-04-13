import Router, { RouterOnChangeArgs, route } from "preact-router";
import { Login } from "./pages/LoginUp";
import { SignUp } from "./pages/SignUp";
import { TablesView } from "./pages/TablesView";
import { UserPage } from "./pages/UserPage";


const authMethod = async () => true

const handleRoute = async (e: RouterOnChangeArgs) => {
  const secur = ['/tables', '/user']

  if (secur.some(s => e.url.includes(s))) {
    const isAuthed = await authMethod();
    if (!isAuthed) route('/signup', true);
  }
};

export function App() {

  return (
    <Router onChange={handleRoute}>
      {/* <Redirect path="/" to="/tables" /> */}

      <SignUp path="/signup" />
      <Login path="/login" />
      <UserPage path="/user" />

      <TablesView path="/tables/:tabel?" />
    </Router>
  )
}
