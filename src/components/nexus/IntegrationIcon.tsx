import { Plug } from "lucide-react";

// Map of integration display name -> Simple Icons slug + brand hex.
// Simple Icons CDN: https://cdn.simpleicons.org/{slug}/{hex}
const ICONS: Record<string, { slug: string; color: string }> = {
  "Google Workspace": { slug: "googleworkspace", color: "4285F4" },
  "Microsoft 365": { slug: "microsoft365", color: "D83B01" },
  Outlook: { slug: "microsoftoutlook", color: "0078D4" },
  Slack: { slug: "slack", color: "4A154B" },
  "Microsoft Teams": { slug: "microsoftteams", color: "6264A7" },
  Zoom: { slug: "zoom", color: "0B5CFF" },
  Webex: { slug: "webex", color: "00BCEB" },
  Okta: { slug: "okta", color: "007DC1" },
  "Azure AD": { slug: "microsoftazure", color: "0078D4" },
  "Google SSO": { slug: "google", color: "4285F4" },
  BambooHR: { slug: "bamboohr", color: "73C41D" },
  Workday: { slug: "workday", color: "F38B00" },
  Personio: { slug: "personio", color: "0F1B2D" },
  SAP: { slug: "sap", color: "0FAAFF" },
  Salesforce: { slug: "salesforce", color: "00A1E0" },
  HubSpot: { slug: "hubspot", color: "FF7A59" },
  "Excel / CSV": { slug: "microsoftexcel", color: "217346" },
  "Google Sheets": { slug: "googlesheets", color: "34A853" },
  Notion: { slug: "notion", color: "FFFFFF" },
  Jira: { slug: "jira", color: "0052CC" },
  ServiceNow: { slug: "servicenow", color: "62D84E" },
  Zapier: { slug: "zapier", color: "FF4F00" },
  "REST API / Webhooks": { slug: "", color: "" }, // fallback
};

type Props = {
  name: string;
  size?: number;
  className?: string;
};

const IntegrationIcon = ({ name, size = 20, className = "" }: Props) => {
  const icon = ICONS[name];
  if (!icon || !icon.slug) {
    return <Plug className={className} style={{ width: size, height: size }} strokeWidth={1.75} />;
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
};

export default IntegrationIcon;