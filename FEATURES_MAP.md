# Feature Map — BR1 to BR33

Every business requirement from the problem statement, mapped to the files
that implement it. Use this in your report to show clear requirement
coverage and prioritisation.

| # | Requirement | Backend | Frontend |
|---|---|---|---|
| BR1 | Unified Access | app.js (all routes mounted) | pages/Dashboard.jsx |
| BR2 | Targeted Announcements | models/Announcement.js, controllers/announcementController.js | pages/Announcements.jsx |
| BR3 | Event Visibility | models/Event.js, controllers/eventController.js | pages/Events.jsx |
| BR4 | Event Interest | models/EventInterest.js, controllers/eventInterestController.js | components/events/EventCard.jsx |
| BR5 | Society Visibility | models/Society.js, controllers/societyController.js | pages/Societies.jsx |
| BR6 | Society Sign-up | models/SocietyMembership.js, controllers/societyMembershipController.js | components/societies/SocietyCard.jsx |
| BR7 | Lost & Found | models/LostFoundItem.js, controllers/lostFoundController.js | pages/LostFound.jsx |
| BR8 | Classroom Booking | models/Room.js, models/Booking.js, controllers/roomController.js, controllers/bookingController.js | pages/RoomBooking.jsx |
| BR9 | Academic Support | models/SupportRequest.js, controllers/supportRequestController.js | pages/AcademicSupport.jsx |
| BR10 | FAQ Access | models/InfoContent.js (category: faq) | pages/InfoPage.jsx |
| BR11 | Content Maintenance | middleware/roleMiddleware.js, controllers/announcementController.js | pages/AdminPanel.jsx |
| BR12 | Access Levels | models/User.js, middleware/authMiddleware.js, middleware/roleMiddleware.js | context/AuthContext.jsx |
| BR13 | Academic Calendar | models/InfoContent.js (category: calendar) | pages/InfoPage.jsx |
| BR14 | Student Onboarding | models/InfoContent.js (category: onboarding) | pages/InfoPage.jsx |
| BR15 | Emergency Communication | models/Announcement.js (type: emergency) | pages/Announcements.jsx |
| BR16 | Schedule Changes | models/Announcement.js (type: schedule-change) | pages/Announcements.jsx |
| BR17 | Feedback Loop | models/Feedback.js, controllers/feedbackController.js | pages/Feedback.jsx |
| BR18 | Volunteering Opportunities | models/InfoContent.js (category: volunteering) | pages/InfoPage.jsx |
| BR19 | Alumni Engagement | models/InfoContent.js (category: alumni) | pages/InfoPage.jsx |
| BR20 | Job & Internship Visibility | models/InfoContent.js (category: jobs) | pages/InfoPage.jsx |
| BR21 | Facility Issue Reporting | models/FacilityIssue.js, controllers/facilityIssueController.js | pages/FacilityIssues.jsx |
| BR22 | Staff Directory | models/InfoContent.js (category: staff-directory) | pages/InfoPage.jsx |
| BR23 | Financial Support Info | models/InfoContent.js (category: financial-support) | pages/InfoPage.jsx |
| BR24 | Sports & Recreation | models/InfoContent.js (category: sports) | pages/InfoPage.jsx |
| BR25 | Dining Information | models/InfoContent.js (category: dining) | pages/InfoPage.jsx |
| BR26 | Printing Services | models/InfoContent.js (category: printing) | pages/InfoPage.jsx |
| BR27 | Textbook Exchange | models/TextbookListing.js, controllers/textbookController.js | pages/TextbookExchange.jsx |
| BR28 | Guest Lectures | models/Event.js (category: guest-lecture) | pages/Events.jsx |
| BR29 | Wellbeing Support | models/InfoContent.js (category: wellbeing) | pages/InfoPage.jsx |
| BR30 | IT Support Info | models/InfoContent.js (category: it-support) | pages/InfoPage.jsx |
| BR31 | Library Resources | models/InfoContent.js (category: library) | pages/InfoPage.jsx |
| BR32 | Student Life Highlights | models/InfoContent.js (category: student-life) | pages/InfoPage.jsx |
| BR33 | AI Assistant | models/ChatLog.js, controllers/assistantController.js, utils/aiClient.js | pages/Assistant.jsx, components/assistant/ |

Note: BR10, BR13, BR14, BR18-BR20, BR22-BR26, BR29-BR32 (16 requirements)
share ONE reusable model, controller and page — `InfoContent` /
`InfoPage.jsx` — distinguished only by a `category` field. This is a
deliberate design choice: one clean, reusable pattern instead of 16 nearly
identical files, which is easier to build fast, easier to keep consistent,
and easier to defend in Q&A than 16 duplicated features.
