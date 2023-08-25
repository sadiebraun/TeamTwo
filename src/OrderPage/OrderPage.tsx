import React, { useEffect, useState } from "react";

import styles from "./OrderPage.styles";

const COLLECTIONS_QUERY = {
  variables: {
    first: 1
  },
  query: `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const
};

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const SINGLE_COLLECTION_QUERY = (handle: string) => ({
  query: `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }
      }
    }
  }
` as const,
  variables: { handle, first: 10 }
})

/**
 *
 * @param param0
 * @returns
 */
const OrderPage = ({ scopedT: t, shopifyFetch }) => {
  const [week, setWeek] = useState<string>("");
  const [product, setProduct] = useState<string>("");

  useEffect(() => {
    shopifyFetch(COLLECTIONS_QUERY).then(res => setWeek(res.data.collections.nodes[0].handle));
  }, []);

  useEffect(() => {
    if (week !== "") {
      shopifyFetch((SINGLE_COLLECTION_QUERY(week))).then(res => {
        const products = res.data.collection.products.nodes;
        const index = Math.floor(Math.random() * products.length);

        setProduct(products[index].title);
      });
    }
  }, [week]);

  return (
    <div className={styles.wrapper}>
      <div>{t("INTRO")}</div>
      <div>{t("MAYBE_FROM_WEEK", { week })}</div>
      <div>{t("MAYBE_PRODUCT", { product })}</div>
    </div>
  );
};

export default OrderPage;
