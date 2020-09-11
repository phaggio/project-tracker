import React from 'react';
import { ItemType } from '../../util/dataTypes'
import { AddNewDropDownButton, ItemLink } from '..';

type PropsType = {
  includeFeature: boolean;
  type: string; // whether this ChildrenItemsDiv is on project or feature page
  _id: string; // _id of current project/feature this ChildrenItemsDiv is on
  projectId: string | null; // projectId of current item this page
  children: ItemType[]; // all children of this project/feature
}

const ChildrenItemsDiv = (props: PropsType) => {

  return (
    <div>
      <div className="d-flex justify-content-between align-items-baseline">
        <label className="font-weight-light">Children items ({props.children.length})</label>
        <AddNewDropDownButton small={true}
          parentType={props.type}
          parentId={props._id}
          projectId={props.projectId}
          includeFeature={props.includeFeature} />
      </div>

      <div className="row">
        {props.children.length > 0 ? props.children.map(item => {
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-1"
              key={item._id}>
              <ItemLink item={item} />
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