import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import FetchLoader from "react-faceted-search";
import SwitchRoute from '../src/SwitchRoute.js';
import NotFoundPage from '../src/ErrorPage/NotFoundPage/NotFoundPage.js';
import AboutPage from '../src/ErrorPage/AboutPage.js';
import App from '../src/App.js'

Enzyme.configure({ adapter: new Adapter() })

const props={
  value:`test`,
  species:`test`,
  category:`test`,
  ResultElementClass:test=>{return test},
  handleSelections: test=>{return test},
  routepath:`test`, 
  nextSelectedFacets:[]
}

const renderRoutes = path =>
  mount(
    <MemoryRouter initialEntries={[path]}>
        <SwitchRoute {...props} />
    </MemoryRouter>
);

test('invalid path should redirect to 404', () => {
  const component = renderRoutes("/random");
  expect(component.find(AboutPage)).toHaveLength(0);
  expect(component.find(NotFoundPage)).toHaveLength(1);
  
});

test('valid path should not redirect to 404', () => {
  const component = renderRoutes("/");
  expect(component.find(NotFoundPage)).toHaveLength(0);
  expect(component.find(AboutPage)).toHaveLength(1);
  
});

test('valid gene search path should redirect to react-faceted-search', () => {
  const component = renderRoutes(props.routepath);
  expect(component.find(NotFoundPage)).toHaveLength(0);
  expect(component.find(AboutPage)).toHaveLength(0);
  expect(component.find(FetchLoader)).toHaveLength(1);
});
