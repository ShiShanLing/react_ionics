import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';
import SubmitOrderPage from './pages/SubmitOrder/SubmitOrder'
import PayPage from './pages/PayPage/PayPage';
import HTMeal from './pages/HTMeal/HTMeal';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/HTMeal" component={HTMeal}/>
        <Route exact path="/SubmitOrderPage" component={SubmitOrderPage}/>
        <Route exact path="/PayPage" component={PayPage}/>
        <Route exact path="/">
          <Redirect to="/HTMeal" />
        </Route>
        {/*
        如果发现不认识的路由,就指定到首页
        */}
        {/* <Redirect to="/home" /> */}
      </IonRouterOutlet>
    </IonReactRouter>

    <IonReactRouter>

    </IonReactRouter>

  </IonApp>
);

export default App;
