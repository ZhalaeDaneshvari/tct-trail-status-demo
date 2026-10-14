# TCT trail reporting and approval workflow

Proposed operating guide · October 2026 · Independent student demonstration

This guide proposes a manageable way to turn trail observations into reviewed website updates. It accompanies a functional demonstration, not a production reporting service. TCT must confirm the reviewer, process, software, and public-data boundaries before adoption.

## Recommendation

Use one structured reporting form linked from both the website and a pinned Slack message. Preserve Slack for discussion. Store reports in a private review queue and publish a separate advisory only after a designated person reviews it. The central alerts page, relevant trail page, and map should read the same approved advisory record.

The small win is a reliable reporting and review process. Automated extraction from Slack is optional future work.

## Proposed workflow

1. **Receive an observation.** Capture a stable section identifier, issue type, observed date, location description, and factual observation. Include a received timestamp and source automatically. Optional contact details and photos belong in a private evidence record.
2. **Notify the reviewer.** Send a concise email with section, issue type, observation date, and a link to authenticated review. Notification should not imply that the report has been verified. Opening an email link must not publish the report.
3. **Triage and verify.** Check location, recency, evidence, duplicates, and conflicting observations. Contact the reporter or local team when necessary. Hikers report observations; authorized staff decide public wording and status.
4. **Record a decision.** Edit and approve, request more information, decline with a reason, or attach the report to an existing advisory. Retain a timestamped audit entry.
5. **Publish a public advisory.** The reviewer chooses the section, public status, title, description, public location, last-reviewed date, and next review date. Exclude reporter contact details, internal discussion, and restricted route data.
6. **Confirm delivery.** The integration records successful publication or surfaces a retryable failure. Repeated delivery should update the same advisory identifier, not create duplicates. A failed website update must not appear to staff as successfully published.
7. **Maintain and resolve.** Review overdue records, incorporate new evidence, and explicitly retire or revise notices. Keep resolved records in the staff history. Resolving an incident does not certify an entire route as safe.

## Roles and timing

TCT should name a primary reviewer, potentially Meagan, and a backup. This is a recommendation, not an assignment or agreement made by the client. The reviewer needs authority to determine closure language and access to relevant local expertise. A technical maintainer monitors publication errors and account access.

Suggested pilot cadence: inspect the queue on each staffed day during hiking season, with a weekly check of overdue advisories. Confirm coverage and achievable targets with staff before promising response times. Set an explicit escalation route for time-sensitive issues. A reporting form must state it is not an emergency service; locally appropriate emergency guidance requires client verification.

## Information structure

| Record | Required fields | Access |
| --- | --- | --- |
| Observation | Report ID, section ID, issue type, observed date, location description, observation, received timestamp, source, workflow state | Private staff queue |
| Optional evidence | Contact details, evidence photos, location coordinates where appropriate | Restricted staff access |
| Review | Reviewer identity, decision, notes, timestamp, linked advisory or duplicate ID | Private audit history |
| Public advisory | Advisory ID, section ID, status, title, public description, public location, observed date, reviewed date, next review date, active/resolved state | Public after approval |
| Delivery | Advisory ID, target system, attempted timestamp, result, retry state | Private operations record |

Stable section identifiers connect records to trail pages and map geometry. Do not use a freely typed trail name as the only link. Multiple observations can support one advisory. One section can have several active advisories.

Keep private reports and public advisories separate in storage or enforce an explicit server-side field allowlist. A UI filter alone is not a privacy boundary.

## Public status definitions

| Label | Meaning | Aging behavior |
| --- | --- | --- |
| Closed | A closure confirmed by an authorized reviewer; identify the affected section and reason | Remains closed until explicitly reviewed and changed |
| Caution | A reviewed issue or hazard requiring attention | Remains visible, with overdue review highlighted |
| No known issues | A recent, explicit staff condition check found no known issues; not a safety guarantee | Becomes unknown when its review date expires |
| Status unknown | No recent verified information is available | Never infer open or safe from lack of reports |

The demo displays the most restrictive active status for a section: Closed, Caution, Unknown, then No known issues. It keeps every active notice accessible. This precedence is a proposal for TCT to validate. Review dates are prompts, not automatic reopening dates.

Separate trail development, public access eligibility, and incident status. A published trail guide does not establish a current safe or open status. Keep restricted GPX access aligned with TCT's existing policy.

## Recommended website placement

- **Central trail conditions page:** filter by country and section; offer both an accessible list and a map. Display last review dates and clear text labels alongside colors.
- **Individual trail pages:** show relevant active advisories near the top and link to the same underlying records.
- **Report entry point:** place “Report a trail issue” on those pages; preselect the section when known. Link the same form from Slack.
- **Staff review desk:** keep separate from public pages and protect with staff authentication in production.

