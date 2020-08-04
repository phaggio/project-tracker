import React, { useState } from 'react';


const NewProject = () => {
  const [disableCreateButton, updateDisableCreateButton] = useState(true);

  const updateProjectNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    input.trim() ? updateDisableCreateButton(false) : updateDisableCreateButton(true);
  };


  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" 
          onChange={event => updateProjectNameInput(event)} 
          placeholder="Project name" />
        </div>
        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text" className="form-control" placeholder="Description" />
        </div>
        <button type="submit" className="btn btn-success" disabled={disableCreateButton}
          onSubmit={() => console.log('submit button pressed...')}
        >Create project
        </button>
      </form>
    </div>

  )
};


export default NewProject;