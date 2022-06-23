import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';
import LoginBtn from './LoginBtn';
import githubIcon from '../public/images/github.svg'
import linkedinIcon from '../public/images/linkedin.png'


export default function Footer() {
  const { data: session } = useSession()

  return (
    <div className={styles.footer}>

      <ul className={styles.socials}>
        <li>
          <a href={'https://github.com/TalRozenblat'}>

            <Image src={githubIcon} width={40} height={40} alt="" />

          </a>
        </li>
        <li>
          <a href={'https://www.linkedin.com/in/tal-rozenblat-a389ab207/'}>

            <Image src={linkedinIcon} width={40} height={40} alt="" />

          </a>
        </li>

      </ul>
      <ul className={styles.links}>

        <li>
          <Link href="/"> Home</Link>
        </li>
        <li>
          <Link href="/about"> About</Link>
        </li>
        <li>
          <Link href="/packages"> Packages</Link>
        </li>
        <li>
          <Link href="/expenses"> Expenses</Link>
        </li>

        {/* <LoginBtn /> */}



      </ul>
      <p>@2022 Tal Rozenblat</p>
    </div>
  )
}