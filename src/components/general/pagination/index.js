import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Next from '../../../images/chevron-right-solid.svg'
import Prev from '../../../images/chevron-left-solid.svg'

const PageNav = styled.nav`
  background-color: #fff;
`;

const PageLink = styled.button`
  border: none;
  position: relative;
  display: inline;
  margin-left: 1px;
  line-height: 1.25;
  padding: 1px 5px;
  background-color: #fff;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  vertical-align: middle;
  text-align: center;
  color: #25282b;
  border: 1px solid #fff;
  &:focus {
    outline: none !important;
  }
  &:hover,
  &.active {
    color: black;
    border: 1px solid black;
    border-radius: 3px;
    text-decoration: none !important;
    outline: none !important;
  }
`;

const PageLinkButton = styled.button`
  border: none;
  position: relative;
  display: inline;
  line-height: 1;
  background-color: #fff;
  padding: 0;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none !important;
    outline: none !important;
  }
`;

const PageItem = styled.li`
  display: table-cell;
  list-style-type: none;
  vertical-align: middle;
  text-align: center;
  width: 24px;
`;

const PageItemButton = styled.li`
  display: table-cell;
  list-style-type: none;
  vertical-align: middle;
  margin: 0 5px;
`;

const PageIcon = styled.img`
  height: 15px;
  width: 15px;
`;

const START_PAGE = 0;

class Pagination extends React.PureComponent {
  static propTypes = {
    total: PropTypes.number,
    perPage: PropTypes.number,
    onPageChange: PropTypes.func,
    currentPage: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: START_PAGE,
    };
  }

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props;

    if (currentPage !== prevProps.currentPage) {
      this.handlePageReplace(currentPage);
    }
  }

  handlePageReplace = (page) => {
    this.setState({ page });
  }

  get totalPage() {
    const { total, perPage } = this.props;

    if (total <= perPage) {
      return 1;
    }

    const totalPage = parseInt(total, 10) / parseInt(perPage, 10);

    return Math.ceil(totalPage);
  }

  handlePrevPage = () => {
    this.setState({ page: this.state.page - 1 });
    this.props.onPageChange(this.state.page - 1);
  };

  handleNextPage = () => {
    this.setState({ page: this.state.page + 1 });
    this.props.onPageChange(this.state.page + 1);
  };

  handlePageChange = (event) => {
    const value = event.currentTarget.getAttribute('value');
    const page = parseInt(value, 10);

    this.setState({ page }, () => {
      this.props.onPageChange(page);
    });
  };

  renderFullPage() {
    const { page } = this.state;

    switch (page + 1) {
      case this.totalPage - 3:
        return (
          <div>
            <PageItem>
              <PageLink value={page - 1} onClick={this.handlePageChange}>
                {page}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink
                className="active"
                value={page}
                onClick={this.handlePageChange}
              >
                {page + 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 1} onClick={this.handlePageChange}>
                {page + 2}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 2} onClick={this.handlePageChange}>
                {page + 3}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 3} onClick={this.handlePageChange}>
                {page + 4}
              </PageLink>
            </PageItem>
          </div>
        );
      case this.totalPage - 2:
        return (
          <div>
            <PageItem>
              <PageLink value={page - 2} onClick={this.handlePageChange}>
                {page - 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 1} onClick={this.handlePageChange}>
                {page}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink
                className="active"
                value={page}
                onClick={this.handlePageChange}
              >
                {page + 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 1} onClick={this.handlePageChange}>
                {page + 2}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 2} onClick={this.handlePageChange}>
                {page + 3}
              </PageLink>
            </PageItem>
          </div>
        );
      case this.totalPage - 1:
        return (
          <div>
            <PageItem>
              <PageLink value={page - 3} onClick={this.handlePageChange}>
                {page - 2}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 2} onClick={this.handlePageChange}>
                {page - 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 1} onClick={this.handlePageChange}>
                {page}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink
                className="active"
                value={page}
                onClick={this.handlePageChange}
              >
                {page + 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 1} onClick={this.handlePageChange}>
                {page + 2}
              </PageLink>
            </PageItem>
          </div>
        );
      case this.totalPage:
        return (
          <div>
            <PageItem>
              <PageLink value={page - 4} onClick={this.handlePageChange}>
                {page - 3}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 3} onClick={this.handlePageChange}>
                {page - 2}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 2} onClick={this.handlePageChange}>
                {page - 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page - 1} onClick={this.handlePageChange}>
                {page}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink
                className="active"
                value={page}
                onClick={this.handlePageChange}
              >
                {page + 1}
              </PageLink>
            </PageItem>
          </div>
        );
      default:
        return (
          <div>
            <PageItem>
              <PageLink
                className="active"
                value={page}
                onClick={this.handlePageChange}
              >
                {page + 1}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 1} onClick={this.handlePageChange}>
                {page + 2}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 2} onClick={this.handlePageChange}>
                {page + 3}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 3} onClick={this.handlePageChange}>
                {page + 4}
              </PageLink>
            </PageItem>
            <PageItem>
              <PageLink value={page + 4} onClick={this.handlePageChange}>
                {page + 5}
              </PageLink>
            </PageItem>
          </div>
        );
    }
  }

  renderPage(totalPage) {
    const { page } = this.state;
    const pageNumber = [];

    for (let i = 0; i < totalPage; i++) {
      pageNumber.push(
        <PageItem>
          <PageLink
            className={i === page ? 'active' : ''}
            value={i}
            onClick={this.handlePageChange}
          >
            {i + 1}
          </PageLink>
        </PageItem>
      );
    }

    return <div>{pageNumber}</div>;
  }

  render() {
    const { page } = this.state;
    return (
      <PageNav aria-label="Page navigation example">
        {this.props.total !== 0 && (
          <ul className="pagination justify-content-center">
            <PageItemButton>
              <PageLinkButton
                disabled={page === 0 ? true : false}
                onClick={this.handlePrevPage}
              >
                <PageIcon src={Prev} alt="next" />
              </PageLinkButton>
            </PageItemButton>
            {this.totalPage > 5
              ? this.renderFullPage()
              : this.renderPage(this.totalPage)}

            <PageItemButton>
              <PageLinkButton
                disabled={page + 1 === this.totalPage ? true : false}
                onClick={this.handleNextPage}
              >
                <PageIcon src={Next} alt="next" />
              </PageLinkButton>
            </PageItemButton>
          </ul>
        )}
      </PageNav>
    );
  }
}

export default Pagination;
