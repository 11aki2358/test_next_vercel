"use client"
import { useState } from "react"

const Login = () => {
  const [userID, setuserID] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: userID,
          password: password
        })
      })
      const jsonData = await response.json()
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)
    } catch {
      alert("ログイン失敗")
    }
  }

  return (
    <div className="main">

      <h2>ログイン</h2>
      
      <form onSubmit={handleSubmit}>
      
        <input value={userID} onChange={(e) => setuserID(e.target.value)} type="text" name="userID" placeholder="ユーザーID" required />
      
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード" required />
      
        <button className="post_button">ログイン</button>
      </form>
    </div>
  )
}

export default Login