import { Loading } from 'carbon-components-react'

import './PageLoader.scss'

const PageLoader = () => {
  return (
    <div className='page_loader'>
      <Loading
        withOverlay={false}
      />
    </div>
  )
}

export default PageLoader
