import { VStack } from "@hope-ui/solid"
import { Nav } from "./Nav"
import { Obj } from "./Obj"
import { Readme } from "./Readme"
import { Container } from "./Container"

import "./Rui/rui.css"

export const Body = () => {
  return (
    <Container>
      <VStack
        class="body"
        mt="$1"
        py="$2"
        px="2%"
        minH="80vh"
        w="$full"
        gap="$4"
      >
        <Nav />
        <Obj />
        {/* <div class="mark"></div>
        <div class="pool">
          <i
            onClick={() => close(!ishow)}
            class="iconfont icon-close icon-guanbi"
          ></i>
          <Readme />
        </div> */}
      </VStack>
    </Container>
  )
}
