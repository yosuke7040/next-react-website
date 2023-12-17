import { useRef, useState } from "react";
import styles from "styles/accordion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Accordion({ heading, children }) {
  const [textIsOpen, setTextIsOpne] = useState(false);

  const toggleText = () => {
    setTextIsOpne(!textIsOpen);
  };

  const refText = useRef(null);

  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button onClick={toggleText}>
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>
      <div
        className={styles.text}
        ref={refText}
        style={{
          "--text-height": refText.current
            ? `${refText.current.scrollHeight}px`
            : "0px",
        }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  );
}
