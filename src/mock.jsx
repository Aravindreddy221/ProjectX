import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  UserPlus,
  CheckSquare,
  Users,
  Activity,
  Bell,
  ListChecks,
  FilePlus2,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowLeft,
  FolderOpen,
  Flag,
  AlertTriangle,
  Clock,
  FileText,
  ShieldAlert,
  MinusCircle,
  Pencil,
  UploadCloud,
  Plus,
  CheckCircle2,
  PlayCircle,
  XCircle,
  X,
  Layers,
  EyeOff,
  Building2,
  ArrowRight,
  Loader2,
  LogOut,
  LayoutGrid,
  Globe,
  Settings,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Static demo data
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "case-tracking", label: "Case Tracking", icon: ClipboardList },
  { key: "enrollment", label: "Enrollment", icon: UserPlus },
  { key: "tasks", label: "Tasks", icon: CheckSquare },
];

const QUICK_ACTIONS = [
  { label: "New Enrollment", sub: "Create patient", icon: FilePlus2 },
  { label: "View Tasks", sub: "Follow-up", icon: ListChecks },
];

const CASES = [
  { id: "41", member: "mem1985", name: "Charlie Lovejoy", status: "Draft Cases", programme: "Botox drug program" },
  { id: "160009538", member: "mem1985", name: "Demo Test", status: "Cases Under Plan Review", programme: "Bonofide" },
  { id: "160035784", member: "mem1985", name: "Charlie Lovejoy", status: "Cases Under Plan Review", programme: "Sun Tech" },
  { id: "159063349", member: "mem1985", name: "Charlie Lovejoy", status: "Cases Under Plan Review", programme: "Sun Tech" },
  { id: "30", member: "mem1985", name: "Charlie Lovejoy", status: "Draft Cases", programme: "Bonofide" },
];

const STATUS_STYLES = {
  "Draft Cases": "bg-slate-100 text-slate-600",
  "Cases Under Plan Review": "bg-indigo-100 text-indigo-600",
};

const STATUS_OPTIONS = ["All Statuses", "Draft Cases", "Cases Under Plan Review"];

// Case Tracking table data (Programme column intentionally removed)
const AVATAR_COLORS = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-slate-400",
  "bg-violet-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-pink-500",
];

