import React from 'react';
import { createMount } from '../../../../test-utils';
import Toast from '../../Toast';

it('Toast should mount with proper message', () => {
  const toastComp = createMount()(<Toast message="Invitation Sent" />);
  expect(toastComp.text()).toContain('Invitation Sent');
});
