import React from 'react';
import { Link } from 'react-router-dom'

const Settings = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">

          <h4>Coming soon ... </h4>

          <div>
            <Link className="btn btn-primary btn-sm" to={'/new/user'}>Add new user</Link>
          </div>

          <div>
            <small>
              Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a>
            from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </small>
          </div>

        </div>
      </div>


    </div>
  )
}

export default Settings;