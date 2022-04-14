import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

function Profile() {
  const auth = getAuth()
  const [isChange, setIsChange] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData
  const navigate = useNavigate()

  const onLogOut = (e) => {
    e.preventDefault()
    auth.signOut()
    navigate('/sign-in')
  }

  const handleChange = event => {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.id]: event.target.value
      }
    ))
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name){
  
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
        toast.success("Update Successfully")
      }
    } catch (err) {
      toast.error(err.message)
      toast.error(err.code)
    }
  }
  
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type='button' className="logOut" onClick={onLogOut}>Logout</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p className="changePersonalDetails" onClick={() => {
            isChange && onSubmit()
            setIsChange((prevState) => !prevState)
          }}>{isChange ? 'Done' : 'Change'}</p>
        </div>
        <div className="profileCard">
          <form>
            <input type="text" id="name" value={name ? name : 'Name Not Set'} className={isChange ? 'profileNameActive' : 'profileName'} disabled={!isChange} onChange={handleChange} />
            <input type="text" id="email" disabled value={email} className="profileEmail" onChange={handleChange} />
          </form>
        </div>

      </main>
    </div>
  )
}
export default Profile