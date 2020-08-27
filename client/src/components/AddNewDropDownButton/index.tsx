import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
	small: boolean;
	buttons: Button[]
}

type Button = {
	name: string;
	url: string;
	ariaLabel: string;
	title: string;
}

const AddNewDropDownButton = (props: PropsType) => {
	return (
		<div className="btn-group">

			<button className={`btn btn-success dropdown-toggle ${props.small ? 'btn-sm' : ''}`}
				type="button"
				id="dropdownMenuButton"
				title="add new"
				data-toggle="dropdown"
			>
				Add new
      </button>
			<div className="dropdown-menu"
				aria-labelledby="dropdownMenuButton"
			>
				{props.buttons.map(button => {
					return (
						<Link className="dropdown-item"
							key={button.name}
							aria-label={button.ariaLabel}
							title={button.title}
							to={button.url}
						>
							{button.name}
						</Link>
					)
				})}
			</div>

		</div>
	)
}

export default AddNewDropDownButton;