const CASE_TRACKING_ROWS = [
  { patient: "Mini Mouse", memberId: "MEM19850041", caseId: "CASE-00041", programme: "Botox drug program", stage: "—", status: "Open", priority: "Normal", slaDue: "Jun 28, 2026", overdue: true, enrollmentDate: "Jun 28, 2026 2:46 PM", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Mickey Mouse", memberId: "MEM19850040", caseId: "CASE-00040", programme: "Botox drug program", stage: "Data & Intake", status: "Open", priority: "Normal", slaDue: "Jun 28, 2026", overdue: true, enrollmentDate: "Jun 28, 2026 1:20 PM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Madmax G Madmax", memberId: "MEM19850038", caseId: "CASE-00038", programme: "Bonofide", stage: "—", status: "Open", priority: "Normal", slaDue: "Jun 28, 2026", overdue: true, enrollmentDate: "Jun 27, 2026 9:01 PM", paStatus: "Approved", eligibilityStatus: "success", paRequired: true, intakeChannel: "API" },
  { patient: "Disney World", memberId: "MEM19850035", caseId: "CASE-00035", programme: "Sun Tech", stage: "Benefits Investigation", status: "Open", priority: "Low", slaDue: "Jul 1, 2026", overdue: true, enrollmentDate: "Jun 24, 2026 10:35 AM", paStatus: "Denied", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Santosh Test Nair", memberId: "MEM19850034", caseId: "CASE-00034", programme: "Bonofide", stage: "Data & Intake", status: "Open", priority: "Normal", slaDue: "Jun 24, 2026", overdue: true, enrollmentDate: "Jun 24, 2026 9:56 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Unknown", memberId: "MEM19850033", caseId: "CASE-00033", programme: "Sun Tech", stage: "Enrollment", status: "Open", priority: "Normal", slaDue: "Jun 24, 2026", overdue: true, enrollmentDate: "Jun 24, 2026 3:55 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "Embedded UI" },
  { patient: "Jack Mark", memberId: "MEM19850032", caseId: "CASE-00032", programme: "Sun Tech", stage: "Treatment Scheduling", status: "Open", priority: "Normal", slaDue: "Jun 28, 2026", overdue: true, enrollmentDate: "Jun 24, 2026 3:54 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Jackson Smith", memberId: "MEM19850031", caseId: "CASE-00031", programme: "Bonofide", stage: "Coordination", status: "Open", priority: "High", slaDue: "Jul 5, 2026", overdue: true, enrollmentDate: "Jun 23, 2026 4:47 PM", paStatus: "Partially Approved", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Krish Watson", memberId: "MEM19850030", caseId: "CASE-00030", programme: "Bonofide", stage: "—", status: "Open", priority: "High", slaDue: "Jun 23, 2026", overdue: true, enrollmentDate: "Jun 23, 2026 4:28 PM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Emma Mark", memberId: "MEM19850029", caseId: "CASE-00029", programme: "Sun Tech", stage: "Benefits Investigation", status: "Open", priority: "High", slaDue: "Jun 25, 2026", overdue: true, enrollmentDate: "Jun 23, 2026 4:07 PM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "Embedded UI" },
];

// ---------------------------------------------------------------------------
// Core platform — Prior Authorization deep-link screen
// (separate module, reached only via a Task deep link — scoped to this screen only)
// ---------------------------------------------------------------------------

const CORE_NAV_ITEMS = ["Cases", "Patients", "Users"];

// Patients list — same people as CASE_TRACKING_ROWS so the Cases/Enrolments
// sub-tables on the patient detail view can link straight through.
const PATIENTS = [
  { name: "Emma Mark", mrn: "MRN-00027", email: "john.anderson_55@yopmail.com", phone: "7777788888", dob: "June 22, 2026", gender: "Female", status: "Active", caseId: "CASE-00029", enrolmentId: "ENR-0048" },
  { name: "Unknown", mrn: "MRN-00031", email: "—", phone: "—", dob: "—", gender: "Unknown", status: "Active", caseId: "CASE-00033", enrolmentId: "ENR-809DDB8C" },
  { name: "Jackson Smith", mrn: "MRN-00008", email: "naoh.field4@yopmail.com", phone: "1111111111", dob: "September 7, 2000", gender: "Male", status: "Active", caseId: "CASE-00031", enrolmentId: "ENR-0052" },
  { name: "Santosh Test Nair", mrn: "MRN-00026", email: "naoh.field3@yopmail.com", phone: "—", dob: "—", gender: "Unknown", status: "Active", caseId: "CASE-00034", enrolmentId: "ENR-646F33E6" },
  { name: "Krish Watson", mrn: "MRN-00028", email: "krish@gmail.com", phone: "8778988776", dob: "June 18, 2026", gender: "Male", status: "Active", caseId: "CASE-00030", enrolmentId: "ENR-A5C38E9C" },
  { name: "Mickey Mouse", mrn: "MRN-00037", email: "mickey.mouse@allfreemail.net", phone: "1234567890", dob: "June 26, 2000", gender: "Male", status: "Active", caseId: "CASE-00040", enrolmentId: "ENR-0061" },
  { name: "Mini Mouse", mrn: "MRN-00039", email: "mini.mouse@allfreemail.net", phone: "6673516560", dob: "June 22, 2026", gender: "Unknown", status: "Active", caseId: "CASE-00041", enrolmentId: "ENR-0062" },
  { name: "Madmax G Madmax", mrn: "MRN-00019", email: "naoh.field1@yopmail.com", phone: "—", dob: "June 12, 2026", gender: "Male", status: "Active", caseId: "CASE-00038", enrolmentId: "ENR-0059" },
  { name: "Disney World", mrn: "MRN-00020", email: "naoh.field2@yopmail.com", phone: "—", dob: "January 20, 2003", gender: "Male", status: "Active", caseId: "CASE-00035", enrolmentId: "ENR-0053" },
  { name: "Jack Mark", mrn: "MRN-00014", email: "rendell.jamar@allwebemails.com", phone: "—", dob: "January 20, 2003", gender: "Male", status: "Active", caseId: "CASE-00032", enrolmentId: "" },
];

// The 6-step Prior Authorization pipeline used on the Core case screen, for every case.
const CORE_STAGE_LABELS = ["Data & Intake", "Coverage Determination", "Benefits Investigation", "Prior Authorization", "PA Review", "Appeals"];

const PA_QUESTIONS = [
  { id: 1, text: "Has the patient tried and failed a preferred alternative therapy?" },
  { id: 2, text: "What is the patient's current weight (kg) for dosing calculation?" },
  { id: 3, text: "Is there documented evidence of muscle spasticity in the target area?" },
  { id: 4, text: "Has the prescriber attached supporting clinical notes for this request?" },
  { id: 5, text: "Any additional comments for the payer's review team?" },
];

// Fixed demo answers for cases whose PA has already been decided — shown
// read-only, so a resolved case doesn't present the same blank question flow
// as an unanswered one.
const PA_QUESTION_ANSWERS = [
  "Yes — patient failed a 3-month trial of a preferred alternative therapy due to inadequate response.",
  "72 kg",
  "Yes — documented in the clinical notes submitted with this case.",
  "Yes — supporting clinical notes were attached at submission.",
  "No additional comments.",
];

const PA_STATUS_STYLES = {
  "Case Under Plan Review": { pill: "border-amber-200 bg-amber-50 text-amber-600", icon: Clock },
  Approved: { pill: "border-green-200 bg-green-50 text-green-600", icon: CheckCircle2 },
  Denied: { pill: "border-red-200 bg-red-50 text-red-600", icon: XCircle },
  "Partially Approved": { pill: "border-orange-200 bg-orange-50 text-orange-600", icon: AlertTriangle },
};

// Tasks — PA Questions / PA Status are the new, most-used types; existing generic
// types (signature, document_request, other) are kept as-is for other workflows.
const TASKS = [
  { title: "Answer PA Questions", type: "pa_questions", caseId: "CASE-00041", programme: "Botox drug program", priority: "Normal", status: "Pending", dueDate: "Jul 2, 2026", createdAt: "Jun 28, 2026" },
  { title: "PA Status", type: "pa_status", caseId: "CASE-00038", programme: "Bonofide", priority: "Normal", status: "Pending", dueDate: "—", createdAt: "Jun 27, 2026" },
  { title: "asa", type: "signature", caseId: "CASE-00041", programme: "Botox drug program", priority: "Normal", status: "Acknowledged", dueDate: "—", createdAt: "Jun 28, 2026" },
  { title: "Signature Required", type: "signature", caseId: "CASE-00030", programme: "Bonofide", priority: "Normal", status: "Responded", dueDate: "Jun 24, 2026", createdAt: "Jun 24, 2026" },
  { title: "Submit docs", type: "document_request", caseId: "CASE-00024", programme: "Bonofide", priority: "Normal", status: "Responded", dueDate: "Jun 24, 2026", createdAt: "Jun 23, 2026" },
  { title: "test test", type: "document_request", caseId: "CASE-00025", programme: "Sun Tech", priority: "Normal", status: "Completed", dueDate: "Jun 23, 2026", createdAt: "Jun 23, 2026" },
  { title: "PA Document upload", type: "document_request", caseId: "CASE-00016", programme: "Bonofide", priority: "High", status: "Completed", dueDate: "Jun 22, 2026", createdAt: "Jun 21, 2026" },
  { title: "Test Document", type: "document_request", caseId: "CASE-00009", programme: "Sun Tech", priority: "Normal", status: "Responded", dueDate: "Jun 14, 2026", createdAt: "Jun 13, 2026" },
  { title: "dbfb", type: "other", caseId: "CASE-00009", programme: "Sun Tech", priority: "Normal", status: "Pending", dueDate: "Jun 13, 2026", createdAt: "Jun 13, 2026" },
  { title: "Dummy Document", type: "document_request", caseId: "CASE-00009", programme: "Sun Tech", priority: "Normal", status: "Responded", dueDate: "Jun 12, 2026", createdAt: "Jun 13, 2026" },
];

const TASK_STATUS_STYLES = {
  Acknowledged: "border-amber-200 bg-amber-50 text-amber-600",
  Responded: "border-sky-200 bg-sky-50 text-sky-600",
  Completed: "border-green-200 bg-green-50 text-green-600",
  Pending: "border-slate-200 bg-slate-100 text-slate-500",
};

// Users who have access to the Enrollment Portal for this partner —
// only visible to the AnvayaRx superadmin, not the partner user themselves.
const ENROLLMENT_USERS_ABC = [
  { id: "abc-u1", name: "Testuser One", role: "All Portal Role", email: "muskan3011kumari@gmail.com", status: "Active", invited: "Jul 8, 2026" },
  { id: "abc-u2", name: "Aa Aa", role: "Enrollment Admin", email: "sb6qnxmmir@ozsaip.com", status: "Active", invited: "Jun 27, 2026" },
  { id: "abc-u3", name: "Aa Aa", role: "All Portal Role", email: "sb6qnxmmir@ozsaip.com", status: "Active", invited: "Jun 27, 2026" },
  { id: "abc-u4", name: "Test Test", role: "Enrollment Admin", email: "bokog59490@adsprite.com", status: "Active", invited: "Jun 24, 2026" },
  { id: "abc-u5", name: "Emma Mark", role: "Enrollment Admin", email: "john.anderson_55@yopmail.com", status: "Active", invited: "Jun 23, 2026" },
  { id: "abc-u6", name: "Mas Mas", role: "Enrollment Admin", email: "mas@d.com", status: "Active", invited: "Jun 21, 2026" },
  { id: "abc-u7", name: "Pqr Test", role: "All Portal Role", email: "pqr@yopmail.com", status: "Active", invited: "Jun 15, 2026" },
  { id: "abc-u8", name: "Jay Bafna", role: "All Portal Role", email: "jaybafna@yopmail.com", status: "Active", invited: "Jun 14, 2026" },
  { id: "abc-u9", name: "Abc", role: "Enrollment Admin", email: "abc@yopmail.com", status: "Active", invited: "Jun 10, 2026" },
  { id: "abc-u10", name: "Xyz Test", role: "All Portal Role", email: "xyz@yopmail.com", status: "Active", invited: "Jun 10, 2026" },
];

const ENROLLMENT_USERS_DEF = [
  { id: "def-u1", name: "Def Admin", role: "Enrollment Admin", email: "admin@partnerdef.com", status: "Active", invited: "Jun 1, 2026" },
  { id: "def-u2", name: "Devon Clarke", role: "All Portal Role", email: "devon.clarke@partnerdef.com", status: "Active", invited: "Jul 5, 2026" },
  { id: "def-u3", name: "Priya Shah", role: "Enrollment Admin", email: "priya.shah@partnerdef.com", status: "Active", invited: "Jun 29, 2026" },
  { id: "def-u4", name: "Wesley Kim", role: "All Portal Role", email: "wesley.kim@partnerdef.com", status: "Active", invited: "Jun 26, 2026" },
  { id: "def-u5", name: "Nora Patel", role: "Enrollment Admin", email: "nora.patel@partnerdef.com", status: "Active", invited: "Jun 22, 2026" },
  { id: "def-u6", name: "Ravi Desai", role: "All Portal Role", email: "ravi.desai@partnerdef.com", status: "Active", invited: "Jun 18, 2026" },
  { id: "def-u7", name: "Lena Brooks", role: "Enrollment Admin", email: "lena.brooks@partnerdef.com", status: "Active", invited: "Jun 15, 2026" },
];

const ENROLLMENT_USERS_GHI = [
  { id: "ghi-u1", name: "Ghi Admin", role: "Enrollment Admin", email: "admin@partnerghi.com", status: "Active", invited: "Jun 20, 2026" },
  { id: "ghi-u2", name: "Talia Reyes", role: "All Portal Role", email: "talia.reyes@partnerghi.com", status: "Active", invited: "Jul 2, 2026" },
  { id: "ghi-u3", name: "Sam O'Connor", role: "Enrollment Admin", email: "sam.oconnor@partnerghi.com", status: "Active", invited: "Jun 27, 2026" },
  { id: "ghi-u4", name: "Priya Kapoor", role: "All Portal Role", email: "priya.kapoor@partnerghi.com", status: "Active", invited: "Jun 24, 2026" },
  { id: "ghi-u5", name: "Blake Turner", role: "Enrollment Admin", email: "blake.turner@partnerghi.com", status: "Active", invited: "Jun 21, 2026" },
  { id: "ghi-u6", name: "Yuki Tanaka", role: "All Portal Role", email: "yuki.tanaka@partnerghi.com", status: "Active", invited: "Jun 19, 2026" },
];

function getEnrollmentUsers(partner) {
  if (partner === "Partner DEF") return ENROLLMENT_USERS_DEF;
  if (partner === "Partner GHI") return ENROLLMENT_USERS_GHI;
  return ENROLLMENT_USERS_ABC;
}

const USER_ROLE_OPTIONS = ["All Portal Role", "Enrollment Admin"];

const PRIORITY_STYLES = {
  Normal: "border-indigo-200 text-indigo-600 bg-white",
  Low: "border-slate-200 text-slate-500 bg-white",
  High: "border-orange-200 text-orange-600 bg-white",
};

// Enrollments list data (Programme + Submitted Via columns intentionally removed)
// Case IDs line up with CASE_TRACKING_ROWS so "open linked case" can jump straight there.
const ENROLLMENT_STATUS_STYLES = {
  Approved: { pill: "bg-green-50 text-green-600 border-green-200", icon: CheckCircle2 },
  Draft: { pill: "bg-slate-100 text-slate-500 border-slate-200", icon: FileText },
  Submitted: { pill: "bg-indigo-50 text-indigo-600 border-indigo-200", icon: Clock },
};

const ENROLLMENTS = [
  { patient: "Mini Mouse", enrollmentId: "ENR-0062", caseId: "CASE-00041", status: "Approved", priority: "Normal", createdAt: "Jun 28, 2026 2:46 PM" },
  { patient: "Mickey Mouse", enrollmentId: "ENR-0061", caseId: "CASE-00040", status: "Approved", priority: "Normal", createdAt: "Jun 28, 2026 1:18 PM" },
  { patient: "Madmax G Madmax", enrollmentId: "ENR-0059", caseId: "CASE-00038", status: "Approved", priority: "Normal", createdAt: "Jun 27, 2026 9:00 PM" },
  { patient: "—", enrollmentId: "ENR-0054", caseId: "—", status: "Draft", priority: "Normal", createdAt: "Jun 24, 2026 12:22 PM" },
  { patient: "Santosh Test Nair Test", enrollmentId: "ENR-646F33E6", caseId: "CASE-00034", status: "Approved", priority: "Normal", createdAt: "Jun 24, 2026 9:56 AM" },
  { patient: "Disney World", enrollmentId: "ENR-0053", caseId: "CASE-00035", status: "Approved", priority: "Low", createdAt: "Jun 24, 2026 9:04 AM" },
  { patient: "—", enrollmentId: "ENR-809DDB8C", caseId: "CASE-00033", status: "Approved", priority: "Normal", createdAt: "Jun 24, 2026 3:55 AM" },
  { patient: "—", enrollmentId: "ENR-A5C38E9C", caseId: "CASE-00032", status: "Approved", priority: "Normal", createdAt: "Jun 24, 2026 3:54 AM" },
  { patient: "Jackson Smith", enrollmentId: "ENR-0052", caseId: "CASE-00031", status: "Approved", priority: "High", createdAt: "Jun 23, 2026 4:44 PM" },
  { patient: "Helen Garth", enrollmentId: "ENR-0051", caseId: "—", status: "Submitted", priority: "Normal", createdAt: "Jun 23, 2026 4:42 PM" },
];

// ---------------------------------------------------------------------------
// Partner DEF — independent dataset, same shape as Partner ABC's, so every
// screen that reads it works identically once the right partner is scoped in.
// ---------------------------------------------------------------------------

const CASE_TRACKING_ROWS_DEF = [
  { patient: "Rohan Mehta", memberId: "MEMDEF10041", caseId: "CASE-DEF-041", programme: "Rinvoq", stage: "Prior Authorization", status: "Open", priority: "Normal", slaDue: "Jul 2, 2026", overdue: false, enrollmentDate: "Jun 30, 2026 9:12 AM", eligibilityStatus: "success", paRequired: true, intakeChannel: "API" },
  { patient: "Sara Kim", memberId: "MEMDEF10040", caseId: "CASE-DEF-040", programme: "Trulicity", stage: "—", status: "Open", priority: "Normal", slaDue: "Jun 29, 2026", overdue: true, enrollmentDate: "Jun 28, 2026 3:10 PM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "Embedded UI" },
  { patient: "Wei Zhang", memberId: "MEMDEF10039", caseId: "CASE-DEF-039", programme: "Xolair", stage: "Benefits Investigation", status: "Open", priority: "High", slaDue: "Jul 1, 2026", overdue: false, enrollmentDate: "Jun 27, 2026 11:40 AM", paStatus: "Approved", eligibilityStatus: "success", paRequired: true, intakeChannel: "API" },
  { patient: "Amara Obi", memberId: "MEMDEF10038", caseId: "CASE-DEF-038", programme: "Rinvoq", stage: "Enrollment", status: "Open", priority: "Normal", slaDue: "Jun 26, 2026", overdue: true, enrollmentDate: "Jun 25, 2026 8:05 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "Embedded UI" },
  { patient: "Lucas Ferreira", memberId: "MEMDEF10037", caseId: "CASE-DEF-037", programme: "Trulicity", stage: "Data & Intake", status: "Open", priority: "Low", slaDue: "Jul 3, 2026", overdue: false, enrollmentDate: "Jun 24, 2026 2:30 PM", eligibilityStatus: "success", paRequired: false, intakeChannel: "API" },
  { patient: "Priya Nair", memberId: "MEMDEF10036", caseId: "CASE-DEF-036", programme: "Xolair", stage: "Benefits Investigation", status: "Open", priority: "High", slaDue: "Jun 27, 2026", overdue: true, enrollmentDate: "Jun 23, 2026 4:15 PM", paStatus: "Denied", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Tom Becker", memberId: "MEMDEF10035", caseId: "CASE-DEF-035", programme: "Rinvoq", stage: "—", status: "Open", priority: "Normal", slaDue: "Jun 25, 2026", overdue: true, enrollmentDate: "Jun 22, 2026 10:50 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Nadia Hassan", memberId: "MEMDEF10034", caseId: "CASE-DEF-034", programme: "Trulicity", stage: "Treatment Scheduling", status: "Open", priority: "Normal", slaDue: "Jun 29, 2026", overdue: false, enrollmentDate: "Jun 21, 2026 1:05 PM", paStatus: "Partially Approved", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
];

const PATIENTS_DEF = [
  { name: "Rohan Mehta", mrn: "MRN-DEF-041", email: "rohan.mehta@yopmail.com", phone: "9012345678", dob: "March 4, 1988", gender: "Male", status: "Active", caseId: "CASE-DEF-041", enrolmentId: "ENR-DEF-041" },
  { name: "Sara Kim", mrn: "MRN-DEF-040", email: "sara.kim@yopmail.com", phone: "9012345677", dob: "—", gender: "Female", status: "Active", caseId: "CASE-DEF-040", enrolmentId: "ENR-DEF-040" },
  { name: "Wei Zhang", mrn: "MRN-DEF-039", email: "wei.zhang@yopmail.com", phone: "9012345676", dob: "July 19, 1975", gender: "Male", status: "Active", caseId: "CASE-DEF-039", enrolmentId: "ENR-DEF-039" },
  { name: "Amara Obi", mrn: "MRN-DEF-038", email: "amara.obi@yopmail.com", phone: "—", dob: "—", gender: "Female", status: "Active", caseId: "CASE-DEF-038", enrolmentId: "ENR-DEF-038" },
  { name: "Lucas Ferreira", mrn: "MRN-DEF-037", email: "lucas.ferreira@yopmail.com", phone: "9012345674", dob: "Nov 2, 1992", gender: "Male", status: "Active", caseId: "CASE-DEF-037", enrolmentId: "ENR-DEF-037" },
  { name: "Priya Nair", mrn: "MRN-DEF-036", email: "priya.nair@yopmail.com", phone: "9012345673", dob: "Jan 28, 1983", gender: "Female", status: "Active", caseId: "CASE-DEF-036", enrolmentId: "ENR-DEF-036" },
  { name: "Tom Becker", mrn: "MRN-DEF-035", email: "tom.becker@yopmail.com", phone: "—", dob: "—", gender: "Male", status: "Active", caseId: "CASE-DEF-035", enrolmentId: "ENR-DEF-035" },
  { name: "Nadia Hassan", mrn: "MRN-DEF-034", email: "nadia.hassan@yopmail.com", phone: "9012345671", dob: "May 14, 1990", gender: "Female", status: "Active", caseId: "CASE-DEF-034", enrolmentId: "ENR-DEF-034" },
];

const CASES_DEF = [
  { id: "DEF-041", member: "memdef10041", name: "Rohan Mehta", status: "Cases Under Plan Review", programme: "Rinvoq" },
  { id: "DEF-040", member: "memdef10040", name: "Sara Kim", status: "Draft Cases", programme: "Trulicity" },
  { id: "DEF-039", member: "memdef10039", name: "Wei Zhang", status: "Cases Under Plan Review", programme: "Xolair" },
  { id: "DEF-038", member: "memdef10038", name: "Amara Obi", status: "Draft Cases", programme: "Rinvoq" },
  { id: "DEF-037", member: "memdef10037", name: "Lucas Ferreira", status: "Cases Under Plan Review", programme: "Trulicity" },
];

const ENROLLMENTS_DEF = [
  { patient: "Rohan Mehta", enrollmentId: "ENR-DEF-041", caseId: "CASE-DEF-041", status: "Approved", priority: "Normal", createdAt: "Jun 30, 2026 9:12 AM" },
  { patient: "Sara Kim", enrollmentId: "ENR-DEF-040", caseId: "CASE-DEF-040", status: "Submitted", priority: "Normal", createdAt: "Jun 28, 2026 3:10 PM" },
  { patient: "Wei Zhang", enrollmentId: "ENR-DEF-039", caseId: "CASE-DEF-039", status: "Approved", priority: "High", createdAt: "Jun 27, 2026 11:40 AM" },
  { patient: "Amara Obi", enrollmentId: "ENR-DEF-038", caseId: "CASE-DEF-038", status: "Draft", priority: "Normal", createdAt: "Jun 25, 2026 8:05 AM" },
  { patient: "Lucas Ferreira", enrollmentId: "ENR-DEF-037", caseId: "CASE-DEF-037", status: "Approved", priority: "Low", createdAt: "Jun 24, 2026 2:30 PM" },
  { patient: "Priya Nair", enrollmentId: "ENR-DEF-036", caseId: "CASE-DEF-036", status: "Approved", priority: "High", createdAt: "Jun 23, 2026 4:15 PM" },
  { patient: "Tom Becker", enrollmentId: "ENR-DEF-035", caseId: "CASE-DEF-035", status: "Draft", priority: "Normal", createdAt: "Jun 22, 2026 10:50 AM" },
  { patient: "Nadia Hassan", enrollmentId: "ENR-DEF-034", caseId: "CASE-DEF-034", status: "Approved", priority: "Normal", createdAt: "Jun 21, 2026 1:05 PM" },
];

const TASKS_DEF = [
  { title: "Answer PA Questions", type: "pa_questions", caseId: "CASE-DEF-041", programme: "Rinvoq", priority: "Normal", status: "Pending", dueDate: "Jul 3, 2026", createdAt: "Jun 30, 2026" },
  { title: "PA Status", type: "pa_status", caseId: "CASE-DEF-039", programme: "Xolair", priority: "High", status: "Pending", dueDate: "—", createdAt: "Jun 27, 2026" },
  { title: "Signature Required", type: "signature", caseId: "CASE-DEF-035", programme: "Rinvoq", priority: "Normal", status: "Responded", dueDate: "Jun 24, 2026", createdAt: "Jun 22, 2026" },
  { title: "Submit docs", type: "document_request", caseId: "CASE-DEF-036", programme: "Xolair", priority: "High", status: "Responded", dueDate: "Jun 26, 2026", createdAt: "Jun 23, 2026" },
  { title: "Verify eligibility", type: "other", caseId: "CASE-DEF-040", programme: "Trulicity", priority: "Normal", status: "Pending", dueDate: "Jun 29, 2026", createdAt: "Jun 28, 2026" },
];

// ---------------------------------------------------------------------------
// Partner GHI — independent dataset, smaller book of business than ABC/DEF.
// ---------------------------------------------------------------------------

const CASE_TRACKING_ROWS_GHI = [
  { patient: "Grace Lin", memberId: "MEMGHI20031", caseId: "CASE-GHI-031", programme: "Enbrel", stage: "Prior Authorization", status: "Open", priority: "Normal", slaDue: "Jul 4, 2026", overdue: false, enrollmentDate: "Jul 1, 2026 10:20 AM", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Marcus Webb", memberId: "MEMGHI20030", caseId: "CASE-GHI-030", programme: "Cosentyx", stage: "—", status: "Open", priority: "Normal", slaDue: "Jun 30, 2026", overdue: true, enrollmentDate: "Jun 29, 2026 9:00 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Elena Petrova", memberId: "MEMGHI20029", caseId: "CASE-GHI-029", programme: "Enbrel", stage: "Benefits Investigation", status: "Open", priority: "High", slaDue: "Jul 2, 2026", overdue: false, enrollmentDate: "Jun 28, 2026 3:45 PM", paStatus: "Approved", eligibilityStatus: "success", paRequired: true, intakeChannel: "Embedded UI" },
  { patient: "Diego Ramirez", memberId: "MEMGHI20028", caseId: "CASE-GHI-028", programme: "Cosentyx", stage: "Enrollment", status: "Open", priority: "Normal", slaDue: "Jun 27, 2026", overdue: true, enrollmentDate: "Jun 26, 2026 11:10 AM", eligibilityStatus: "failed", paRequired: false, intakeChannel: "API" },
  { patient: "Fatima Ali", memberId: "MEMGHI20027", caseId: "CASE-GHI-027", programme: "Enbrel", stage: "Data & Intake", status: "Open", priority: "Low", slaDue: "Jul 5, 2026", overdue: false, enrollmentDate: "Jun 25, 2026 1:25 PM", eligibilityStatus: "success", paRequired: false, intakeChannel: "Embedded UI" },
  { patient: "Noah Bennett", memberId: "MEMGHI20026", caseId: "CASE-GHI-026", programme: "Cosentyx", stage: "Benefits Investigation", status: "Open", priority: "High", slaDue: "Jun 28, 2026", overdue: true, enrollmentDate: "Jun 24, 2026 4:50 PM", paStatus: "Denied", eligibilityStatus: "success", paRequired: true, intakeChannel: "API" },
];

const PATIENTS_GHI = [
  { name: "Grace Lin", mrn: "MRN-GHI-031", email: "grace.lin@yopmail.com", phone: "8123456789", dob: "Feb 11, 1986", gender: "Female", status: "Active", caseId: "CASE-GHI-031", enrolmentId: "ENR-GHI-031" },
  { name: "Marcus Webb", mrn: "MRN-GHI-030", email: "marcus.webb@yopmail.com", phone: "—", dob: "—", gender: "Male", status: "Active", caseId: "CASE-GHI-030", enrolmentId: "ENR-GHI-030" },
  { name: "Elena Petrova", mrn: "MRN-GHI-029", email: "elena.petrova@yopmail.com", phone: "8123456787", dob: "Sep 30, 1979", gender: "Female", status: "Active", caseId: "CASE-GHI-029", enrolmentId: "ENR-GHI-029" },
  { name: "Diego Ramirez", mrn: "MRN-GHI-028", email: "diego.ramirez@yopmail.com", phone: "—", dob: "—", gender: "Male", status: "Active", caseId: "CASE-GHI-028", enrolmentId: "ENR-GHI-028" },
  { name: "Fatima Ali", mrn: "MRN-GHI-027", email: "fatima.ali@yopmail.com", phone: "8123456785", dob: "Apr 6, 1994", gender: "Female", status: "Active", caseId: "CASE-GHI-027", enrolmentId: "ENR-GHI-027" },
  { name: "Noah Bennett", mrn: "MRN-GHI-026", email: "noah.bennett@yopmail.com", phone: "8123456784", dob: "Dec 21, 1981", gender: "Male", status: "Active", caseId: "CASE-GHI-026", enrolmentId: "ENR-GHI-026" },
];

const CASES_GHI = [
  { id: "GHI-031", member: "memghi20031", name: "Grace Lin", status: "Cases Under Plan Review", programme: "Enbrel" },
  { id: "GHI-030", member: "memghi20030", name: "Marcus Webb", status: "Draft Cases", programme: "Cosentyx" },
  { id: "GHI-029", member: "memghi20029", name: "Elena Petrova", status: "Cases Under Plan Review", programme: "Enbrel" },
  { id: "GHI-028", member: "memghi20028", name: "Diego Ramirez", status: "Draft Cases", programme: "Cosentyx" },
  { id: "GHI-027", member: "memghi20027", name: "Fatima Ali", status: "Cases Under Plan Review", programme: "Enbrel" },
];

const ENROLLMENTS_GHI = [
  { patient: "Grace Lin", enrollmentId: "ENR-GHI-031", caseId: "CASE-GHI-031", status: "Approved", priority: "Normal", createdAt: "Jul 1, 2026 10:20 AM" },
  { patient: "Marcus Webb", enrollmentId: "ENR-GHI-030", caseId: "CASE-GHI-030", status: "Draft", priority: "Normal", createdAt: "Jun 29, 2026 9:00 AM" },
  { patient: "Elena Petrova", enrollmentId: "ENR-GHI-029", caseId: "CASE-GHI-029", status: "Approved", priority: "High", createdAt: "Jun 28, 2026 3:45 PM" },
  { patient: "Diego Ramirez", enrollmentId: "ENR-GHI-028", caseId: "CASE-GHI-028", status: "Submitted", priority: "Normal", createdAt: "Jun 26, 2026 11:10 AM" },
  { patient: "Fatima Ali", enrollmentId: "ENR-GHI-027", caseId: "CASE-GHI-027", status: "Approved", priority: "Low", createdAt: "Jun 25, 2026 1:25 PM" },
  { patient: "Noah Bennett", enrollmentId: "ENR-GHI-026", caseId: "CASE-GHI-026", status: "Approved", priority: "High", createdAt: "Jun 24, 2026 4:50 PM" },
];

const TASKS_GHI = [
  { title: "Answer PA Questions", type: "pa_questions", caseId: "CASE-GHI-031", programme: "Enbrel", priority: "Normal", status: "Pending", dueDate: "Jul 5, 2026", createdAt: "Jul 1, 2026" },
  { title: "PA Status", type: "pa_status", caseId: "CASE-GHI-029", programme: "Enbrel", priority: "High", status: "Pending", dueDate: "—", createdAt: "Jun 28, 2026" },
  { title: "Submit docs", type: "document_request", caseId: "CASE-GHI-026", programme: "Cosentyx", priority: "High", status: "Responded", dueDate: "Jun 27, 2026", createdAt: "Jun 24, 2026" },
  { title: "Verify eligibility", type: "other", caseId: "CASE-GHI-030", programme: "Cosentyx", priority: "Normal", status: "Pending", dueDate: "Jun 30, 2026", createdAt: "Jun 29, 2026" },
];

// Looks up the right dataset bundle for whichever partner is currently scoped in.
function getPartnerDataset(partner) {
  if (partner === "Partner DEF") {
    return { caseRows: CASE_TRACKING_ROWS_DEF, patients: PATIENTS_DEF, dashboardCases: CASES_DEF, enrollments: ENROLLMENTS_DEF, tasks: TASKS_DEF };
  }
  if (partner === "Partner GHI") {
    return { caseRows: CASE_TRACKING_ROWS_GHI, patients: PATIENTS_GHI, dashboardCases: CASES_GHI, enrollments: ENROLLMENTS_GHI, tasks: TASKS_GHI };
  }
  // Default / "Partner ABC"
  return { caseRows: CASE_TRACKING_ROWS, patients: PATIENTS, dashboardCases: CASES, enrollments: ENROLLMENTS, tasks: TASKS };
}

const ENROLLMENT_TABS = [
  "Patient Information",
  "Patient Insurance",
  "Prescriber Information",
  "Diagnosis",
  "Prescription",
  "Prescriber Signature",
  "Submission",
];

// ---------------------------------------------------------------------------
// Mock enrollment data builders
// ---------------------------------------------------------------------------

function emptyEnrollmentData() {
  return {
    patient: { firstName: "", lastName: "", dob: "", gender: "", preferredLanguage: "", addressLine1: "", addressLine2: "", city: "", state: "", zip: "" },
    insurance: { primaryInsurance: "", primaryPolicyHolder: "", primaryPolicyId: "", primaryGroup: "", primaryPhoneType: "Mobile", primaryPhone: "", secondaryInsurance: "", secondaryPolicyHolder: "", secondaryPolicyId: "", secondaryGroup: "", secondaryPhoneType: "Mobile", secondaryPhone: "" },
    prescriber: { accountName: "", firstName: "", lastName: "", npi: "", stateLicense: "", taxId: "", phoneType: "Mobile", phone: "", faxType: "Mobile", fax: "", streetAddress: "", suite: "", city: "", state: "", zip: "" },
    diagnosis: { icd10: "", otherCode: "" },
    prescription: { drugName: "", dosageForm: "", routeOfAdministration: "", strength: "", strengthUnit: "", firstInfusion: false, secondInfusion: false, subsequentInfusion: false, refillQuantity: "", mostRecentDMT: "", allergies: "", sendEPrescription: false, otherDiagnosisCode: "" },
    signature: { certifiedName: "", date: "", agreed: false },
    submission: { priority: "Normal" },
  };
}

function mockEnrollmentDataFromCase(caseItem) {
  const parts = (caseItem?.patient || "Unknown Patient").split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "—";
  return {
    patient: {
      firstName,
      lastName,
      dob: "04/12/1985",
      gender: "Female",
      preferredLanguage: "English",
      addressLine1: "221B Baker Street",
      addressLine2: "",
      city: "Springfield",
      state: "IL",
      zip: "62704",
    },
    insurance: {
      primaryInsurance: "Anthem BlueCross",
      primaryPolicyHolder: caseItem?.patient || "",
      primaryPolicyId: caseItem?.memberId ? `${caseItem.memberId}-X` : "INVALID-ID",
      primaryGroup: "GRP-4521",
      primaryPhoneType: "Mobile",
      primaryPhone: "(555) 010-2938",
      secondaryInsurance: "",
      secondaryPolicyHolder: "",
      secondaryPolicyId: "",
      secondaryGroup: "",
      secondaryPhoneType: "Mobile",
      secondaryPhone: "",
    },
    prescriber: {
      accountName: caseItem?.programme || "Sun Tech Specialty Pharmacy",
      firstName: "Scot",
      lastName: "Lovejoy",
      npi: "1234567890",
      stateLicense: "IL-88213",
      taxId: "XX-XXXXXXX",
      phoneType: "Mobile",
      phone: "(555) 431-9020",
      faxType: "Mobile",
      fax: "(555) 431-9021",
      streetAddress: "400 Meridian Ave",
      suite: "Suite 220",
      city: "Springfield",
      state: "IL",
      zip: "62701",
    },
    diagnosis: { icd10: "G35 MS", otherCode: "" },
    prescription: {
      drugName: "Botox",
      dosageForm: "Injection",
      routeOfAdministration: "Intramuscular",
      strength: "100",
      strengthUnit: "units/vial",
      firstInfusion: false,
      secondInfusion: false,
      subsequentInfusion: false,
      refillQuantity: "2",
      mostRecentDMT: "",
      allergies: "NKDA",
      sendEPrescription: true,
      otherDiagnosisCode: "",
    },
    signature: { certifiedName: "Scot Lovejoy", date: "06/28/2026", agreed: true },
    submission: { priority: caseItem?.priority || "Normal" },
  };
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function StatusChip({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function OpenStatusBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-white px-2.5 py-1 text-xs font-medium text-indigo-600">
      <FolderOpen size={12} /> Open
    </span>
  );
}

// Single source of truth for a case's processing status, derived from its
// eligibility/PA data — used by both the Case Tracking list and the case
// detail view so the two never disagree, and every case isn't "Eligibility Failed."
const CASE_STATUS_TONE_STYLES = {
  red: { className: "border-red-200 bg-red-50 text-red-600", icon: AlertTriangle },
  green: { className: "border-green-200 bg-green-50 text-green-600", icon: CheckCircle2 },
  orange: { className: "border-orange-200 bg-orange-50 text-orange-600", icon: AlertTriangle },
  amber: { className: "border-amber-200 bg-amber-50 text-amber-600", icon: Clock },
  blue: { className: "border-indigo-200 bg-indigo-50 text-indigo-600", icon: FileText },
};

function getCaseStatusInfo(caseItem) {
  if (caseItem.eligibilityStatus === "failed") {
    return { label: "Eligibility Failed - Member ID Invalid", tone: "red" };
  }
  if (caseItem.paStatus === "Approved") return { label: "Prior Authorization Approved", tone: "green" };
  if (caseItem.paStatus === "Denied") return { label: "Prior Authorization Denied", tone: "red" };
  if (caseItem.paStatus === "Partially Approved") return { label: "Prior Authorization Partially Approved", tone: "orange" };
  if (caseItem.paRequired) return { label: "Pending Prior Authorization", tone: "amber" };
  return { label: "In Benefits Investigation", tone: "blue" };
}

// Maps a case onto the same 6-pentagon pipeline used on the Core PA screen
// (Data & Intake, Coverage Determination, Benefits Investigation, Prior
// Authorization, PA Review, Appeals) so both portals always agree.
function getCoreStageIndex(caseItem) {
  if (caseItem.eligibilityStatus === "failed") return 1; // stuck at Coverage Determination
  if (caseItem.paStatus || caseItem.paRequired) return 3; // in/through Prior Authorization
  return 2; // cleared eligibility, sitting in Benefits Investigation
}

function CaseStatusBadge({ caseItem }) {
  const { label, tone } = getCaseStatusInfo(caseItem);
  const style = CASE_STATUS_TONE_STYLES[tone];
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${style.className}`}>
      <Icon size={12} /> {label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.Normal}`}>
      <Flag size={12} /> {priority}
    </span>
  );
}

// Programme is an AnvayaRx-internal concept — only ever shown in this superadmin
// portal, never surfaced to partner users in the other demo.
function ProgrammeBadge({ programme }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-600">
      {programme || "—"}
    </span>
  );
}

function EnrollmentStatusBadge({ status }) {
  const style = ENROLLMENT_STATUS_STYLES[status] || ENROLLMENT_STATUS_STYLES.Draft;
  const Icon = style.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${style.pill}`}>
      <Icon size={12} /> {status}
    </span>
  );
}

function SlaCell({ date, overdue }) {
  return (
    <div>
      <p className="text-sm text-slate-700">{date}</p>
      {overdue && <span className="mt-0.5 inline-block rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-semibold text-red-500">Overdue</span>}
    </div>
  );
}

function PatientAvatar({ name, colorClass }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white ${colorClass}`}>
      {initials}
    </span>
  );
}

function ProgressRing({ percent, color, size = 96, stroke = 8 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EEF0F4" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" />
    </svg>
  );
}

function Card({ className = "", children, onClick }) {
  return (
    <div onClick={onClick} className={`rounded-xl border border-slate-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

function FilterSelect({ label }) {
  return (
    <button className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
      {label}
      <ChevronDown size={12} className="text-slate-400" />
    </button>
  );
}

// ---- Form field primitives (used across the enrollment form) ----

function TextField({ label, required, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, required, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder || `Select ${label}`}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        rows={3}
        className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
      />
    </div>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-400" />
      {label}
    </label>
  );
}

function PhoneField({ label, typeValue, phoneValue, onTypeChange, onPhoneChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <div className="flex gap-2">
        <select value={typeValue} onChange={(e) => onTypeChange(e.target.value)} className="w-32 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none">
          <option>Mobile</option>
          <option>Home</option>
          <option>Work</option>
        </select>
        <input
          value={phoneValue}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="Phone number"
          className="flex-1 rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="relative my-2 flex items-center justify-center">
      <div className="h-px w-full bg-slate-200" />
      <span className="absolute bg-white px-3 text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Enrollment form tabs
// ---------------------------------------------------------------------------

function PatientInformationTab({ data, update }) {
  const d = data.patient;
  const set = (field) => (val) => update("patient", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Patient Information</h3>
      <div className="grid grid-cols-2 gap-5">
        <TextField label="First Name" required value={d.firstName} onChange={set("firstName")} />
        <TextField label="Last Name" required value={d.lastName} onChange={set("lastName")} />
        <TextField label="Date of Birth" required type="date" value={d.dob} onChange={set("dob")} />
        <SelectField label="Gender" value={d.gender} onChange={set("gender")} options={["Female", "Male", "Non-binary", "Prefer not to say"]} placeholder="Select Gender" />
        <SelectField label="Preferred Language" value={d.preferredLanguage} onChange={set("preferredLanguage")} options={["English", "Spanish", "French", "Mandarin"]} placeholder="Select Preferred Language" />
      </div>
      <SectionDivider label="Address" />
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Address Line 1" value={d.addressLine1} onChange={set("addressLine1")} placeholder="Street address" />
        <TextField label="Address Line 2" value={d.addressLine2} onChange={set("addressLine2")} placeholder="Apt, Suite, etc." />
        <TextField label="City" value={d.city} onChange={set("city")} />
        <SelectField label="State" value={d.state} onChange={set("state")} options={["IL", "NY", "CA", "TX", "FL"]} placeholder="Select State" />
        <TextField label="ZIP" value={d.zip} onChange={set("zip")} />
      </div>
    </div>
  );
}

function PatientInsuranceTab({ data, update }) {
  const d = data.insurance;
  const set = (field) => (val) => update("insurance", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Patient Insurance</h3>
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Primary Insurance" value={d.primaryInsurance} onChange={set("primaryInsurance")} />
        <TextField label="Primary Insurance Policy Holder" value={d.primaryPolicyHolder} onChange={set("primaryPolicyHolder")} />
        <TextField label="Primary Insurance Policy ID #" value={d.primaryPolicyId} onChange={set("primaryPolicyId")} />
        <TextField label="Group # (Primary)" value={d.primaryGroup} onChange={set("primaryGroup")} />
        <PhoneField label="Primary Insurance Phone #" typeValue={d.primaryPhoneType} phoneValue={d.primaryPhone} onTypeChange={set("primaryPhoneType")} onPhoneChange={set("primaryPhone")} />
      </div>
      <SectionDivider label="Secondary Insurance" />
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Secondary Insurance" value={d.secondaryInsurance} onChange={set("secondaryInsurance")} />
        <TextField label="Secondary Insurance Policy Holder" value={d.secondaryPolicyHolder} onChange={set("secondaryPolicyHolder")} />
        <TextField label="Secondary Insurance Policy ID #" value={d.secondaryPolicyId} onChange={set("secondaryPolicyId")} />
        <TextField label="Group # (Secondary)" value={d.secondaryGroup} onChange={set("secondaryGroup")} />
        <PhoneField label="Secondary Insurance Phone #" typeValue={d.secondaryPhoneType} phoneValue={d.secondaryPhone} onTypeChange={set("secondaryPhoneType")} onPhoneChange={set("secondaryPhone")} />
      </div>
    </div>
  );
}

function PrescriberInformationTab({ data, update }) {
  const d = data.prescriber;
  const set = (field) => (val) => update("prescriber", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Prescriber Information</h3>
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Account Name" value={d.accountName} onChange={set("accountName")} />
        <div />
        <TextField label="Prescriber First Name" required value={d.firstName} onChange={set("firstName")} />
        <TextField label="Prescriber Last Name" required value={d.lastName} onChange={set("lastName")} />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            <span className="mr-1 text-red-500">*</span>NPI #
          </label>
          <div className="flex gap-2">
            <input value={d.npi} onChange={(e) => set("npi")(e.target.value)} placeholder="NPI #" className="flex-1 rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none" />
            <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2.5 text-sm font-medium text-indigo-600 hover:bg-slate-50">
              <Search size={13} /> Lookup
            </button>
          </div>
        </div>
        <TextField label="State License #" value={d.stateLicense} onChange={set("stateLicense")} />
        <TextField label="Tax ID #" value={d.taxId} onChange={set("taxId")} />
        <PhoneField label="Phone #" typeValue={d.phoneType} phoneValue={d.phone} onTypeChange={set("phoneType")} onPhoneChange={set("phone")} />
        <PhoneField label="Fax #" typeValue={d.faxType} phoneValue={d.fax} onTypeChange={set("faxType")} onPhoneChange={set("fax")} />
        <TextField label="Street Address" value={d.streetAddress} onChange={set("streetAddress")} />
        <TextField label="Suite #" value={d.suite} onChange={set("suite")} />
        <TextField label="City" value={d.city} onChange={set("city")} />
        <SelectField label="State" value={d.state} onChange={set("state")} options={["IL", "NY", "CA", "TX", "FL"]} placeholder="Select State" />
        <TextField label="ZIP" value={d.zip} onChange={set("zip")} />
      </div>
    </div>
  );
}

function DiagnosisTab({ data, update }) {
  const d = data.diagnosis;
  const set = (field) => (val) => update("diagnosis", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Diagnosis</h3>
      <TextField label="ICD-10 Code (e.g. G35 MS)" value={d.icd10} onChange={set("icd10")} placeholder="Type code or diagnosis name..." />
      <TextField label="Other Diagnosis Code" value={d.otherCode} onChange={set("otherCode")} placeholder="Type code or diagnosis name..." />
    </div>
  );
}

function PrescriptionTab({ data, update }) {
  const d = data.prescription;
  const set = (field) => (val) => update("prescription", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Prescription</h3>

      {/* Drug details */}
      <div className="grid grid-cols-3 gap-5">
        <TextField label="Drug Name" value={d.drugName} onChange={set("drugName")} />
        <SelectField label="Dosage Form" value={d.dosageForm} onChange={set("dosageForm")} options={["Inhaler", "Tablet", "Injection", "Pen", "IV Infusion", "Capsule"]} placeholder="Select Dosage Form" />
        <SelectField label="Route of Administration" value={d.routeOfAdministration} onChange={set("routeOfAdministration")} options={["Inhaled", "Oral", "Subcutaneous", "Intramuscular", "Intravenous"]} placeholder="Select Route" />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <TextField label="Strength" value={d.strength} onChange={set("strength")} />
        <SelectField label="Strength Unit" value={d.strengthUnit} onChange={set("strengthUnit")} options={["mcg/mL", "mg", "mg/mL", "mcg", "units/vial"]} placeholder="Select Unit" />
        <div />
      </div>

      <SectionDivider label="Infusion / Refill" />
      <div className="flex flex-col gap-3">
        <CheckboxField label="First Infusion Rx: 150 mg" checked={d.firstInfusion} onChange={set("firstInfusion")} />
        <CheckboxField label="Second Infusion Rx: 450 mg" checked={d.secondInfusion} onChange={set("secondInfusion")} />
        <CheckboxField label="Subsequent Infusion Rx" checked={d.subsequentInfusion} onChange={set("subsequentInfusion")} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Refill (Quantity)" value={d.refillQuantity} onChange={set("refillQuantity")} />
        <TextField label="Most Recently Prescribed DMT" value={d.mostRecentDMT} onChange={set("mostRecentDMT")} />
      </div>
      <TextAreaField label="Allergies" value={d.allergies} onChange={set("allergies")} />
      <CheckboxField label="Send Electronic Prescription (State Law)" checked={d.sendEPrescription} onChange={set("sendEPrescription")} />
      <TextField label="Other Diagnosis Code (if applicable)" value={d.otherDiagnosisCode} onChange={set("otherDiagnosisCode")} placeholder="Type code or diagnosis name..." />
    </div>
  );
}

function PrescriberSignatureTab({ data, update }) {
  const d = data.signature;
  const set = (field) => (val) => update("signature", field, val);
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-sm font-bold text-slate-900">Prescriber Signature</h3>
      <div className="grid grid-cols-2 gap-5">
        <TextField label="Prescriber Name (typed signature)" value={d.certifiedName} onChange={set("certifiedName")} />
        <TextField label="Date" type="date" value={d.date} onChange={set("date")} />
      </div>
      <CheckboxField label="I certify the above information is accurate and this prescription is medically necessary." checked={d.agreed} onChange={set("agreed")} />
    </div>
  );
}

function SubmissionTab({ data, update }) {
  const d = data.submission;
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <UploadCloud size={14} className="text-indigo-500" /> Upload Consent Form (optional)
        </label>
        <button className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <UploadCloud size={13} /> Upload document (PDF only)
        </button>
      </div>
      <div className="w-64">
        <SelectField label="Priority" required value={d.priority} onChange={(v) => update("submission", "priority", v)} options={["Low", "Normal", "High"]} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Enrollment form shell (shared by New Enrollment + Update Case)
// ---------------------------------------------------------------------------

function EnrollmentForm({ mode, caseItem, enrollmentId, onBack }) {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(() => (mode === "create" ? emptyEnrollmentData() : mockEnrollmentDataFromCase(caseItem)));

  const update = (section, field, value) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const isLastTab = activeTab === ENROLLMENT_TABS.length - 1;
  const isViewOnly = mode === "view";
  const primaryLabel = mode === "update" ? "Update Case" : mode === "edit" ? "Save Changes" : "Create Enrollment";

  const title =
    mode === "update"
      ? `Update Case: ${caseItem?.caseId || ""}`
      : mode === "view"
      ? `Enrollment: ${enrollmentId || caseItem?.caseId || ""}`
      : mode === "edit"
      ? `Edit Enrollment: ${enrollmentId || ""}`
      : "New Enrollment";
  const subtitle =
    mode === "update"
      ? "Review and update the patient's enrollment information."
      : mode === "view"
      ? "Viewing a submitted enrollment. This record is read-only."
      : mode === "edit"
      ? "This enrollment is still in Draft — update it before submitting."
      : "Complete the patient intake form.";

  const tabContent = () => {
    switch (ENROLLMENT_TABS[activeTab]) {
      case "Patient Information":
        return <PatientInformationTab data={data} update={update} />;
      case "Patient Insurance":
        return <PatientInsuranceTab data={data} update={update} />;
      case "Prescriber Information":
        return <PrescriberInformationTab data={data} update={update} />;
      case "Diagnosis":
        return <DiagnosisTab data={data} update={update} />;
      case "Prescription":
        return <PrescriptionTab data={data} update={update} />;
      case "Prescriber Signature":
        return <PrescriberSignatureTab data={data} update={update} />;
      case "Submission":
        return <SubmissionTab data={data} update={update} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header — no top-level Programme selector */}
      <div className="flex items-start gap-3">
        <button onClick={onBack} className="mt-1 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-0">
        <div className="flex gap-6 overflow-x-auto border-b border-slate-200 px-5">
          {ENROLLMENT_TABS.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition ${
                idx === activeTab ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={`p-6 ${isViewOnly ? "pointer-events-none opacity-70" : ""}`}>{tabContent()}</div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 px-6 py-4">
          {isViewOnly ? (
            <button onClick={onBack} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Close
            </button>
          ) : (
            <>
              <button
                disabled={activeTab === 0}
                onClick={() => setActiveTab((t) => Math.max(0, t - 1))}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                Back
              </button>
              {isLastTab ? (
                <>
                  <button className="rounded-md border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                    Save as Draft
                  </button>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">{primaryLabel}</button>
                </>
              ) : (
                <>
                  <button className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">Save</button>
                  <button onClick={() => setActiveTab((t) => Math.min(ENROLLMENT_TABS.length - 1, t + 1))} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    Next
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------

function DashboardScreen({ onNewEnrollment, onViewTasks, dashboardCases, caseRows, tasks }) {
  const ACTION_HANDLERS = {
    "New Enrollment": onNewEnrollment,
    "View Tasks": onViewTasks,
  };

  const totalCases = caseRows.length;
  const ongoingCases = caseRows.filter((c) => c.status === "Open").length;
  const closedCases = totalCases - ongoingCases;
  const awaitingTasks = tasks.filter((t) => t.status === "Pending").length;

  const kpis = [
    { label: "Total Cases", value: totalCases, sub: "Overall caseload" },
    { label: "Ongoing Cases", value: ongoingCases, sub: "Open" },
    { label: "Awaiting Tasks", value: awaitingTasks, sub: `${tasks.length} total tasks` },
    { label: "Unread Messages", value: 0, sub: "0 threads" },
    { label: "Closed Cases", value: closedCases, sub: "Closed" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="px-4 py-4">
            <p className="text-xs text-slate-500">{k.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{k.value}</p>
            <p className="mt-1 text-[11px] text-slate-400">{k.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {QUICK_ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <Card
              key={a.label}
              onClick={ACTION_HANDLERS[a.label]}
              className="flex cursor-pointer items-center gap-3 px-4 py-4 transition hover:border-indigo-300 hover:shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <Icon size={16} className="text-indigo-600" />
              </span>
              <span>
                <p className="text-sm font-medium text-slate-900">{a.label}</p>
                <p className="text-xs text-slate-400">{a.sub}</p>
              </span>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Cases</h2>
        </div>

        {/* Filter bar — field name + example folded into the placeholder text itself, no separate label */}
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex w-36 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
            <Search size={12} className="text-slate-400" />
            <input placeholder="Case ID (e.g. 41)" className="w-full text-xs text-slate-600 placeholder:text-slate-400 outline-none" />
          </div>
          <div className="flex w-44 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
            <Search size={12} className="text-slate-400" />
            <input placeholder="Member ID (e.g. mem1985)" className="w-full text-xs text-slate-600 placeholder:text-slate-400 outline-none" />
          </div>
          <div className="flex w-44 items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
            <Search size={12} className="text-slate-400" />
            <input placeholder="Patient Name (e.g. Charlie Lovejoy)" className="w-full text-xs text-slate-600 placeholder:text-slate-400 outline-none" />
          </div>
          <div className="flex w-40 items-center justify-between gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
            <select className="w-full bg-transparent text-xs text-slate-600 outline-none">
              {STATUS_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={12} className="text-slate-400" />
          </div>
          <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">Apply</button>
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-50">Clear</button>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-100 text-left">
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">Case ID</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">Member ID</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">Patient Name</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">Programme</th>
                <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardCases.map((c, idx) => (
                <tr key={c.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50"} cursor-pointer hover:bg-indigo-50/40`}>
                  <td className="px-4 py-3 font-medium text-indigo-600">{c.id}</td>
                  <td className="px-4 py-3 text-slate-600">{c.member}</td>
                  <td className="px-4 py-3 text-slate-600">{c.name}</td>
                  <td className="px-4 py-3">
                    <ProgrammeBadge programme={c.programme} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Task Progress</h3>
            <button className="text-xs font-medium text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            <ProgressRing percent={100} color="#5145E5" />
            <p className="text-sm font-bold text-slate-900">100% On Time</p>
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            <p>Overdue: 0</p>
            <p>Due Today: 0</p>
            <p>Due This Week: 0</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Case Metrics</h3>
            <button className="text-xs font-medium text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            <ProgressRing percent={94} color="#28B473" />
            <p className="text-sm font-bold text-slate-900">94% Active</p>
          </div>
          <div className="mt-3 space-y-1 text-xs text-slate-500">
            <p>Open Cases: 17</p>
            <p>Closed: 1</p>
            <p>Processed: 0</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EnrollmentsListScreen({ onNew, onView, onEdit, enrollments, caseRows }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Enrollments</h1>
          <p className="mt-1 text-sm text-slate-500">Track and manage patient enrollment submissions across all programmes.</p>
        </div>
        <div className="flex items-center gap-2">
          <FilterSelect label="All Statuses" />
          <button onClick={onNew} className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            <Plus size={15} /> New Enrollment
          </button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Patient</th>
              <th className="px-4 py-3 font-semibold">Enrollment ID</th>
              <th className="px-4 py-3 font-semibold">Case ID</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((row, idx) => {
              const hasCase = row.caseId && row.caseId !== "—";
              const linkedCase = hasCase ? caseRows.find((c) => c.caseId === row.caseId) : null;
              return (
                <tr key={row.enrollmentId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <PatientAvatar name={row.patient === "—" ? "??" : row.patient} colorClass={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                      <span className="font-medium text-slate-800">{row.patient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">{row.enrollmentId}</span>
                  </td>
                  <td className="px-4 py-3">
                    {hasCase ? (
                      <span className="inline-block rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500">{row.caseId}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ProgrammeBadge programme={linkedCase?.programme} />
                  </td>
                  <td className="px-4 py-3">
                    <EnrollmentStatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={row.priority} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{row.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onView(row)} title="View enrollment" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-indigo-50 hover:text-indigo-600">
                        <Eye size={15} />
                      </button>
                      {row.status === "Draft" && (
                        <button onClick={() => onEdit(row)} title="Edit draft enrollment" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-indigo-50 hover:text-indigo-600">
                          <Pencil size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–10 of 21 enrollments</span>
          <div className="flex items-center gap-1.5">
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={13} />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 font-medium text-indigo-600">1</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500">2</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500">3</span>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            Rows per page
            <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1">
              10 <ChevronDown size={11} />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TaskStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${TASK_STATUS_STYLES[status] || TASK_STATUS_STYLES.Pending}`}>
      {status}
    </span>
  );
}

function TasksScreen({ onOpenCoreDeepLink, onOpenCase, tasks, caseRows }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500">Review and complete pending tasks assigned to you.</p>
        </div>
        <div className="flex items-center gap-2">
          <FilterSelect label="Status" />
          <FilterSelect label="All Priorities" />
          <FilterSelect label="All Dates" />
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Case ID</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Due Date</th>
              <th className="px-4 py-3 font-semibold">Created At</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, idx) => {
              const hasCase = caseRows.some((c) => c.caseId === t.caseId);
              const isPA = t.type === "pa_questions" || t.type === "pa_status";
              return (
                <tr key={`${t.title}-${idx}`} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3 font-medium text-slate-800">{t.title}</td>
                  <td className="px-4 py-3 text-slate-500">{t.type}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500">{t.caseId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <TaskStatusBadge status={t.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-500">{t.dueDate}</td>
                  <td className="px-4 py-3 text-slate-500">{t.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button title="Acknowledge" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300">
                        <CheckCircle2 size={15} />
                      </button>
                      <button
                        onClick={() => isPA && onOpenCoreDeepLink(t.caseId, t.type === "pa_questions" ? "questions" : "status")}
                        disabled={!isPA}
                        title={isPA ? "Open in Core" : "Not wired up in this demo"}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
                          isPA ? "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600" : "cursor-default text-slate-200"
                        }`}
                      >
                        <PlayCircle size={15} />
                      </button>
                      <button
                        onClick={() => hasCase && onOpenCase(t.caseId)}
                        disabled={!hasCase}
                        title={hasCase ? "Open linked case" : "No linked case"}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${
                          hasCase ? "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600" : "cursor-default text-slate-200"
                        }`}
                      >
                        <FolderOpen size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–{tasks.length} of {tasks.length} tasks</span>
          <div className="flex items-center gap-1.5">
            Rows per page
            <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1">
              10 <ChevronDown size={11} />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function RoleBadge({ role }) {
  const isAdmin = role === "Enrollment Admin";
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${isAdmin ? "border-violet-200 bg-violet-50 text-violet-600" : "border-slate-200 bg-white text-slate-500"}`}>
      {isAdmin && <ShieldAlert size={12} />} {role}
    </span>
  );
}

function EnrollmentPortalUsersScreen({ partner }) {
  const [users, setUsers] = useState(() => getEnrollmentUsers(partner));
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("All Portal Role");
  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState("All Portal Role");

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) return;
    const name = inviteEmail.split("@")[0].replace(/[._]/g, " ");
    setUsers((prev) => [
      { id: `u-${Date.now()}`, name: name.charAt(0).toUpperCase() + name.slice(1), role: inviteRole, email: inviteEmail.trim(), status: "Invited", invited: "Just now" },
      ...prev,
    ]);
    setInviteEmail("");
    setInviteRole("All Portal Role");
    setShowInvite(false);
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditingRole(user.role);
  };

  const saveEdit = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: editingRole } : u)));
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">Manage healthcare provider accounts and their access within this partner's Enrollment Portal.</p>
        </div>
        <button
          onClick={() => setShowInvite((s) => !s)}
          className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <UserPlus size={15} /> Invite User
        </button>
      </div>

      {showInvite && (
        <Card className="flex flex-wrap items-end gap-3 p-4">
          <div className="flex-1 min-w-[220px]">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Email address</label>
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
            />
          </div>
          <div className="w-48">
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none"
            >
              {USER_ROLE_OPTIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <button onClick={handleSendInvite} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Send Invite
          </button>
          <button onClick={() => setShowInvite(false)} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
        </Card>
      )}

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Invited</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <PatientAvatar name={u.name} colorClass={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                    <span className="font-medium text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {editingId === u.id ? (
                    <select
                      value={editingRole}
                      onChange={(e) => setEditingRole(e.target.value)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:border-indigo-400 focus:outline-none"
                    >
                      {USER_ROLE_OPTIONS.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  ) : (
                    <RoleBadge role={u.role} />
                  )}
                </td>
                <td className="px-4 py-3 text-slate-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs font-medium ${u.status === "Active" ? "border-green-200 bg-green-50 text-green-600" : "border-amber-200 bg-amber-50 text-amber-600"}`}>
                    <CheckCircle2 size={12} /> {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{u.invited}</td>
                <td className="px-4 py-3 text-right">
                  {editingId === u.id ? (
                    <button onClick={() => saveEdit(u.id)} title="Save role" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-emerald-600 hover:bg-emerald-50">
                      <CheckCircle2 size={15} />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(u)} title="Edit user" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-indigo-50 hover:text-indigo-600">
                      <Pencil size={15} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–{users.length} of {users.length} users</span>
          <div className="flex items-center gap-1.5">
            Rows per page
            <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1">
              10 <ChevronDown size={11} />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ---- Core PA screen building blocks ----

function PentagonStep({ index, total, label, active, visited, onClick, interactive = true }) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  let clipPath;
  if (isFirst) clipPath = "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)";
  else if (isLast) clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%, 12% 50%)";
  else clipPath = "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%, 12% 50%)";

  const toneClass = active ? "bg-indigo-600 text-white" : visited ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400";
  const content = (
    <>
      <span>{index + 1}</span>
      <span className="whitespace-nowrap">{label}</span>
    </>
  );

  if (!interactive) {
    return (
      <div style={{ clipPath }} className={`flex min-w-[168px] items-center gap-2 px-6 py-3 text-xs font-semibold ${toneClass}`}>
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ clipPath }}
      className={`flex min-w-[168px] items-center gap-2 px-6 py-3 text-xs font-semibold transition ${toneClass} ${
        active ? "" : visited ? "hover:bg-indigo-200" : "hover:bg-slate-200"
      }`}
    >
      {content}
    </button>
  );
}

function EmptyPlaceholder({ text }) {
  return (
    <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 text-center">
      <p className="max-w-sm px-6 text-sm text-slate-400">{text}</p>
    </div>
  );
}

// ---- Stage 1: Data & Intake — read-only snapshot of what was captured at enrollment ----

const DATA_INTAKE_TABS = ENROLLMENT_TABS.slice(0, ENROLLMENT_TABS.length - 2); // drop Prescriber Signature + Submission

function DataIntakeStage({ caseItem }) {
  const [tabIdx, setTabIdx] = useState(0);
  const data = mockEnrollmentDataFromCase(caseItem);
  const noop = () => {};

  const renderTab = () => {
    switch (DATA_INTAKE_TABS[tabIdx]) {
      case "Patient Information":
        return <PatientInformationTab data={data} update={noop} />;
      case "Patient Insurance":
        return <PatientInsuranceTab data={data} update={noop} />;
      case "Prescriber Information":
        return <PrescriberInformationTab data={data} update={noop} />;
      case "Diagnosis":
        return <DiagnosisTab data={data} update={noop} />;
      case "Prescription":
        return <PrescriptionTab data={data} update={noop} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Data & Intake</h3>
        <p className="mt-0.5 text-xs text-slate-500">Everything captured for this patient at the time of enrollment. Read-only.</p>
      </div>
      <div className="flex gap-6 overflow-x-auto border-b border-slate-200">
        {DATA_INTAKE_TABS.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setTabIdx(idx)}
            className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium ${idx === tabIdx ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="pointer-events-none pt-2 opacity-80">{renderTab()}</div>
    </div>
  );
}

// ---- Stage 2: Coverage Determination — pass/fail eligibility outcome ----

function CoverageDeterminationStage({ caseItem }) {
  const passed = caseItem.eligibilityStatus === "success";
  const style = passed ? "border-green-200 bg-green-50 text-green-600" : "border-red-200 bg-red-50 text-red-600";
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-50 px-6 py-14 text-center">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full border ${style}`}>
        {passed ? <CheckCircle2 size={26} /> : <XCircle size={26} />}
      </span>
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${style}`}>
        {passed ? "Eligibility check successful - Patient has Valid Insurance" : "Eligibility check failed"}
      </span>
      <p className="max-w-sm text-xs text-slate-500">
        {passed ? "This case is cleared to move forward to Benefits Investigation." : "This case cannot proceed until the eligibility issue is resolved — see Case Tracking for details."}
      </p>
    </div>
  );
}

function BenefitInvestigationStage({ caseItem }) {
  const required = caseItem.paRequired === true;
  const style = required ? "border-indigo-200 bg-indigo-50 text-indigo-600" : "border-slate-300 bg-slate-100 text-slate-600";
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-slate-900">Benefits Investigation</h3>
      <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-50 px-6 py-14 text-center">
        <span className={`flex h-14 w-14 items-center justify-center rounded-full border ${style}`}>
          {required ? <Flag size={26} /> : <MinusCircle size={26} />}
        </span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${style}`}>
          {required ? "PA is Required for this case" : "PA is Not Required for this case"}
        </span>
      </div>
    </div>
  );
}

// ---- Stage 4: Prior Authorization — Clinical Questions + PA Status live here together ----

function ClinicalQuestionsTab({ questions }) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [uploads, setUploads] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const fileInputRef = useRef(null);

  const isLast = qIndex === questions.length - 1;
  const canProceed = answers[qIndex].trim().length > 0;
  const answeredCount = answers.filter((a) => a.trim().length > 0).length;

  const setAnswer = (val) => {
    const next = [...answers];
    next[qIndex] = val;
    setAnswers(next);
    setDraftSaved(false);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const next = [...uploads];
      next[qIndex] = file.name;
      setUploads(next);
      setDraftSaved(false);
    }
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg bg-emerald-50 px-6 py-10 text-center">
        <CheckCircle2 className="text-emerald-600" size={32} />
        <p className="text-sm font-semibold text-emerald-700">Answers submitted to Agadia</p>
        <p className="max-w-sm text-xs text-emerald-600">
          The payer will review your responses. This is asynchronous — check the PA Status tab for updates, and you'll receive a "PA Status" task once a determination is available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900">Clinical Information</h4>
        <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Question {qIndex + 1} of {questions.length}
        </span>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">Question {qIndex + 1} (from Agadia)</p>
        <p className="mb-3 text-sm font-medium text-slate-800">{questions[qIndex].text}</p>
        <input
          value={answers[qIndex]}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here"
          className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
        />
        <p className="mt-1.5 text-xs text-slate-400">Your answer determines which question is asked next.</p>
      </div>

      {!isLast && (
        <div className="rounded-lg border border-dashed border-slate-300 px-4 py-5 text-center text-xs text-slate-400">
          Question {qIndex + 2} stays hidden until Question {qIndex + 1} is answered
        </div>
      )}

      {/* Upload available at the bottom of every question, not just the last one */}
      <div className="rounded-lg bg-slate-50 px-4 py-3.5">
        <p className="mb-2 text-xs font-medium text-slate-600">Upload supplementary document (optional)</p>
        <div className="flex items-center gap-3">
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <UploadCloud size={13} /> Choose file
          </button>
          <span className="text-xs text-slate-400">{uploads[qIndex] || "No file selected"}</span>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFile} />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <button
          disabled={qIndex === 0}
          onClick={() => setQIndex((i) => Math.max(0, i - 1))}
          className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
        >
          Back
        </button>
        <div className="flex items-center gap-2.5">
          {draftSaved && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
              <CheckCircle2 size={13} /> Progress saved ({answeredCount} of {questions.length} answered)
            </span>
          )}
          <button onClick={handleSaveDraft} className="rounded-md border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
            Save as Draft
          </button>
          {isLast ? (
            <button
              disabled={!canProceed}
              onClick={() => setSubmitted(true)}
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
            >
              Submit Answers
          </button>
        ) : (
          <button
            disabled={!canProceed}
            onClick={() => setQIndex((i) => Math.min(questions.length - 1, i + 1))}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40"
          >
            Next
          </button>
        )}
        </div>
      </div>
    </div>
  );
}

function PAStatusTab({ status }) {
  const style = PA_STATUS_STYLES[status] || PA_STATUS_STYLES["Case Under Plan Review"];
  const Icon = style.icon;
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-50 px-6 py-14 text-center">
      <span className={`flex h-14 w-14 items-center justify-center rounded-full border ${style.pill}`}>
        <Icon size={26} />
      </span>
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${style.pill}`}>{status}</span>
    </div>
  );
}

function ClinicalQuestionsReadOnly({ questions, answers, status }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-600" />
        These clinical questions were already answered and submitted to Agadia. PA <span className="font-semibold">{status}</span> was returned — responses are read-only.
      </div>
      {questions.map((q, idx) => (
        <div key={q.id} className="rounded-md border border-slate-200 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Question {idx + 1}</p>
          <p className="mt-1 text-sm font-medium text-slate-800">{q.text}</p>
          <p className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">{answers[idx]}</p>
        </div>
      ))}
    </div>
  );
}

function PriorAuthorizationStage({ caseItem, initialSubTab }) {
  const [subTab, setSubTab] = useState(initialSubTab || "questions");
  const isDecided = Boolean(caseItem.paStatus);

  if (!caseItem.paRequired) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-slate-900">Prior Authorization</h3>
        <EmptyPlaceholder text="Prior Authorization is not required for this case — there is nothing to review here." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Prior Authorization</h3>
      </div>
      <div className="flex gap-6 border-b border-slate-200">
        <button
          onClick={() => setSubTab("questions")}
          className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium ${subTab === "questions" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Clinical Questions
        </button>
        <button
          onClick={() => setSubTab("status")}
          className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium ${subTab === "status" ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          PA Status
        </button>
      </div>
      <div className="pt-2">
        {subTab === "questions" ? (
          isDecided ? (
            <ClinicalQuestionsReadOnly questions={PA_QUESTIONS} answers={PA_QUESTION_ANSWERS} status={caseItem.paStatus} />
          ) : (
            <ClinicalQuestionsTab questions={PA_QUESTIONS} />
          )
        ) : (
          <PAStatusTab status={caseItem.paStatus || "Case Under Plan Review"} />
        )}
      </div>
    </div>
  );
}

// ---- Screen shell: pentagon stepper is fully free-navigation across all 6 stages ----

function CorePAScreen({ caseItem, initialTab, initialStage, onBack }) {
  // Deep links from Tasks always land on the Prior Authorization pentagon (index 3) by default —
  // Clinical Questions vs PA Status is just which sub-tab opens within it. Browsing in from the
  // Cases list instead starts at Data & Intake (index 0).
  const [activeStage, setActiveStage] = useState(initialStage !== undefined ? initialStage : 3);

  const renderStageContent = () => {
    switch (activeStage) {
      case 0:
        return <DataIntakeStage caseItem={caseItem} />;
      case 1:
        return <CoverageDeterminationStage caseItem={caseItem} />;
      case 2:
        return <BenefitInvestigationStage caseItem={caseItem} />;
      case 3:
        return <PriorAuthorizationStage caseItem={caseItem} initialSubTab={initialTab} />;
      case 4:
        return <EmptyPlaceholder text="PA Review hasn't started for this case yet." />;
      case 5:
        return <EmptyPlaceholder text="No appeals have been filed for this case." />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Case Details</h1>
          <p className="text-xs text-slate-500">{caseItem.caseId}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Workflow — click any stage to move freely</p>
        <div className="flex overflow-x-auto">
          {CORE_STAGE_LABELS.map((label, idx) => (
            <div key={label} className={idx > 0 ? "-ml-3" : ""}>
              <PentagonStep index={idx} total={CORE_STAGE_LABELS.length} label={label} active={idx === activeStage} visited={idx < activeStage} onClick={() => setActiveStage(idx)} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5">
        <Card className="col-span-1 p-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {caseItem.patient.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
            </span>
            <p className="text-sm font-semibold text-slate-900">{caseItem.patient}</p>
            <div className="flex gap-1.5">
              <OpenStatusBadge />
              <PriorityBadge priority={caseItem.priority || "Normal"} />
            </div>
            <p className="text-xs text-slate-400">{caseItem.caseId}</p>
          </div>
          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-xs">
            <div>
              <p className="text-slate-400">Opened</p>
              <p className="font-medium text-slate-700">{caseItem.enrollmentDate ? caseItem.enrollmentDate.split(" ").slice(0, 3).join(" ") : "Jun 28, 2026"}</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-3 p-6">{renderStageContent()}</Card>
      </div>
    </div>
  );
}

const GENDER_STYLES = {
  Female: "border-pink-200 bg-pink-50 text-pink-600",
  Male: "border-blue-200 bg-blue-50 text-blue-600",
  Unknown: "border-slate-200 bg-slate-100 text-slate-500",
};

function GenderBadge({ gender }) {
  return <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${GENDER_STYLES[gender] || GENDER_STYLES.Unknown}`}>{gender}</span>;
}

function PatientStatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
      <CheckCircle2 size={12} /> {status}
    </span>
  );
}

