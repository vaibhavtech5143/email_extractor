const { Queue, Worker } = require('bullmq');
const { UserModel } = require('../models/user');
const { analyzeEmailContent, generateReply } = require('../services/openAIService');
const { sendEmail } = require('../services/emailService');

const emailQueue = new Queue('emailQueue', { connection });

const processEmailsWorker = new Worker('processEmails', async job => {
  const { email, userId, accountType } = job.data;
  const user = await UserModel.findById(userId);

  if (!user) throw new Error('User not found');

  const labels = await analyzeEmailContent(email.content);
  email.labels = labels;

  let reply;
  if (labels.includes('Interested')) {
    reply = await generateReply(email.content, labels);
  } else if (labels.includes('More Information')) {
    reply = 'Would you like to hop on a demo call? Please suggest a time that works for you.';
  } else {
    reply = 'Thank you for your email. We will get back to you shortly.';
  }

  if (accountType === 'gmail') {
    await sendEmail(email.content, 'Re: ' + email.subject, reply, user.google);
  } else if (accountType === 'outlook') {
    await sendEmail(email.content, 'Re: ' + email.subject, reply, user.outlook);
  }

  await user.save();
});

emailQueue.on('completed', job => {
  console.log(`Job ${job.id} completed!`);
});
