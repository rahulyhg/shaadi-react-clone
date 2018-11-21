import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';
import DisplayAmt from '../Common/DisplayAmount';

const OrderNotes = props => {
  const items = props.orderSuccess;
  const notes = items.sub_sections;
  const amount = Number((items.amount || 0).replace(',', ''));
  const notesCount = notes.length;
  const currency = items.currency;
  const generateKey = pre => `${pre}_${new Date().getTime()}`;

  const filteredNotes = note =>
    note.details &&
    note.details.map((detail, index) => (
      <s.Detail notesCount={notesCount} key={generateKey(index)}>
        <s.DisplayFlex>
          <s.Label id={`data_test_label_${detail.label}`.toLowerCase().replace(' ', '_')}>{detail.label ? `${detail.label}:` : ''}</s.Label>
          <s.Content id={`data_test_content_${detail.label}`.toLowerCase().replace(' ', '_')} notesCount={notesCount} label={detail.label}>
            {detail.label === 'Payable Amount' ? <DisplayAmt amount={amount} currency={currency} /> : detail.text}
          </s.Content>
        </s.DisplayFlex>
      </s.Detail>
    ));

  const noteDetails = notes.map((note, index) => (
    <s.Wrapper notesCount={notesCount} key={note.title}>
      <s.NoteTitle>{note.title}</s.NoteTitle>
      <s.List>{filteredNotes(note)}</s.List>
    </s.Wrapper>
  ));

  return <s.Container>{noteDetails}</s.Container>;
};
OrderNotes.propTypes = {
  orderSuccess: PropTypes.shape(PropTypes.orderSuccess).isRequired,
};
export default OrderNotes;
