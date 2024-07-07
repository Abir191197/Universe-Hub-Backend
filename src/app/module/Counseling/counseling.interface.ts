export interface ICounseling {
  createBy: string;
  Duration: 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60; // Specific duration values in minutes
  selectDate: Date;
  Type: "online" | "offline";
  MeetLink?: string; // Optional, only relevant for online meetings
  createdAt: Date;
  updatedAt: Date;
}
