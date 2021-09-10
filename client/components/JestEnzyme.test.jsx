import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './JestEnzyme';

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  // shallow doesn't render children component, mount render full DOM;
  wrapper = shallow(<App />);
});
describe('App Component', () => {
  test('text contains "hello"', () => {
    expect(wrapper.find('h1').text().includes('Hello')).toBe(true);
  });
  test('should render 1 <button>', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
  test('initial count value should be 0', () => {
    expect(wrapper.find('button').text()).toBe('0');
  });
  test('click button increment count value', () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('button').text()).toBe('1');
  });
});
