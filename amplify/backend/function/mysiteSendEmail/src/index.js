const AWS = require('aws-sdk');

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
  console.log(process.env);
  const {
    email, subject, name, message, i18nMsg,
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

  return new Promise((resolve, reject) => {
    AWS.config.credentials.refresh(() => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          reject(callback(err));
        } else {
          resolve(callback(null, data.MessageId));
        }
      });
    });
  });
};
