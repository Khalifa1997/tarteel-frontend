
import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';

import routes from '../routes';
import NotFound from '../pages/NotFound';
import {connect} from "react-redux";
import ReduxState from "../types/GlobalState";
import {toggleIsFetching} from "../store/actions/status";



const defaultSetContext = (context: any) => ({
  ...context,
  status: 200,
});

interface IOwnProps {

}

interface IDispatchProps {
  toggleIsFetching(): void;
}

type IProps = IOwnProps & IDispatchProps;

class Routes extends React.Component<IProps, never> {

  componentDidMount() {
    this.props.toggleIsFetching();
  }

  render() {
    return (
      <Switch>
        {routes.map(({ component: Component, setContext, ...route }: any) => (
          <Route
            key={route.path}
            {...route}
            render={({ staticContext, ...routeProps }) => {
              if (staticContext) {
                const contextFunction = setContext || defaultSetContext;

                Object.assign(staticContext, contextFunction(staticContext));
              }

              return <Component {...routeProps} />;
            }}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    toggleIsFetching: () => {
      dispatch(toggleIsFetching())
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Routes));
