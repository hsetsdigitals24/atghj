# Product Requirements Document (PRD)
## African Translational & Global Health Journal (ATGHJ) - Next.js Frontend

**Version:** 1.0  
**Date:** November 3, 2025  
**Product:** Next.js Frontend for ATGHJ Journal Management System  
**Backend:** Open Journal Systems (OJS) 3.5  
**Journal:** African Translational & Global Health Journal (ATGHJ)

---

## 1. Executive Summary

This document outlines the requirements for developing a modern Next.js frontend application for the African Translational & Global Health Journal (ATGHJ) that interfaces with an Open Journal Systems (OJS) 3.5 backend. The application will provide a user-friendly interface for journal operations, supporting ATGHJ's mission to bridge research, innovation, and health equity in Africa.

---

## 2. Product Overview

### 2.1 About ATGHJ
The African Translational & Global Health Journal (ATGHJ) is an open-access, peer-reviewed journal that publishes high-quality research advancing the translation of scientific discoveries into clinical practice and community health outcomes across Africa and globally.

**Publication Schedule:** Quarterly (January, April, July, October)  
**Scope:** Biomedical sciences, translational medicine, clinical research, neuroscience, public health, epidemiology, and related disciplines

### 2.2 Objectives
- Create a modern, responsive frontend aligned with ATGHJ's branding and mission
- Streamline article submission and peer-review processes
- Enhance discoverability through SEO optimization for major indexing services
- Integrate seamless payment processing for Article Processing Charges (APC)
- Support ATGHJ's indexing goals (Scopus, PubMed, DOAJ, Web of Science)

### 2.3 Target Users
- **Authors:** Researchers from Africa and globally submitting manuscripts
- **Reviewers:** Double-blind peer reviewers evaluating submissions
- **Editors:** Editorial board (Editor-in-Chief, Associate Editors, Section Editors)
- **Readers:** Academic community, clinicians, policymakers
- **Administrators:** Managing Editor, Technical Editor, Journal Secretary

---

## 3. Feature Requirements

### 3.1 Journal Submission Frontend

#### 3.1.1 Overview
Multi-step submission form enabling authors to submit manuscripts with metadata, following ATGHJ's author guidelines.

#### 3.1.2 Functional Requirements

**Multi-step Submission Wizard**
- **Step 1: Manuscript Type Selection**
  - Original Research Article
  - Review Article (Systematic/Narrative)
  - Case Report
  - Short Communication
  - Letter to the Editor
  - Display type-specific guidelines

- **Step 2: Manuscript Upload**
  - Primary manuscript file (PDF, DOCX, LaTeX)
  - Maximum file size: 50MB
  - Drag-and-drop functionality
  - Upload progress indicator
  - File preview capability
  - Automatic plagiarism check indicator (integrated with Turnitin)

- **Step 3: Title and Abstract**
  - Article title (required, max 200 characters)
  - Structured abstract (Background, Methods, Results, Conclusion)
  - Abstract word counter (250-300 words for research articles)
  - Real-time character/word count display

- **Step 4: Author Information**
  - Corresponding author details (name, affiliation, email, ORCID)
  - Co-author addition (unlimited)
  - Author role specification (first author, co-author, senior author)
  - ORCID integration and validation
  - Institutional affiliation dropdown
  - Contact information with country code selector

- **Step 5: Article Metadata**
  - Keywords (minimum 3, maximum 6, with suggestions)
  - Subject category selection (from ATGHJ disciplines list)
  - Funding information (with funding body search)
  - Conflict of interest declaration (checkbox + optional description)
  - Ethical approval information (IRB approval number, date)
  - Clinical trial registration (if applicable)

- **Step 6: Supplementary Files**
  - Figure uploads (JPG, PNG, TIFF, high resolution)
  - Table uploads (Excel, CSV)
  - Datasets, appendices, supplementary documents
  - Multiple file upload support
  - File labeling (Figure 1, Table 1, etc.)

- **Step 7: Submission Review & Confirmation**
  - Summary of all entered information
  - PDF preview of manuscript
  - Edit option for each section
  - Agreement to ATGHJ publication ethics
  - Copyright transfer agreement checkbox
  - Submit button with confirmation modal

