import React from 'react';
import toJson from 'enzyme-to-json';
import App from '../src/components/App/App';
import { mount, shallow} from './enzyme';


describe('SAMPLE TEST', () => {
  it('should return a successful sample test ', () => {
    expect(true).toBeTruthy();
  });
  
  it('should render the App component correctly', () => {
    const Wrapper = mount(<App />);
    expect(toJson(Wrapper)).toMatchSnapshot();
  });

  it('should render header without crashing', () => {
    const Wrapper = shallow(<App />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(Wrapper.find('div')).toHaveLength(1);
    expect(Wrapper.find('h2')).toHaveLength(1);
  })
});