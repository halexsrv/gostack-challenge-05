import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilterList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
`;

export const IssueFilter = styled.button.attrs(props => ({
  status: props.status,
}))`
  background: #eee;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-radius: 4px;
  width: 100px;
  :hover {
    background: #ddd;
  }

  ${props =>
    props.status &&
    css`
      background: #333;
      color: #fff;
      :hover {
        background: #444;
      }
    `}
`;

export const ControlPages = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
`;

export const PreviousPage = styled.button.attrs(props => ({
  page: props.page,
}))`
  background: #eee;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-radius: 4px;
  width: 100px;
  :hover {
    background: #ddd;
  }

  ${props =>
    props.page === 1 &&
    css`
      background: #fff;
      color: #444;
      cursor: not-allowed;
      opacity: 0.6;

      :hover {
        background: #eee;
      }
    `}
`;

export const NextPage = styled.button`
  background: #eee;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  border-radius: 4px;
  width: 100px;
  :hover {
    background: #ddd;
  }
`;
