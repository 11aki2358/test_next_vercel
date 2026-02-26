import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link href="https://ryko-ryko.vercel.app/index.html" target="_blank">Ryko: Ryko(メインのサイト)</Link>
        </li>
        <li>
          <Link href="/user/login">ログイン</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer