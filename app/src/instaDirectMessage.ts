import { IgApiClient, AccountRepositoryLoginResponseLogged_in_user } from "instagram-private-api";


type SendFunc = (msg: string) => Promise<void>

export default async function(sender: {username: string, password: string}): Promise<(recipient: {username: string}) => Promise<SendFunc>>
export default async function(sender: {username: string, password: string}, recipient: {username: string}): Promise<SendFunc>
export default async function(sender: {username: string, password: string}, recipient?: {username: string}) {
  let ig = new IgApiClient()
  // console.log("init")
  ig.state.generateDevice(sender.username)
  // console.log("generateDevice")
  await ig.simulate.preLoginFlow();
  // console.log("preLoginFlow")
  let loggedInUser: AccountRepositoryLoginResponseLogged_in_user
  try {
    loggedInUser = await ig.account.login(sender.username, sender.password)
  }
  catch(e) {
    console.error("Unable to log in via user \"" + sender.username + "\"")
    throw e
  }

  async function addRecipient (recipient: {username: string}){
    let userId: number
    try {
      userId = await ig.user.getIdByUsername(recipient.username);
    }
    catch(e) {
      console.error("Unable to find recipient with username \"" + recipient.username + "\"")
      throw e
    }
    
    // console.log("myuserid", userId)
    const thread = ig.entity.directThread([userId.toString()]);
    // console.log("thread")

    return async (msg: string) => {
      await thread.broadcastText(msg);
    }
  }  
  
  if (recipient) return await addRecipient(recipient)
  else return addRecipient
}
