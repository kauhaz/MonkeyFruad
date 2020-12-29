// import package and file
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./user/pages/index";
import Contractus from "./user/pages/contractus";
import Createpost from "./user/pages/createpost";
import Login from "./user/pages/login";
import Post from "./user/pages/post";
import Forgetpass from "./user/pages/forgetpass";
import Signup from "./user/pages/signup";
import Prevent from "./user/pages/prevent";
import Help from "./user/pages/help";
import Rank from "./user/pages/ranking";

import Axios from "axios"

// ที่รวม Routh ต่างๆ
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/post/create" exact>
          <Createpost />
        </Route>
        <Route path="/post" exact>
          <Post />
        </Route>
        <Route path="/ranking" exact>
          <Rank />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/forgetpass" exact>
          <Forgetpass />
        </Route>
        <Route path="/prevent" exact>
          <Prevent />
        </Route>
        <Route path="/help" exact>
          <Help />
        </Route>
        <Route path="/contractus" exact>
          <Contractus />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
