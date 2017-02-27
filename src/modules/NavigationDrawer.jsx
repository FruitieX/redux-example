import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Text';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/menu';

import Drawer from 'material-ui/Drawer';

import Divider from 'material-ui-old/Divider';
import MenuItem from 'material-ui-old/MenuItem';

import isArray from 'lodash/isArray';

import {
  createAction,
  createReducer,
} from 'redux-act';

import jwtDecode from 'jwt-decode';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import routes from '../utils/routes';
import theme from '../utils/theme';

const NavigationDrawer = ({ closeDrawer, changeView, drawerOpened, path, user }) => (
  <Drawer
    open={drawerOpened}
    onRequestClose={() => closeDrawer()}
  >

    <AppBar
      style={{ position: 'relative' }}
    >
      <Toolbar>
        <IconButton
          contrast
          onTouchTap={() => closeDrawer()}
        >
          <MenuIcon />
        </IconButton>
        <Text
          style={{ flex: 1 }}
          type="title"
          colorInherit
        >
          <FormattedMessage id="navigation" />
        </Text>
      </Toolbar>
    </AppBar>

    {
      routes.map((route) => {
        let active = (path === route.path);
        if (route.path === routes[0].path && path === '/') {
          active = true;
        }

        const scope = user ? user.scope : null;

        if (isArray(route.hideWhenScope) && route.hideWhenScope.includes(scope)) {
          return null;
        }

        return (
          <div key={route.path}>
            {route.separator ? <Divider /> : null}
            <MenuItem
              leftIcon={React.createElement(route.icon)}
              style={{ color: active ? theme.legacyPalette.primary1Color : null }}
              onTouchTap={() => { changeView(route.path); }}
            >

              <FormattedMessage id={route.name} />
            </MenuItem>
          </div>
        );
      })
    }
  </Drawer>
);

NavigationDrawer.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  drawerOpened: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  user: PropTypes.shape({
    scope: PropTypes.string.isRequired,
  }),
};

// Action creators
export const closeDrawer = createAction('Close menu drawer');
export const openDrawer = createAction('Open menu drawer');
export const toggleDrawer = createAction('Toggle menu drawer');

// Initial state
const initialState = {
  drawerOpened: false,
};

// Reducer
export const reducer = createReducer({
  [closeDrawer]: state => ({
    ...state,
    drawerOpened: false,
  }),
  [openDrawer]: state => ({
    ...state,
    drawerOpened: true,
  }),
  [toggleDrawer]: state => ({
    ...state,
    drawerOpened: !state.drawerOpened,
  }),
}, initialState);

export default withRouter(connect(
  (state, ownProps) => ({
    drawerOpened: state.drawer.drawerOpened,
    path: ownProps.location.pathname,
    user: state.auth.data.token && jwtDecode(state.auth.data.token),
  }),
  (dispatch, ownProps) => ({
    changeView(view) {
      dispatch(closeDrawer());
      ownProps.push(view.toLowerCase());
    },
    closeDrawer() {
      dispatch(toggleDrawer());
    },
  }),
)(NavigationDrawer));
