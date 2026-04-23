import { Plug } from "lucide-react";

// Map of integration display name -> brand domain.
// Uses Google's favicon service which reliably returns a logo for any domain.
const DOMAINS: Record<string, string> = {
  "Google Workspace": "workspace.google.com",
  "Microsoft 365": "microsoft.com",
  Outlook: "outlook.com",
  Slack: "slack.com",
  "Microsoft Teams": "teams.microsoft.com",
  Zoom: "zoom.us",
  Webex: "webex.com",
  Okta: "okta.com",
  "Azure AD": "azure.microsoft.com",
  "Google SSO": "google.com",
  BambooHR: "bamboohr.com",
  Workday: "workday.com",
  Personio: "personio.com",
  SAP: "sap.com",
  Salesforce: "salesforce.com",
  HubSpot: "hubspot.com",
  "Excel / CSV": "microsoft.com",
  "Google Sheets": "sheets.google.com",
  Notion: "notion.so",
  Jira: "atlassian.com",
  ServiceNow: "servicenow.com",
  Zapier: "zapier.com",
};

type Props = {
  name: string;
  size?: number;
  className?: string;
};

const IntegrationIcon = ({ name, size = 20, className = "" }: Props) => {
  const domain = DOMAINS[name];
  if (!domain) {
    return <Plug className={className} style={{ width: size, height: size }} strokeWidth={1.75} />;
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
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