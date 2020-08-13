import React from 'react';
import { Link } from 'react-router-dom';

interface Button {
	name: string;
	url: string
}

const AddNewButton = (props: { buttons: Button[] }) => {
	return (

		<div className="dropdown">
			<button className="btn btn-success dropdown-toggle"
				type="button" id="dropdownMenuButton" data-toggle="dropdown"
				aria-haspopup="true" aria-expanded="false"
			>
				Add New
      </button>
			<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

				{props.buttons.map(button => {
					return (
						<Link className="dropdown-item" key={button.name} to={button.url}>{button.name}</Link>
					)
				})}
			</div>
		</div>

	)
}

export default AddNewButton;