/**
 * @parentComponent StreamDisplay
 * @description Conditionally rendered based on active event in state. Functionality to emit improvised and planned responses from port of active server
 */

import { RootState } from '@/store/reducers';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { serverManagerBroadcastAll } from '../store/actions';
import { PlannedResponseUnit, PlannedResponseUnitType } from './PlannedResponseCreator/type';
import { playbackResponseUnits } from './PlannedResponseCreator/utils';

function StreamInput() {
  const dispatch = useDispatch();
  const currentServerId = useSelector((store: RootState) => store.serversReducer.currentServerId);
  const [message, updateMessage] = useState('');

  const prus: PlannedResponseUnit[] = [
    { type: PlannedResponseUnitType.MESSAGE, message: 'Hey' },
    { type: PlannedResponseUnitType.DELAY, time: 2000 },
    { type: PlannedResponseUnitType.MESSAGE, message: 'Hey whats up' },
    { type: PlannedResponseUnitType.DELAY, time: 2000 },
    { type: PlannedResponseUnitType.MESSAGE, message: 'nmjc, hbu' },
    { type: PlannedResponseUnitType.DELAY, time: 2000 },
    { type: PlannedResponseUnitType.MESSAGE, message: 'same' },
    { type: PlannedResponseUnitType.DELAY, time: 2000 },
    { type: PlannedResponseUnitType.MESSAGE, message: 'okay' },
  ];
  const emitPlannedResponseEXAMPLE = () => {
    playbackResponseUnits(prus, {
      onMessage: (msg: string) => {
        dispatch(serverManagerBroadcastAll(currentServerId, msg));
      },
    });
  };

  return (
    <div className="streamDisplay_container streamDisplay_inputContainer">
      <div className="header-container">
        <div className="header-primary">INPUT</div>
      </div>
      <div style={{ display: 'flex' }}>
        <textarea
          className="code-textarea"
          placeholder="Message"
          value={message}
          onChange={(e) => updateMessage(e.target.value)}
        />
      </div>
      <div style={{ float: 'right' }}>
        <button
          className="streamDisplay_button"
          type="button"
          onClick={() => dispatch(serverManagerBroadcastAll(currentServerId, message))}
        >
          emit improvised response
        </button>
        <button style={{ marginLeft: '5px' }} className="streamDisplay_button" onClick={emitPlannedResponseEXAMPLE} type="button">plan a response</button>
      </div>
    </div>
  );
}

export default StreamInput;
