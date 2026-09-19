// Shared so the announcements list and the AI assistant apply exactly the same
// targeting rules — a student must never be shown an announcement aimed at a
// different faculty, programme or year group.
const buildAnnouncementFilter = (user) => {
  if (!user || user.role !== "student") return {};

  return {
    $or: [
      { audienceType: "university-wide" },
      { audienceType: { $exists: false } },
      { audienceType: "faculty", audienceValue: user.faculty },
      { audienceType: "year-group", audienceValue: user.yearGroup },
      { audienceType: "programme", audienceValue: user.programme },
    ],
  };
};

module.exports = { buildAnnouncementFilter };
