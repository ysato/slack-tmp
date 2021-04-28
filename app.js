const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const { App, ExpressReceiver } = require('@slack/bolt');
const serverlessExpress = require('@vendia/serverless-express')

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true
});

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
});

app.command('/tmp', async ({ command, ack, client, respond }) => {
  await ack();

  const now = dayjs().tz('Asia/Tokyo');

  let result;
  try {
    result = await client.conversations.create({
        name: `tmp-${now.format('YYMMDDHHmmssSSS')}`
    });

  } catch (error) {
    console.log(error);

    throw new Error('Failed creating conversations.');
  }

  try {
    await client.conversations.invite({
      channel: result.channel.id,
      users: command.user_id
    });
  } catch (error) {
    console.log(error);

    throw new Error('Failed inviting user.');
  }

  await respond(`<#${result.channel.id}>`);
});

module.exports.handler = serverlessExpress({
    app: expressReceiver.app
});