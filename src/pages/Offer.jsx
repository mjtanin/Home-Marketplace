import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Listing } from '../components'
import { db } from '../firebase.config'

const Offer = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=> {
    const getListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(
        listingsRef, 
        where('offer', '==', true), 
        orderBy('timestamp', 'desc'), 
        limit(10)
      )
      const querySnap = await getDocs(q)
      const listings = []
      querySnap.forEach((doc) => {
        listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListings(listings)
      setLoading(false)
    }

    getListings()
  }, [])
  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Offer
        </p>
      </header>

      <main>
        {loading ? 'Loading...' : listings && listings.length > 0 ? (
          <ul className="categoryListings">
            {listings.map(listing => (
              <Listing key={listing.id} listing={listing.data} id={listing.id} />
            ))}
          </ul>
        ) : (
          <p>There are no offer yet</p>
        )}
      </main>
    </div>
  )
}
export default Offer