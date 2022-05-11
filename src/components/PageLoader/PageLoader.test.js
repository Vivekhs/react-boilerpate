import { shallow } from 'enzyme'
import PageLoader from './PageLoader'

describe('PageLoader', () => {
  it('should be able to render', () => {
    const wrapper = shallow(<PageLoader />)
    expect(wrapper).toHaveLength(1)
  })
})