The map should be an additional way to find information. All important details must remain available without using the map or distinguishing colors.

## Tool shortlist and integration

**Shared hosted form:** recommended entry pattern. A pinned form link works without building a Slack-specific workflow. A native Slack form can be considered if TCT's plan and participants support it; Workflow Builder is available on paid plans.

**Jotform:** candidate when form approval and email-driven review are the main priority. Its approval workflow supports approval actions through email. Test editing, clarification, duplicate handling, recipient permissions, and plan limits with TCT's actual account.

**Airtable:** candidate when linked sections, an ongoing review queue, and data management matter most. Form submissions can trigger automations, and staff interfaces can support record review. Confirm collaborator access, automation limits, and public/private separation.

Do not commit to a specific paid plan or third-party service until TCT's budget and existing accounts are known. Do not maintain multiple duplicate databases simply to connect tools.

For real website publishing, the selected tool must connect to TCT's CMS or a public advisory feed through a server-side integration. Keep credentials off the public website. The current CMS and map provider have not been verified. FarOut synchronization is not implemented or promised; maintain a manual coordination checklist until its supported process is confirmed.

**Map:** Leaflet is adequate for a lightweight demonstration of pan, zoom, and status markers. This demo uses OpenStreetMap basemap tiles and approximate region points. Real section lines require approved route geometry. Select an appropriate production tile provider after checking usage terms, capacity, and budget. Do not expose restricted trail coordinates.

Capability references checked October 14, 2026:
- [Slack Workflow Builder](https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack)
- [Jotform approver tasks](https://www.jotform.com/help/1467-how-do-approvers-complete-their-tasks/)
- [Airtable form-submission automations](https://support.airtable.com/articles/4764749250-airtable-automation-trigger-when-a-form-is-submitted)
- [Airtable record review interfaces](https://www.airtable.com/guides/collaborate/interface-designer-record-review)
- [Leaflet reference](https://leafletjs.com/reference.html)
- [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/)

This shortlist is a workflow recommendation, not a completed competitor audit or a verified production integration specification.

## One to two week pilot plan

1. Confirm the current process, review one or two real examples privately, identify the reviewer and backup, and agree public section IDs.
2. Test the proposed form and approval decisions using fictional observations. Establish labels, required evidence, and revision rules.
3. Demonstrate approval-to-publication in the prototype. Ask staff to edit a report, request clarification, handle a duplicate, and resolve a notice.
4. Ask hikers to find a section, interpret its status and date, and submit an observation. Record confusion and revise the design.
5. Document the preferred tool, account requirements, CMS connection, ownership, unresolved questions, and realistic implementation effort. Only then decide whether to run a real production pilot.

Suggested evaluation measures: time to submit a usable report, reviewer time per decision, missing-location frequency, duplicate handling success, ability to interpret Unknown correctly, overdue advisory count, and publication failure visibility. Establish a baseline before claiming improvement.

## Client demonstration script

1. Reset the demo. On Trail conditions, observe that Dilijan has no verified update.
2. Open Report an issue and select Fill a sample observation. Read and check the demo acknowledgement, then submit.
3. Show the simulated reviewer email. It is not sent to anyone. Open its review link.
4. Edit the public title or message, keep or change the proposed status, set a review date, and acknowledge the review. Approve and publish.
5. Return to Trail conditions. Select Dilijan: the map, status count, and section advisory now reflect the approved sample.
6. Open Review desk and Published advisories. Resolve the sample with a note. The section returns to Unknown unless another current condition check applies.
7. Show request-more-information, decline, duplicate handling, and decision history using the remaining samples.

Ask the client: “Does this remove copying work? Who would own the queue? Which information would you need before publishing? What would prevent you from keeping it current?”

## Demonstration boundaries

This public prototype uses fictional observations and approximate sample locations. It is not affiliated with or operated as TCT's official reporting service. It must not be used for navigation or current trail decisions.

All changes are stored in the current browser's local storage; other visitors do not see them. Reset restores sample data. The reviewer interface is intentionally open to support a walkthrough. Emails are simulated. No Slack account, CMS, FarOut account, or TCT system is connected. Contact details and photo uploads are omitted. Do not enter personal or sensitive information.

A production version needs authenticated reviewers, private durable storage, server-side authorization, spam controls, evidence validation, real email delivery, audit records, retry monitoring, backup procedures, privacy and retention decisions, and verified trail geometry. The student research archive is not part of this public repository.

The prototype and draft guide were created with AI assistance and should be reviewed by the project team and TCT before operational use.
