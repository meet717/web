import { useState, useEffect } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../Firebase';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Signed in as ' + user.displayName);
        console.log('Profile picture: ' + user.photoURL);
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorMessage = 'Failed to sign in with Google. Please try again later.';
        setErrorMessage(errorMessage);
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const rememberMe = event.target['remember-me'].checked;
    const auth = getAuth(app);

    if (rememberMe) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate('/dashboard');
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
        })
        .catch((error) => {
          handleAuthErrors(error);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          navigate('/dashboard');
        })
        .catch((error) => {
          handleAuthErrors(error);
        });
    }
  }

  function autoLoginIfRemembered() {
    const rememberMe = localStorage.getItem('rememberMe');
    if (rememberMe === 'true') {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      const auth = getAuth(app);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User already signed in:', user);
          navigate('/dashboard');
        })
        .catch((error) => {
          handleAuthErrors(error);
        });
    }
  }

  useEffect(() => {
    autoLoginIfRemembered();
  }, []);

  function handleAuthErrors(error) {
    let errorMessage = '';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid password.';
    } else {
      errorMessage = 'Failed to sign in. Please try again later.';
    }
    setErrorMessage(errorMessage);
  }
  
    return (
      <>
        <div className="bg-black h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <a href="/">
              {/* inset logo in this space */}
            </a>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Sign in to your account</h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <p className="mt-2 text-center text-sm text-white">
              Or{' '}
              <a href="/signup" className="font-medium text-white hover:text-gray-200">
                Create a new account
              </a>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-black px-4 py-8 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-white focus:ring-green-600"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="/auth/forgot-password" className="font-medium text-white hover:text-gray-200">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-black px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div>
                    <button
                      onClick={handleGoogleSignIn}
                      className="inline-flex items-center w-full justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }
  