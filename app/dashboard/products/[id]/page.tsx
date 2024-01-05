import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/dataTransfer";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.scss";
import Image from "next/image";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="_id" value={id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Price</label>
          <input type="number" name="price" placeholder="john@gmail.com" />
          <label>Stock</label>
          <input type="number" name="stock" />
          <label>Color</label>
          <input type="text" name="color" placeholder="786852456" />
          <label>Size</label>
          <textarea name="size" placeholder="New York" />
          <label>Category</label>
          <select name="cat" id="cat">
            <option value="kitchen">Kitchen</option>
            <option value="computers">Computers</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={10}
            placeholder="description"
          ></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
export default SingleProductPage;
