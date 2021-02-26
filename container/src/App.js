import React , {lazy, Suspense , useState} from "react";
import { BrowserRouter, Route , Switch } from "react-router-dom";
import {StylesProvider , createGenerateClassName} from '@material-ui/core/styles';
import Header from "./components/Header";
import Progress from './components/Progress'
const MarketingLazy = lazy(()=> import('./components/MarketingApp'))
const AuthLazy = lazy(() =>  import('./components/AuthApp'))
const generateClassName = createGenerateClassName({
  productionPrefix:'co',
});

export default () => {
  const [isSignedIn , setSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
    <BrowserRouter>
      <div>
        <Header isSignedIn={isSignedIn} onSignOut={() => setSignedIn(false)} />
        <Suspense fallback={<Progress></Progress>}>
         <Switch>
           <Route path='/auth' >
             <AuthLazy onSignIn={() => setSignedIn(true)}/>
           </Route>
           <Route path='/'  component={MarketingLazy}></Route>
         </Switch>
        </Suspense>
      </div>
    </BrowserRouter>
    </StylesProvider>
  );
};
