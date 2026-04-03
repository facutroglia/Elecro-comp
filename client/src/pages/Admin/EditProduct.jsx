import { Fragment } from "react";
import { useLoaderData } from "react-router";
import Template from "../../components/Template";
import ProductDataEdit from "../../components/ProductDataEdit";
import ProductGalleryEdit from "../../components/ProductGalleryEdit";
import ProductAttributesEdit from "../../components/ProductAttributesEdit";
import styles from "../../styles/components/EditProduct.module.css";
const EditProduct = () => {
  const { producto } = useLoaderData();
  const { data, gallery, attributes } = producto;
  return (
    <Fragment>
      <Template title={`Editar | ${data.name}`}>
        <div className={styles.EditProductLayout}>
          <aside className={styles.DataForm}>
            <ProductDataEdit {...data} />
          </aside>
          <section className={styles.GaleryForm}>
            <ProductGalleryEdit galery={gallery} productId={data.id} />
          </section>
          <section className={styles.AttributeForm}>
            <ProductAttributesEdit
              attributes={attributes}
              productId={data.id}
            />
          </section>
        </div>
      </Template>
    </Fragment>
  );
};

export default EditProduct;
