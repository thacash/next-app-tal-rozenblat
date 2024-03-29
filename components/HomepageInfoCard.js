import Image from "next/image";
import styles from "../styles/HomepageInfoCard.module.css";
import arrow from "../public/images/arrow.png";
import { Router } from "next/router";
import Link from "next/link";

export default function HomepageHeaderCard(props) {
  return (
    <div className={styles.card}>
      <p className={styles.h1}>
        {props.title
          ? props.title
          : "Managing expenses, at the touch of a button"}
      </p>
      <p className={styles.p}>
        {props.body
          ? props.body
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempor gravida tempus. Nullam suscipit laoreet risus, non euismod elit laoreet eu."}
      </p>
      <div className={styles.links}>
        <Link href={props.route}>
          <button className={styles.btn}>
            <Image src={arrow} width={40} height={40} alt="" />
          </button>
        </Link>
      </div>
    </div>
  );
}
