import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DebugModeContext from '../../util/DebugModeContext';

const Settings = () => {

  const debugMode = useContext(DebugModeContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">

          <div>
            <Link className="btn btn-primary btn-sm" to={'/new/user'}>Add new user</Link>
          </div>

          <div className="d-flex align-items-center">
            <label className="m-0 mr-2">Debug mode: </label>
            <input className="" type="checkbox" checked={debugMode.debugMode} onChange={() => debugMode.toggle()} />
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