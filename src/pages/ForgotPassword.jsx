import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleChange = event => setEmail(event.target.value)

  const handleSubmit = async event => {
   try {
    event.preventDefault()
    const auth = getAuth()
    await sendPasswordResetEmail(auth, email)
    toast.success(`We send ${email} your password reset link`)
   } catch (error) {
    toast.error(error.message)
   }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="email" className="emailInput" name="email" id="email" value={email} onChange={handleChange} placeholder="Email" />
          <Link to='/sign-in' className="forgotPasswordLink">Sign in</Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button type="submit" className="signInButton">
              <ArrowRightIcon fill="#fff" height="34px" width="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
export default ForgotPassword