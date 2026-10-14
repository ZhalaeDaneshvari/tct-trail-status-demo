# TCT trail updates demonstration

A public, independent student concept for a Transcaucasian Trail reporting and approval workflow. **Fictional data only. Not live trail information or a navigation tool.**

The demo connects a reporting form, simulated reviewer email, staff review desk, public advisory list, and interactive map. It includes a proposed staff workflow guide.

## Try it

1. Open the hosted demo and choose **Report an issue**.
2. Click **Fill a sample observation**, acknowledge the demo, and submit.
3. Open the report using the simulated email's review link.
4. Edit the public advisory, acknowledge review, and approve.
5. View the updated section in **Trail conditions**.
6. Resolve the advisory from **Review desk → Published advisories**.

Use **Reset demo** to restore the initial samples.

## What works

- Responsive condition list and Leaflet map, with country and status filters.
- Structured reports from a website or simulated Slack-link entry point.
- Email preview linking to the report; **no actual delivery**.
- Review and edit before approval; request clarification, decline, or link duplicates.
- Shared local state for approved advisories, map markers, and status counts.
- Review dates, resolution notes, and a local decision history.
- Unknown status when no current verified check exists; expired closures are not reopened automatically.
- In-app workflow guide, printable guide view, and [written staff guide](WORKFLOW.md).

## Deliberate limitations

This is a static GitHub Pages demonstration. Data is stored only in the current browser, not on a server or across visitors. The review desk is open for demonstration and is not an authenticated staff system. No email, Slack, CMS, or FarOut integration is connected. No photos or contact details are collected. Enter fictional information only.

Approximate region points illustrate selection, not official trail geometry or incident positions. Example closures and hazards are invented. Consult TCT's official resources for actual information.

## Run locally

Requires Node.js for tests, Python 3 for the simple preview server. No package installation or build is required.

```sh
npm test
npm start
```

Open `http://127.0.0.1:4173`.

## Deploy to GitHub Pages

Publish this directory's contents in a repository. In **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/(root)**. Relative asset links work under the repository's Pages path. `.nojekyll` disables unnecessary Jekyll processing.

## Project structure

- `index.html`, `styles.css`, `app.js`: browser interface.
- `model.js`: sample data and workflow transitions.
- `model.test.js`: tests for publication boundaries, duplicate decisions, status precedence, and resolution behavior.
- `leaflet.js`, `leaflet.css`, `LEAFLET-LICENSE.txt`: pinned map library and its license.
- `WORKFLOW.md`: proposed workflow and implementation handoff.

Private interviews, surveys, research files, and working notes are deliberately excluded.

## Dependencies and external requests

Leaflet 1.9.4 is vendored under its BSD-2-Clause license; see `LEAFLET-LICENSE.txt`. Basemap requests go to OpenStreetMap with visible attribution and normal browser caching. Fonts load from Google Fonts with local fallbacks. If tiles are unavailable, the section list and workflow remain usable. There is no analytics or tracking code.

## Before production

Confirm TCT's CMS and maps, section geometry, staff ownership, software budget, and publication rules. Implement private storage, authenticated review, server-side authorization and field filtering, real notification delivery, anti-spam measures, retention and privacy rules, reliable synchronization, and operational monitoring. The guide describes these requirements; this demo does not claim to satisfy them.

Created with AI assistance for team and client review. No official TCT endorsement is implied.