**Form Features**
- Auto-save every 2 minutes with "Draft saved" indicator
- Manual save button
- Resume incomplete submissions from dashboard
- Real-time validation with inline error messages
- Required field indicators (red asterisk)
- Tooltip help for complex fields
- Progress bar showing completion percentage

**Author Guidelines Integration**
- Inline display of relevant guidelines at each step
- Downloadable PDF of complete author guidelines
- Word count limits for each section
- Reference style guide (Vancouver style) link
- Manuscript formatting checklist

#### 3.1.3 API Integration
- `POST /api/v1/submissions` - Create new submission
- `GET /api/v1/submissions/{id}` - Retrieve draft
- `PUT /api/v1/submissions/{id}` - Update submission
- `POST /api/v1/submissions/{id}/files` - Upload files
- `POST /api/v1/submissions/{id}/submit` - Final submission
- Integration with OJS plagiarism detection workflow

#### 3.1.4 Validation Rules
- Email format validation (RFC 5322 compliant)
- ORCID format validation (XXXX-XXXX-XXXX-XXXX)
- File format validation (whitelist approach)
- File size limits enforcement
- Word count validation for abstracts
- Required metadata completeness check

#### 3.1.5 Success Criteria
- Submission completion rate > 85%
- Average form completion time < 15 minutes
- File upload success rate > 98%
- Draft save success rate > 99.5%

---

### 3.2 Email Notifications

#### 3.2.1 Overview
Automated email system aligned with ATGHJ's double-blind peer-review workflow and editorial processes.

#### 3.2.2 Functional Requirements

**Notification Triggers (Aligned with ATGHJ Workflow)**
- **To Authors:**
  - Submission received confirmation (with manuscript ID)
  - Editor assigned notification
  - Manuscript under review notification
  - Reviewer invitation sent notification
  - Review completed notification
  - Editorial decision (Accept/Minor Revision/Major Revision/Reject)
  - Revision request with reviewer comments (blinded)
  - Revised manuscript received confirmation
  - Final acceptance notification
  - Payment request (APC) with amount and instructions
  - Payment received confirmation
  - Article in production notification
  - Publication notification with DOI and article link

- **To Editors (Editor-in-Chief, Associate Editors, Section Editors):**
  - New submission notification (with subject area)
  - Reviewer assignment notification
  - Review deadline approaching (7 days before)
  - Review completed notification
  - Revised manuscript submitted notification
  - Payment completed notification
  - Production ready notification

- **To Reviewers:**
  - Review invitation (with manuscript abstract, blinded)
  - Review reminder (7 days before deadline)
  - Review acknowledgment (after submission)
  - Review appreciation with potential honorarium/waiver info

**Email Templates (ATGHJ Branded)**
- HTML responsive email templates with ATGHJ logo and colors
- Dynamic content insertion:
  - Recipient name and role
  - Manuscript ID and title
  - Author names (blinded for reviewers)
  - Submission date
  - Review deadline
  - Decision type and comments
  - APC amount and payment link
  - DOI and publication date
- Personalized greetings based on user role
- ATGHJ contact information footer
- Social media links (if applicable)

**Email Preferences**
- User-configurable notification settings in profile
- Email frequency control (immediate, daily digest, weekly digest)
- Opt-in/opt-out for specific notification types
- Mobile notification support (push notifications for app users)

**Multi-language Support**
- English (primary)
- French (for Francophone Africa)
- Template translation management

#### 3.2.3 Technical Requirements
- Integration with OJS 3.5 email notification system
- Fallback to external email service (SendGrid/AWS SES/Mailgun)
- Email queue management for bulk sending
- Email delivery tracking and logging
- Bounce handling and invalid email address management
- Unsubscribe functionality (GDPR compliant)
- Email verification for new user registrations
- Rate limiting to prevent spam

#### 3.2.4 ATGHJ-Specific Requirements
- Include "Bridging Research, Innovation, and Health Equity in Africa!" tagline
- Reference to quarterly publication schedule
- APC waiver information for LMIC authors
- Link to reviewer compensation policy
- Ethical guidelines reference (COPE, ICMJE, WAME)

#### 3.2.5 Success Criteria
- Email delivery rate > 99%
- Email open rate > 40%
- Average delivery time < 5 minutes
- Bounce rate < 2%
- Unsubscribe rate < 0.5%

---

### 3.3 Editorial Workflow Tracking

