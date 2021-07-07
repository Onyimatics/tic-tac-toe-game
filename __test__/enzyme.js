import Enzyme, {
    configure, shallow, mount, render,
  } from 'enzyme';
  import Adapter from 'enzyme-adapter-react-16';
  import toJson from 'enzyme-to-json';
  
  configure({ adapter: new Adapter() });
  export { shallow, mount, render, toJson };
  export default Enzyme;