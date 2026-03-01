// components/resume-builder/templates/templateHelpers.js

export const formatDate = (d) => {
  if (!d) return "Present";
  const [y, m] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
};

export const SkillBadge = ({ label, className }) => (
  <span className={`px-2.5 py-1 rounded text-xs font-medium ${className}`}>{label}</span>
);