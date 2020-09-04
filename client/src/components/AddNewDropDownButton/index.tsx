import React from 'react';
import { Link } from 'react-router-dom';

type PropsType = {
	small: boolean;
	includeFeature: boolean;
	type?: string;
	_id?: string;
}

const AddNewDropDownButton = (props: PropsType) => {

	let buttons = props.includeFeature ? [
		{
			name: 'Feature',
			url: `/new/feature/${props.type && props._id ? `${props.type}/${props._id}` : ''}`,
			ariaLabel: 'add-new-feature',
			title: 'add new feature'
		}] : [];
	buttons = [...buttons, {
		name: 'Work item',
		url: `/new/work/${props.type && props._id ? `${props.type}/${props._id}` : ''}`,
		ariaLabel: 'add-new-work-item',
		title: 'add new work item'
	}, {
		name: 'Bug',
		url: `/new/bug/${props.type && props._id ? `${props.type}/${props._id}` : ''}`,
		ariaLabel: 'add-new-bug',
		title: 'add new bug'
	}]


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
				{buttons.map(button => {
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