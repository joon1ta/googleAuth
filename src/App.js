
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

function App() {

  const [user, setUser] = useState({})


  function handleCallbackResponse(response) {

    let userObj = jwt_decode(response.credential)

    setUser(userObj)
    document.getElementById('signInDiv').hidden = true;
  }
  function handleSignout(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    /*  global google  */
    google.accounts.id.initialize({
      client_id: '781340129155-l6v2j78cv69r93vligb234qclgcerntv.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )


  }, [])


  // If we have a user: sign in button
  // If we have a user: show the logout button

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {
        Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignout(e)}>Sign out</button>
      }

      {
        user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
