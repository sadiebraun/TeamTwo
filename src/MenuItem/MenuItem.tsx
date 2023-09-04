import React from "react";

import styles from "./MenuItem.styles";

interface Product {

}

interface MenuItemCardProps {
  product: Product;
  t: (key: string, config?: Record<string, unknown>) => string;
}

const MenuItem = (props: MenuItemCardProps) => {
  const { product, t } = props;

// console.log(product)
  return (
    <li className={styles.li}>
      <a href="#" className={styles.link}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.inner}>
              <div className={styles.innerMedia}>
                <img src={product.featuredImage.url} />
              </div>
            </div>
            <div className={styles.content}>
              <div>{product.title}</div>
              <div>${product.priceRange.minVariantPrice.amount}</div>
              <button className={styles.addToCartButton}>
                {t("ADD_TO_CART_CTA")}
              </button>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};

export default MenuItem;
