import { useState, useEffect, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import BrandRemove from "./BrandRemove";
import BrandEdit from "./BrandEdit";
import styles from "../styles/components/BrandCard.module.css";
const BrandCard = ({ brand }) => {
  const [edit, setEdit] = useState(false);
  return (
    <li className={styles.LiCards}>
      {!edit && (
        <Fragment>
          {brand?.logo && (
            <picture className={styles.ImgBrand}>
              <img
                src={`/assets/${brand?.logo?.url}`}
                alt={`${brand.name} icon`}
              />
            </picture>
          )}
          <dl className={styles.InfoBrand}>
            <dt>{brand.name}</dt>
            <dd>Productos: {brand?._count?.products || 0}</dd>
          </dl>
          <button className={styles.BtnEditSave} onClick={() => setEdit(true)}>
            Editar
          </button>
          <BrandRemove brand={brand} />
        </Fragment>
      )}
      {edit && <BrandEdit brand={brand} update={setEdit} />}
    </li>
  );
};

export default BrandCard;
