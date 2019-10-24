import React from 'react';
import toJson from 'enzyme-to-json';
import Board from '../src/components/Board/Board';
import { mount, shallow} from './enzyme';


describe('BOARD TEST', () => {
  it('should render the App component correctly', () => {
    const Wrapper = mount(<Board />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(true).toBeTruthy();
  });

  it('should render header without crashing', () => {
    const Wrapper = shallow(<Board />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(Wrapper.find('div')).toHaveLength(11);
    expect(Wrapper.find('h2')).toHaveLength(0);
    expect(Wrapper.find('button')).toHaveLength(1);
  })
});

