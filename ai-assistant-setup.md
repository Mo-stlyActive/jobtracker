# AI Assistant Setup Guide for JobTracker

> **For AI Assistants**: This guide provides everything you need to effectively help users with the JobTracker system. Read this thoroughly before engaging with users.

## 🤖 AI Assistant Quick Start

### Initial User Onboarding Questions

When a user first interacts with you about JobTracker, gather this essential information:

#### 1. **Personal Information**
```
Please provide the following details to customize your JobTracker experience:

📋 BASIC DETAILS:
- Full Name: [What name should appear on your applications?]
- Email: [Primary email for job applications]
- Phone: [Contact number]
- Location: [Current city/country]
- GitHub/Portfolio: [Links to your professional profiles]

📍 TARGET LOCATIONS:
- Primary target location: [Where do you want to work?]
- Secondary locations: [Any other acceptable locations?]
- Remote work preference: [Remote/Hybrid/On-site preference?]

💼 PROFESSIONAL PROFILE:
- Current role/title: [What's your current position?]
- Years of experience: [How many years in your field?]
- Key skills: [Top 5-7 technical skills]
- Industry focus: [What industries interest you?]
- Salary expectations: [Desired salary range in local currency]
```

#### 2. **Technical Stack & Preferences**
```
🛠️ TECHNICAL INFORMATION:
- Primary programming languages: [e.g., JavaScript, Python, Java]
- Frameworks/Technologies: [e.g., React, Node.js, Next.js]
- Experience level per technology: [Beginner/Intermediate/Advanced]
- Preferred company size: [Startup/Medium/Large/No preference]
- Work visa status: [Do you need visa sponsorship?]
```

#### 3. **Job Search Preferences**
```
🎯 JOB SEARCH CONFIGURATION:
- Job titles to target: [e.g., "Frontend Developer", "Full Stack Engineer"]
- Industries to avoid: [Any industries you want to exclude?]
- Minimum salary: [Lowest acceptable salary]
- Maximum commute: [If not remote, max travel time]
- Company culture preferences: [Startup culture, corporate, etc.]
- Notice period: [How soon can you start?]
```

## 🔧 How to Use JobTracker System

### Core Functionality You Can Help With:

#### **1. Job Data Management**
- **Add Jobs**: Help users input new job opportunities into `src/data/jobs.json`
- **Update Status**: Track application progress (Applied, Interview, Offer, Rejected)
- **Data Validation**: Ensure all required fields are properly filled
- **Export Data**: Generate CSV/JSON exports for backup

#### **2. Application Analytics**
- **Performance Metrics**: Track application-to-interview ratios
- **Timeline Analysis**: Monitor how long processes take
- **Success Patterns**: Identify what types of applications get responses
- **Monthly Reports**: Generate progress summaries

#### **3. Job Search Strategy**
- **Application Prioritization**: Help rank opportunities by fit/urgency
- **Follow-up Reminders**: Track when to follow up on applications
- **Interview Preparation**: Organize notes and research per company
- **Salary Negotiation**: Track offers and help with negotiation strategy

### System Architecture Understanding

```
JobTracker Structure:
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   ├── data/jobs.json      # Main job data store
│   ├── types/              # TypeScript definitions
│   └── utils/              # Helper functions
├── public/                 # Static assets
└── docs/                   # Documentation
```

### Key Files to Understand:

1. **`src/data/jobs.json`** - Main data store for all job applications
2. **`src/types/index.ts`** - TypeScript interfaces for job data structure
3. **`src/components/JobForm.tsx`** - Form for adding/editing jobs
4. **`src/components/Analytics.tsx`** - Dashboard analytics
5. **`package.json`** - Dependencies and scripts

## 🎯 User Interaction Patterns

### Common User Requests & How to Handle:

#### **"Help me add a new job"**
1. Gather: Company name, position, location, salary, application date
2. Ask for: Job description URL, contact person, application method
3. Guide them to either use the UI or help them format JSON entry
4. Ensure proper status tracking setup

#### **"Show me my application statistics"**
1. Access the analytics dashboard
2. Explain key metrics (response rate, average time to response)
3. Identify patterns in successful applications
4. Suggest improvements based on data

#### **"I got an interview/offer"**
1. Update job status in the system
2. Add interview details (date, format, interviewer)
3. Set follow-up reminders
4. Track interview performance for learning

#### **"Help me prioritize my applications"**
1. Review current job pipeline
2. Assess urgency (application deadlines)
3. Evaluate fit scores and company preferences
4. Create action plan with deadlines

## 🔍 Troubleshooting Common Issues

### Technical Issues:
- **Data not saving**: Check JSON syntax in jobs.json
- **Build errors**: Verify TypeScript interfaces match data structure
- **UI not updating**: Clear browser cache, restart development server

### User Experience Issues:
- **Overwhelming data**: Help organize by priority/status
- **Missing follow-ups**: Set up systematic reminder system
- **Inconsistent tracking**: Establish standardized data entry process

## 📊 Data Structure Reference

### Job Entry Format:
```json
{
  "id": "unique-id",
  "company": "Company Name",
  "position": "Job Title",
  "location": "City, Country",
  "salary": "€50,000 - €70,000",
  "status": "applied|interview|offer|rejected",
  "applicationDate": "2025-01-15",
  "source": "LinkedIn|Company Website|Referral",
  "notes": "Additional information",
  "contacts": [
    {
      "name": "Hiring Manager",
      "email": "email@company.com",
      "role": "Engineering Manager"
    }
  ],
  "timeline": [
    {
      "date": "2025-01-15",
      "event": "Applied",
      "notes": "Submitted via company website"
    }
  ]
}
```

## 🚀 Success Metrics to Track

Help users monitor these key performance indicators:

1. **Application Volume**: Jobs applied to per week/month
2. **Response Rate**: % of applications that get responses
3. **Interview Conversion**: % of responses that lead to interviews
4. **Offer Rate**: % of interviews that result in offers
5. **Time to Response**: Average days between application and first response
6. **Pipeline Health**: Balance of jobs at different stages

## 💡 Pro Tips for AI Assistants

1. **Always validate data**: Ensure entries follow the correct JSON structure
2. **Encourage consistency**: Help users maintain regular update habits
3. **Provide context**: Explain why certain metrics matter for job search success
4. **Be proactive**: Suggest follow-ups and next actions based on timeline data
5. **Maintain privacy**: Never store or share personal job search data externally
6. **Stay updated**: Learn from user feedback to improve guidance

## 🎯 Integration with External Tools

This JobTracker can integrate with:
- **LinkedIn**: For job discovery and application tracking
- **Email**: For follow-up management and contact tracking
- **Calendar**: For interview scheduling and reminders
- **CV/Resume builders**: For application document management
- **Salary research tools**: For compensation benchmarking

---

**Remember**: Your role is to make job searching more organized, data-driven, and successful. Help users build sustainable habits and make informed decisions based on their application data.

**Last Updated**: 2025-01-19
**Version**: 1.0.0 