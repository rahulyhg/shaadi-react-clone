import React from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import s from './styles';

const errorMsgMap = {
  blankInput: 'Please specify a name for the list.',
  invalidCharacters: 'You can only use letters (a-z, A-Z), numbers (0-9) and underscore (_).',
  minCharacters: 'The list name should be between 4 -15 characters.',
};

class ShortlistDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      errorType: 'none',
      selected: props.shortlists.selected.map(i => `${i}`),
      deleted: [],
      isCreateFormVisible: false,
      shortlistName: '',
      isUpdateEnabled: false,
    };
    this.onToggleCreateForm = this.onToggleCreateForm.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.addToShortlist = this.addToShortlist.bind(this);
    this.createShortlist = this.createShortlist.bind(this);
    this.onToggleShortlistDropdown = this.onToggleShortlistDropdown.bind(this);
    this.showError = this.showError.bind(this);
    this.noop = e => e.stopPropagation();
  }

  componentWillReceiveProps(props) {
    if (props.shortlists !== this.props.shortlists) {
      this.setState({
        selected: props.shortlists.selected.map(i => `${i}`),
      });
    }
  }

  onToggleCreateForm() {
    const isCreateFormVisible = !this.state.isCreateFormVisible;
    this.setState({ isCreateFormVisible });
  }

  onCheckboxChange(item) {
    const { selected, deleted } = this.state;
    const deletedItem = selected.filter(id => id === item.id)[0];
    if (deletedItem) {
      const selectedList = selected.filter(id => id !== deletedItem);
      deleted.push(deletedItem);
      this.setState({
        deleted,
        selected: selectedList,
        isUpdateEnabled: true,
      });
    } else {
      this.setState({ selected: selected.concat(item.id), isUpdateEnabled: true });
    }
  }

  onToggleShortlistDropdown() {
    const isDropdownVisible = !this.state.isDropdownVisible;
    this.setState({ isDropdownVisible });
    if (isDropdownVisible) {
      this.props.onShortlistOpen();
    }
  }

  createShortlist(e) {
    e.stopPropagation();
    const { shortlistName } = this.state;
    if (shortlistName.length === 0) {
      this.showError('blankInput');
      return;
    } else if (shortlistName.match(/[^a-zA-Z0-9_ ]/)) {
      this.showError('invalidCharacters');
      return;
    } else if (shortlistName.length < 4 || shortlistName.length > 15) {
      this.showError('minCharacters');
      return;
    }
    this.onToggleCreateForm();
    this.props.onCreateShortlist(this.state.shortlistName);
    this.setState({ shortlistName: '' });
  }

  showError(errorType) {
    this.setState({ errorType });
    setTimeout(() => this.setState({ errorType: 'none' }), 5000);
  }

  addToShortlist(e) {
    e.stopPropagation();
    const { selected, deleted } = this.state;
    this.props.onAddToShortlist(selected, deleted);
  }

  handleClickOutside() {
    this.setState({ isDropdownVisible: false });
  }

  renderButton(type) {
    if (type === 'grid') {
      return this.props.status !== 'shortlisted' ? (
        <s.RoundIconBtn
          isVisible={this.props.status !== 'shortlisted'}
          title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'}
          onClick={this.props.items.length === 1 ? this.props.onDirectlyShortlist : this.onToggleShortlistDropdown}
        >
          <s.MaybeIcon />
        </s.RoundIconBtn>
      ) : null;
    } else if (type === 'list') {
      return (
        <s.InvitationBtn
          isMayBeBtn
          onClick={this.props.items.length === 1 ? this.props.onDirectlyShortlist : this.onToggleShortlistDropdown}
          isVisible={this.props.status !== 'shortlisted'}
          title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'}
        >
          Maybe
        </s.InvitationBtn>
      );
    } else if (type === 'update') {
      return (
        <s.ShortlistBtn
          isDropdownVisible={this.state.isShortlistDropdownVisible}
          isVisible={this.props.shortlists.count !== 0}
          isMatchItemHovered={this.props.isHovered}
          onClick={this.onToggleShortlistDropdown}
        >
          <s.ShortlistIcon isMatchItemHovered={this.props.isHovered} status={this.props.status} />
          <s.ShortlistText>
            Added to {this.props.shortlists.count} list{this.props.shortlists.count >= 2 ? 's' : ''}
          </s.ShortlistText>
        </s.ShortlistBtn>
      );
    } else if (type === 'profileUpdate') {
      return (
        <s.ShortlistLink onClick={this.onToggleShortlistDropdown}>
          {this.props.shortlists.count} Shortlist{this.props.shortlists.count > 1 ? 's' : ''}
          <s.ShortlistLinkIcon />
        </s.ShortlistLink>
      );
    }
    return (
      <s.MaybeBtn isVisible>
        <s.MaybeBtnText title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'} onClick={this.props.onDirectlyShortlist}>
          Maybe
        </s.MaybeBtnText>
        <s.MaybeArrowIcon onClick={this.onToggleShortlistDropdown} id="dropdownToggleBtn" />
      </s.MaybeBtn>
    );
  }

  render() {
    return (
      <s.Container>
        {this.renderButton(this.props.type)}
        {this.state.isDropdownVisible && (
          <s.ShortlistDropdown type={this.props.type} isVisible onClick={this.noop}>
            <s.Body>
              <s.Title>{this.props.isUpdateDropdown ? 'Update your Shortlists' : 'Add this profile to a shorlist'}</s.Title>
              <s.Shortlists>
                {this.props.items.map(item => (
                  <s.Shortlist key={item.key}>
                    {this.props.shortlists.ready ? (
                      <s.Checkbox
                        type="checkbox"
                        checked={this.state.selected.includes(item.id)}
                        onChange={() => this.onCheckboxChange(item)}
                        id={item.key}
                      />
                    ) : (
                      <s.Spinner />
                    )}
                    <s.Label htmlFor={item.key}>{item.label}</s.Label>
                    <s.ViewListLink isExternal target={'_blank'} to={`/profile/shortlist?mode=shortlist&list_id=${item.id}`}>
                      View List
                    </s.ViewListLink>
                  </s.Shortlist>
                ))}
              </s.Shortlists>
              <s.AddBtn isActive={this.state.isUpdateEnabled} onClick={this.state.isUpdateEnabled ? this.addToShortlist : this.noop}>
                {this.props.isUpdateDropdown ? 'Update Shortlists' : 'Add to Shortlist'}
              </s.AddBtn>
            </s.Body>
            <s.Footer>
              <s.ShorlistForm isVisible={this.state.isCreateFormVisible && this.props.items.length < 10}>
                <s.ShorlistInput
                  type="text"
                  maxLength="15"
                  placeholder=" e.g. Mumbai, 20 22"
                  value={this.state.shortlistName}
                  onChange={e => this.setState({ shortlistName: e.target.value })}
                  onClick={e => e.preventDefault()}
                />
                <s.CreateBtn onClick={this.createShortlist}>Create</s.CreateBtn>
              </s.ShorlistForm>
              {!this.state.isCreateFormVisible &&
                this.props.items.length < 10 && (
                  <s.CreateLink isVisible onClick={this.onToggleCreateForm}>
                    Create new Shortlist
                  </s.CreateLink>
                )}
              {this.state.errorType !== 'none' && (
                <s.Error>
                  <s.ErrorIcon />
                  <s.ErrorMsg>{errorMsgMap[this.state.errorType]}</s.ErrorMsg>
                </s.Error>
              )}
            </s.Footer>
          </s.ShortlistDropdown>
        )}
      </s.Container>
    );
  }
}

ShortlistDropdown.defaultProps = {
  status: null,
  isUpdateDropdown: false,
  isHovered: false,
};

ShortlistDropdown.propTypes = {
  type: PropTypes.oneOf(['list', 'grid', 'profile', 'update', 'profileUpdate']).isRequired,
  status: PropTypes.string,
  shortlists: PropTypes.shape({
    ready: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  isUpdateDropdown: PropTypes.bool,
  isHovered: PropTypes.bool,
  onAddToShortlist: PropTypes.func.isRequired,
  onCreateShortlist: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onShortlistOpen: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(ShortlistDropdown);
