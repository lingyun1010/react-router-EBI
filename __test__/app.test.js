import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import FetchLoader from "react-faceted-search";
import SwitchRoute from '../src/SwitchRoute';
import NotFoundPage from '../src/ErrorPage/NotFoundPage/NotFoundPage';



Enzyme.configure({ adapter: new Adapter() })


test('invalid path should redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(FetchLoader)).toHaveLength(0);
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

test('valid path should not redirect to 404', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(FetchLoader)).toHaveLength(1);
  expect(wrapper.find(NotFoundPage)).toHaveLength(0);
});

