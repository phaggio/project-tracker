import React from 'react';
import AddNewDropDownButton from '../AddNewDropDownButton';
import ItemLink from '../ItemLink';

type PropsType = {
  type: string; // project or feature
  name: string; // name of current project/feature
  _id: string; // _id of current project/feature
  children: DataObj[];
}

type DataObj = {
  _id: string;
  status: string;
  name: string;
  description: string;
  type: string;
  parentId?: string;
  projectId?: string;
}

const ChildrenItemsDiv = (props: PropsType) => {

  // if current page is a project, add feature button to the drop down
  let buttons = props.type === 'project' ? [
    {
      name: 'Feature',
      url: `/new/feature/${props.type}/${props.name}/${props._id}`,
      ariaLabel: 'add-new-feature',
      title: 'add new feature'
    }] : [];
  buttons = [...buttons, {
    name: 'Work item',
    url: `/new/workitem/${props.type}/${props.name}/${props._id}`,
    ariaLabel: 'add-new-work-item',
    title: 'add new work item'
  }, {
    name: 'Bug',
    url: `/new/bug/${props.type}/${props.name}/${props._id}`,
    ariaLabel: 'add-new-bug',
    title: 'add new bug'
  }]



  return (
    <div className="container border border-info rounded">
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Children items</label>
        <AddNewDropDownButton buttons={buttons} small={true} />
      </div>

      <div className="row">
        {props.children.length > 0 ? props.children.map(item => {
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
              key={item._id}>
              <ItemLink itemData={item} />
            </div>
          )
        })
          :
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1">No children</div>
        }
      </div>

    </div>
  )
}

export default ChildrenItemsDiv