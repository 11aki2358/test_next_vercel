import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {
  const [loginUseruserID, setLoginUseruserID] = useState("")

  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        router.push("/user/login")
      }

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        setLoginUseruserID(decodedJwt.payload.userID)
      } catch {
        router.push("/user/login")
      }
    }
    checkToken()
  }, [router])

  return loginUseruserID
}

export default useAuth