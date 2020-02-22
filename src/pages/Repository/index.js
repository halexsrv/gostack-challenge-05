import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilterList,
  IssueFilter,
  ControlPages,
  PreviousPage,
  NextPage,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { name: 'all', label: 'Todas', status: false },
      { name: 'open', label: 'Abertas', status: true },
      { name: 'closed', label: 'Fechadas', status: false },
    ],
    repoName: '',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({ repoName });

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async filterChange => {
    const { filters } = this.state;

    const filtersResult = filters.map(filter => {
      if (filter.name === filterChange.name) {
        const filterResult = filter;
        filterResult.status = true;
        return filterResult;
      }
      const filterResult = filter;
      filterResult.status = false;
      return filterResult;
    });

    this.setState({ filters: filtersResult });
    await this.setState({ page: 1 });

    this.handleIssueFilter(filterChange);
  };

  handleIssueFilter = async filterChange => {
    const filter = filterChange;
    const { repoName, page } = this.state;

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter.name,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleControlPage = async count => {
    const { page, filters, repoName } = this.state;

    const filter = filters.find(activeFilter => activeFilter.status === true);

    this.setState({ page: page + count });

    console.log(filter);
    console.log(page + count);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter.name,
        per_page: 5,
        page: page + count,
      },
    });

    this.setState({ issues: response.data });
  };

  render() {
    const { repository, issues, loading, filters, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilterList>
          {filters.map(filter => (
            <IssueFilter
              key={filter.name}
              status={filter.status}
              onClick={() => this.handleFilter(filter)}
            >
              {filter.label}
            </IssueFilter>
          ))}
        </IssueFilterList>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <ControlPages>
          <PreviousPage
            page={page}
            onClick={() => {
              this.handleControlPage(-1);
            }}
            disabled={page === 1}
          >
            Anterior
          </PreviousPage>
          <NextPage
            onClick={() => {
              this.handleControlPage(1);
            }}
          >
            Proxima
          </NextPage>
        </ControlPages>
      </Container>
    );
  }
}
