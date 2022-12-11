import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  imgSrc: string;
  hasNoBorder?: boolean;
}

export function Avatar({ imgSrc, hasNoBorder, ...props }: Props) {
  return (
    <img
      className={hasNoBorder ? styles.avatarWithoutBorder : styles.avatar}
      src={imgSrc}
      {...props}
    />
  );
}
