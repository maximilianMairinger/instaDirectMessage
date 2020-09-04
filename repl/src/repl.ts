import instaDirectMessage from "./../../app/src/instaDirectMessage"
import { sender, recipient } from "./login"

instaDirectMessage(sender, recipient).then((sendRaw) => {
  function send(msg: string, inMin: number = 0) {
    setTimeout(() => {
      console.log("sending", msg)
      sendRaw(msg)
    }, 1000 * 60 * inMin)
  }

  send("Nimm mich an")
  send("Ich bin ein lieber bot", .1)
  send("Sehr lieb", .2)
  send("Wenig spam", .3)
  send(":D", .4)

})


