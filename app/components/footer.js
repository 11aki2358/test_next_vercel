import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link href="https://ryko-ryko.vercel.app/index.html" target="_blank">Ryko: Ryko(メイン)</Link>
        </li>
        <li>
          <Link href="/user/login">ログイン</Link>
        </li>
        <li>
          <Link href="/item/readsingle/69a392adbc86fac0248aa494">参考</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer