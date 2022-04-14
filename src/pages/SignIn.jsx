import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import invisible from '../assets/jpg/invisible.png'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visiblity from '../assets/svg/visibilityIcon.svg'
import { OAuth } from '../components'

function SignIn() {
  const [showPassword, setShowPasswrrd] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData
  const navigate = useNavigate()
  const handlePassword = () => {
    setShowPasswrrd((prvState) => !prvState)
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential.user){
        navigate('/profile')
      }
      toast.success('Ligin Successfully')
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
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-up" className="registerLink">Sign Up Instead</Link>
      </main>
    </div>
  )
}
export default SignIn