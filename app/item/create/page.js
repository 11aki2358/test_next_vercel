"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../utils/useAuth"
import Link from "next/link";


function insertAlink() {
  var area = document.getElementById('text_area');
  var text1 = " [[ ";
  var text2 = ' ]] ';

  //カーソルの開始位置と終了位置を基準に分割
  area.value = area.value.substr(0, area.selectionStart) +
    text1 +
    area.value.substr(area.selectionStart, area.selectionEnd - area.selectionStart) +
    text2 +
    area.value.substr(area.selectionEnd);
}

const CreateItem = () => {
  const [title, setTitle] = useState("")
  const [postDate, setpostDate] = useState("") //  バックエンドで記入
  const [editDate, setEditDate] = useState("") //  バックエンドで記入
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const router = useRouter()
  const loginUseruserID = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          postDate: postDate,
          editDate: editDate,
          image: image,
          description: description,
          userID: loginUseruserID
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    } catch {
      alert("アイテム作成失敗")
    }
  }

  if (loginUseruserID) {
    return (

      <div className="main">

        <h2>投稿</h2>

        <div>
          <form onSubmit={handleSubmit}>

            <div className="input_title">
              <h3>タイトル</h3>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
            </div>

            {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required /> */}

            <div className="input_main">
              <h3>本文</h3>

              <div className="insertAlink">
                <div onClick={(e) =>
                  insertAlink()
                }>リンク挿入</div>
              </div>

              <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="" id="text_area" required></textarea>
            </div>

            <button className="post_button">投稿</button>

          </form>
        </div>

        <div className="singleArticle">
          <div className="link_toAll">
            <Link href={`../../`}>一覧に戻る</Link>
          </div>
        </div>

      </div>
    )
  }
}

export default CreateItem