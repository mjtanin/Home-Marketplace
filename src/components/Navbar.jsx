import { useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (path) => {
    return location.pathname === path
  }

  return (
    <div className="navbar">
      <div className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={()=> navigate('/')}>
            <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
            <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
          </li>
          <li className="navbarListItem" onClick={()=> navigate('/offer')}>
            <OfferIcon fill={pathMatchRoute('/offer') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
            <p className={pathMatchRoute('/offer') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offer</p>
          </li>
          <li className="navbarListItem" onClick={()=> navigate('/profile')}>
            <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width="36px" height="36px" />
            <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Navbar