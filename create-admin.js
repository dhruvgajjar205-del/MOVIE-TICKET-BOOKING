const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movie-booking');

    // Check if admin already exists by email
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user with unique username
    const admin = new User({
      username: 'admin_' + Date.now(), // Make username unique
      email: 'admin@gmail.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
