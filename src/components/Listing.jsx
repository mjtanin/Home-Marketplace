import { Link } from "react-router-dom";
import bathtubIcon from '../assets/svg/bathtubIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';

const Listing = ({listing, id}) => {
  return (
    <li className="categoryListing">
     <Link to={`/category/${listing.type}/${id}`} id={id} className="categoryListingLink">
      <img src={listing.imageUrls[0]} alt={listing.name} className="categoryListingImg" />
      <div className="categoryListingDetails">
        <p className="categoryListingLocation">{listing.location}</p>
        <p className="categoryListingName">{listing.name}</p>
        <p className="categoryListingPrice">
          ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{listing.type === 'rent' && ' / Month'}
        </p>
        <div className="categoryListingInfoDiv">
          <img src={bedIcon} alt="bed" />
          <p className="categoryListingInfoText">
            { listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
          </p>
          <img src={bathtubIcon} alt="bed" />
          <p className="categoryListingInfoText">
            { listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 bathroom'}
          </p>
        </div>
      </div>
     </Link>

    </li>
  )
}
export default Listing