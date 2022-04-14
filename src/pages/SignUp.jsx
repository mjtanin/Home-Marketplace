import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import invisible from '../assets/jpg/invisible.png'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visiblity from '../assets/svg/visibilityIcon.svg'
import { OAuth } from '../components'
import { db } from '../firebase.config'

function SignUp() {
  const [showPassword, setShowPasswrrd] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData
  const navigate = useNavigate()

  const handlePassword = () => {
    setShowPasswrrd((prvState) => !prvState)
  }
  const handleChange = (e) => {
    setFormData((prevState) => (
    {
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      toast.success('Registation Successfully')
      navigate('/profile')
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input 
          type="name" 
          name="name" 
          placeholder="name" 
          className="nameInput" 
          id="name"
          value={formData.name}
          onChange={handleChange}
          />
          <input 
          type="email" 
          name="email" 
          placeholder="email" 
          className="emailInput" 
          id="email"
          value={email}
          onChange={handleChange}
          />
          <div className="passwordInputDiv">
            <input 
            type={showPassword ? 'text' : 'password'} 
            name="password" 
            id="password" 
            placeholder="*****" 
            className="passwordInput"
            value={password}
            onChange={handleChange}
            />
            <img 
            src={showPassword ? invisible : visiblity} 
            alt="show" 
            className='showPassword' 
            onClick={handlePassword}
            style={{maxHeight: '56px', maxWidth: '56px'}}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>Forgot Password</Link>
          <div className="signUpBar">
            <p className="signUpText">Sign up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill='#fff' width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-in" className="registerLink">Sign In Instead</Link>
      </main>
    </div>
  )
}
export default SignUp