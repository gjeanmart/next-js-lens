import {
  ApolloClient,
  InMemoryCache,
  gql,
  DocumentNode,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

const APIURL = 'https://api-mumbai.lens.dev/';

const httpLink = new HttpLink({ uri: APIURL });

const authLink = new ApolloLink((operation, forward) => {
  const state = localStorage.getItem('state');
  const { accessToken } = JSON.parse(state || '{}');

  operation.setContext({
    headers: {
      'x-access-token': accessToken ? `Bearer ${accessToken}` : '',
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const executeQuery = (query: DocumentNode, variables: any) => {
  return apolloClient.query({
    query,
    variables,
  });
};

export const executeMutation = (mutation: DocumentNode, variables: any) => {
  return apolloClient.mutate({
    mutation,
    variables,
  });
};

//////////////////////////////////////////////
/////////// PING
//////////////////////////////////////////////

export const LENS_PING_GQL = gql`
  query {
    ping
  }
`;

//////////////////////////////////////////////
/////////// AUTHENTICATION
//////////////////////////////////////////////

export const LENS_GENERATE_CHALLENGE_GQL = gql`
  query ($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`;

export const LENS_AUTHENTICATION_GQL = gql`
  mutation ($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const LENS_REFRESH_AUTHENTICATION_GQP = gql`
  mutation ($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

export const LENS_VERIFY_JWT_GQL = gql`
  query ($request: VerifyRequest!) {
    verify(request: $request)
  }
`;

//////////////////////////////////////////////
/////////// PROFILE
//////////////////////////////////////////////

export const LENS_CREATE_PROFILE_GQL = gql`
  mutation ($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
`;

export const LENS_GET_PROFILES_GQL = gql`
  query ($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
            type
          }
          ... on RevertFollowModuleSettings {
            type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

export const LENS_CREATE_SET_DEFAULT_PROFILE_TYPED_DATA_GQL = gql`
  mutation ($request: CreateSetDefaultProfileRequest!) {
    createSetDefaultProfileTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetDefaultProfileWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          wallet
          profileId
        }
      }
    }
  }
`;

//////////////////////////////////////////////
/////////// XXXXXX
//////////////////////////////////////////////
