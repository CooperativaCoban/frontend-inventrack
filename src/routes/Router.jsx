import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import menuPage from '../menu/page';
import countInventoryPage from '../countInventory/page';
import rolesPage from '../roles/page';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/menu" component={menuPage} />
        <Route path="/countInventory" component={countInventoryPage} />
        <Route path="/roles" component={rolesPage} />
        {/* Otras rutas */}
      </Switch>
    </Router>
  );
}

export default AppRouter;