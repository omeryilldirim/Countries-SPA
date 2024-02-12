import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      name
      code
      currency
      emoji
      emojiU
      native
      phone
      continent {
        name
        code
      }
      states {
        name
      }
      languages {
        name
        native
        rtl
      }
    }
  }
`;

export { GET_COUNTRIES };