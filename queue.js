const Redis = require('ioredis');
const redis = new Redis(); // Connect to Redis using default options

// Function to add emails to the queue
async function addToQueue(content) {
  await redis.rpush('emailQueue', JSON.stringify({ content }));
}

// Function to process emails from the queue
async function processQueue() {
  while (true) {
    const emailJson = await redis.lpop('emailQueue'); // Get the first item from the queue
    if (!emailJson) continue; // If queue is empty, continue waiting

    const email = JSON.parse(emailJson);
    console.log(`Processing email: ${email.content}`);
    // Implement your email processing logic here
    await simulateEmailProcessing(email);
  }
}

// Simulate email processing (replace with your actual email processing logic)
async function simulateEmailProcessing(email) {
  // Simulate some async processing time
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Log processed email
  console.log(`Email processed: ${email.content}`);
}

module.exports = {
  addToQueue,
  processQueue
};
