import { shallow } from 'enzyme'
import Home from './Home'
describe('Home', () => {
  it('should be able to render', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).toHaveLength(1)
  })
})
