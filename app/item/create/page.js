"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {
  const [title, setTitle] = useState("")
  const [postDate, setpostDate] = useState("") //  バックエンドで記入
  const [editDate, setEditDate] = useState("") //  バックエンドで記入
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const router = useRouter()
  const loginUseruserID = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      <div>
        <h1 className="page-title">アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="タイトル" required />
          
          {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required /> */}
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="記事" required></textarea>
          <button>作成</button>
        </form>
      </div>
    )
  }
}

export default CreateItem