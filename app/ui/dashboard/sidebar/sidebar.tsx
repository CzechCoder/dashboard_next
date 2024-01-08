"use server";

import { MdLogout } from "react-icons/md";
import styles from "./sidebar.module.scss";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { MENU_ITEMS } from "@/app/data/menuItems";
import { auth, signOut } from "@/app/auth";
import { authProvider } from "./authProvider";

const Sidebar = async () => {
  const session = await auth();
  // console.log("Session:");
  // console.log(session);
  // console.log("User: " + user);
  const user = {
    username: "Admin",
    img: "http:/tomasburian.com/dev/web08_dashboard/userimg/01.jpg",
  };
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          priority
          src={user?.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user?.username || "Admin"}</span>
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
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Log out
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
