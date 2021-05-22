import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import { Suspense } from 'react'

import { routes } from '../../router'

function Tabs() {
  return (
    <div>
      <Router>
        <NavLink to="/recommend">
          recommend
        </NavLink>
        <NavLink to="/singer">
          singer
        </NavLink>
        <Suspense fallback={<span>loading...</span>}>
          <Switch>
          {
            routes.map(({path, component: Comp}) => {
              return (<Route exact path={path} render={() => <Comp />}></Route>)
            })
          }
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default Tabs
