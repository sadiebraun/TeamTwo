import React from "react";

import styles from "./OrderPage.styles";

/**
 *
 * @param param0
 * @returns
 */
const OrderPage = ({ scopedT: t }) => {
  return (
    <div className={styles.wrapper}>
      <div>{t("INTRO")}</div>
    </div>
  );
};

export default OrderPage;
