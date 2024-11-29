import { useEffect, useRef } from "react";
import style from "../styles/introduce.module.scss";

interface ProductDescribeProps {
  content: string;
}

const { headerContainer, bodyContainer, describe } = style;

const ProductDescribe = (props: ProductDescribeProps) => {
  const { content } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.value = content;

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  return (
    <>
      <div className={headerContainer}>
        <ul className="nav nav-underline">
          <li className="nav-item  active nav-link nav-underline">Giới thiệu</li>
        </ul>
      </div>
      <div className={bodyContainer}>
        <textarea ref={textareaRef} value={content} className={describe} cols={60} rows={1} disabled></textarea>
      </div>
    </>
  );
};

export default ProductDescribe;
