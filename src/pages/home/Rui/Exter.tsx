import { Markdown } from "~/components"
import { useTitle } from "~/hooks"
import { getSetting } from "~/store"
import { notify } from "~/utils"
import { Body } from "../Body"
import { Footer } from "../Footer"
import { Header } from "../header/Header"
import { Toolbar } from "../toolbar/Toolbar"
import "./exter.css"
const Exter = () => {
  useTitle(getSetting("site_title"))
  const announcement = getSetting("announcement")
  if (announcement) {
    notify.render(() => <Markdown children={announcement} />)
  }
  return (
    <div class="exter">
      <Header />
      <Toolbar />
      <Body />
      <Footer />
    </div>
  )
}

export default Exter
