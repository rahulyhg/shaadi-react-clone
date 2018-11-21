import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class SavedSearchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Save this Search',
      searchName: '',
      existinSearch: '',
      searchFrequency: (props.searchType === 'whoisonline' && 'never') || 'daily',
      receiveEmail: props.searchType !== 'whoisonline',
      nameError: false,
      savedSearchList: [],
      loadinglist: true,
    };

    this.saveSearch = this.saveSearch.bind(this);
    this.onSearchNameChange = this.onSearchNameChange.bind(this);
    this.onChangeExistingSearch = this.onChangeExistingSearch.bind(this);
    this.onReceiveEmailCheck = this.onReceiveEmailCheck.bind(this);
    this.onChangeFrequency = this.onChangeFrequency.bind(this);
    this.saveSearch = this.saveSearch.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      savedSearchList: props.saveSearchBox.savedSearchList,
      loadinglist: props.saveSearchBox.loadinglist,
      title: props.saveSearchBox.savedSuccess ? 'Saved successfully' : this.state.title,
    });
  }

  onSearchNameChange(value) {
    this.setState({
      searchName: value,
    });
  }

  onChangeExistingSearch(value) {
    const saveSearch = this.state.savedSearchList.find(list => list.name === value);
    this.setState({
      existinSearch: value,
      searchFrequency: (saveSearch && saveSearch.frequency) || 'daily',
      receiveEmail: !(saveSearch && saveSearch.frequency === 'never'),
      nameError: false,
    });
  }

  onReceiveEmailCheck() {
    this.setState({
      receiveEmail: !this.state.receiveEmail,
      searchFrequency: !this.state.receiveEmail ? this.state.searchFrequency : 'never',
    });
  }

  onChangeFrequency(value) {
    this.setState({
      searchFrequency: value,
    });
  }

  onClose() {
    this.props.onModalClose();
  }

  saveSearch() {
    this.setState({
      nameError: false,
    });
    if (this.state.searchName === '' && this.state.existinSearch === '') {
      this.setState({
        nameError: true,
      });
      return null;
    }

    this.props.doProfileAction('saveSearchBox', this.props.saveSearchBox.uid, 'submitSavedSearch', {
      searchname: this.state.existinSearch || this.state.searchName,
      email_frequency: (this.props.searchType === 'whoisonline' && 'never') || this.state.searchFrequency,
    });
    return null;
  }

  render() {
    return (
      <s.SavedSearchBoxWrapper>
        <ss.Header>
          <ss.Title>{this.state.title}</ss.Title>
          <ss.CloseModalBtn onClick={this.props.onModalClose} />
        </ss.Header>
        <ss.Content>
          <s.SaveSearchBoxContentWrapper isVisible={!this.props.saveSearchBox.savedSuccess}>
            <s.SaveSearchSectionWrapper isVisible={this.props.saveSearchBox.savedSearchList.length < 5}>
              <s.SavesearchLabel htmlFor="email">Save Search as</s.SavesearchLabel>
              <s.SaveSearchInputTextWrapper>
                <s.SaveSearchInputText
                  id="searchname"
                  maxLength="20"
                  value={this.state.searchName}
                  onChange={e => this.onSearchNameChange(e.target.value)}
                  nameError={this.state.nameError}
                />
                <s.SaveSearchInputTextError isVisible={this.state.nameError && this.props.saveSearchBox.savedSearchList.length === 0}>
                  Please enter a name
                </s.SaveSearchInputTextError>
              </s.SaveSearchInputTextWrapper>
            </s.SaveSearchSectionWrapper>

            <s.SaveSearchSectionWrapper
              isVisible={this.props.saveSearchBox.savedSearchList.length > 0 && this.props.saveSearchBox.savedSearchList.length < 5}
            >
              <s.Spacer padding="5" />

              <s.TextWrapper fontSize="14" bold>
                OR
              </s.TextWrapper>
            </s.SaveSearchSectionWrapper>

            <s.SaveSearchSectionWrapper isVisible={this.props.saveSearchBox.savedSearchList.length === 5}>
              <s.TextWrapper fontSize="14" bold>
                You can save up to 5 Searches. Since you already have 5 Saved Searches, please overwrite an existing Saved Search to
                continue.
              </s.TextWrapper>
            </s.SaveSearchSectionWrapper>

            <s.SaveSearchSectionWrapper isVisible={this.props.saveSearchBox.savedSearchList.length > 0} className="existingsearchwrapper">
              <s.Spacer padding="5" />
              <s.SavesearchLabel htmlFor="exsitingsearches">Overwrite</s.SavesearchLabel>
              <s.SaveSearchInputTextWrapper>
                <s.Select
                  width="210px"
                  name="exsitingsearches"
                  id="exsitingsearches"
                  defaultValue=""
                  onChange={e => this.onChangeExistingSearch(e.target.value)}
                  nameError={this.state.nameError}
                >
                  <option value="" label="Select Saved Search">
                    Select Saved Search
                  </option>
                  {this.props.saveSearchBox.savedSearchList.map(item => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </s.Select>
                <s.SaveSearchInputTextError isVisible={this.state.nameError}>
                  Please
                  {this.props.saveSearchBox.savedSearchList.length === 5
                    ? ' choose a saved search to overwrite'
                    : ' enter a name or choose a saved search to overwrite'}
                </s.SaveSearchInputTextError>
              </s.SaveSearchInputTextWrapper>
            </s.SaveSearchSectionWrapper>

            <s.SaveSearchSectionWrapper isVisible={this.props.searchType && this.props.searchType !== 'whoisonline'}>
              <br />
              <s.Spacer padding="5" />

              <s.SavesearchLabel htmlFor="email">
                <s.Checkbox
                  name="receive_email"
                  id="receive_email"
                  value="Yes"
                  checked={this.state.receiveEmail}
                  type="checkbox"
                  onChange={e => this.onReceiveEmailCheck()}
                />
                <label htmlFor="email_frequency">Email me new matches</label>
              </s.SavesearchLabel>

              <s.SaveSearchInputTextWrapper>
                <s.Select
                  width="100px"
                  name="email_frequency"
                  id="exsitingsearchesfrequency"
                  onChange={e => this.onChangeFrequency(e.target.value)}
                  value={this.state.searchFrequency}
                  disabled={this.state.receiveEmail ? '' : 'disabled'}
                >
                  <option value="daily" label="Daily">
                    Daily
                  </option>
                  <option value="biweekly" label="Twice a Week">
                    Twice a Week
                  </option>
                  <option value="weekly" label="Once a Week">
                    Once a Week
                  </option>

                  <option value="never" label="Never">
                    Never
                  </option>
                </s.Select>
              </s.SaveSearchInputTextWrapper>
            </s.SaveSearchSectionWrapper>

            <br />
            <br />
            <s.Spacer padding="10" />

            <s.SubmitBtn onClick={this.saveSearch}>Save Search</s.SubmitBtn>
          </s.SaveSearchBoxContentWrapper>
          <s.SaveSearchBoxContentWrapper isVisible={this.props.saveSearchBox.savedSuccess}>
            <s.SaveSearchSectionWrapper isVisible>
              <s.Spacer padding="5" />
              <s.TextWrapper fontSize="14" bold>
                {`Your search has been saved successfully under the name '${this.state.existinSearch || this.state.searchName}'`}
              </s.TextWrapper>
              <s.Spacer padding="5" />
            </s.SaveSearchSectionWrapper>
            <s.SubmitBtn onClick={this.onClose}>Close</s.SubmitBtn>
          </s.SaveSearchBoxContentWrapper>
        </ss.Content>
      </s.SavedSearchBoxWrapper>
    );
  }
}

SavedSearchBox.defaultProps = {
  saveSearchBox: {
    savedSearchList: [],
  },
  searchType: '',
};

SavedSearchBox.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  saveSearchBox: PropTypes.shape().isRequired,
  searchType: PropTypes.string,
};

export default SavedSearchBox;
