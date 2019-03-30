import styled from 'styled-components';

export const Container = styled.div`
  padding: 1em;
  color: #485364;

  .content {
    width: 80%;
    margin: auto;
    margin-top: 2em;

    .share-profile-link {
      color: ${props => props.theme.colors.linkColor};
      text-align: right;
      display: block;
      cursor: pointer;
    }

    a {
      text-decoration: underline;
    }

    .profile-info {
      h1 {
        font-size: 20px;
      }
      p {
        color: rgb(119, 119, 119);
        margin: 1em 0px;
      }
    }
  }
  .profile-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em 0;

    .link {
      display: inline-block;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 2px #ccc;
      transition: all 0.5s ease;
      position: relative;
      font-size: 14px;
      color: #474747;
      margin: 7px;
      text-align: left;
      padding: 1em 10em;

      a {
      }
    }
  }

  table.recitations {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0 3em 0;

    a {
      margin: 0 5px;
    }
  }

  table.recitations td,
  #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  table.recitations tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  table.recitations tr:hover {
    background-color: #ddd;
  }

  table.recitations th {
    padding: 12px;
    text-align: left;
    background-color: #5fc49e;
    color: white;
  }

  .rotate {
    transform: rotate(-90deg);
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;

    .content {
      width: 100%;
      margin-bottom: 3em;

      .profile-link {
        .link {
          padding: 1em 3em;
        }
      }
    }
  }
`;

export const Boxed = styled.div`
  border: 1px solid ${props => props.theme.colors.gray};
  padding: 1em;
  margin: 1em auto;
  border-radius: 0.5em;

  img {
    float: right;
    cursor: pointer;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
`;
