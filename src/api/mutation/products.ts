import { gql } from "@apollo/client";

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