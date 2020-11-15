import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import SignUp from './pages/SignUp';
import './styles/reduction.scss';

const CardPage = React.lazy(() => import('pages/CardPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));
const AddAmount = React.lazy(() => import('pages/AddAmount'));
const AddTransaction = React.lazy(() => import('pages/AddTransaction'));
const Transaction = React.lazy(() => import('pages/Transaction'));
const History = React.lazy(() => import('pages/History'));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => <Loginpage />}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => <SignUp />}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/tables" component={TablePage} />
                <Route exact path="/cards" component={CardPage} />
                <Route
                  exact
                  path="/add-transaction"
                  component={AddTransaction}
                />
                <Route exact path="/add-amount" component={AddAmount} />
                <Route exact path="/transaction" component={Transaction} />
                <Route exact path="/histroy" component={History} />
                {/* <Route exact path="/charts" component={ChartPage} />
                <Route exact path="/widgets" component={WidgetPage} /> */}
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
