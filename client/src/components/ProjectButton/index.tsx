import React from 'react';
import PropTypes from 'prop-types';



const size: object = {
  width: "10rem"
}

const ProjectItem = (props: { name: string; subtitle: string; }) => {
  return (

    <button type="button" className="m-1 btn btn-dark btn-block" onClick={() => console.log('clicked')}>
      <div className="d-flex flex-column align-items-center">

        <h6 className="m-0 p-1" style={size}>
          {props.name}
        </h6>

        <small className="d-none d-sm-none d-md-none d-lg-block text-left">
          {props.subtitle}
        </small>

      </div>
    </button>

  )
}

ProjectItem.propTypes = {
  name: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  github: PropTypes.string,
  imgURL: PropTypes.string
}

export default ProjectItem;