function CorePatientsScreen({ onView, patients, caseRows }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Patients</h1>
        <p className="mt-1 text-sm text-slate-500">Search, view, and manage patient records.</p>
      </div>
      <div className="flex w-72 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
        <Search size={13} />
        <span>Search by name or MRN...</span>
      </div>
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Patient</th>
              <th className="px-4 py-3 font-semibold">MRN</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Date of Birth</th>
              <th className="px-4 py-3 font-semibold">Gender</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, idx) => {
              const linkedCase = caseRows.find((c) => c.caseId === p.caseId);
              return (
                <tr key={p.mrn} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <PatientAvatar name={p.name} colorClass={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                      <span className="font-medium text-slate-800">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500">{p.mrn}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    <p>{p.email}</p>
                    <p className="text-xs text-slate-400">{p.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{p.dob}</td>
                  <td className="px-4 py-3">
                    <GenderBadge gender={p.gender} />
                  </td>
                  <td className="px-4 py-3">
                    <ProgrammeBadge programme={linkedCase?.programme} />
                  </td>
                  <td className="px-4 py-3">
                    <PatientStatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onView(p)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-blue-50 hover:text-blue-600">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–{patients.length} of {patients.length} patients</span>
          <div className="flex items-center gap-1.5">
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={13} />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-blue-200 bg-blue-50 font-medium text-blue-600">1</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500">2</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500">3</span>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CorePatientDetailScreen({ patient, onBack, onOpenCase, caseRows }) {
  const linkedCase = caseRows.find((c) => c.caseId === patient.caseId);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="mt-1 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {patient.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-slate-900">{patient.name}</p>
                <PatientStatusBadge status={patient.status} />
              </div>
              <p className="text-xs text-slate-400">
                MRN: {patient.mrn} · DOB {patient.dob} · {patient.gender}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Phone</p>
            <p className="text-sm font-medium text-slate-700">{patient.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-slate-400">Email</p>
            <p className="text-sm font-medium text-slate-700">{patient.email}</p>
          </div>
          <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Pencil size={13} /> Edit Patient
          </button>
        </div>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Users size={14} className="text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Demographics & Contact</h2>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <InfoField icon={CheckCircle2} label="Status">
            <PatientStatusBadge status={patient.status} />
          </InfoField>
          <InfoField icon={FileText} label="MRN">
            {patient.mrn}
          </InfoField>
          <InfoField icon={Clock} label="Date of Birth">
            {patient.dob}
          </InfoField>
          <InfoField icon={Users} label="Gender">
            {patient.gender}
          </InfoField>
        </div>
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-14 text-xs text-slate-400">Phone</span>
            <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-500">mobile</span>
            <span className="text-slate-700">{patient.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-xs text-slate-400">Email</span>
            <span className="rounded-md border border-slate-200 px-2 py-0.5 text-xs text-slate-500">personal</span>
            <span className="text-slate-700">{patient.email}</span>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <Plus size={14} className="text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Enrolments</h2>
        </div>
        {patient.enrolmentId ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-2 font-semibold">Enrolment #</th>
                <th className="py-2 font-semibold">Programme</th>
                <th className="py-2 font-semibold">Channel</th>
                <th className="py-2 font-semibold">Status</th>
                <th className="py-2 font-semibold">Referral Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 font-medium text-emerald-700">{patient.enrolmentId}</td>
                <td className="py-3">
                  <ProgrammeBadge programme={linkedCase?.programme} />
                </td>
                <td className="py-3 text-slate-500">{linkedCase?.intakeChannel || "API"}</td>
                <td className="py-3">
                  <EnrollmentStatusBadge status="Approved" />
                </td>
                <td className="py-3 text-slate-400">No data</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <EmptyPlaceholder text="No enrolments on file for this patient." />
        )}
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <FolderOpen size={14} className="text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">Cases</h2>
        </div>
        {linkedCase ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="py-2 font-semibold">Case #</th>
                <th className="py-2 font-semibold">Programme</th>
                <th className="py-2 font-semibold">Source</th>
                <th className="py-2 font-semibold">Status</th>
                <th className="py-2 font-semibold">Stage</th>
                <th className="py-2 font-semibold">Priority</th>
                <th className="py-2 font-semibold">Opened</th>
                <th className="py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 font-medium text-indigo-600">{linkedCase.caseId}</td>
                <td className="py-3">
                  <ProgrammeBadge programme={linkedCase.programme} />
                </td>
                <td className="py-3 text-slate-500">{linkedCase.intakeChannel}</td>
                <td className="py-3">
                  <OpenStatusBadge />
                </td>
                <td className="py-3 text-slate-500">{CORE_STAGE_LABELS[getCoreStageIndex(linkedCase)]}</td>
                <td className="py-3">
                  <PriorityBadge priority={linkedCase.priority} />
                </td>
                <td className="py-3 text-slate-500">{linkedCase.enrollmentDate.split(" ").slice(0, 3).join(" ")}</td>
                <td className="py-3 text-right">
                  <button onClick={() => onOpenCase(linkedCase.caseId)} className="text-xs font-medium text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <EmptyPlaceholder text="No cases on file for this patient." />
        )}
      </Card>
    </div>
  );
}

function CoreCasesScreen({ onView, caseRows }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Cases</h1>
        <p className="mt-1 text-sm text-slate-500">All cases synced from the Enrollment Portal.</p>
      </div>
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Patient</th>
              <th className="px-4 py-3 font-semibold">Case ID</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseRows.map((row, idx) => (
              <tr key={row.caseId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <PatientAvatar name={row.patient} colorClass={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                    <span className="font-medium text-slate-800">{row.patient}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500">{row.caseId}</span>
                </td>
                <td className="px-4 py-3">
                  <ProgrammeBadge programme={row.programme} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={row.priority} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onView(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-blue-50 hover:text-blue-600">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function CorePortalShell({ children, activeNavLabel, onNavClick, backLabel, onBack, onLogout, userEmail, userName, navItems, partnerLabel, onSwitchPartner }) {
  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] font-sans text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-blue-600" />
          <div>
            <p className="text-sm font-bold leading-tight">AnvayaRx</p>
            <p className="text-[11px] leading-tight text-slate-500">Core Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {partnerLabel && <PartnerSwitcherBadge current={partnerLabel} options={PARTNERS} onSwitch={onSwitchPartner} toneClass="bg-blue-50 text-blue-600" />}
          <button onClick={onBack} className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600">
            <ChevronLeft size={13} /> {backLabel}
          </button>
          {onLogout && (
            <button onClick={onLogout} title="Log out" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
              <LogOut size={15} />
            </button>
          )}
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <Bell size={16} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-blue-600" />
            <div>
              <p className="text-xs font-medium leading-tight">{userName}</p>
              <p className="text-[10px] leading-tight text-slate-400">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="flex w-52 flex-col gap-1 border-r border-slate-200 bg-white p-3">
          {(navItems || CORE_NAV_ITEMS).map((label) => {
            const isActive = label === activeNavLabel;
            return (
              <button
                key={label}
                onClick={() => onNavClick(label)}
                className={`rounded-lg px-3 py-2.5 text-left text-sm transition ${isActive ? "bg-blue-50 font-medium text-blue-600" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {label}
              </button>
            );
          })}
        </nav>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function CaseTrackingScreen({ onView, caseRows }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Case Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor and manage patient cases across all active programmes.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
            <Search size={13} />
            <span>Search patient</span>
          </div>
          <FilterSelect label="All Statuses" />
          <FilterSelect label="All Stages" />
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Patient</th>
              <th className="px-4 py-3 font-semibold">Case ID</th>
              <th className="px-4 py-3 font-semibold">Programme</th>
              <th className="px-4 py-3 font-semibold">Stage</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">SLA Due</th>
              <th className="px-4 py-3 font-semibold">Enrollment Date</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseRows.map((row, idx) => (
              <tr key={row.caseId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <PatientAvatar name={row.patient} colorClass={AVATAR_COLORS[idx % AVATAR_COLORS.length]} />
                    <span className="font-medium text-slate-800">{row.patient}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500">{row.caseId}</span>
                </td>
                <td className="px-4 py-3">
                  <ProgrammeBadge programme={row.programme} />
                </td>
                <td className="px-4 py-3 text-slate-500">{CORE_STAGE_LABELS[getCoreStageIndex(row)]}</td>
                <td className="px-4 py-3">
                  <CaseStatusBadge caseItem={row} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={row.priority} />
                </td>
                <td className="px-4 py-3">
                  <SlaCell date={row.slaDue} overdue={row.overdue} />
                </td>
                <td className="px-4 py-3 text-slate-500">{row.enrollmentDate}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onView(row)} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-indigo-50 hover:text-indigo-600" title="View case">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–10 of 18 cases</span>
          <div className="flex items-center gap-1.5">
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={13} />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-indigo-200 bg-indigo-50 font-medium text-indigo-600">1</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500">2</span>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            Rows per page
            <span className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1">
              10 <ChevronDown size={11} />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoField({ icon: Icon, label, children }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-slate-400">
        <Icon size={12} /> {label}
      </p>
      <div className="mt-1.5 text-sm font-medium text-slate-800">{children}</div>
    </div>
  );
}

function ModuleCard({ icon: Icon, label, value, valueClass, statusIcon: StatusIcon }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white">
          <Icon size={15} className="text-slate-500" />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
          <p className={`text-sm font-semibold ${valueClass}`}>{value}</p>
        </div>
      </div>
      {StatusIcon && <StatusIcon size={16} className="text-slate-300" />}
    </div>
  );
}

function CaseDetailScreen({ caseItem, onBack, onUpdateCase }) {
  const activeStageIndex = getCoreStageIndex(caseItem);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="mt-1 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Case : {caseItem.caseId}</h1>
            <p className="mt-1 text-sm text-slate-500">View case details, stage progress, and associated patient information.</p>
          </div>
        </div>
        <button onClick={onUpdateCase} className="flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          <Pencil size={14} /> Update Case
        </button>
      </div>

      <Card className="px-6 py-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Workflow</p>
        <div className="flex overflow-x-auto">
          {CORE_STAGE_LABELS.map((label, idx) => (
            <div key={label} className={idx > 0 ? "-ml-3" : ""}>
              <PentagonStep index={idx} total={CORE_STAGE_LABELS.length} label={label} active={idx === activeStageIndex} visited={idx < activeStageIndex} interactive={false} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Case Information</h2>
        </div>
        <div className="grid grid-cols-4 gap-y-6">
          <InfoField icon={FileText} label="Case Number">{caseItem.caseId}</InfoField>
          <InfoField icon={Users} label="Patient">{caseItem.patient}</InfoField>
          <InfoField icon={ClipboardList} label="Programme">{caseItem.programme || "Botox drug program"}</InfoField>
          <InfoField icon={ShieldAlert} label="Status">
            <CaseStatusBadge caseItem={caseItem} />
          </InfoField>

          <InfoField icon={Flag} label="Workflow Stage">{CORE_STAGE_LABELS[getCoreStageIndex(caseItem)]}</InfoField>
          <InfoField icon={Flag} label="Priority">
            <PriorityBadge priority={caseItem.priority} />
          </InfoField>
          <InfoField icon={Clock} label="SLA Status">
            {caseItem.overdue ? <span className="text-red-500">Overdue</span> : <span className="text-green-600">On Track</span>}
          </InfoField>
          <InfoField icon={Clock} label="SLA Due">{caseItem.slaDue} 4:46 PM</InfoField>

          <InfoField icon={Clock} label="Enrollment Date">{caseItem.enrollmentDate}</InfoField>
          <InfoField icon={Activity} label="Therapy Start">—</InfoField>
          <InfoField icon={Clock} label="Created">{caseItem.enrollmentDate}</InfoField>
          <InfoField icon={Clock} label="Last Updated">Jun 28, 2026 4:47 PM</InfoField>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-1 rounded-full bg-indigo-600" />
          <h2 className="text-sm font-bold text-slate-900">Active Modules</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <ModuleCard icon={Clock} label="Open Tasks" value="Open" valueClass="text-orange-500" />
          <ModuleCard icon={FileText} label="Benefits Investigation" value="Inactive" valueClass="text-slate-500" statusIcon={MinusCircle} />
          <ModuleCard icon={Flag} label="Prior Authorization" value="Inactive" valueClass="text-slate-500" statusIcon={MinusCircle} />
          <ModuleCard icon={AlertTriangle} label="Active Appeal" value="None" valueClass="text-slate-500" statusIcon={MinusCircle} />
        </div>
      </Card>
    </div>
  );
}

function ComingSoonScreen({ label }) {
  return (
    <div className="flex h-[560px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-center">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-xs text-slate-400">This screen is coming up next in the wireframe walkthrough.</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shell (header + sidebar) + router
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Login / SSO hand-off screen — gates access to the portal before Dashboard
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// AnvayaRx superadmin flow — Admin login -> Module selector -> Enrollment
// Portal / Core / Govern. This is a genuinely separate portal from the
// Partner ABC SSO demo: a direct AnvayaRx login for AnvayaRx's own team,
// who can see the Programme concept and cross-partner data that partner
// users never see.
// ---------------------------------------------------------------------------

const ADMIN_CREDENTIALS = { username: "admin@anvayarx.com", password: "Admin@123" };

function AdminLoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!username.trim()) {
      setError("Please enter your username or email");
      return;
    }
    if (username.trim().toLowerCase() === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setError("");
      onLogin();
    } else {
      setError("Incorrect username or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left branding panel */}
      <div className="relative hidden w-1/2 flex-col justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-16 md:flex">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, transparent, transparent 34px, rgba(255,255,255,0.5) 34px, rgba(255,255,255,0.5) 36px), repeating-linear-gradient(-60deg, transparent, transparent 34px, rgba(255,255,255,0.5) 34px, rgba(255,255,255,0.5) 36px)",
          }}
        />
        <div className="relative z-10 max-w-md">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Layers size={20} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-xl font-bold leading-tight text-slate-800">
                Anvaya<span className="text-emerald-600">Rx</span>
              </p>
              <p className="text-[11px] leading-tight text-slate-600">Your Patient Connection</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            Welcome to the AnvayaRx Intelligence Platform — Your unified command center for managing the complete patient access journey — from enrollment and benefits verification to prior authorization, fulfillment, adherence, and beyond.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Seamlessly connecting case management, field enablement, market access intelligence, financial modeling, and AI-powered insights in one secure ecosystem.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Sign in to manage, monitor, and optimize every stage of access with clarity, control, and intelligence.
          </p>
        </div>
      </div>

      {/* Right sign-in panel */}
      <div className="flex w-full items-center justify-center bg-slate-50 px-6 md:w-1/2">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-center text-lg font-bold text-slate-900">Sign in to your account</h2>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Username or email</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none"
              />
              {error === "Please enter your username or email" && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full rounded-md border border-slate-200 px-3 py-2.5 pr-9 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            {error && error !== "Please enter your username or email" && <p className="-mt-1 text-xs font-medium text-red-500">{error}</p>}
            <div className="-mt-1 text-right">
              <button className="text-xs font-medium text-orange-600 hover:underline">Forgot Password?</button>
            </div>
            <button onClick={handleSubmit} className="rounded-md bg-orange-500 py-2.5 text-sm font-semibold text-white hover:bg-orange-600">
              Sign In
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400">Powered by Agadia</div>
        </div>
      </div>
    </div>
  );
}

// Only the modules in scope for this pilot — the real product has many more (Insight,
// Field, Access Intelligence, Channel, Afford, Outcomes, Finance, Engage), omitted here.
const MODULE_TILES = [
  {
    key: "enrollment-portal",
    name: "Enrollment Portal",
    category: "PARTNER-FACING PORTAL",
    accent: "border-t-purple-500",
    icon: UserPlus,
    description: "Provider-facing portal for healthcare professionals to submit patient enrollments, track case status, and manage programme-specific intake workflows.",
  },
  {
    key: "core",
    name: "AnvayaRx Core",
    category: "HUB OPERATIONS",
    accent: "border-t-blue-500",
    icon: Layers,
    description: "The operational backbone of the hub ecosystem — managing end-to-end patient access through coverage, authorization, and fulfillment.",
  },
  {
    key: "govern",
    name: "Govern",
    category: "COMPLIANCE & OVERSIGHT",
    accent: "border-t-red-500",
    icon: ShieldAlert,
    description: "Enterprise-grade compliance, audit, and vendor oversight ensuring secure operations and accountability across the platform.",
  },
];

// This admin is a whole-platform admin, not scoped to one partner — so they
// choose which partner (tenant) to work with once, right after login. Only
// "Partner ABC" has the deepest demo data behind it; DEF/GHI exist to make
// the multi-tenant picker itself demonstrable.
const PARTNERS = ["Partner ABC", "Partner DEF", "Partner GHI"];

function PartnerSelectScreen({ onContinue, onLogout }) {
  const [selected, setSelected] = useState("");
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Choose a partner</h2>
          <button onClick={onLogout} title="Log out" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <LogOut size={15} />
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Select which partner's data you'd like to work with. Choose Platform-wide for Govern's cross-partner view — Enrollment Portal and Core are partner-specific, so only Govern is available in that scope.
        </p>

        <div className="mt-6">
          <label className="mb-1.5 block text-xs font-medium text-slate-600">Partner / Scope</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none"
          >
            <option value="" disabled>
              Select a partner...
            </option>
            {PARTNERS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            <option value="Global">Platform-wide (Global)</option>
          </select>
        </div>

        <button
          disabled={!selected}
          onClick={() => onContinue(selected)}
          className="mt-5 w-full rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// A single clickable badge everywhere a module needs to show/change the
// current partner scope — click it to reveal the picker inline, no separate
// "Switch" button, no leaving the module.
function PartnerSwitcherBadge({ current, options, onSwitch, toneClass }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium ${toneClass}`}>
        {current} <ChevronDown size={11} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onSwitch(opt);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-xs hover:bg-slate-50 ${opt === current ? "font-semibold text-indigo-600" : "text-slate-600"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ModuleSelectorScreen({ userEmail, userName, partner, onSelect, onSwitchPartner, onLogout }) {
  const isGlobal = partner === "Global";
  const tiles = isGlobal ? MODULE_TILES.filter((m) => m.key === "govern") : MODULE_TILES;

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
            <Layers size={16} className="text-white" />
          </div>
          <p className="text-base font-bold text-slate-800">
            Anvaya<span className="text-emerald-600">Rx</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PartnerSwitcherBadge
            current={partner}
            options={[...PARTNERS, "Global"]}
            onSwitch={onSwitchPartner}
            toneClass={isGlobal ? "bg-violet-50 text-violet-600" : "bg-indigo-50 text-indigo-600"}
          />
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-400">
            <Search size={13} />
            <span>Search workspaces...</span>
          </div>
          <button onClick={onLogout} title="Log out" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <LogOut size={15} />
          </button>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-xs font-semibold text-white">
              {(userName || "A").charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="text-xs font-medium leading-tight text-slate-800">{userName}</p>
              <p className="text-[10px] leading-tight text-slate-400">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {isGlobal && (
          <p className="mb-4 text-xs text-slate-400">Platform-wide scope — Enrollment Portal and Core are partner-specific, so only Govern is available here.</p>
        )}
        <div className={`grid gap-5 ${tiles.length === 1 ? "max-w-sm grid-cols-1" : "grid-cols-3"}`}>
          {tiles.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.key} className={`flex flex-col justify-between rounded-lg border border-t-4 border-slate-200 bg-white ${m.accent} p-5 shadow-sm`}>
                <div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                    <Icon size={18} className="text-slate-600" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{m.name}</p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{m.category}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{m.description}</p>
                </div>
                <button
                  onClick={() => onSelect(m.key)}
                  className="mt-4 flex items-center gap-1 self-start text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Launch Portal <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </main>

      <div className="border-t border-slate-100 py-4 text-center text-[11px] text-slate-400">POWERED BY Agadia</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Govern — Operational Dashboard. Scoped to this admin's own partner/tenant
// only (per the Programme Requirements doc, "Tenant" = "Partner"). Baseline
// (P0) is deliberately NOT shown anywhere on this dashboard — it lives under
// the Programme tab for configuration, not here. Programme Global is every
// local programme's automatic, always-on link to a platform-wide drug
// record, so it isn't a differentiator worth a dashboard indicator either —
// every programme has one by definition.
// ---------------------------------------------------------------------------

const GOVERN_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { key: "programme", label: "Programme", icon: ClipboardList },
  { key: "super-admin", label: "Super Admin", icon: ShieldAlert },
];

function StatBar({ label, value, total, percent, color = "bg-amber-600" }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="font-medium text-slate-600">
          {value}/{total} <span className="text-slate-400">{percent}%</span>
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function GovernKpiCard({ icon: Icon, badge, badgeTone, value, label, sub }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-50 text-amber-600">
          <Icon size={16} />
        </span>
        {badge && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeTone || "bg-emerald-50 text-emerald-600"}`}>{badge}</span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-0.5 text-[11px] text-slate-400">{sub}</p>
    </Card>
  );
}

function GovernPanel({ icon: Icon, title, badge, badgeTone, children }) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        </div>
        {badge && <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeTone || "bg-emerald-50 text-emerald-600"}`}>{badge}</span>}
      </div>
      {children}
    </Card>
  );
}

const GOVERN_STATS_BY_PARTNER = {
  "Partner ABC": {
    total: 6, active: 6, draft: 0,
    slaConfiguredCount: 4, avgTriageSla: "4.2 hrs", avgAeSla: "21 hrs",
    configuredCount: 3, fullyConfiguredCount: 3, withDrugCount: 5, withChannelsCount: 3,
    enrollmentPortalCount: 3, withSlaCount: 4, fullyReadyCount: 3,
  },
  "Partner DEF": {
    total: 3, active: 3, draft: 0,
    slaConfiguredCount: 2, avgTriageSla: "5.1 hrs", avgAeSla: "19 hrs",
    configuredCount: 2, fullyConfiguredCount: 1, withDrugCount: 3, withChannelsCount: 2,
    enrollmentPortalCount: 2, withSlaCount: 2, fullyReadyCount: 1,
  },
  "Partner GHI": {
    total: 2, active: 2, draft: 0,
    slaConfiguredCount: 1, avgTriageSla: "6.0 hrs", avgAeSla: "24 hrs",
    configuredCount: 1, fullyConfiguredCount: 1, withDrugCount: 2, withChannelsCount: 1,
    enrollmentPortalCount: 1, withSlaCount: 1, fullyReadyCount: 1,
  },
};

function GovernOperationalDashboard({ partner }) {
  const s = GOVERN_STATS_BY_PARTNER[partner] || GOVERN_STATS_BY_PARTNER["Partner ABC"];
  const pct = (count) => Math.round((count / s.total) * 100);
  const readyPct = Math.round((s.fullyReadyCount / s.total) * 100);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Govern / Dashboard</p>
          <h1 className="text-xl font-bold text-slate-900">Operational Dashboard</h1>
          <p className="mt-0.5 text-xs text-slate-500">{s.total} programmes · Live data</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Wed, Jul 22, 2026 · 10:39 AM</span>
          <button className="rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700">Open Reports</button>
        </div>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-4 gap-3">
        <GovernKpiCard icon={LayoutGrid} badge={`${s.active} live`} value={String(s.total)} label="Total Programmes" sub={`${s.active} live · ${s.draft} draft`} />
        <GovernKpiCard icon={CheckCircle2} badge={`${pct(s.active)}%`} value={String(s.active)} label="Active Programmes" sub={`${pct(s.active)}% of total`} />
        <GovernKpiCard icon={Pencil} badge="Clear" badgeTone="bg-slate-100 text-slate-500" value={String(s.draft)} label="Draft Programmes" sub="Incomplete configuration" />
        <GovernKpiCard icon={Clock} badge="FDA <24h OK" value={String(s.slaConfiguredCount)} label="SLA Configured" sub={`${pct(s.slaConfiguredCount)}% coverage · Avg ${s.avgTriageSla.split(" ")[0]}h`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GovernPanel icon={Layers} title="Programme Health" badge={`${s.active} live`}>
          <div className="mb-3 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Total</p>
              <p className="text-lg font-bold text-slate-900">{s.total}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Live</p>
              <p className="text-lg font-bold text-slate-900">{s.active}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Active</p>
              <p className="text-lg font-bold text-slate-900">{s.active}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Draft</p>
              <p className="text-lg font-bold text-slate-400">{s.draft}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Archived</p>
              <p className="text-lg font-bold text-slate-400">0</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Configured</p>
              <p className="text-lg font-bold text-amber-600">{s.configuredCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-amber-600 text-lg font-bold text-slate-900">{s.total}</div>
            <div className="flex-1 space-y-2">
              <StatBar label="Live / Active" value={s.active} total={s.total} percent={pct(s.active)} />
              <StatBar label="Draft" value={s.draft} total={s.total} percent={pct(s.draft)} color="bg-slate-300" />
              <StatBar label="Archived" value={0} total={s.total} percent={0} color="bg-slate-300" />
            </div>
          </div>
        </GovernPanel>

        <GovernPanel icon={Settings} title="Configuration Completeness" badge="Partial" badgeTone="bg-amber-50 text-amber-600">
          <div className="mb-3 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Fully Configured</p>
              <p className="text-lg font-bold text-slate-900">{pct(s.fullyConfiguredCount)}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">With Drug</p>
              <p className="text-lg font-bold text-slate-900">{pct(s.withDrugCount)}%</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">With Channels</p>
              <p className="text-lg font-bold text-slate-900">{pct(s.withChannelsCount)}%</p>
            </div>
          </div>
          <div className="space-y-2">
            <StatBar label="Fully configured" value={s.fullyConfiguredCount} total={s.total} percent={pct(s.fullyConfiguredCount)} />
            <StatBar label="Drug info set" value={s.withDrugCount} total={s.total} percent={pct(s.withDrugCount)} />
            <StatBar label="Intake channels" value={s.withChannelsCount} total={s.total} percent={pct(s.withChannelsCount)} />
            <StatBar label="Enrollment portal" value={s.enrollmentPortalCount} total={s.total} percent={pct(s.enrollmentPortalCount)} />
          </div>
        </GovernPanel>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GovernPanel icon={ClipboardList} title="SLA & Compliance" badge="FDA 21CFR 216.80 OK">
          <div className="mb-3 grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">SLA Configured</p>
              <p className="text-lg font-bold text-slate-900">{s.slaConfiguredCount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Avg Triage SLA</p>
              <p className="text-lg font-bold text-slate-900">{s.avgTriageSla}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Avg AE SLA</p>
              <p className="text-lg font-bold text-slate-900">{s.avgAeSla}</p>
            </div>
          </div>
          <div className="space-y-2">
            <StatBar label="SLA configured" value={s.slaConfiguredCount} total={s.total} percent={pct(s.slaConfiguredCount)} />
            <StatBar label="Enrollment portal" value={s.enrollmentPortalCount} total={s.total} percent={pct(s.enrollmentPortalCount)} />
            <StatBar label="Intake channels" value={s.withChannelsCount} total={s.total} percent={pct(s.withChannelsCount)} />
          </div>
        </GovernPanel>

        <GovernPanel icon={Clock} title="Programme Readiness" badge={`${readyPct}% ready`} badgeTone="bg-amber-50 text-amber-600">
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Enrollment Portal</p>
              <p className="text-lg font-bold text-slate-900">{s.enrollmentPortalCount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">With Channels</p>
              <p className="text-lg font-bold text-slate-900">{s.withChannelsCount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">With Drug Info</p>
              <p className="text-lg font-bold text-slate-900">{s.withDrugCount}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">With SLA</p>
              <p className="text-lg font-bold text-slate-900">{s.withSlaCount}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Fully Ready</p>
              <p className="text-lg font-bold text-amber-600">{s.fullyReadyCount}</p>
            </div>
          </div>
          <div className="space-y-1.5 text-xs text-slate-500">
            <div className="flex items-center justify-between">
              <span>• Drug info present</span>
              <span className="font-medium text-slate-700">{s.withDrugCount}/{s.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• Intake channels set</span>
              <span className="font-medium text-slate-700">{s.withChannelsCount}/{s.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• SLA targets configured</span>
              <span className="font-medium text-slate-700">{s.withSlaCount}/{s.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>• Enrollment portal active</span>
              <span className="font-medium text-slate-700">{s.enrollmentPortalCount}/{s.total}</span>
            </div>
          </div>
        </GovernPanel>
      </div>
    </div>
  );
}

// Programme Global, per the requirements doc: one record per distinct drug,
// aggregated across every tenant/partner that has onboarded it. Platform-wide,
// not scoped to any single partner — this is what "Global" surfaces. Derived
// live from every partner's real local programmes (below), not hand-authored,
// so it always reflects whatever the platform actually has onboarded.

// Representative Treatment (dosage form / route / strength) per local
// programme — this is fabricated demo detail, but grounded to each real drug.
const TREATMENT_PROFILE_BY_PROGRAMME_ID = {
  "p-abc-1": { dosageForm: "Injection", route: "Intramuscular", strength: "100 units/vial" },
  "p-abc-2": { dosageForm: "Injection", route: "Subcutaneous", strength: "30 mg/mL" },
  "p-abc-3": { dosageForm: "Injection", route: "Intramuscular", strength: "50 units/vial" },
  "p-abc-4": { dosageForm: "Inhaler", route: "Inhaled", strength: "90 mcg/actuation" },
  "p-abc-5": { dosageForm: "Tablet", route: "Oral", strength: "200 mg" },
  "p-abc-6": { dosageForm: "Tablet", route: "Oral", strength: "7 mg" },
  "p-def-1": { dosageForm: "Tablet", route: "Oral", strength: "15 mg" },
  "p-def-2": { dosageForm: "Injection Pen", route: "Subcutaneous", strength: "1.5 mg/0.5 mL" },
  "p-def-3": { dosageForm: "Injection", route: "Subcutaneous", strength: "150 mg/mL" },
  "p-ghi-1": { dosageForm: "Injection", route: "Subcutaneous", strength: "50 mg/mL" },
  "p-ghi-2": { dosageForm: "Injection Pen", route: "Subcutaneous", strength: "150 mg/mL" },
};

function getPartnerProgrammeCounts() {
  const counts = {};
  Object.keys(PROGRAMS_BY_PARTNER).forEach((partner) => {
    counts[partner] = PROGRAMS_BY_PARTNER[partner].length;
  });
  return counts;
}

function buildGlobalDrugRecords() {
  const byDrug = {};
  Object.entries(PROGRAMS_BY_PARTNER).forEach(([partner, programmes]) => {
    programmes.forEach((prog) => {
      const key = prog.drugLabel;
      if (!byDrug[key]) byDrug[key] = { drugLabel: key, programmeName: prog.name, tenants: new Set(), treatments: [] };
      byDrug[key].tenants.add(partner);
      const profile = TREATMENT_PROFILE_BY_PROGRAMME_ID[prog.id] || { dosageForm: "Injection", route: "Subcutaneous", strength: "100 mg/mL" };
      byDrug[key].treatments.push({ ...profile, contributedBy: partner });
    });
  });

  return Object.values(byDrug).map((entry, idx) => ({
    programmeNumber: `P${idx + 1}`,
    drugName: entry.drugLabel,
    programmeName: entry.programmeName,
    tenantsOnboarded: entry.tenants.size,
    treatmentCount: entry.treatments.length,
    treatments: entry.treatments,
  }));
}

function GovernGlobalDashboard() {
  const totalTenants = PARTNERS.length;
  const partnerCounts = getPartnerProgrammeCounts();
  const totalLocalProgrammes = Object.values(partnerCounts).reduce((a, b) => a + b, 0);
  const totalDrugRecords = buildGlobalDrugRecords().length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Govern / Dashboard</p>
          <h1 className="text-xl font-bold text-slate-900">Global Dashboard</h1>
          <p className="mt-0.5 text-xs text-slate-500">Platform-wide view across all tenants — de-identified, aggregated drug/treatment data only.</p>
        </div>
        <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-600">Global scope</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <GovernKpiCard icon={Building2} value={String(totalTenants)} label="Onboarded Tenants" sub="Partners live on the platform" />
        <GovernKpiCard icon={LayoutGrid} value={String(totalLocalProgrammes)} label="Local Programmes (all tenants)" sub="Sum across every partner" />
        <GovernKpiCard icon={Globe} value={String(totalDrugRecords)} label="Global Drug Records" sub="One per distinct drug, de-duplicated" />
      </div>

      <GovernPanel icon={Building2} title="Local Programmes by Partner">
        <div className="space-y-2">
          {Object.entries(partnerCounts).map(([partner, count]) => (
            <StatBar key={partner} label={partner} value={count} total={totalLocalProgrammes} percent={Math.round((count / totalLocalProgrammes) * 100)} color="bg-violet-500" />
          ))}
        </div>
      </GovernPanel>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Programme tab — per-partner Programme + Baseline (P0) data. Baseline is the
// per-tenant holding programme (Section 3 of the requirements doc): every
// auto-created programme inherits its Case Workflow + SLA from here.
// ---------------------------------------------------------------------------

const PROGRAMS_BY_PARTNER = {
  "Partner ABC": [
    { id: "p-abc-1", name: "Botox drug program", drugLabel: "Botox (Botox generic)", status: "Active", tier: "Full Hub", category: "endocrinology", modules: 9, created: "2026-06-22" },
    { id: "p-abc-2", name: "Bonofide", drugLabel: "Benralizumab (Bonofide)", status: "Active", tier: "Full Hub", category: "neurology", modules: 18, created: "2026-06-10" },
    { id: "p-abc-3", name: "Sun Tech", drugLabel: "Botulinum Toxin (Sun Tech)", status: "Active", tier: "Full Hub", category: "oncology", modules: 17, created: "2026-06-10" },
    { id: "p-abc-4", name: "Albuterol Inhaler Support Program", drugLabel: "Albuterol (Ventolin HFA)", status: "Active", tier: "Lite / Copay EPA", category: "pulmonology", modules: 4, created: "2026-07-08" },
    { id: "p-abc-5", name: "Zaherity Support Program", drugLabel: "Zaherity (DSI)", status: "Active", tier: "Full Hub", category: "oncology", modules: 9, created: "2026-06-26" },
    { id: "p-abc-6", name: "Rybelsus Support Program", drugLabel: "Rybelsus (Semaglutide)", status: "Active", tier: "Lite / Copay EPA", category: "endocrinology", modules: 6, created: "2026-07-10" },
  ],
  "Partner DEF": [
    { id: "p-def-1", name: "Rinvoq", drugLabel: "Upadacitinib (Rinvoq)", status: "Active", tier: "Full Hub", category: "rheumatology", modules: 12, created: "2026-06-15" },
    { id: "p-def-2", name: "Trulicity", drugLabel: "Dulaglutide (Trulicity)", status: "Active", tier: "Lite / Copay EPA", category: "endocrinology", modules: 5, created: "2026-06-18" },
    { id: "p-def-3", name: "Xolair", drugLabel: "Omalizumab (Xolair)", status: "Active", tier: "Full Hub", category: "allergy & immunology", modules: 10, created: "2026-06-20" },
  ],
  "Partner GHI": [
    { id: "p-ghi-1", name: "Enbrel", drugLabel: "Etanercept (Enbrel)", status: "Active", tier: "Full Hub", category: "rheumatology", modules: 11, created: "2026-06-25" },
    { id: "p-ghi-2", name: "Cosentyx", drugLabel: "Secukinumab (Cosentyx)", status: "Active", tier: "Lite / Copay EPA", category: "dermatology", modules: 6, created: "2026-06-28" },
  ],
};

const BASELINE_BY_PARTNER = {
  "Partner ABC": { id: "p0-abc", name: "P0 Baseline", drugLabel: "Not drug-specific — holding programme", status: "Active", tier: null, category: "All specialties", modules: 6, created: "2026-05-01", isBaseline: true },
  "Partner DEF": { id: "p0-def", name: "P0 Baseline", drugLabel: "Not drug-specific — holding programme", status: "Active", tier: null, category: "All specialties", modules: 6, created: "2026-06-01", isBaseline: true },
  "Partner GHI": { id: "p0-ghi", name: "P0 Baseline", drugLabel: "Not drug-specific — holding programme", status: "Active", tier: null, category: "All specialties", modules: 6, created: "2026-06-20", isBaseline: true },
};

const PROGRAMME_TABS = ["Tenant Details", "General", "Drug & Compliance", "Case Workflow", "SLA & Operations", "Intake Form"];

function GovernProgrammeCard({ programme, partner, isGlobal, onConfigure }) {
  const p = programme;
  return (
    <Card className={`flex flex-col justify-between overflow-hidden p-0 ${p.isBaseline ? "border-2 border-amber-500" : ""}`}>
      {p.isBaseline && (
        <div className="flex items-center gap-1.5 bg-amber-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
          <Layers size={12} /> Baseline Programme
        </div>
      )}
      <div className={`flex flex-1 flex-col justify-between p-4 ${p.isBaseline ? "bg-amber-50/40" : ""}`}>
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-bold text-slate-900">
                {p.name} {!p.isBaseline && <span className="text-xs font-normal text-slate-400">{p.drugLabel}</span>}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{p.status}</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {p.category} {!isGlobal && `· ${partner}`}
            {isGlobal && p.tenantsOnboarded ? ` · ${p.tenantsOnboarded} tenants onboarded` : ""}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-500">
            {isGlobal ? (
              <>
                <Layers size={11} /> {p.modules} treatments
              </>
            ) : (
              <>
                <LayoutGrid size={11} /> {p.modules} modules
              </>
            )}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400">Created {p.created}</span>
          <button onClick={() => onConfigure(p)} className="flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Pencil size={12} /> Configure
          </button>
        </div>
      </div>
    </Card>
  );
}

function GovernProgrammeListScreen({ partner, isGlobal, onConfigure }) {
  const baseline = !isGlobal ? BASELINE_BY_PARTNER[partner] : null;
  const programmes = isGlobal
    ? buildGlobalDrugRecords().map((r) => ({
        id: r.programmeNumber,
        name: `${r.programmeName} (Global)`,
        drugLabel: r.drugName,
        status: "Active",
        tier: null,
        category: "Platform-wide",
        modules: r.treatmentCount,
        created: "—",
        tenantsOnboarded: r.tenantsOnboarded,
        treatments: r.treatments,
      }))
    : PROGRAMS_BY_PARTNER[partner] || [];
  const total = programmes.length + (baseline ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Govern / Programme</p>
          <h1 className="text-xl font-bold text-slate-900">{isGlobal ? "Global Programmes" : "Programmes"}</h1>
          <p className="mt-0.5 text-xs text-slate-500">
            {isGlobal ? `${programmes.length} distinct drugs across the platform` : `${total} programmes configured (incl. Baseline)`}
          </p>
        </div>
        {!isGlobal && (
          <button className="flex items-center gap-1.5 rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700">
            <Plus size={14} /> Create Programme
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
          <Search size={13} />
          <span>Search by programme name...</span>
        </div>
        <FilterSelect label="All Statuses" />
        {!isGlobal && <FilterSelect label="All Tiers" />}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {baseline && <GovernProgrammeCard key={baseline.id} programme={baseline} partner={partner} isGlobal={false} onConfigure={onConfigure} />}
        {programmes.map((p) => (
          <GovernProgrammeCard key={p.id} programme={p} partner={partner} isGlobal={isGlobal} onConfigure={onConfigure} />
        ))}
      </div>
    </div>
  );
}

function ToggleRow({ label, sub, checked, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <button
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition ${checked ? "bg-amber-600" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-4" : "left-0.5"}`} />
      </button>
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

function DrugComplianceContent({ programme }) {
  const p = programme;
  const drugBase = (p.drugLabel || "").split(" (")[0];
  const brandMatch = (p.drugLabel || "").match(/\(([^)]+)\)/);
  const [drugName, setDrugName] = useState(drugBase || p.name);
  const [brandName, setBrandName] = useState(brandMatch ? brandMatch[1] : "");
  const [therapeuticArea, setTherapeuticArea] = useState(p.category || "");
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      isPrimary: true,
      drugName: drugBase || p.name,
      dosageForm: "Injection",
      route: "Subcutaneous",
      strength: "100",
      strengthUnit: "mg/mL",
      doseFrequency: "Once Daily",
      daysSupply: "30",
      refills: "5",
      coldChain: false,
      remsRequired: false,
      active: true,
    },
  ]);

  const updateTreatment = (id, field, value) => {
    setTreatments((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };
  const removeTreatment = (id) => setTreatments((prev) => (prev.length > 1 ? prev.filter((t) => t.id !== id) : prev));
  const addTreatment = () => {
    setTreatments((prev) => [
      ...prev,
      { id: Date.now(), isPrimary: false, drugName, dosageForm: "", route: "", strength: "", strengthUnit: "", doseFrequency: "", daysSupply: "", refills: "", coldChain: false, remsRequired: false, active: true },
    ]);
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Drug Information</p>
      <div className="grid grid-cols-3 gap-5">
        <TextField label="Drug Name" value={drugName} onChange={setDrugName} />
        <TextField label="Brand Name" value={brandName} onChange={setBrandName} />
        <TextField label="Therapeutic Area" value={therapeuticArea} onChange={setTherapeuticArea} />
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
          Treatments <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{treatments.length} treatment{treatments.length !== 1 ? "s" : ""}</span>
        </p>
        <button onClick={addTreatment} className="flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700">
          <Plus size={12} /> Add Treatment
        </button>
      </div>

      {treatments.map((t) => (
        <div key={t.id} className={`rounded-lg border p-4 ${t.isPrimary ? "border-amber-200 bg-amber-50/40" : "border-slate-200"}`}>
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              {t.isPrimary ? "Primary Treatment" : "Additional Treatment"}
              {t.isPrimary && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Primary</span>}
            </span>
            {!t.isPrimary && (
              <button onClick={() => removeTreatment(t.id)} className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600">
                <X size={12} /> Remove
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField label="Drug Name" value={t.drugName} onChange={(v) => updateTreatment(t.id, "drugName", v)} />
            <SelectField label="Dosage Form" value={t.dosageForm} onChange={(v) => updateTreatment(t.id, "dosageForm", v)} options={["Injection", "Injection Pen", "Tablet", "Inhaler", "IV Infusion", "Capsule"]} placeholder="Select" />
            <SelectField label="Route of Administration" value={t.route} onChange={(v) => updateTreatment(t.id, "route", v)} options={["Oral", "Subcutaneous", "Intramuscular", "Intravenous", "Inhaled"]} placeholder="Select" />
            <TextField label="Strength" value={t.strength} onChange={(v) => updateTreatment(t.id, "strength", v)} />
            <SelectField label="Strength Unit" value={t.strengthUnit} onChange={(v) => updateTreatment(t.id, "strengthUnit", v)} options={["mg", "mg/mL", "mcg/mL", "units/vial"]} placeholder="Select" />
            <SelectField label="Dose Frequency" value={t.doseFrequency} onChange={(v) => updateTreatment(t.id, "doseFrequency", v)} options={["Once Daily", "Twice Daily", "Weekly", "Every 4 Weeks", "As Needed"]} placeholder="Select" />
            <TextField label="Days Supply" value={t.daysSupply} onChange={(v) => updateTreatment(t.id, "daysSupply", v)} />
            <TextField label="Refills Allowed" value={t.refills} onChange={(v) => updateTreatment(t.id, "refills", v)} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
            <ToggleRow label="Cold Chain Required" sub="Needs temperature-controlled storage & shipping" checked={t.coldChain} onChange={(v) => updateTreatment(t.id, "coldChain", v)} />
            <ToggleRow label="REMS Required" sub="Risk Evaluation & Mitigation Strategy applies" checked={t.remsRequired} onChange={(v) => updateTreatment(t.id, "remsRequired", v)} />
            <ToggleRow label="Active" sub="Dosage record is active in this programme" checked={t.active} onChange={(v) => updateTreatment(t.id, "active", v)} />
          </div>
        </div>
      ))}
    </div>
  );
}

const CASE_WORKFLOW_DESCRIPTIONS = {
  "Data & Intake": "Captures clinical, prescriber, insurance, and patient data needed to begin case processing.",
  "Coverage Determination": "Confirms payer coverage and eligibility for the requested therapy.",
  "Benefits Investigation": "Evaluates and applies manufacturer copay support, free drug programs (PAP), foundation grants, and government program eligibility.",
  "Prior Authorization": "Submits and tracks the payer's prior authorization request for this case.",
  "PA Review": "Monitors payer review status until a determination is returned.",
  "Appeals": "Manages the appeals process for denied or partially approved requests.",
};

function CaseWorkflowContent({ programme }) {
  const p = programme;
  // Defaults to our established 6-step Data & Intake -> Appeals workflow, consistent
  // with the rest of the demo — not the arbitrary module set from the reference screenshot.
  const [configured, setConfigured] = useState(
    CORE_STAGE_LABELS.map((label, idx) => ({ key: `core-${idx}`, label, description: CASE_WORKFLOW_DESCRIPTIONS[label] || "" }))
  );

  const configuredLabels = new Set(configured.map((m) => m.label));
  const available = WORKFLOW_MODULES.filter((m) => !configuredLabels.has(m.label));

  const addModule = (mod) => {
    setConfigured((prev) => [...prev, { key: mod.key, label: mod.label, description: "Custom-configured module for this programme." }]);
  };
  const removeModule = (key) => setConfigured((prev) => prev.filter((m) => m.key !== key));
  const addCustomModule = () => {
    const n = configured.length + 1;
    setConfigured((prev) => [...prev, { key: `custom-${Date.now()}`, label: `Custom Module ${n}`, description: "New custom module — rename and configure as needed." }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-slate-500">
        Configure workflow modules for this programme. Each module maps to one case stage.
        {p.isBaseline
          ? " This is the master workflow — every programme auto-created by Baseline inherits this list unchanged, until edited here."
          : " Inherited from this tenant's P0 Baseline at creation time; add, remove, or reorder freely for this programme."}
      </p>

      <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
        Module Configurations <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{configured.length}</span>
      </p>
      <div className="flex flex-col gap-2">
        {configured.map((m, idx) => (
          <div key={m.key} className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="text-slate-300">⠿</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">{idx + 1}</span>
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">{m.label}</span>
              <span className="text-xs text-slate-400">{m.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-slate-400 hover:text-amber-600">
                <Pencil size={13} />
              </button>
              <button onClick={() => removeModule(m.key)} className="text-red-400 hover:text-red-600">
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">Available Modules</p>
      <div className="flex flex-wrap gap-2">
        {available.map((m) => (
          <button
            key={m.key}
            onClick={() => addModule(m)}
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-amber-300 hover:text-amber-700"
          >
            <Plus size={11} /> {m.label}
          </button>
        ))}
      </div>

      <div className="mt-2 border-t border-slate-100 pt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Custom Module</p>
        <button onClick={addCustomModule} className="flex items-center gap-1.5 rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700">
          <LayoutGrid size={13} /> Add Custom Module
        </button>
      </div>
    </div>
  );
}

const INTAKE_CHANNEL_OPTIONS = ["APIs", "Embedded Screen", "Standalone Portal"];

function SlaOperationsContent({ programme }) {
  const p = programme;
  const [channels, setChannels] = useState(["Embedded Screen"]);
  const [triageSla, setTriageSla] = useState(p.isBaseline ? "4" : "4.2");
  const [biSla, setBiSla] = useState("5");
  const [paSubmissionSla, setPaSubmissionSla] = useState("24");
  const [paFollowUpSla, setPaFollowUpSla] = useState("48");
  const [aeSla, setAeSla] = useState("24");
  const [routingRules, setRoutingRules] = useState([
    { name: "Prior Authorization", sub: "System used to submit and track PA requests", enabled: false },
    { name: "Benefits Investigation", sub: "System used for real-time eligibility and BI", enabled: false },
    { name: "Specialty Pharmacy", sub: "Pharmacy network for fulfillment routing", enabled: false },
    { name: "EHR Integration", sub: "Electronic health record connectivity", enabled: false },
    { name: "Copay Processor", sub: "Copay card adjudication and financial", enabled: false },
  ]);

  const toggleChannel = (c) => setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleRule = (name) => setRoutingRules((prev) => prev.map((r) => (r.name === name ? { ...r, enabled: !r.enabled } : r)));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">Contact</p>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          <span className="mr-1 text-red-500">*</span>Intake Channels
        </label>
        <div className="flex flex-wrap gap-2">
          {INTAKE_CHANNEL_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => toggleChannel(c)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                channels.includes(c) ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">Service Level Agreements</p>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <TextField label="Intake Triage (hrs)" value={triageSla} onChange={setTriageSla} />
            <p className="mt-1 text-[11px] text-slate-400">Max time to triage a new intake</p>
          </div>
          <div>
            <TextField label="Benefits Investigation (biz days)" value={biSla} onChange={setBiSla} />
            <p className="mt-1 text-[11px] text-slate-400">BI completion target</p>
          </div>
          <div>
            <TextField label="PA Submission (hrs)" value={paSubmissionSla} onChange={setPaSubmissionSla} />
            <p className="mt-1 text-[11px] text-slate-400">Submission after BI completion</p>
          </div>
          <div>
            <TextField label="PA Follow-up (hrs)" value={paFollowUpSla} onChange={setPaFollowUpSla} />
            <p className="mt-1 text-[11px] text-slate-400">Follow-up cadence once PA submitted</p>
          </div>
          <div>
            <TextField label="AE Transmission (hrs)" required value={aeSla} onChange={setAeSla} />
            <p className="mt-1 text-[11px] text-slate-400">FDA 21 CFR 314.80 — must be ≤24h</p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">Integration Routing Rules</p>
        <Card className="overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-4 py-2.5 font-semibold">Enabled</th>
                <th className="px-4 py-2.5 font-semibold">Integration</th>
                <th className="px-4 py-2.5 font-semibold">Target System</th>
              </tr>
            </thead>
            <tbody>
              {routingRules.map((r, idx) => (
                <tr key={r.name} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleRule(r.name)} className={`relative h-5 w-9 rounded-full transition ${r.enabled ? "bg-amber-600" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${r.enabled ? "left-4" : "left-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.sub}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-400">Select system</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

function IntakeFormContent() {
  const [formName, setFormName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasSections, setHasSections] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">Form Settings</p>
        <div className="flex items-end gap-6">
          <div className="flex-1">
            <TextField label="Form Name" value={formName} onChange={setFormName} placeholder="e.g. Patient Enrollment Form" />
          </div>
          <ToggleRow label="Is Active" checked={isActive} onChange={setIsActive} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">Form Builder</p>
            <button onClick={() => setHasSections(true)} className="flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700">
              <Plus size={12} /> Add Section
            </button>
          </div>
          {hasSections ? (
            <div className="rounded-md border border-slate-200 px-3 py-2.5 text-sm text-slate-600">Section 1</div>
          ) : (
            <EmptyPlaceholder text="No sections yet. Click Add Section to start building the intake form." />
          )}
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Live Preview</p>
            <button className="flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <LayoutGrid size={12} /> Add Fields from Catalog
            </button>
          </div>
          <div className="flex h-40 items-center justify-center rounded-md bg-slate-50 px-4 text-center text-xs text-slate-400">
            {hasSections ? "Form preview updates as you add fields." : "Add sections and fields in the builder to see the live preview here."}
          </div>
        </div>
      </div>
    </div>
  );
}

function GovernProgrammeConfigModal({ programme, partner, isGlobal, onClose }) {
  const tabs = isGlobal ? ["General", "Treatments"] : programme.isBaseline ? PROGRAMME_TABS.filter((t) => t !== "Drug & Compliance") : PROGRAMME_TABS;
  const [activeTab, setActiveTab] = useState(0);
  const p = programme;

  const renderTab = () => {
    switch (tabs[activeTab]) {
      case "Tenant Details":
        return (
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              Tenant details are auto-populated from the tenant profile and cannot be edited here.
            </div>
            <div className="grid grid-cols-2 gap-5">
              <TextField label="Tenant Name" value={partner} onChange={() => {}} />
              <TextField label="Legal Name" value={`${partner} Holdings LLC`} onChange={() => {}} />
            </div>
            <TextField label="Tenant ID" value={`tnt-${partner.replace(/\s+/g, "-").toLowerCase()}-01`} onChange={() => {}} />
          </div>
        );
      case "General":
        return (
          <div className="flex flex-col gap-5">
            <TextField label="Programme Name" value={p.name} onChange={() => {}} />
            {p.isBaseline ? (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-700">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                Baseline isn't drug-specific — every incoming enrollment is parked here first, then routed to (or spins up) the correct drug programme.
              </div>
            ) : isGlobal ? (
              <TextField label="Drug Name" value={p.drugLabel} onChange={() => {}} />
            ) : (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Drug Name</label>
                <input
                  value={p.drugLabel}
                  disabled
                  className="w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
                />
                <p className="mt-1 text-xs text-slate-400">Inherited from Programme Global — not editable here.</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-5">
              {!p.isBaseline && <SelectField label="Status" value={p.status} onChange={() => {}} options={["Active", "Draft", "Archived"]} />}
              {isGlobal && <TextField label="Tenants Onboarded" value={String(p.tenantsOnboarded || 1)} onChange={() => {}} />}
            </div>
          </div>
        );
      case "Treatments":
        return (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-slate-500">
              Programme Global has no Case Workflow of its own — only the distinct Treatments contributed by each tenant onboarding this drug, de-duplicated by dosage form, route, strength, and unit.
            </p>
            {(p.treatments || []).map((t, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2.5 text-sm">
                <span className="text-slate-700">
                  {t.dosageForm} · {t.route} · {t.strength}
                </span>
                <span className="text-xs text-slate-400">via {t.contributedBy}</span>
              </div>
            ))}
            <button className="mt-1 flex w-fit items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Plus size={12} /> Add Treatment
            </button>
          </div>
        );
      case "Drug & Compliance":
        return <DrugComplianceContent programme={p} />;
      case "Case Workflow":
        return <CaseWorkflowContent programme={p} />;
      case "SLA & Operations":
        return <SlaOperationsContent programme={p} />;
      case "Intake Form":
        return <IntakeFormContent />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
      <div className="flex h-full max-h-[640px] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex w-56 flex-col border-r border-slate-100 bg-slate-50 p-3">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-bold text-amber-700">{isGlobal ? "Global Record" : "Edit Programme"}</p>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={15} />
            </button>
          </div>
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`rounded-lg px-3 py-2.5 text-left text-sm transition ${idx === activeTab ? "bg-amber-100 font-medium text-amber-700" : "text-slate-500 hover:bg-slate-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-6">{renderTab()}</div>
          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 px-6 py-4">
            <button onClick={onClose} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button onClick={onClose} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GovernGlobalProgrammes({ onConfigure }) {
  return <GovernProgrammeListScreen partner="Global" isGlobal onConfigure={onConfigure} />;
}

// ---------------------------------------------------------------------------
// Platform Admin — Global-only. Onboards new tenants (partners) at the
// platform level. Scoped separately from the per-partner Govern views, since
// onboarding is inherently a platform-wide operation.
// ---------------------------------------------------------------------------

const INITIAL_TENANTS = [
  { name: "Partner ABC", code: "PABC-001", legalName: "Partner ABC Holdings LLC", country: "US", tier: "Premium", contactName: "Xyz Admin", contactEmail: "xyz@yopmail.com", status: "Active", created: "2026-05-01" },
  { name: "Partner DEF", code: "PDEF-002", legalName: "Partner DEF Holdings LLC", country: "US", tier: "Premium", contactName: "Def Admin", contactEmail: "admin@partnerdef.com", status: "Active", created: "2026-06-01" },
  { name: "Partner GHI", code: "PGHI-003", legalName: "Partner GHI Holdings LLC", country: "US", tier: "Standard", contactName: "Ghi Admin", contactEmail: "admin@partnerghi.com", status: "Active", created: "2026-06-20" },
];

function CreateTenantModal({ onCreate, onCancel }) {
  const [form, setForm] = useState({
    tenantName: "",
    legalName: "",
    tenantCode: "",
    countryCode: "",
    status: "active",
    contractStart: "",
    contractEnd: "",
    contactName: "",
    contactNumber: "",
    contactEmail: "",
    pvContactEmail: "",
    adminEmail: "",
    adminFirstName: "",
    adminLastName: "",
  });

  // Kept deliberately light — only the essentials are required, so the button
  // isn't stuck disabled behind a long checklist.
  const requiredFields = ["tenantName", "legalName", "contactEmail", "adminEmail"];
  const canSubmit = requiredFields.every((f) => form[f].trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-6">
      <div className="flex h-full max-h-[680px] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
            <h2 className="text-base font-bold text-slate-900">Create Tenant</h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={onCancel} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
            <button
              disabled={!canSubmit}
              onClick={() => onCreate(form)}
              className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Tenant
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-amber-700">Basic Information</p>
          <div className="grid grid-cols-2 gap-5">
            <TextField label="Tenant Name" required value={form.tenantName} onChange={(v) => setForm((p) => ({ ...p, tenantName: v }))} placeholder="e.g. Acme Patient Services" />
            <TextField label="Legal Name" required value={form.legalName} onChange={(v) => setForm((p) => ({ ...p, legalName: v }))} placeholder="e.g. Acme Therapeutics LLC" />
            <TextField label="Tenant Code" value={form.tenantCode} onChange={(v) => setForm((p) => ({ ...p, tenantCode: v }))} placeholder="e.g. GS1-1234" />
            <TextField label="Country Code" value={form.countryCode} onChange={(v) => setForm((p) => ({ ...p, countryCode: v }))} placeholder="US" />
            <SelectField label="Status" value={form.status} onChange={(v) => setForm((p) => ({ ...p, status: v }))} options={["active", "inactive"]} />
          </div>

          <p className="mb-3 mt-6 border-t border-slate-100 pt-5 text-xs font-bold uppercase tracking-wide text-amber-700">Contract Details</p>
          <div className="grid grid-cols-2 gap-5">
            <TextField label="Contract Start Date" type="date" value={form.contractStart} onChange={(v) => setForm((p) => ({ ...p, contractStart: v }))} />
            <TextField label="Contract End Date" type="date" value={form.contractEnd} onChange={(v) => setForm((p) => ({ ...p, contractEnd: v }))} />
          </div>

          <p className="mb-3 mt-6 border-t border-slate-100 pt-5 text-xs font-bold uppercase tracking-wide text-amber-700">Contact Details</p>
          <div className="grid grid-cols-2 gap-5">
            <TextField label="Contact Name" value={form.contactName} onChange={(v) => setForm((p) => ({ ...p, contactName: v }))} placeholder="Primary contact" />
            <TextField label="Contact Number" value={form.contactNumber} onChange={(v) => setForm((p) => ({ ...p, contactNumber: v }))} placeholder="10-digit phone number" />
            <TextField label="Contact Email" required value={form.contactEmail} onChange={(v) => setForm((p) => ({ ...p, contactEmail: v }))} placeholder="contact@example.com" />
            <TextField label="PV Contact Email" value={form.pvContactEmail} onChange={(v) => setForm((p) => ({ ...p, pvContactEmail: v }))} placeholder="pv@example.com" />
          </div>

          <p className="mb-3 mt-6 border-t border-slate-100 pt-5 text-xs font-bold uppercase tracking-wide text-amber-700">Tenant Admin</p>
          <div className="grid grid-cols-2 gap-5">
            <TextField label="Admin Email" required value={form.adminEmail} onChange={(v) => setForm((p) => ({ ...p, adminEmail: v }))} placeholder="tenant.admin@example.com" />
            <TextField label="Admin First Name" value={form.adminFirstName} onChange={(v) => setForm((p) => ({ ...p, adminFirstName: v }))} placeholder="William" />
            <TextField label="Admin Last Name" value={form.adminLastName} onChange={(v) => setForm((p) => ({ ...p, adminLastName: v }))} placeholder="Grant" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformAdminScreen() {
  const [tenants, setTenants] = useState(INITIAL_TENANTS);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [justCreated, setJustCreated] = useState(null);

  const activeCount = tenants.filter((t) => t.status === "Active").length;
  const inactiveCount = tenants.length - activeCount;
  const filtered = statusFilter === "All" ? tenants : tenants.filter((t) => t.status === statusFilter);

  const handleCreate = (form) => {
    const newTenant = {
      name: form.tenantName,
      code: form.tenantCode || `${form.tenantName.slice(0, 4).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
      legalName: form.legalName,
      country: (form.countryCode || "—").toUpperCase(),
      contactName: form.contactName || "—",
      contactEmail: form.contactEmail,
      status: form.status === "active" ? "Active" : "Inactive",
      created: "2026-07-22",
      adminEmail: form.adminEmail,
      adminName: `${form.adminFirstName} ${form.adminLastName}`.trim() || "—",
    };
    setTenants((prev) => [newTenant, ...prev]);
    setShowCreate(false);
    setJustCreated(newTenant);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Govern / Platform Admin</p>
          <h1 className="text-xl font-bold text-slate-900">Platform Profile</h1>
          <p className="mt-0.5 text-xs text-slate-500">{tenants.length} tenants configured</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-1.5 rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
          <Plus size={15} /> Create Tenant
        </button>
      </div>

      {justCreated && (
        <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700">
          <CheckCircle2 size={14} />
          <span>
            Tenant <span className="font-semibold">{justCreated.name}</span> created — admin invitation sent to <span className="font-semibold">{justCreated.adminEmail}</span>.
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <GovernKpiCard icon={Users} badge={`${tenants.length} total`} badgeTone="bg-slate-100 text-slate-500" value={String(tenants.length)} label="Total Tenants" sub={`${activeCount} active · ${inactiveCount} inactive`} />
        <GovernKpiCard icon={CheckCircle2} badge="Active" value={String(activeCount)} label="Active Tenants" sub={`${Math.round((activeCount / tenants.length) * 100)}% of total`} />
        <GovernKpiCard icon={XCircle} badge="Clear" badgeTone="bg-slate-100 text-slate-500" value={String(inactiveCount)} label="Inactive Tenants" sub="Needs review when inactive" />
      </div>

      <Card className="p-0">
        <div className="flex items-center gap-3 p-4">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
            <Search size={13} />
            <span>Search tenants...</span>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-slate-100 p-1">
            {["All", "Active", "Inactive"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${statusFilter === f ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Tenant Name</th>
              <th className="px-4 py-3 font-semibold">Tenant Code</th>
              <th className="px-4 py-3 font-semibold">Legal Name</th>
              <th className="px-4 py-3 font-semibold">Country</th>
              <th className="px-4 py-3 font-semibold">Contact Name</th>
              <th className="px-4 py-3 font-semibold">Contact Email</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 10).map((t, idx) => (
              <tr key={`${t.code}-${idx}`} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <td className="px-4 py-3 font-medium text-slate-800">{t.name}</td>
                <td className="px-4 py-3 text-indigo-600">{t.code}</td>
                <td className="px-4 py-3 text-slate-600">{t.legalName}</td>
                <td className="px-4 py-3 text-slate-500">{t.country}</td>
                <td className="px-4 py-3 text-slate-600">{t.contactName}</td>
                <td className="px-4 py-3 text-slate-500">{t.contactEmail}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${t.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{t.created}</td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
          <span>1–{Math.min(10, filtered.length)} of {filtered.length} tenants</span>
          <div className="flex items-center gap-1.5">
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft size={13} />
            </button>
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-amber-200 bg-amber-50 font-medium text-amber-700">1</span>
            <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </Card>

      {showCreate && <CreateTenantModal onCreate={handleCreate} onCancel={() => setShowCreate(false)} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Super Admin — per-partner (not Global). Groups/Users/Roles/Programme
// Assignments/Workflow Modules. Same structure & sample data replicated
// across all 3 partners. "HCP" renamed to "Enrollment" throughout, and
// Patient Portal defaults dropped, to match this demo's scope.
// ---------------------------------------------------------------------------

const SUPER_ADMIN_GROUPS = [
  { name: "All portals group", isDefault: false, description: "—", status: "Active", permissions: "230 permissions", created: "2026-06-19 05:26" },
  { name: "DEFAULT ENROLLMENT GROUP", isDefault: true, description: "this is the default group for the enrollment user/provider", status: "Active", permissions: "None", created: "2026-06-24 06:01" },
  { name: "Engage Permission Group", isDefault: false, description: "—", status: "Active", permissions: "None", created: "2026-06-17 12:33" },
  { name: "Field Permission Group", isDefault: false, description: "—", status: "Active", permissions: "None", created: "2026-06-17 05:34" },
  { name: "Enrollment Admin", isDefault: false, description: "—", status: "Active", permissions: "14 permissions", created: "2026-06-10 07:53" },
  { name: "Hub Core Permission Group", isDefault: false, description: "—", status: "Active", permissions: "21 permissions", created: "2026-06-10 07:53" },
  { name: "Outcomes Permission Group", isDefault: false, description: "—", status: "Active", permissions: "None", created: "2026-06-19 02:58" },
  { name: "outcomeuser", isDefault: false, description: "—", status: "Active", permissions: "None", created: "2026-06-23 07:57" },
  { name: "portal", isDefault: false, description: "portal", status: "Active", permissions: "None", created: "2026-06-27 20:33" },
  { name: "SUPER_ADMIN_GROUP", isDefault: true, description: "group for tenant", status: "Active", permissions: "None", created: "2026-06-06 11:15" },
];

const SUPER_ADMIN_ROLES = [
  { name: "All portal role", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-19 05:26" },
  { name: "DEFAULT ENROLLMENT ROLE", isDefault: true, description: "this default role is for enrollment user/providers only", groups: "1 group", status: "Active", created: "2026-06-24 06:01" },
  { name: "Engage Admin", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-17 12:33" },
  { name: "Field Admin", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-17 05:34" },
  { name: "Enrollment Admin", isDefault: false, description: "—", groups: "2 groups", status: "Active", created: "2026-06-10 07:55" },
  { name: "Hub Core Admin", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-10 07:55" },
  { name: "outcomerole", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-23 07:58" },
  { name: "Outcomes Admin", isDefault: false, description: "—", groups: "1 group", status: "Active", created: "2026-06-19 02:58" },
  { name: "portal", isDefault: false, description: "portal", groups: "1 group", status: "Active", created: "2026-06-27 20:33" },
  { name: "SUPER_ADMIN", isDefault: true, description: "role for tenant", groups: "1 group", status: "Active", created: "2026-06-06 11:16" },
];

const SUPER_ADMIN_USERS = [
  { name: "ABC", email: "abc@yopmail.com", roles: "1 role", status: "Active", created: "2026-06-10 07:47" },
  { name: "aa aa", email: "aa@aa.com", roles: "None", status: "Active", created: "2026-06-21 20:59" },
  { name: "aa aa", email: "sb6qnxmmir@ozsaip.com", roles: "12 roles", status: "Active", created: "2026-06-27 20:21" },
  { name: "ASA AA", email: "aravindhreddyk99@gmail.com", roles: "2 roles", status: "Active", created: "2026-06-08 15:17" },
  { name: "Jay Bafna", email: "suraj.kokare@neutrinotechlabs.com", roles: "1 role", status: "Active", created: "2026-06-16 07:54" },
  { name: "Jay Bafna", email: "jaybafna@yopmail.com", roles: "2 roles", status: "Active", created: "2026-06-14 06:54" },
  { name: "Jay Bafna", email: "rossbafna@gmail.com", roles: "1 role", status: "Active", created: "2026-06-16 07:54" },
  { name: "Jay Bafna", email: "wi3o0p8blt@wnbaldwy.com", roles: "2 roles", status: "Active", created: "2026-06-17 08:41" },
  { name: "Atharav Bhagwat", email: "rendell.jamar@allwebemails.com", roles: "2 roles", status: "Active", created: "2026-06-19 12:37" },
  { name: "madmaxxx gunnu", email: "qnatd90059@minitts.net", roles: "1 role", status: "Active", created: "2026-06-28 18:28" },
  { name: "Jay j", email: "naoh.field4@yopmail.com", roles: "1 role", status: "Active", created: "2026-06-24 08:52" },
  { name: "Noah K", email: "noah_345@gmail.com", roles: "1 role", status: "Active", created: "2026-06-28 01:59" },
  { name: "emma mark", email: "john.anderson_55@yopmail.com", roles: "3 roles", status: "Active", created: "2026-06-23 16:47" },
  { name: "jack mark", email: "naoh.field2@yopmail.com", roles: "1 role", status: "Active", created: "2026-06-24 08:31" },
  { name: "joe mark", email: "naoh.field1@yopmail.com", roles: "2 roles", status: "Active", created: "2026-06-24 08:15" },
  { name: "mas mas", email: "mas@d.com", roles: "1 role", status: "Active", created: "2026-06-21 20:59" },
  { name: "Mickey Mouse", email: "mickey.mouse@allfreemail.net", roles: "1 role", status: "Active", created: "2026-06-28 13:21" },
];

const WORKFLOW_MODULES = [
  { index: 1, key: "enrollment", label: "Referral Receipt", type: "System" },
  { index: 2, key: "intake", label: "Data & Intake", type: "System" },
  { index: 3, key: "triage", label: "Triage", type: "System" },
  { index: 4, key: "investigation", label: "Benefits Investigation", type: "System" },
  { index: 5, key: "coverage", label: "Coverage Determination", type: "System" },
  { index: 6, key: "authorization", label: "Prior Authorization", type: "System" },
  { index: 7, key: "review", label: "PA Review", type: "System" },
  { index: 8, key: "appeals", label: "Appeals", type: "System" },
  { index: 9, key: "financial", label: "Financial Assistance", type: "System" },
  { index: 10, key: "coordination", label: "Coordination", type: "System" },
  { index: 11, key: "approval", label: "Therapy Approval", type: "System" },
  { index: 12, key: "fulfillment", label: "Fulfillment", type: "System" },
  { index: 13, key: "scheduling", label: "Treatment Scheduling", type: "System" },
  { index: 14, key: "billing", label: "Billing Reimbursement", type: "System" },
  { index: 15, key: "adherence", label: "Adherence Support", type: "System" },
  { index: 16, key: "renewal", label: "Reauthorization", type: "System" },
  { index: 17, key: "closure", label: "Case Closure", type: "System" },
  { index: 18, key: "custom_enrollment_test", label: "Enrollment_Test", type: "Custom" },
  { index: 19, key: "pa", label: "Agadia PA Hub Integration", type: "Custom" },
  { index: 20, key: "pa_initiation", label: "PA Initiation", type: "Custom" },
];

const SUPER_ADMIN_SUBTABS = ["Groups", "Users", "Roles", "Workflow Modules"];

function SuperAdminTableShell({ title, createLabel, searchPlaceholder, children }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
          <Search size={13} />
          <span>{searchPlaceholder}</span>
        </div>
        {createLabel && (
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700">
            <Plus size={13} /> {createLabel}
          </button>
        )}
      </div>
      <Card className="overflow-hidden p-0">{children}</Card>
    </div>
  );
}

function SuperAdminGroupsTab() {
  return (
    <SuperAdminTableShell title="Groups" createLabel="Create Group" searchPlaceholder="Search groups...">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Permissions</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {SUPER_ADMIN_GROUPS.map((g, idx) => (
            <tr key={g.name + idx} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
              <td className="px-4 py-3">
                <span className="font-medium text-slate-800">{g.name}</span>
                {g.isDefault && <span className="ml-2 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">Default</span>}
              </td>
              <td className="px-4 py-3 text-slate-500">{g.description}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">{g.status}</span>
              </td>
              <td className="px-4 py-3">
                {g.permissions === "None" ? (
                  <span className="text-slate-400">None</span>
                ) : (
                  <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700">{g.permissions}</span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-500">{g.created}</td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SuperAdminTableShell>
  );
}

function SuperAdminUsersTab() {
  return (
    <SuperAdminTableShell title="Users" createLabel="Create User" searchPlaceholder="Search users...">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Roles</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {SUPER_ADMIN_USERS.map((u, idx) => (
            <tr key={u.email + idx} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
              <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
              <td className="px-4 py-3 text-slate-500">{u.email}</td>
              <td className="px-4 py-3">
                {u.roles === "None" ? (
                  <span className="text-slate-400">None</span>
                ) : (
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-600">{u.roles}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">{u.status}</span>
              </td>
              <td className="px-4 py-3 text-slate-500">{u.created}</td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SuperAdminTableShell>
  );
}

function SuperAdminRolesTab() {
  return (
    <SuperAdminTableShell title="Roles" createLabel="Create Role" searchPlaceholder="Search roles...">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Description</th>
            <th className="px-4 py-3 font-semibold">Groups</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Created</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {SUPER_ADMIN_ROLES.map((r, idx) => (
            <tr key={r.name + idx} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
              <td className="px-4 py-3">
                <span className="font-medium text-slate-800">{r.name}</span>
                {r.isDefault && <span className="ml-2 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">Default</span>}
              </td>
              <td className="px-4 py-3 text-slate-500">{r.description}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-semibold text-sky-700">{r.groups}</span>
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">{r.status}</span>
              </td>
              <td className="px-4 py-3 text-slate-500">{r.created}</td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                  <Pencil size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SuperAdminTableShell>
  );
}

function SuperAdminWorkflowModulesTab() {
  const systemCount = WORKFLOW_MODULES.filter((m) => m.type === "System").length;
  const customCount = WORKFLOW_MODULES.filter((m) => m.type === "Custom").length;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-900">Workflow Module Definitions</p>
          <p className="text-xs text-slate-500">
            {systemCount} system · {customCount} custom — defines available modules for programme configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
            <Search size={13} />
            <span>Search workflow modules...</span>
          </div>
          <button className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700">
            <Plus size={13} /> Add Custom Module
          </button>
        </div>
      </div>
      <Card className="overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400">
              <th className="px-4 py-3 font-semibold">Index</th>
              <th className="px-4 py-3 font-semibold">Key</th>
              <th className="px-4 py-3 font-semibold">Label</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {WORKFLOW_MODULES.map((m, idx) => (
              <tr key={m.key} className={`border-b border-slate-50 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <td className="px-4 py-3 text-slate-400">{m.index}</td>
                <td className="px-4 py-3">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs text-slate-600">{m.key}</span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">{m.label}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${m.type === "System" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{m.type}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-amber-50 hover:text-amber-600">
                      <Pencil size={14} />
                    </button>
                    {m.type === "Custom" && (
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-400 hover:bg-red-50 hover:text-red-600">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SuperAdminScreen() {
  const [subTab, setSubTab] = useState("Groups");
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-slate-900">Super Admin</h1>
      <div className="flex gap-6 border-b border-slate-200">
        {SUPER_ADMIN_SUBTABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium ${subTab === tab ? "border-amber-600 text-amber-700" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      {subTab === "Groups" && <SuperAdminGroupsTab />}
      {subTab === "Users" && <SuperAdminUsersTab />}
      {subTab === "Roles" && <SuperAdminRolesTab />}
      {subTab === "Workflow Modules" && <SuperAdminWorkflowModulesTab />}
    </div>
  );
}

function GovernScreen({ partner, onBack, onLogout, onSwitchPartner }) {
  const [governTab, setGovernTab] = useState("dashboard");
  const [configuringProgramme, setConfiguringProgramme] = useState(null);
  const isGlobal = partner === "Global";

  const navItems = GOVERN_NAV_ITEMS.map((item) => (item.key === "super-admin" && isGlobal ? { ...item, label: "Platform Admin" } : item));
  const activeLabel = navItems.find((n) => n.key === governTab)?.label || "";

  const dashboardContent = isGlobal ? <GovernGlobalDashboard /> : <GovernOperationalDashboard partner={partner} />;
  const programmeContent = isGlobal ? (
    <GovernGlobalProgrammes onConfigure={setConfiguringProgramme} />
  ) : (
    <GovernProgrammeListScreen partner={partner} isGlobal={false} onConfigure={setConfiguringProgramme} />
  );

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] font-sans text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-600">
            <ShieldAlert size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">AnvayaRx</p>
            <p className="text-[11px] leading-tight text-slate-500">Govern Module</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <PartnerSwitcherBadge
            current={partner}
            options={[...PARTNERS, "Global"]}
            onSwitch={onSwitchPartner}
            toneClass={isGlobal ? "bg-violet-50 text-violet-600" : "bg-amber-50 text-amber-700"}
          />
          <button onClick={onBack} className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-amber-600">
            <ChevronLeft size={13} /> Modules
          </button>
          <button onClick={onLogout} title="Log out" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <LogOut size={15} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <Bell size={16} />
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-xs font-semibold text-white">A</span>
        </div>
      </header>

      <div className="flex">
        <nav className="flex w-52 flex-col gap-1 border-r border-slate-200 bg-white p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === governTab;
            return (
              <button
                key={item.key}
                onClick={() => setGovernTab(item.key)}
                className={`flex items-center justify-between gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive ? "bg-amber-50 font-medium text-amber-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={16} className={isActive ? "text-amber-600" : "text-slate-400"} />
                  {item.label}
                </span>
                {item.expandable && <ChevronDown size={12} className="text-slate-400" />}
              </button>
            );
          })}
        </nav>
        <main className="flex-1 p-6">
          {governTab === "dashboard" ? (
            dashboardContent
          ) : governTab === "programme" ? (
            programmeContent
          ) : governTab === "super-admin" && isGlobal ? (
            <PlatformAdminScreen />
          ) : governTab === "super-admin" ? (
            <SuperAdminScreen />
          ) : (
            <ComingSoonScreen label={activeLabel} />
          )}
        </main>
      </div>

      {configuringProgramme && (
        <GovernProgrammeConfigModal programme={configuringProgramme} partner={partner} isGlobal={isGlobal} onClose={() => setConfiguringProgramme(null)} />
      )}
    </div>
  );
}


function EnrollmentPortalAdminApp({ partner, userEmail, userName, onGoToModules, onLogout, onSwitchPartner }) {
  const [active, setActive] = useState("dashboard");
  const [selectedCase, setSelectedCase] = useState(null);
  const [enrollmentMode, setEnrollmentMode] = useState(null); // null | "create" | "update" | "view" | "edit"
  const [enrollmentCase, setEnrollmentCase] = useState(null);
  const [viewingEnrollmentId, setViewingEnrollmentId] = useState(null);
  // null | { screen: "cases" | "case-detail", caseId?, tab? } — only ever populated by a Task deep-link
  const [coreState, setCoreState] = useState(null);

  const data = getPartnerDataset(partner);
  const activeLabel = NAV_ITEMS.find((n) => n.key === active)?.label || "";

  const handleNavClick = (key) => {
    setActive(key);
    setSelectedCase(null);
    setEnrollmentMode(null);
    setEnrollmentCase(null);
    setViewingEnrollmentId(null);
    setCoreState(null);
  };

  const openCoreDeepLink = (caseId, tab) => {
    setCoreState({ screen: "case-detail", caseId, tab });
  };

  const handleViewEnrollment = (enrollmentRow) => {
    const linkedCase = data.caseRows.find((c) => c.caseId === enrollmentRow.caseId);
    setEnrollmentCase(linkedCase || { patient: enrollmentRow.patient, caseId: enrollmentRow.caseId, priority: enrollmentRow.priority });
    setViewingEnrollmentId(enrollmentRow.enrollmentId);
    setEnrollmentMode("view");
  };

  const handleEditEnrollment = (enrollmentRow) => {
    const linkedCase = data.caseRows.find((c) => c.caseId === enrollmentRow.caseId);
    setEnrollmentCase(linkedCase || { patient: enrollmentRow.patient, caseId: enrollmentRow.caseId, priority: enrollmentRow.priority });
    setViewingEnrollmentId(enrollmentRow.enrollmentId);
    setEnrollmentMode("edit");
  };

  const handleOpenLinkedCase = (caseId) => {
    const linkedCase = data.caseRows.find((c) => c.caseId === caseId);
    if (!linkedCase) return;
    setActive("case-tracking");
    setSelectedCase(linkedCase);
    setEnrollmentMode(null);
    setEnrollmentCase(null);
    setCoreState(null);
  };

  let content;
  if (active === "dashboard") {
    content = (
      <DashboardScreen
        dashboardCases={data.dashboardCases}
        caseRows={data.caseRows}
        tasks={data.tasks}
        onNewEnrollment={() => {
          setActive("enrollment");
          setEnrollmentMode("create");
        }}
        onViewTasks={() => handleNavClick("tasks")}
      />
    );
  } else if (active === "enrollment") {
    if (enrollmentMode === "create") {
      content = <EnrollmentForm mode="create" caseItem={null} onBack={() => setEnrollmentMode(null)} />;
    } else if (enrollmentMode === "view") {
      content = (
        <EnrollmentForm
          mode="view"
          caseItem={enrollmentCase}
          enrollmentId={viewingEnrollmentId}
          onBack={() => {
            setEnrollmentMode(null);
            setEnrollmentCase(null);
            setViewingEnrollmentId(null);
          }}
        />
      );
    } else if (enrollmentMode === "edit") {
      content = (
        <EnrollmentForm
          mode="edit"
          caseItem={enrollmentCase}
          enrollmentId={viewingEnrollmentId}
          onBack={() => {
            setEnrollmentMode(null);
            setEnrollmentCase(null);
            setViewingEnrollmentId(null);
          }}
        />
      );
    } else {
      content = (
        <EnrollmentsListScreen
          enrollments={data.enrollments}
          caseRows={data.caseRows}
          onNew={() => setEnrollmentMode("create")}
          onView={handleViewEnrollment}
          onEdit={handleEditEnrollment}
        />
      );
    }
  } else if (active === "case-tracking") {
    if (enrollmentMode === "update") {
      content = (
        <EnrollmentForm
          mode="update"
          caseItem={enrollmentCase}
          onBack={() => {
            setEnrollmentMode(null);
            setEnrollmentCase(null);
          }}
        />
      );
    } else if (selectedCase) {
      content = (
        <CaseDetailScreen
          caseItem={selectedCase}
          onBack={() => setSelectedCase(null)}
          onUpdateCase={() => {
            setEnrollmentMode("update");
            setEnrollmentCase(selectedCase);
          }}
        />
      );
    } else {
      content = <CaseTrackingScreen caseRows={data.caseRows} onView={(c) => setSelectedCase(c)} />;
    }
  } else if (active === "tasks") {
    content = <TasksScreen tasks={data.tasks} caseRows={data.caseRows} onOpenCoreDeepLink={openCoreDeepLink} onOpenCase={handleOpenLinkedCase} />;
  } else {
    content = <ComingSoonScreen label={activeLabel} />;
  }

  if (coreState) {
    let coreContent;
    if (coreState.screen === "cases") {
      coreContent = <CoreCasesScreen caseRows={data.caseRows} onView={(c) => setCoreState({ screen: "case-detail", caseId: c.caseId })} />;
    } else {
      const linkedCase = data.caseRows.find((c) => c.caseId === coreState.caseId) || { caseId: coreState.caseId, patient: "Unknown Patient", priority: "Normal" };
      coreContent = (
        <CorePAScreen
          caseItem={linkedCase}
          initialTab={coreState.tab}
          initialStage={coreState.tab ? 3 : 0}
          onBack={() => setCoreState({ screen: "cases" })}
        />
      );
    }

    return (
      <CorePortalShell
        activeNavLabel="Cases"
        onNavClick={() => setCoreState({ screen: "cases" })}
        navItems={["Cases"]}
        backLabel="Enrollment Portal"
        onBack={() => setCoreState(null)}
        userEmail={userEmail}
        userName={userName}
      >
        {coreContent}
      </CorePortalShell>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F9FB] font-sans text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-indigo-600" />
          <div>
            <p className="text-sm font-bold leading-tight">AnvayaRx</p>
            <p className="text-[11px] leading-tight text-slate-500">Enrollment Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <PartnerSwitcherBadge current={partner} options={PARTNERS} onSwitch={onSwitchPartner} toneClass="bg-indigo-50 text-indigo-600" />
          <button onClick={onGoToModules} className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600">
            <ChevronLeft size={13} /> Modules
          </button>
          <button onClick={onLogout} title="Log out" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <LogOut size={15} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
            <Bell size={16} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-indigo-600" />
            <div>
              <p className="text-xs font-medium leading-tight">{userName}</p>
              <p className="text-[10px] leading-tight text-slate-400">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="flex w-56 flex-col gap-1 border-r border-slate-200 bg-white p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isActive ? "bg-indigo-100 font-medium text-indigo-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={16} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <main className="flex-1 p-6">{content}</main>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Core, entered directly from the module selector (not via a Task deep-link).
// Has its own Cases/Patients browsing state and a "Modules" back button.
// ---------------------------------------------------------------------------

function CoreModuleApp({ partner, userEmail, userName, onGoToModules, onLogout, onSwitchPartner }) {
  const [coreState, setCoreState] = useState({ screen: "cases" });
  const data = getPartnerDataset(partner);

  const navLabelForScreen = { cases: "Cases", "case-detail": "Cases", patients: "Patients", "patient-detail": "Patients", users: "Users" };
  const screenKeyForLabel = { Cases: "cases", Patients: "patients", Users: "users" };

  let coreContent;
  if (coreState.screen === "patients") {
    coreContent = <CorePatientsScreen patients={data.patients} caseRows={data.caseRows} onView={(p) => setCoreState({ screen: "patient-detail", mrn: p.mrn })} />;
  } else if (coreState.screen === "patient-detail") {
    const patient = data.patients.find((p) => p.mrn === coreState.mrn);
    coreContent = (
      <CorePatientDetailScreen
        patient={patient}
        caseRows={data.caseRows}
        onBack={() => setCoreState({ screen: "patients" })}
        onOpenCase={(caseId) => setCoreState({ screen: "case-detail", caseId })}
      />
    );
  } else if (coreState.screen === "cases") {
    coreContent = <CoreCasesScreen caseRows={data.caseRows} onView={(c) => setCoreState({ screen: "case-detail", caseId: c.caseId })} />;
  } else if (coreState.screen === "users") {
    coreContent = <EnrollmentPortalUsersScreen partner={partner} />;
  } else {
    const linkedCase = data.caseRows.find((c) => c.caseId === coreState.caseId) || { caseId: coreState.caseId, patient: "Unknown Patient", priority: "Normal" };
    coreContent = (
      <CorePAScreen caseItem={linkedCase} initialTab={coreState.tab} initialStage={coreState.tab ? 3 : 0} onBack={() => setCoreState({ screen: "cases" })} />
    );
  }

  return (
    <CorePortalShell
      activeNavLabel={navLabelForScreen[coreState.screen]}
      onNavClick={(label) => setCoreState({ screen: screenKeyForLabel[label] || "cases" })}
      backLabel="Modules"
      onBack={onGoToModules}
      onLogout={onLogout}
      partnerLabel={partner}
      onSwitchPartner={onSwitchPartner}
      userEmail={userEmail}
      userName={userName}
    >
      {coreContent}
    </CorePortalShell>
  );
}

// ---------------------------------------------------------------------------
// Top-level flow controller: Admin login -> Module selector -> Enrollment
// Portal / Core / Govern. A single AnvayaRx superadmin session throughout —
// no partner hand-off involved, this is a direct AnvayaRx login.
// ---------------------------------------------------------------------------

export default function AnvayaRxAdminPortal() {
  // "login" | "partner-select" | "modules" | "enrollment-portal" | "core" | "govern"
  const [stage, setStage] = useState("login");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const ADMIN_NAME = "AnvayaRx Admin";

  const handleLogout = () => {
    setStage("login");
    setSelectedPartner(null);
  };
  const goToModules = () => setStage("modules");
  // Inline switch — stays on whatever screen/module you're currently viewing,
  // just re-scopes it to the newly chosen partner. If switching away from
  // Global while sitting in Govern, Govern simply re-renders in partner mode.
  const switchPartner = (newPartner) => setSelectedPartner(newPartner);

  if (stage === "login") {
    return <AdminLoginScreen onLogin={() => setStage("partner-select")} />;
  }

  if (stage === "partner-select") {
    return (
      <PartnerSelectScreen
        onContinue={(partner) => {
          setSelectedPartner(partner);
          setStage("modules");
        }}
        onLogout={handleLogout}
      />
    );
  }

  if (stage === "modules") {
    return (
      <ModuleSelectorScreen
        userEmail={ADMIN_CREDENTIALS.username}
        userName={ADMIN_NAME}
        partner={selectedPartner}
        onSelect={(key) => setStage(key)}
        onSwitchPartner={switchPartner}
        onLogout={handleLogout}
      />
    );
  }

  if (stage === "core") {
    return (
      <CoreModuleApp
        partner={selectedPartner}
        userEmail={ADMIN_CREDENTIALS.username}
        userName={ADMIN_NAME}
        onGoToModules={goToModules}
        onLogout={handleLogout}
        onSwitchPartner={switchPartner}
      />
    );
  }

  if (stage === "govern") {
    return <GovernScreen partner={selectedPartner} onBack={goToModules} onLogout={handleLogout} onSwitchPartner={switchPartner} />;
  }

  return (
    <EnrollmentPortalAdminApp
      partner={selectedPartner}
      userEmail={ADMIN_CREDENTIALS.username}
      userName={ADMIN_NAME}
      onGoToModules={goToModules}
      onLogout={handleLogout}
      onSwitchPartner={switchPartner}
    />
  );
}
