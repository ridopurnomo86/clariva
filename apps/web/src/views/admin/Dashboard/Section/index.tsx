import Header from "./Component/Header";
import OnboardingStats from "./Component/OnboardingStats";
import OnboardingTarget from "./Component/OnboardingTarget";
import Performers from "./Component/Performers";
import ScheduleCalendar from "./Component/ScheduleCalendar";
import TodayAgenda from "./Component/TodayAgenda";
import Trend from "./Component/Trend";
import WelcomePanel from "./Component/WelcomePanel";

const kpiCards = [
  {
    label: "Completed Tasks",
    value: "15",
    accent: "green",
    subtitle: "out of 20",
  },
  {
    label: "Pending Docs",
    value: "03",
    accent: "blue",
    subtitle: "verification needed",
  },
  { label: "Meetings", value: "04", accent: "orange", subtitle: "this week" },
] as const;

const agenda = [
  {
    title: "Policy walkthrough with Sarah",
    time: "10:00 - 11:00 AM",
    color: "teal",
    attendees: ["SJ", "HR", "IT"],
  },
  {
    title: "IT access provisioning review",
    time: "01:00 - 01:30 PM",
    color: "blue",
    attendees: ["IT", "HR", "SJ"],
  },
  {
    title: "Manager onboarding check-in",
    time: "03:30 - 04:00 PM",
    color: "orange",
    attendees: ["MG", "SJ", "HR"],
  },
] as const;

const performers = [
  { name: "Rainer Brown", role: "HR Specialist", progress: "96%" },
  { name: "Conny Rany", role: "People Ops", progress: "92%" },
  { name: "Armin Falcon", role: "IT Support", progress: "91%" },
  { name: "Alex Sullivan", role: "HR Specialist", progress: "89%" },
  { name: "Lily Alexa", role: "Recruiter", progress: "86%" },
  { name: "Agatha Smith", role: "Payroll", progress: "85%" },
] as const;

const Section = () => (
  <section className="bg-white">
    <Header />
    <div className="grid grid-cols-1 gap-4 p-4 md:p-6 xl:grid-cols-[1.35fr_0.78fr]">
      <div className="space-y-4">
        <WelcomePanel cards={kpiCards} />
        <Trend />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Performers people={performers} />
          <OnboardingStats />
        </div>
      </div>
      <aside className="space-y-4">
        <ScheduleCalendar />
        <TodayAgenda items={agenda} />
        <OnboardingTarget />
      </aside>
    </div>
  </section>
);

export default Section;
