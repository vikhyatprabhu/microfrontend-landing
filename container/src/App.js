import React , {lazy, Suspense , useState , useEffect} from "react";
import { Router, Route , Switch , Redirect} from "react-router-dom";
import {StylesProvider , createGenerateClassName} from '@material-ui/core/styles';
import Header from "./components/Header";
import Progress from './components/Progress'
const MarketingLazy = lazy(()=> import('./components/MarketingApp'))
const AuthLazy = lazy(() =>  import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
import {createBrowserHistory} from 'history';

const history=createBrowserHistory();
const generateClassName = createGenerateClassName({
  productionPrefix:'co',
});

export default () => {
  const [isSignedIn , setSignedIn] = useState(false);
  
  useEffect(() => {
   if(isSignedIn){
     history.push('/dashboard')
   }
  }, [isSignedIn])

  return (
    <StylesProvider generateClassName={generateClassName}>
    <Router history={history}>
      <div>
        <Header isSignedIn={isSignedIn} onSignOut={() => setSignedIn(false)} />
        <Suspense fallback={<Progress></Progress>}>
         <Switch>
           <Route path='/auth' >
             <AuthLazy onSignIn={() => setSignedIn(true)}/>
           </Route>
           <Route path='/dashboard'  >
             {!isSignedIn && <Redirect to="/"/>}
             <DashboardLazy></DashboardLazy>
           </Route>
           <Route path='/'  component={MarketingLazy}></Route>

         </Switch>
        </Suspense>
      </div>
    </Router>
    </StylesProvider>
  );
};
