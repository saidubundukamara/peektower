export type TeamMember = {
  name: string;
  title: string;
};

// These public-facing titles are placeholders pending founder confirmation.
// Initials are used in the UI until official headshots are supplied.
export const teamMembers = [
  { name: "Saidu Bundu-Kamara", title: "Founder & CEO" },
  { name: "Aminata Bundu-Kamara", title: "Director" },
  { name: "Hawanatu Adama Tarawallie", title: "Director" },
  { name: "Harry Henry Kargbo", title: "Director" },
] satisfies readonly TeamMember[];
