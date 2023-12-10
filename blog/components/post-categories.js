import styles from "styles/post-categories.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export default function PostCategories({ categories }) {
  return (
    <div className={styles.flexContainer}>
      <h3 className={styles.heading}>
        <FontAwesomeIcon icon={faFolderOpen} />
        <span className="sr-only">Categories</span>
      </h3>
      <ul className={styles.list}>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Link href={`/blog/category/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
