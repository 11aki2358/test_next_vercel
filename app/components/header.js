// import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header>

      {/* <div class="logo-area"> */}
      <h1>
        <Link href="/">Tick-Tack Peacock</Link>
      </h1>
      {/* </div> */}

      <nav>
        <ul>
          {/* <li><Link href="/user/register">登録</Link></li> */}
          {/* <li><Link href="/user/login">ログイン</Link></li> */}
          <li><Link href="/item/create">投稿</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header