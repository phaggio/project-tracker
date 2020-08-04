import React, { useState } from 'react';


const NewWorkItem = () => {
  const [disableAddButton, updateDisableAddButton] = useState(true);

  const updateNewWorkItemNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    input.trim() ? updateDisableAddButton(false) : updateDisableAddButton(true);
  };


  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control"
            onChange={event => updateNewWorkItemNameInput(event)}
            placeholder="Work item name" />
        </div>
        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text" className="form-control" placeholder="Description" />
        </div>
        <button type="submit" className="btn btn-success" disabled={disableAddButton}
          onSubmit={() => console.log('submit button pressed...')}
        >Add work item
        </button>
      </form>
    </div>

  )
};


export default NewWorkItem;