const { describe, it } = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import MainLayout from '../index.jsx';
import Header from '../../Header/index.jsx';

describe('components.MainLayout', () => {
  it('should contain header', () => {
    const el = shallow(<MainLayout />);
    expect(el.contains(Header)).to.be.equal(true);
  });

  it('should render childrens', () => {
    const Comp = () => (<p>Hello</p>);
    const el = shallow(
      <MainLayout>
        <Comp />
      </MainLayout>
    );

    expect(el.contains(Comp)).to.be.equal(true);
  });
});
