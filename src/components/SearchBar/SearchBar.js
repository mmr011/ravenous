import React from 'react';
import './SearchBar.css'


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rating': 'rating', 
      'Most Reviewed': 'review_count'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    };
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption 
    });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
   this.setState({
     location: event.target.value
   });
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOption() {
      return Object.keys(this.sortByOptions).map(sortByOption => {
          let sortByOptionValues = this.sortByOptions[sortByOption];
          return (
            <li 
            key={sortByOptionValues} 
            className={this.getSortByClass(sortByOptionValues)}
            onClick={this.handleSortByChange.bind(this, sortByOptionValues)}
            >
              {sortByOption}
            </li>
          );
      });
  }

  render() {
      return (<div class="SearchBar">
      <div className="SearchBar-sort-options">
        <ul>
          {this.renderSortByOption()};
        </ul>
      </div>
      <div className="SearchBar-fields">
        <input placeholder="Search Businesses" onChange={this.handleTermChange} />
        <input placeholder="Where?" onChange={this.handleLocationChange} />
      </div>
      <div className="SearchBar-submit" onClick={this.handleSearch}>
        <a>Let's Go</a>
      </div>
    </div>);
  }
};

export default SearchBar;