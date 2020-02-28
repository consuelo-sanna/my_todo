import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Widget from './Widget';
import Title from './Title';

configure({ adapter: new Adapter() });

describe('<Widget />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Widget />);
    });

    /* it('should render button Login if authenticated ', () => {
        wrapper.setState({ user: { role: 'admin' } });
        expect(wrapper.find('button').text()).toEqual('Logout');
    });

    it('should render dashboard only if user=admin', () => {
        expect(wrapper.find('link').text()).toEqual('Login');
    });
*/
    it('should have a Title', () => {
        expect(wrapper.find(Title));
    });
});
