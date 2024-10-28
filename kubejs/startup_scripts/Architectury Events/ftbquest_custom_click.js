const $EventActor = Java.loadClass("dev.architectury.event.EventActor")
const $CustomClickEvent = Java.loadClass("dev.ftb.mods.ftblibrary.ui.CustomClickEvent").EVENT
const $EventResult = Java.loadClass("dev.architectury.event.EventResult")
const $UtilsJS = Java.loadClass("dev.latvian.mods.kubejs.util.UtilsJS")
const $TypeInfo = Java.loadClass("dev.latvian.mods.rhino.type.TypeInfo")
const $PatchouliAPI = Java.loadClass("vazkii.patchouli.api.PatchouliAPI").get()

function handleFTBCustomClick(/** @type {Internal.CustomClickEvent>} */ event) {
  switch (event.id().namespace) {
    case "ftbquest":
      event.id().path.startsWith("open_book/") && openTFCGuideBook(new String(event.id().path))
      break
    default:
      break
  }
  return $EventResult.pass()
}

let openTFCGuideBook = (/** @type {string} */ path) => {
    Client.screen = null
    path = path.replace("open_book/", "")

    $PatchouliAPI.openBookEntry("patchouli:atm_things", "patchouli:" + path, 0)
}

StartupEvents.init((e) => {
    if (!Platform.isClientEnvironment()) return
    $CustomClickEvent.register($UtilsJS.makeFunctionProxy($TypeInfo.of($EventActor), handleFTBCustomClick))
})
