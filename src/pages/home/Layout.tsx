import { Markdown } from "~/components"
import { useTitle } from "~/hooks"
import { getSetting, getMainColor } from "~/store"
import { notify, bus } from "~/utils"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Header } from "./header/Header"
import { Toolbar } from "./toolbar/Toolbar"
import { Layout } from "./header/layout"
import { BsSearch } from "solid-icons/bs"
import { HStack, Icon } from "@hope-ui/solid"
import { Readme } from "./Readme"
import "./Rui/rui.css"

const Index = () => {
  useTitle(getSetting("site_title"))
  const announcement = getSetting("announcement")
  if (announcement) {
    notify.render(() => <Markdown children={announcement} />)
  }
  let ishow = false
  function close(falg) {
    if (falg) {
      document.getElementsByClassName("pool")[0].setAttribute("hidden", falg)
      document.getElementsByClassName("mark")[0].setAttribute("hidden", falg)
    } else {
      document.getElementsByClassName("pool")[0].removeAttribute("hidden")
      document.getElementsByClassName("mark")[0].removeAttribute("hidden")
    }
    ishow = falg
  }

  return (
    <>
      <Layout />
      <div class="box-icon">
        <i
          onClick={() => close(!ishow)}
          class="iconfont i-icon icon-yonghuxieyi"
        ></i>
      </div>
      <HStack
        class="serch"
        _hover={{
          bgColor: getMainColor(),
          color: "white",
        }}
        _focus={{
          outline: "none",
        }}
      >
        <Icon
          onClick={() => {
            bus.emit("tool", "search")
          }}
          as={BsSearch}
        />
      </HStack>
      <div class="mark"></div>
      <div class="pool">
        <i
          onClick={() => close(!ishow)}
          class="iconfont icon-close icon-guanbi"
        ></i>
        <Readme />
      </div>
      <div class="exter">
        <Header />
        <Toolbar />
        <Body />
        <Footer />
      </div>
    </>
  )
}

export default Index
