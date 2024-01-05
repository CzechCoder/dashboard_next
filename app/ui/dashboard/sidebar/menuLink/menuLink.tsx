"use client";
import styles from "./menuLink.module.scss";
import Link from "next/link";
import { MenuLinkType } from "../sidebar";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }: { item: MenuLinkType }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
