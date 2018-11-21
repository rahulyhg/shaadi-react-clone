import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import s from '../styles';

const Centers = props => {
  const { centers, checkboxId, showHeading, onSelectCentre, autoHeightMax, formErrors } = props;
  return (
    <s.ShaadiCentreWrapper formErrors={formErrors}>
      <Scrollbars autoHeight autoHeightMax={autoHeightMax}>
        {centers.map((item, i) => (
          <s.CentreAddContainer key={item.id}>
            <s.CheckBoxWrapper>
              <s.CheckBox
                name="centreadd"
                type="radio"
                key={item.id}
                value={item.id}
                onClick={event => onSelectCentre(event)}
                defaultChecked={centers.length === 1}
                id={`${checkboxId}_${item.id}`}
                hide={centers.length === 1}
              />
            </s.CheckBoxWrapper>
            <s.CentreAddress>
              {showHeading && <s.AddressHeading>{item.title}</s.AddressHeading>}
              {`${item.address1} ${item.address2} ${item.address3}`}
              <s.ContactPerson>Contact Person : {item.contact_person}</s.ContactPerson>
            </s.CentreAddress>
            <s.TelephoneNumber>{item.no}</s.TelephoneNumber>
          </s.CentreAddContainer>
        ))}
      </Scrollbars>
    </s.ShaadiCentreWrapper>
  );
};
Centers.propTypes = {
  centers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      address1: PropTypes.string.isRequired,
      address2: PropTypes.string.isRequired,
      address3: PropTypes.string.isRequired,
      contact_person: PropTypes.string.isRequired,
      no: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  checkboxId: PropTypes.string.isRequired,
  showHeading: PropTypes.bool.isRequired,
  onSelectCentre: PropTypes.func.isRequired,
  autoHeightMax: PropTypes.number.isRequired,
  formErrors: PropTypes.shape({
    city: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    centre: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  }).isRequired,
};

export default Centers;
