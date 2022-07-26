import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { Button } from 'antd';
import { useSetState } from '../../hooks/useSetState';

const Auth = () => {

  const [{ email, name, imageUrl, googleId }, setState] = useSetState({
    email: '', name: '', imageUrl: '', googleId: ''
  })

  const responseGoogle = (res) => {
    const { profileObj } = res;
    const { email, name, imageUrl, googleId } = profileObj;
    setState({
      email, name, imageUrl, googleId
    })
  }



  return (
    <div>
      {
        !googleId && <GoogleLogin
          clientId="761388770174-k1a7tfjfo79aqhm6os5akf4djnfepjd9.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      }

      {
        email && <div>
          mail: {email}
        </div>
      }
      {
        name && <div>
          name: {name}
        </div>
      }
      {
        imageUrl && <div>
          <img height="400px" width="400px" src={imageUrl} />
        </div>
      }
      {
        googleId && <GoogleLogout
          clientId="761388770174-k1a7tfjfo79aqhm6os5akf4djnfepjd9.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={(res) => {
            setState({
              email: '', name: '', imageUrl: '', googleId: ''
            })
          }}
        >
        </GoogleLogout>
      }
    </div>
  )
}

export default Auth;