import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import Switch from 'react-dom';
import { Container } from '@material-ui/core';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';

const App = () => {
  return(
    <BrowserRouter>
      <Header />
        <div className='app'>
          <Container>
            <Switch>
              <Route path='/' component={Trending} exact />
              <Route path='/movies' component={Movies} exact />
              <Route path='/series' component={Series} exact />
              <Route path='/search' component={Search} exact />
            </Switch>
          </Container>
          
        </div>
      <SimpleBottomNavigation />
      </BrowserRouter>
  )
}
export default App;