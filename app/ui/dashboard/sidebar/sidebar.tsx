import { MdLogout } from "react-icons/md";
import styles from "./sidebar.module.scss";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { MENU_ITEMS } from "@/app/data/menuItems";
import { auth, signOut } from "@/app/auth";

const Sidebar = () => {
  const session = auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          priority
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>
            {session?.user?.name || "John Doe"}
          </span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {MENU_ITEMS.map((category) => (
          <li key={category.title}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
