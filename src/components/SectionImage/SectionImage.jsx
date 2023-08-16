import styles from "./style.module.css";

/**
 * Kenapa nggak pake `background-image: url('image.png')` aja?
 *
 * Karena ini https://nystudio107.com/blog/the-css-background-image-property-as-an-anti-pattern
 *
 * TL;DR
 *
 * `background-image` css cuma dipake kalo benar-benar hanya untuk background
 *
 * sedangkan kalau hanya background `<section>` tertentu saja tidak perlu
 * @constructor
 * @param {string} src - source gambar
 * @param {string} alt - text alternative gambar
 * @param {string} objectPosition - posisi gambar
 */

export const SectionImage = ({
  children,
  src,
  alt,
  objectPosition,
  className,
}) => {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <img src={src} alt={alt} style={{ objectPosition }} />
      {children}
    </section>
  );
};