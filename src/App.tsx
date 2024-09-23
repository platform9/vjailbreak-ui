import { styled } from "@mui/material"
import { useEffect } from "react"
import ApiClient from "./api/ApiClient"
import "./App.css"
import "./assets/reset.css"
import Onboarding from "./pages/onboarding/Onboarding"

const AppFrame = styled("div")(({ theme }) => ({
  margin: "0 auto",
  width: "100%",
  height: "100%",
  [theme.breakpoints.up("lg")]: {
    maxWidth: "1600px",
  },
}))

const apiClient = ApiClient.getInstance()

function App() {
  useEffect(() => {
    // Todo: Fetch token from API
    apiClient.setToken(
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNYQ25nd1NFS0JWQl9DbWxvalo0eCJ9.eyJncm91cCI6ImNsb3Vkc3BhY2UtYWRtaW4iLCJnaXZlbl9uYW1lIjoiVGFuYXkiLCJmYW1pbHlfbmFtZSI6IlBhdGFua2FyIiwibmlja25hbWUiOiJ0YW5heSIsIm5hbWUiOiJUYW5heSBQYXRhbmthciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKZWJkSUozRkJRNXBSNWdSWHp3bUhFRUhZM19iV0FEOU1qQVFIWURhSERRS0lTNXc9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOS0yM1QxODowMDoxNC41NzVaIiwiZW1haWwiOiJ0YW5heUBwbGF0Zm9ybTkuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vbG9naW4uc3BvdC5yYWNrc3BhY2UuY29tLyIsImF1ZCI6Im13RzNsVU1WOEt5ZU1xSGU0Zko1QmIzbk0xdkJ2Uk5hIiwiaWF0IjoxNzI3MTE0NDIyLCJleHAiOjE3MjczNzM2MjIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTAzNjQxMzUxMDc5MzI4MTY0MjU1Iiwic2lkIjoiOWx2MlpqeGhUdDgyekk5ZEVDVFEwN1JSeHVVc2FUNVIiLCJub25jZSI6IlJHdHVNM0ZwWW5SNWMzQndmbVJyVVc5VFptVnNOaTV4Zm1kWk1rTkRORFIrTTNWU1JGUm9Nall4WkE9PSIsIm9yZ19pZCI6Im9yZ19ENmNsWFQzTGltNDJvUHd1In0.L-l3SnZmYEhGh8fFwdXDpuuuulrRHt62PejXNN_nKz93yQpOwdwYGR59KwFlDBg6Hb6hGlIpya1vF0gSTXQxlSvnmWRK5K4HIOCC4HhYHYwMJKC_WLMmjbL3uUgunW_T5VNwXKs3FAvdToH6VKpmUTPHxnAwmsYLDmjseAnrBQ4m-6LBUMrppQdc12uhQu4hbNOnISA0JyGbuvC22vyIOdUdt4SjiUZKhktMhdWj7VDjIne2PgfNmExjThwJdvVMDgQumNiiF1bmXRMMl8wOshCwNRq39FNbYjoZvRabQ0bjKG20Mvr8PSC7SMSp49Y3r6SMS2la98mo1IVIuSgrWQ"
    )
  }, [])
  return (
    <AppFrame>
      <Onboarding />
    </AppFrame>
  )
}

export default App
