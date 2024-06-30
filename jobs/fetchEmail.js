const { Queue, Worker } = require('bullmq');
const { UserModel } = require('../models/user');
const { fetchGmailEmails, fetchOutlookEmails } = require('../services/emailService');

const emailQueue = new Queue('emailQueue', { connection });

const fetchEmailsWorker = new Worker('fetchEmails', async job => {
  const users = await UserModel.find();
  for (const user of users) {
    await fetchGmailEmails(user);
    await fetchOutlookEmails(user);
    user.emails.gmail.forEach(email => emailQueue.add('processEmails', { email, userId: user.id, accountType: 'gmail' }));
    user.emails.outlook.forEach(email => emailQueue.add('processEmails', { email, userId: user.id, accountType: 'outlook' }));
  }
});

setInterval(async () => {
  await emailQueue.add('fetchEmails', {});
}, 60000);
