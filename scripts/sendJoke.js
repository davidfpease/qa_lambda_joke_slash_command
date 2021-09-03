const { getAPIKey } = require("../util/secrets_manager");

const axios = require("axios");

const sendJoke = async (body, joke, userId)=> {

  const apiKey = await getAPIKey();

  //const apiKey = 'AQiC8zlskza.....sI2o7vTI9Xq';
  let convoId = body.data.conversationId;

  let convoType = body.data.type;

  let url = `https://driftapiqa.com/conversations/${convoId}/messages`; // QA API endpoint
  //let url = `https://driftapi.com/conversations/${convoId}/messages`; // Use this for your demo org (ie. not a QA custom app)

  const headers = { 
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
  }

  const payload = JSON.stringify({
    "type": "chat",
    "body": joke,
    "userId": userId
  })

  return axios
    .post(url, payload, {headers: headers})
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log("Error sending joke to Drift.");
      console.log(err);
      return err
    })
}

module.exports = {
  sendJoke
}
