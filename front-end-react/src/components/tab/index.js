import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from '../../router';

function Tabs() {
  return (
    <Router>
      <div className='flex'>
        {
          routes.map(({path, name}) => {
            return (
              <NavLink to={path} key={name} className="flex-1 text-center" activeClassName="selected">
                <span className="pb-0.5 color-text-l">{name}</span>
              </NavLink>
            )
          })
        }
      </div>
      <Suspense fallback={<span>loading...</span>}>
        <Switch>
          {routes.map(({ path, component: Comp }, i) => {
            return <Route exact path={path} render={() => <Comp />} key={i}></Route>;
          })}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Tabs;
