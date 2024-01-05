"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.scss";

const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page: string = searchParams.get("page") || "1";

  const params = new URLSearchParams(searchParams);
  const item_per_page = 2;

  const hasPrev = item_per_page * (parseInt(page) - 1) > 0;
  const hasNext = item_per_page * (parseInt(page) - 1) + item_per_page < count;

  const handleChangePage = (type: string) => {
    const pageAsNumber = parseInt(page);
    type === "prev"
      ? params.set("page", (pageAsNumber - 1).toString())
      : params.set("page", (pageAsNumber + 1).toString());
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
