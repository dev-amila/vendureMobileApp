import { gql } from "@apollo/client";

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query GetAllCollections($skip: Int, $take: Int) {
    collections(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        slug
        assets {
          source
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_QUERY = gql`
  query GetProductsByCategory(
    $take: Int
    $skip: Int
    $id: ID!
    $sort: ProductVariantSortParameter
    $priceStart: Float!
    $priceEnd: Float!
  ) {
    collection(id: $id) {
      id
      productVariants(
        options: {
          take: $take
          skip: $skip
          sort: $sort
          filter: {
            priceWithTax: { between: { start: $priceStart, end: $priceEnd } }
          }
        }
      ) {
        items {
          id
          name
          priceWithTax
          product {
            featuredAsset {
              source
            }
            description
            variants {
              stockLevel
              sku
            }
          }
        }
      }
    }
  }
`;

export const GET_SIMILAR_PRODUCTS = gql`
  query GetSimilarProducts($take: Int, $id: ID!) {
    collection(id: $id) {
      id
      productVariants(options: { take: $take }) {
        items {
          id
          name
          priceWithTax
          product {
            featuredAsset {
              source
            }
            description
            variants {
              stockLevel
              sku
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS = gql`
  query GetCollections {
  collections {
    items{
      id
      name
    }
    
    totalItems
  }
}

`;