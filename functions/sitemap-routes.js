import React from 'react'
import {Route} from 'react-router-dom'

export default (
  <Route>
    <Route exact path="/" />
    <Route exact path="/odstavnovace" />

    <Route exact path="/recepty" />
    <Route exact path="/novinky" />
    <Route exact path="/recept/:recept" />
    <Route exact path="/clanek/:url" />
    <Route exact path="/odstavnovac/:product" />
  </Route>
)
