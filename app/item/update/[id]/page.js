"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../utils/useAuth"
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

const UpdateItem = (context) => {
  const [title, setTitle] = useState("")
  const [postDate, setpostDate] = useState("") //  バックエンドで記入
  const [editDate, setEditDate] = useState("") //  バックエンドで記入
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [userID, setuserID] = useState("")

  const router = useRouter()
  const loginUseruserID = useAuth()

  useEffect(() => {
    const getSingleItem = async () => {
      const params = await context.params
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${params.id}`, { cache: "no-store" })
      const jsonData = await response.json()
      const singleItem = jsonData.singleItem
      setTitle(singleItem.title)
      setpostDate(singleItem.postDate)
      setEditDate(singleItem.editDate)
      setImage(singleItem.image)
      setDescription(singleItem.description)
      setuserID(singleItem.userID)
    }
    getSingleItem()
  }, [context])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = await context.params;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`, {
        method: "PUT",
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
      alert("アイテム編集失敗")
    }
  }

  if (loginUseruserID === userID) {
    return (
      <div className="main">
        <h2>編集</h2>

        <div>
          <form onSubmit={handleSubmit}>

            <div className="input_title">
              <h3>タイトル</h3>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
            </div>

            {/* <input value={postDate} onChange={(e) => setpostDate(e.target.value)} type="text" name="postDate" placeholder="投稿日" required /> */}
            {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required /> */}

            <div className="input_main">
              <h3>本文</h3>

              <div className="insertAlink">
                <div onClick={(e) =>
                  insertAlink()
                }>リンク挿入</div>
              </div>


              <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="" id="text_area"  required></textarea>
            </div>

            <button className="post_button">編集</button>
          </form>
        </div>

        <div className="singleArticle">
          <div className="link_toAll">
            <Link href={`../../`}>一覧に戻る</Link>
          </div>
        </div>

      </div>
    )
  } else {
    return <h1>権限がありません</h1>
  }
}

export default UpdateItem