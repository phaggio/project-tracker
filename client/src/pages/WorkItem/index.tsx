import React, { useState, useEffect } from 'react';
import { workItemRequest } from '../../httpRequests';
import NameBadge from '../../components/NameBadgeDiv';
import TagsDiv from '../../components/TagsDiv';
import StatusDiv from '../../components/StatusDiv';
import DescriptionDiv from '../../components/DescriptionDiv';
import ConsoleLogButton from '../../components/ConsoleLogButton';

type PathProps = {
  history: boolean;
  location: string;
  match: MatchObj;
};

type MatchObj = {
  isExact: boolean;
  params: MatchParams;
  path: string;
  url: string;
};

type MatchParams = {
  id: string;
};

type WorkItemType = {
  _id: string;
  status: string;
  name: string;
  description: string;
  tags: string[];
}


const WorkItem = ({ match }: PathProps) => {
  console.log(match.params);

  const [workItem, updateWorkItem] = useState<WorkItemType | undefined>();

  useEffect(() => {
    if (match.params.id) {
      console.log('param exists, need to make API call');
      workItemRequest
        .getWorkItemById(match.params.id)
        .then(res => updateWorkItem(res.data))
        .catch(err => console.error(err))
    }
  }, []);

  useEffect(() => {
    console.log('need to update api request')
    if (workItem) {
      workItemRequest
        .updateWorkItemById(match.params.id, workItem)
        .then(res => console.log(res.data))
        .catch(err => console.error(err))
    }
  }, [workItem])


  const saveButtonPressed = (part: string, payload: string | string[]) => {
    switch (part) {
      case ('name'):
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, name: payload });
        break;
      case 'tags':
        if (payload instanceof Array && workItem) updateWorkItem({ ...workItem, tags: payload });
        break;
      case 'status':
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, status: payload });
        break;
      case 'description':
        if (typeof payload === 'string' && workItem) updateWorkItem({ ...workItem, description: payload });
        break;
      case 'assignee':
        console.log('need to update assignee!!!')
      default:
        break;
    }
  }

  return (
    <div className="container">
      {workItem ?
        <div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-8 col-lg-9">
              <div className="pt-2">
                <NameBadge type="workItem" name={workItem.name} saveButtonPressed={saveButtonPressed} />
                <hr className="mt-3" />
              </div>

              <div className="pt-2">
                <TagsDiv type="workItem" tags={workItem.tags} saveButtonPressed={saveButtonPressed} />
                <hr className="mt-3" />
              </div>

              <div className="pt-2">
                <StatusDiv type="workItem" status={workItem.status} saveButtonPressed={saveButtonPressed} />
                <hr className="mt-3" />
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="pt-2">
                <DescriptionDiv text={workItem.description} saveButtonPressed={saveButtonPressed} />
              </div>
            </div>
          </div>

        </div>
        :
        <div>
          No work item found
      </div>

      }




      <ConsoleLogButton name="work item" state={workItem} />
    </div>
  )
}

export default WorkItem