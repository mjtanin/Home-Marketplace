import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'

const Category = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(()=> {
    const getListing = async () => {
      const listingRef = collection(db, 'listings')
      const q = query(
        listingRef, 
        where('type', '==', params.categoryName), 
        orderBy('timestamp', 'desc'), 
        limit(10)
      )
      const querySnap = await getDocs(q)
      const listing = []
      querySnap.forEach((doc) => {
        listing.push({
          id: doc.id,
          data: doc.data()
        })
      })
      setListing(listing)
      setLoading(false)
    }

    getListing()
  }, [params.categoryName])
  return (
    <div className="">
      {loading ? 'Loading...' : (
        <h1>{listing[0].data.name}</h1>
      )}
    </div>
  )
}
export default Category