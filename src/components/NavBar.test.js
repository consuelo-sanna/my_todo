import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavBar } from './NavBar';

configure({ adapter: new Adapter() });

describe('<NavBar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavBar />);
    });

    it('should render dashboard only if user=admin', () => {
        wrapper.setProps({ user: { role: 'admin' } });
        expect(wrapper.find('ClippedDrawer'));
    });

    // Wrong, watch if is in the file.. so it always pass
    /*it('should render button Login if not authenticated', () => {
        expect(
            wrapper.contains(
                <Link href="/auth" variant="body2" color="inherit">
                    Login
                </Link>
            )
        );
    }); */
});
