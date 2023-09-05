import {
  Box,
  createDisclosure,
  useColorModeValue,
  VStack,
} from "@hope-ui/solid"
import { createMemo, Show } from "solid-js"
import { RightIcon } from "./Icon"
import { CgMoreO } from "solid-icons/cg"
import { TbCheckbox } from "solid-icons/tb"
import { objStore, State, toggleCheckbox, userCan, getMainColor } from "~/store"
import { bus } from "~/utils"
import { operations } from "./operations"
import { IoMagnetOutline } from "solid-icons/io"
import { AiOutlineCloudUpload, AiOutlineSetting } from "solid-icons/ai"
import { RiSystemRefreshLine } from "solid-icons/ri"
import { usePath } from "~/hooks"
import { Motion } from "@motionone/solid"

import { SwitchColorMode } from "~/components"
import "../Rui/rui.css"

export const Right = () => {
  const { isOpen, onToggle } = createDisclosure({
    defaultIsOpen: localStorage.getItem("more-open") === "true",
    onClose: () => localStorage.setItem("more-open", "false"),
    onOpen: () => localStorage.setItem("more-open", "true"),
  })
  const margin = createMemo(() => (isOpen() ? "$4" : "$5"))
  const isFolder = createMemo(() => objStore.state === State.Folder)
  const { refresh } = usePath()
  return (
    <Box
      class="left-toolbar-box right-icon"
      pos="fixed"
      right={margin()}
      bottom={margin()}
    >
      <Show
        when={true}
        fallback={
          <RightIcon
            class="toolbar-toggle"
            as={CgMoreO}
            onClick={() => {
              onToggle()
            }}
          />
        }
      >
        <VStack
          class="left-toolbar"
          p="$1"
          rounded="$lg"
          spacing="$1"
          bgColor="$neutral1"
          as={Motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          // transition={{ duration: 0.2 }}
          style="background-color: rgba(255, 255, 255,0)"
        >
          <VStack spacing="$1" class="left-toolbar-in">
            <Show when={isFolder() && (userCan("write") || objStore.write)}>
              <RightIcon
                as={RiSystemRefreshLine}
                // tips="refresh"
                onClick={() => {
                  refresh(undefined, true)
                }}
              />
              <RightIcon
                as={operations.new_file.icon}
                // tips="new_file"
                onClick={() => {
                  bus.emit("tool", "new_file")
                }}
              />
              <RightIcon
                as={operations.mkdir.icon}
                p="$1_5"
                // tips="mkdir"
                onClick={() => {
                  bus.emit("tool", "mkdir")
                }}
              />
              <RightIcon
                as={operations.recursive_move.icon}
                // tips="recursive_move"
                onClick={() => {
                  bus.emit("tool", "recursiveMove")
                }}
              />
              <RightIcon
                as={operations.remove_empty_directory.icon}
                // tips="remove_empty_directory"
                onClick={() => {
                  bus.emit("tool", "removeEmptyDirectory")
                }}
              />
              <RightIcon
                as={operations.batch_rename.icon}
                // tips="batch_rename"
                onClick={() => {
                  bus.emit("tool", "batchRename")
                }}
              />
              <RightIcon
                as={AiOutlineCloudUpload}
                // tips="upload"
                onClick={() => {
                  bus.emit("tool", "upload")
                }}
              />
            </Show>
            <Show when={isFolder() && userCan("offline_download")}>
              <RightIcon
                as={IoMagnetOutline}
                pl="0"
                // tips="offline_download"
                onClick={() => {
                  bus.emit("tool", "offline_download")
                }}
              />
            </Show>
            <RightIcon
              // tips="toggle_checkbox"
              as={TbCheckbox}
              onClick={toggleCheckbox}
            />
            {/* <RightIcon
              as={AiOutlineSetting}
              // tips="local_settings"
              onClick={() => {
                bus.emit("tool", "local_settings")
              }}
            /> */}
            <div class="mode-switch">
              <SwitchColorMode />
            </div>
          </VStack>
        </VStack>
      </Show>
    </Box>
  )
}
