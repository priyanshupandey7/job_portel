import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Company from './models/Company.js';
import Job from './models/Job.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Job.deleteMany();
    await Company.deleteMany();
    await User.deleteMany({ email: { $in: ['vikram@tcs-mock.in', 'priya@flipkart-mock.in', 'elon@tesla-mock.com'] } });
    
    // 1. Create Employers
    console.log('Creating employers...');
    const employer1 = await User.create({
      fullName: 'Vikram Singh',
      email: 'vikram@tcs-mock.in',
      password: 'password123',
      role: 'employer',
    });

    const employer2 = await User.create({
      fullName: 'Priya Patel',
      email: 'priya@flipkart-mock.in',
      password: 'password123',
      role: 'employer',
    });

    const employer3 = await User.create({
      fullName: 'Elon Musk',
      email: 'elon@tesla-mock.com',
      password: 'password123',
      role: 'employer',
    });

    // 2. Create Companies
    console.log('Creating companies...');
    const company1 = await Company.create({
      companyName: 'Tata Consultancy Services',
      employer: employer1._id,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
      website: 'https://www.tcs.com',
      industry: 'Information Technology',
      description: 'A global leader in IT services, consulting, and business solutions.',
      address: 'TCS Banyan Park, Mumbai, Maharashtra, India',
    });

    const company2 = await Company.create({
      companyName: 'Flipkart',
      employer: employer2._id,
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg',
      website: 'https://www.flipkart.com',
      industry: 'E-commerce',
      description: 'India’s leading e-commerce marketplace offering over 30 million products.',
      address: 'Outer Ring Road, Bengaluru, Karnataka, India',
    });

    const company3 = await Company.create({
      companyName: 'Tesla',
      employer: employer3._id,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
      website: 'https://www.tesla.com',
      industry: 'Automotive & Energy',
      description: 'Accelerating the world\'s transition to sustainable energy.',
      address: 'Austin, Texas, USA',
    });

    // 3. Create Jobs
    console.log('Creating jobs...');
    await Job.insertMany([
      {
        title: 'Senior React Developer',
        company: company1._id,
        location: 'Mumbai, Maharashtra (Hybrid)',
        jobType: 'Full-Time',
        category: 'Engineering',
        salary: '₹18,00,000 - ₹24,00,000',
        experienceLevel: '5+ Years',
        skillsRequired: ['React', 'Node.js', 'Redux', 'TypeScript'],
        description: 'We are looking for an experienced React Developer to lead our frontend team in building scalable enterprise applications. You will be responsible for architecture, code reviews, and mentoring junior developers.',
        responsibilities: '- Architect and build complex UI systems\n- Collaborate with product and design teams\n- Optimize performance of React applications',
        vacancy: 2,
        postedBy: employer1._id,
        status: 'Active',
      },
      {
        title: 'Cloud DevOps Engineer',
        company: company1._id,
        location: 'Pune, Maharashtra',
        jobType: 'Full-Time',
        category: 'Engineering',
        salary: '₹15,00,000 - ₹22,00,000',
        experienceLevel: '3-5 Years',
        skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        description: 'Join our infrastructure team to design, build, and maintain our cloud-native platforms. You will work heavily with AWS, Kubernetes, and Terraform.',
        responsibilities: '- Manage AWS infrastructure via Terraform\n- Maintain CI/CD pipelines\n- Monitor system health and respond to incidents',
        vacancy: 1,
        postedBy: employer1._id,
        status: 'Active',
      },
      {
        title: 'Product Designer (UI/UX)',
        company: company2._id,
        location: 'Bengaluru, Karnataka',
        jobType: 'Full-Time',
        category: 'Design',
        salary: '₹12,00,000 - ₹18,00,000',
        experienceLevel: '2-4 Years',
        skillsRequired: ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
        description: 'Flipkart is looking for a talented Product Designer to create intuitive and engaging shopping experiences for millions of users across India.',
        responsibilities: '- Create wireframes, user flows, and prototypes\n- Conduct user research and usability testing\n- Work closely with engineering to ensure pixel-perfect implementation',
        vacancy: 3,
        postedBy: employer2._id,
        status: 'Active',
      },
      {
        title: 'Marketing Specialist',
        company: company2._id,
        location: 'Remote',
        jobType: 'Remote',
        category: 'Marketing',
        salary: '₹8,00,000 - ₹12,00,000',
        experienceLevel: '1-3 Years',
        skillsRequired: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media'],
        description: 'Looking for a creative Marketing Specialist to drive our digital campaigns. You will focus on SEO optimization and managing our social media presence.',
        responsibilities: '- Develop and execute digital marketing campaigns\n- Analyze performance metrics and optimize strategies\n- Write engaging content for blogs and social media',
        vacancy: 1,
        postedBy: employer2._id,
        status: 'Active',
      },
      {
        title: 'Full Stack Engineer',
        company: company3._id,
        location: 'Remote',
        jobType: 'Full-Time',
        category: 'Engineering',
        salary: '₹25,00,000 - ₹35,00,000',
        experienceLevel: '4+ Years',
        skillsRequired: ['Node.js', 'React', 'MongoDB', 'AWS'],
        description: 'Join the Tesla software team to build internal tools and customer-facing web applications.',
        responsibilities: '- Build end-to-end features\n- Optimize for scale\n- Write clean, testable code',
        vacancy: 5,
        postedBy: employer3._id,
        status: 'Active',
      },
      {
        title: 'Machine Learning Engineer',
        company: company3._id,
        location: 'Austin, Texas',
        jobType: 'Full-Time',
        category: 'Engineering',
        salary: '₹35,00,000 - ₹50,00,000',
        experienceLevel: '3+ Years',
        skillsRequired: ['Python', 'PyTorch', 'Computer Vision'],
        description: 'Help build the brains for full self-driving capabilities.',
        responsibilities: '- Train deep neural networks\n- Optimize models for inference\n- Work on cutting-edge CV algorithms',
        vacancy: 2,
        postedBy: employer3._id,
        status: 'Active',
      }
    ]);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
