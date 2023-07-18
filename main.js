//using MongoClient
const { MongoClient } = require('mongodb');

// url and database connection
const url = 'mongodb://localhost:27017';
const dbName = 'internshipDB';

// validation functions
function validateName(name) {
  // Checking  if the name contains only alphabetic characters
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name);
}

function validateEmail(email) {
  // Using regular expression to validate the email format
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
  return emailRegex.test(email);
}

// Main logic
async function applyForInternship() {
  console.log("Hi! Are you here to apply for the Internship?");
  const choice = prompt("Please enter 'YES' or 'NO':");
  if (choice.toUpperCase() === "NO") {
    console.log("Thank you for considering us. If you change your mind, feel free to come back!");
    return;
  }

  let name, email;
  while (true) {
    name = prompt("Please enter your name:");
    if (!validateName(name)) {
      console.log("Invalid name. Please enter a valid name.");
    } else {
      break;
    }
  }

  while (true) {
    email = prompt("Please enter your email ID:");
    if (!validateEmail(email)) {
      console.log("Invalid email. Please enter a valid email address.");
    } else {
      break;
    }
  }

  console.log("Please select the number of years of experience you have with Python/JS/Automation Development:");
  console.log("1. 1 year");
  console.log("2. 2 years");
  console.log("3. 3 years");
  console.log("4. 4 years");
  console.log("5. 5 years");

  let experience;
  while (true) {
    experience = parseInt(prompt("Enter your selection:"));
    if (isNaN(experience) || experience < 1 || experience > 5) {
      console.log("Invalid selection. Please enter a valid number between 1 and 5.");
    } else {
      break;
    }
  }

  // Creating Unique id for each session
  const uniqueId = Math.random().toString(36).substr(2, 9);

  // Save data to the MongoDB database
  const client = new MongoClient(url);
  try {
    await client.connect();
    const db = client.db(dbName);

    // Saving Whatsapp Number
    const sessionData = {
      uniqueId: uniqueId,
      name: name,
      email: email,
      experience: experience
    };
    await db.collection('sessions').insertOne(sessionData);

    console.log("Thanks for connecting. We will get back to you shortly.");
  } catch (error) {
    console.error("An error occurred while saving data to the database:", error);
  } finally {
    // Closing database connection
    await client.close();
  }
}

// Run application
applyForInternship();
