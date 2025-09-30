// Линки пути сверху
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className={styles.separator} />}
          {index === items.length - 1 ? (
            <span className={styles.current}>{item.label}</span>
          ) : (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
