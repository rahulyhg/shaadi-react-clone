import React from 'react';
import Button from '@material-ui/core/Button';
import { createMount } from '../../../test-utils';
import Pagination from '../../Pagination';

describe('Pagination', () => {
  const props = {
    loading: false,
    activePage: 1,
    pageCount: 3,
  };
  const onClick = jest.fn();
  describe('Number of pages list consuming', () => {
    it('ONe Page :should not show pagination', () => {
      const pagination = createMount()(<Pagination {...props} pageCount={1} onClick={onClick} />);
      expect(pagination.find('[data-pagination]').length).toBe(0);
    });
    it('Multiple Pages,should show Pagination ', () => {
      const pagination = createMount()(<Pagination {...props} pageCount={3} onClick={onClick} />);
      expect(pagination.find('[data-pagination]').length).toBe(1);
    });
  });
  describe('Navigations', () => {
    it('user in first page', () => {
      const pagination = createMount()(<Pagination {...props} onClick={onClick} />);
      expect(pagination.find(Button).length).toBe(1);
    });
    it('user in Middle pages', () => {
      const pagination = createMount()(<Pagination {...props} activePage={2} onClick={onClick} />);
      expect(pagination.find(Button).length).toBe(2);
    });
    it('user in last page', () => {
      const pagination = createMount()(<Pagination {...props} activePage={3} onClick={onClick} />);
      expect(pagination.find(Button).length).toBe(1);
    });
  });
});
