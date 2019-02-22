import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import NotFound from '../pages/NotFound/index';
import routes from '../routes';
import { toggleIsFetching } from '../store/actions/status';
import ReduxState from '../types/GlobalState';

const defaultSetContext = (context: any) => ({
  ...context,
  status: 200,
});

interface IOwnProps {}

interface IDispatchProps {
  toggleIsFetching(): void;
}

type IProps = IOwnProps & IDispatchProps;

class Routes extends React.Component<IProps, never> {
  public componentDidMount() {
    this.props.toggleIsFetching();
  }

  public render() {
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
    );
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    toggleIsFetching: () => {
      dispatch(toggleIsFetching());
    },
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Routes)
);
