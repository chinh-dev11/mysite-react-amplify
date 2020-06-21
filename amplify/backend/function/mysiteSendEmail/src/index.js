/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const axios = require('axios');

const generateHTML = (name, message, i18nMsg) => (`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${i18nMsg.title}</title>
    </head>
    <body>
      <h1>${i18nMsg.headingLabel}: ${name}</h1>
      <p>${i18nMsg.textLabel}: ${message}</p>
    </body>
  </html>
`
);

const emailParams = ({
  name, email, subject, message, i18nMsg, sender,
}) => ({
  Destination: { // required
    BccAddresses: [],
    CcAddresses: [],
    ToAddresses: [
      sender,
    ],
  },
  Message: { // required
    Body: { // required
      Html: {
        Charset: 'UTF-8',
        Data: generateHTML(name, message, i18nMsg),
      },
      // Text: {
      //   Charset: 'UTF-8',
      //   Data: 'TEXT_FORMAT_BODY',
      // },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: subject,
    },
  },
  Source: sender, // required: verified address only
  ReplyToAddresses: [
    email,
  ],
  ReturnPath: sender,
});

exports.handler = async (event, context, callback) => {
  const {
    email, subject, name, message, i18nMsg, token, reCaptchaSecretKey,
  } = { ...event.arguments };
  const ses = new AWS.SES({
    // SES sending limit increased (out of sandbox) approved only for Canada central region. see Case ID 7043092001 in support center
    region: process.env.EMAILING_REGION,
    // aws_sdk_load_config: '1',
    apiVersion: process.env.SES_API_VERSION, // 2010-12-01
  });
  const params = emailParams({
    // message can be sent to multiple addresses. see Case ID 7043092001 in support center
    /* email: [
      'anon.ysumo@hotmail.com',
      'anon.isumo@hotmail.com',
      'anonysumo@hotmail.com',
    ], */
    email,
    subject,
    name,
    message,
    i18nMsg,
    sender: process.env.SENDER_EMAIL, // verified address only
  });
  // console.log('params: ', params);
  console.log(`reCaptchaSecretKey: ${reCaptchaSecretKey}`);
  const siteverifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${reCaptchaSecretKey || process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  console.log(`siteverifyUrl: ${siteverifyUrl}`);
  return new Promise((resolve, reject) => {
    axios.get(siteverifyUrl)
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        /* {
          success: true,
          challenge_ts: '2020-06-20T21:21:46Z',
          hostname: 'localhost',
          score: 0.9
        } */
        /* { success: false, 'error-codes': [ 'missing-input-response' ] } */
        // score: 0.5 - recommended threshold by Google
        if (res.status === 200 && res.data.success && res.data.score > 0.5) {
          AWS.config.credentials.refresh(() => {
            ses.sendEmail(params, (err) => {
              if (err) {
                console.log(`ses - ${err}`);
                reject(callback(err));
              }

              resolve(callback(null));
            });
          });
        }

        reject(callback(res.data['error-codes']));
      })
      .catch((err) => {
        console.log(`siteverify - ${err}`);
        reject(callback(err));
      });
  });
};
