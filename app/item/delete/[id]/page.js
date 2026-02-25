"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import useAuth from "../../../utils/useAuth"

const DeleteItem = (context) => {
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
    const params = await context.params
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userID: loginUseruserID
        })
      })
      const jsonData = await response.json()
      alert(jsonData.message)
      router.push("/")
      router.refresh()
    } catch {
      alert("アイテム削除失敗")
    }
  }

  if (loginUseruserID === userID) {
    return (
      <div>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          {/* <Image src={image} width={750} height={500} alt="item-image" priority /> */}
          <div className="date">投稿日: {postDate}</div>
          <div className="date">更新日: {editDate}</div>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    )
  } else {
    return <h1>権限がありません</h1>
  }
}

export default DeleteItem