#### 3.3.1 Overview
Dashboard system for tracking manuscripts through ATGHJ's double-blind peer-review workflow and editorial stages.

#### 3.3.2 ATGHJ Workflow Stages
1. **Submission Received** - Initial submission complete
2. **Initial Editorial Screening** - Plagiarism check (≤15% Turnitin), formatting compliance
3. **Editor Assigned** - Section Editor or Associate Editor assigned
4. **Reviewer Assignment** - Inviting 2 independent reviewers (double-blind)
5. **Under Review** - Reviews in progress (target: 4-6 weeks)
6. **Review Completed** - Both reviews received
7. **Editorial Decision Pending** - Editor evaluating reviews
8. **Decision Made**:
   - Accept (proceed to payment)
   - Minor Revisions Required
   - Major Revisions Required
   - Reject
9. **Revision Submitted** - Author uploaded revised manuscript
10. **Re-review** (if major revisions)
11. **Final Acceptance** - Manuscript accepted for publication
12. **Payment Pending** - APC payment requested
13. **Payment Completed** - APC received
14. **In Production** - Copyediting, formatting, proofreading
15. **Published** - Article live with DOI

#### 3.3.3 Functional Requirements

**Author Dashboard**
- **Submissions List View:**
  - Table/card view toggle
  - Manuscript ID, title, submission date, current status
  - Status badge with color coding (green: accepted, yellow: under review, red: action required)
  - Sorting options (date, status, manuscript type)
  - Search/filter by manuscript title or ID
  - Pagination (20 items per page)

- **Detailed Submission View:**
  - Complete manuscript information
  - Timeline visualization (vertical progress tracker)
  - Current status with estimated time to next stage
  - Action items section (highlighted):
    - Revisions needed (with download of reviewer comments)
    - Payment required (with payment button)
    - Additional documents requested
  - Communication history (messages from editors)
  - Uploaded files list (with download links)
  - Co-author list with contact info
  - Version history (original, revision 1, revision 2, etc.)
  - Download options:
    - Manuscript PDF
    - Reviewer comments (blinded)
    - Editorial decision letter
    - Submission summary report

**Editor Dashboard (Role-Based Access)**

*For Editor-in-Chief:*
- Overview metrics:
  - Total submissions (current quarter)
  - Pending editorial decisions
  - Average review time
  - Acceptance rate
  - Revenue from APCs
- All submissions with filtering by section/editor
- Performance analytics (charts/graphs)

*For Associate/Section Editors:*
- **Submission Queue:**
  - New submissions requiring assignment
  - Submissions under their supervision
  - Filter by status (awaiting assignment, under review, decision pending)
  - Sort by submission date, priority, overdue status

- **Reviewer Assignment Interface:**
  - Search reviewers by expertise/discipline
  - Reviewer availability status
  - Past review history (number of reviews, average turnaround time)
  - Send review invitation with custom message
  - Track invitation responses (accepted/declined)

- **Decision Recording Interface:**
  - Reviewer comments display (anonymized)
  - Reviewer recommendations (accept/revise/reject)
  - Decision form with options:
    - Accept
    - Minor Revisions (with specific comments)
    - Major Revisions (with detailed feedback)
    - Reject (with reason)
  - Template decision letters (customizable)
  - Attach additional files/comments

- **Manuscript Details:**
  - All submission information
  - Plagiarism report (Turnitin score)
  - Reviewer assignment history
  - Communication log
  - Editorial notes (internal)

**Reviewer Dashboard**
- **Review Invitations:**
  - Pending invitations with abstract preview
  - Accept/decline buttons
  - Reason for declining (optional)
  - Suggest alternative reviewers

- **Active Reviews:**
  - Assigned reviews with deadline
  - Days remaining indicator
  - Download manuscript (blinded)
  - Upload review form/comments
  - Recommendation selection (accept/minor revision/major revision/reject)
  - Confidential comments to editor (separate from author comments)

- **Review History:**
  - Completed reviews
  - Performance metrics (number of reviews, average turnaround time)
  - Honorarium/waiver eligibility status

**Managing Editor Dashboard**
- All submissions overview
- Production tracking (accepted manuscripts in copyediting/formatting)
- Payment tracking (pending/completed)
- Generate reports (submission statistics, acceptance rates, turnaround times)

**Status Indicators & Visualizations**
- Color-coded status badges:
  - Green: Accep