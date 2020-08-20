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
}

const AddNewButton = (props: PropsType) => {
	return (

		<div className="dropdown">

			<button className={`btn btn-success dropdown-toggle ${props.small ? 'btn-sm' : ''}`}
				type="button"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				Add New
      </button>
			<div className="dropdown-menu"
				aria-labelledby="dropdownMenuButton"
			>

				{
					props.buttons.map(button => {
						return (
							<Link className="dropdown-item"
								key={button.name}
								aria-label={button.ariaLabel}
								to={button.url}
							>
								{button.name}
							</Link>
						)
					})
				}
			</div>

		</div>

	)
}

export default AddNewButton;