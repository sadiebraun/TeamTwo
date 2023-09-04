import React, { useEffect, useMemo, useState } from "react";
import MenuItem from "../MenuItem";

import styles from "./MenuPage.styles";

interface Product {

}

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
    tags
    title
    description
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
});

/**
 *
 * @param param0
 * @returns
 */
const MenuPage = (SDK) => {
  const [week, setWeek] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const { scopedT: t, shopifyFetch, components } = SDK;
  const { Loader } = components;

  useEffect(() => {
    shopifyFetch(COLLECTIONS_QUERY).then(res => setWeek(res.data.collections.nodes[0].handle));
  }, []);

  useEffect(() => {
    if (week !== "") {
      shopifyFetch((SINGLE_COLLECTION_QUERY(week))).then(res => {
        console.log(res.data)
        setProducts(res.data.collection.products.nodes);
      });
    }
  }, [week]);


  const deliveryDate = useMemo(() => {
    const [y, w] = week.split("-w");
    const date = new Date(y, 0, (1 + (parseInt(w) - 1) * 7));
    date.setDate(date.getDate() + 21 + 2); // + 3 weeks + 2 for tuesday

    return date;
  }, [week]);

  return Number.isNaN(deliveryDate.valueOf()) ? <Loader /> : (
    <div className={styles.wrapper}>
      <h2 className={styles.deliveryDateHeader}>
        {t("DELIVERY_DATE", { date: deliveryDate.toDateString()})}
      </h2>
      <ul className={styles.menuGrid}>
        {products.map((p, i) => <MenuItem key={i} product={p} t={t} />)}
      </ul>
    </div>
  );
};

export default MenuPage;
