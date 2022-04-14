import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';
import { db } from '../firebase.config';

const OAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleGoogle = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const response = await signInWithPopup(auth, provider)
      const user = response.user

      const userRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userRef)

      if(!docSnap.exists()){
        setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/profile')
      toast.success('User Login Successfully')
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-in' ? 'in' : 'up'} with</p>
      <button className="socialIconDiv" onClick={handleGoogle}>
        <img src={googleIcon} alt="Google" className="socialIconImg" />
      </button>
    </div>
  )
}
export default OAuth