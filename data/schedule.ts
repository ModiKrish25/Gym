export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
export type Intensity = "Low" | "Medium" | "High";

export interface ScheduleClass {
  id: string;
  time: string;
  name: string;
  trainer: string;
  intensity: Intensity;
  duration: string;
}

export const DAYS_OF_WEEK: { key: DayOfWeek; label: string; full: string }[] = [
  { key: "Mon", label: "Mon", full: "Monday" },
  { key: "Tue", label: "Tue", full: "Tuesday" },
  { key: "Wed", label: "Wed", full: "Wednesday" },
  { key: "Thu", label: "Thu", full: "Thursday" },
  { key: "Fri", label: "Fri", full: "Friday" },
  { key: "Sat", label: "Sat", full: "Saturday" },
  { key: "Sun", label: "Sun", full: "Sunday" },
];

export const SCHEDULE: Record<DayOfWeek, ScheduleClass[]> = {
  Mon: [
    {
      id: "mon-1",
      time: "06:00",
      name: "Strength Foundations",
      trainer: "Aarav Mehta",
      intensity: "Medium",
      duration: "60 min",
    },
    {
      id: "mon-2",
      time: "08:00",
      name: "Morning Flow Yoga",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "mon-3",
      time: "18:00",
      name: "HIIT Ignite",
      trainer: "Kabir Nair",
      intensity: "High",
      duration: "30 min",
    },
    {
      id: "mon-4",
      time: "19:30",
      name: "Fat Loss Lab",
      trainer: "Sana Kapoor",
      intensity: "Medium",
      duration: "45 min",
    },
  ],
  Tue: [
    {
      id: "tue-1",
      time: "06:30",
      name: "Functional Movement",
      trainer: "Kabir Nair",
      intensity: "Medium",
      duration: "50 min",
    },
    {
      id: "tue-2",
      time: "08:00",
      name: "Spine & Hip Mobility",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "tue-3",
      time: "17:30",
      name: "Barbell Precision",
      trainer: "Aarav Mehta",
      intensity: "High",
      duration: "60 min",
    },
    {
      id: "tue-4",
      time: "19:00",
      name: "Conditioning Lab",
      trainer: "Sana Kapoor",
      intensity: "High",
      duration: "45 min",
    },
  ],
  Wed: [
    {
      id: "wed-1",
      time: "06:00",
      name: "HIIT Ignite",
      trainer: "Kabir Nair",
      intensity: "High",
      duration: "30 min",
    },
    {
      id: "wed-2",
      time: "08:30",
      name: "Breathwork & Reset",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "45 min",
    },
    {
      id: "wed-3",
      time: "18:00",
      name: "Strength Foundations",
      trainer: "Aarav Mehta",
      intensity: "Medium",
      duration: "60 min",
    },
    {
      id: "wed-4",
      time: "19:30",
      name: "Metabolic Burn",
      trainer: "Sana Kapoor",
      intensity: "High",
      duration: "45 min",
    },
  ],
  Thu: [
    {
      id: "thu-1",
      time: "06:30",
      name: "Olympic Lifting Technique",
      trainer: "Aarav Mehta",
      intensity: "High",
      duration: "60 min",
    },
    {
      id: "thu-2",
      time: "08:00",
      name: "Deep Mobility",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "thu-3",
      time: "18:00",
      name: "Functional Athlete",
      trainer: "Kabir Nair",
      intensity: "Medium",
      duration: "50 min",
    },
    {
      id: "thu-4",
      time: "19:30",
      name: "Fat Loss Circuit",
      trainer: "Sana Kapoor",
      intensity: "Medium",
      duration: "45 min",
    },
  ],
  Fri: [
    {
      id: "fri-1",
      time: "06:00",
      name: "Power & Sprints",
      trainer: "Kabir Nair",
      intensity: "High",
      duration: "45 min",
    },
    {
      id: "fri-2",
      time: "08:00",
      name: "Vinyasa Alignment",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "fri-3",
      time: "17:30",
      name: "Hypertrophy Push",
      trainer: "Aarav Mehta",
      intensity: "High",
      duration: "60 min",
    },
    {
      id: "fri-4",
      time: "19:00",
      name: "Total Body Conditioning",
      trainer: "Sana Kapoor",
      intensity: "Medium",
      duration: "45 min",
    },
  ],
  Sat: [
    {
      id: "sat-1",
      time: "07:30",
      name: "Weekend Warrior Circuit",
      trainer: "Kabir Nair",
      intensity: "High",
      duration: "60 min",
    },
    {
      id: "sat-2",
      time: "09:00",
      name: "Heavy Deadlift Workshop",
      trainer: "Aarav Mehta",
      intensity: "High",
      duration: "75 min",
    },
    {
      id: "sat-3",
      time: "11:00",
      name: "Restorative Yin Yoga",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "sat-4",
      time: "16:00",
      name: "Community Calisthenics",
      trainer: "Sana Kapoor",
      intensity: "Medium",
      duration: "50 min",
    },
  ],
  Sun: [
    {
      id: "sun-1",
      time: "08:00",
      name: "Sunday Reset & Mobility",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "sun-2",
      time: "09:30",
      name: "Core & Stamina",
      trainer: "Kabir Nair",
      intensity: "Medium",
      duration: "45 min",
    },
    {
      id: "sun-3",
      time: "11:00",
      name: "Technique Clinic",
      trainer: "Aarav Mehta",
      intensity: "Low",
      duration: "60 min",
    },
    {
      id: "sun-4",
      time: "17:00",
      name: "Sunset Breath & Stretch",
      trainer: "Riya Shah",
      intensity: "Low",
      duration: "45 min",
    },
  ],
};
