import { render, screen } from '@testing-library/react';
jest.mock('react-router-dom', () => {
  const React = require('react');
  const Fragment = ({ children }) => <>{children}</>;
  const Route = () => null;
  const NavLink = ({ children, ...rest }) => <a {...rest}>{children}</a>;
  const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;
  const useParams = () => ({});
  return { BrowserRouter: Fragment, Routes: Fragment, Route, NavLink, Link, useParams };
}, { virtual: true });

import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

test('renders learn react link', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const hubs = screen.getAllByText(/Yo Computer Hub/i);
  expect(hubs.length).toBeGreaterThan(0);
  expect(container).toBeTruthy();
});
