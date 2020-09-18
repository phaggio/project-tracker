import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConsoleLogButton } from '../../components';
import DebugModeContext from '../../util/DebugModeContext';

const Settings = () => {

  const debugMode = useContext(DebugModeContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">

          <div className="form-group">
            <div>
              <label className="font-weight-light">New user</label>
            </div>
            <Link className="btn btn-primary btn-sm" to={'/new/user'}>Add new user</Link>
          </div>

          <div className="form-group">
            <div>
              <label className="font-weight-light">Debug Mode</label>
            </div>
            <div className="custom-control custom-switch">

              <input className="custom-control-input"
                id="toggle"
                type="checkbox"
                checked={debugMode.debugMode}
                onChange={() => debugMode.toggle()} />
              <label className="custom-control-label" htmlFor="toggle"></label>
            </div>
          </div>

          <div className="form-group">
            <div>
              <label className="font-weight-light">Credit</label>
            </div>
            <small>
              Icons made by
              <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a>
              from
              <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
            </small>
          </div>




        </div>

        <DebugModeContext.Consumer>
          {({ debugMode }) => {
            if (debugMode) return (
              <div className="col-4">
                <ConsoleLogButton name="debugMode" state={debugMode} />
              </div>
            )
          }}
        </DebugModeContext.Consumer>
      </div>
    </div>
  )
}

export default Settings;