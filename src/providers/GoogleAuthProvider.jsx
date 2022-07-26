import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

export const GoogleAuthContext = React.createContext()

const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: '161060210937-bq8ta9f2736fsiuqr4ihev5701q5lj9e.apps.googleusercontent.com', // Your clientID from Google.
  })

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export default GoogleAuthProvider;