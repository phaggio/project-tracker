import React, { useState } from 'react';


const NewFeature = () => {
  const [disableAddButton, updateDisableAddButton] = useState(true);

  const updateNewFeatureNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    input.trim() ? updateDisableAddButton(false) : updateDisableAddButton(true);
  };


  return (
    <div className="container">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" 
            onChange={event => updateNewFeatureNameInput(event)} 
            placeholder="Feature name" />
        </div>
        <div className="form-group">
          <label>Description <small>(Optional)</small></label>
          <input type="text" className="form-control" placeholder="Description" />
        </div>
        <button type="submit" className="btn btn-success" disabled={disableAddButton}
          onSubmit={() => console.log('submit button pressed...')}
        >Add feature
        </button>
      </form>
    </div>

  )
};


export default NewFeature;