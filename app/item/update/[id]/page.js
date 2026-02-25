"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
  const [title, setTitle] = useState("")
  const [postDate, setpostDate] = useState("")
  const [editDate, setEditDate] = useState("")
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
      <div>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required />
          {/* <input value={postDate} onChange={(e) => setpostDate(e.target.value)} type="text" name="postDate" placeholder="投稿日" required /> */}
          {/* <input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required /> */}
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" rows={15} placeholder="商品説明" required></textarea>
          <button>編集</button>
        </form>
      </div>
    )
  } else {
    return <h1>権限がありません</h1>
  }
}

export default UpdateItem