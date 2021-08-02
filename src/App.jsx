import { Switch, Route, Redirect } from "react-router-dom"
import Login  from "./pages/Auth/Login/Login"
import PrivateRoute from "./components/PrivateRoute"
import Home from "./pages/Home/Home"

const App = () => {    
    return (
        <div>
            <Switch>
                <Route path='/login' component={Login} exact />
                <PrivateRoute path='/home' component={Home} exact />
                <Redirect to='/home' />          
            </Switch>
        </div>
    )
}

export default App