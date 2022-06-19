import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Compte from '../pages/Compte'
import Inscription from '../pages/inscription'
import Product from '../pages/Product'
import Info from '../pages/Info'
import apropos from '../components/apropos'
const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/catalog/:slug' component={Product}/>
            <Route path='/catalog' component={Catalog}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/Info' component={Info}/>
            <Route path='/Compte' component={Compte}/>
            <Route path='/inscription' component={Inscription}/>
            <Route path='/apropos' component={apropos}/>
        </Switch>

        
    )
  

}

export default Routes
