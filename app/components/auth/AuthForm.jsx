import { Form, Link, useActionData, useNavigation, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';



function AuthForm() {
  const validationError = useActionData()
  const [searchParams] = useSearchParams()
  const navigation = useNavigation()


  const authMode = searchParams.get('mode') || 'login'

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User'
  const toggleBtnCaption = authMode === 'login' ? 'Create A new User'  : 'Login with existing user'

  const isSubmitting  = navigation.state !== 'idle'

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
       { authMode === 'login'  ? <FaLock /> :  <FaUserPlus/>}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationError && (
        <ul>
          {Object.values(validationError).map((error) =>  (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Authentication...' : submitBtnCaption}</button>
        <Link to={authMode === 'login' ?  '?mode=signup' : '?mode=login'}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
