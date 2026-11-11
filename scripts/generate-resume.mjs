import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const outputPath = fileURLToPath(new URL('../public/resume.pdf', import.meta.url));
const document = new PDFDocument({
  size: 'A4',
  margins: { top: 38, right: 44, bottom: 38, left: 44 },
  info: {
    Title: 'Diksha Chauhan - AI Automation Engineer',
    Author: 'Diksha Chauhan',
    Subject: 'Resume',
  },
});
const output = createWriteStream(outputPath);
document.pipe(output);

const pageWidth = document.page.width;
const left = document.page.margins.left;
const right = pageWidth - document.page.margins.right;
const contentWidth = right - left;
const ink = '#101827';
const muted = '#526071';
const accent = '#087e8b';
const pale = '#d7eef0';

const addSection = (title) => {
  document.moveDown(0.8);
  const y = document.y;
  document.font('Helvetica-Bold').fontSize(9).fillColor(accent).text(title.toUpperCase(), left, y);
  document.moveTo(left, y + 13).lineTo(right, y + 13).lineWidth(0.65).strokeColor(pale).stroke();
  document.y = y + 19;
};

const addBullet = (text) => {
  const y = document.y;
  document.circle(left + 3, y + 5, 1.4).fill(accent);
  document.font('Helvetica').fontSize(8.4).fillColor(muted).text(text, left + 12, y, {
    width: contentWidth - 12,
    lineGap: 1.5,
  });
  document.y += 4;
};

const addProject = (title, status, description) => {
  const y = document.y;
  document.font('Helvetica-Bold').fontSize(8.8).fillColor(ink).text(title, left, y, { continued: true });
  document.font('Helvetica').fontSize(7.7).fillColor(accent).text(`  |  ${status}`);
  document.font('Helvetica').fontSize(8.1).fillColor(muted).text(description, left, document.y + 1, {
    width: contentWidth,
    lineGap: 1,
  });
  document.y += 5;
};

document.font('Helvetica-Bold').fontSize(25).fillColor(ink).text('Diksha Chauhan', left, 38);
document.font('Helvetica').fontSize(11).fillColor(accent).text('AI Automation Engineer', left, 69);
document.font('Helvetica').fontSize(8).fillColor(muted).text(
  'n8n  |  AI integrations  |  APIs and workflow engineering',
  left,
  86
);
document.font('Helvetica').fontSize(7.5).fillColor(muted).text(
  'dikshachauhan9201@gmail.com  |  +91 9217682198  |  linkedin.com/in/diksha-chauhan-465559403  |  India',
  left,
  104,
  { width: contentWidth }
);

addSection('Professional summary');
document.font('Helvetica').fontSize(8.5).fillColor(muted).text(
  'AI Automation Engineer focused on n8n, multi-step workflow design, and practical integrations. Built 50+ workflows connecting APIs, webhooks, data sources, and AI services. Emphasis on clear validation, conditional routing, testing, maintainability, and human review where it matters.',
  left,
  document.y,
  { width: contentWidth, lineGap: 2 }
);

addSection('Experience');
document.font('Helvetica-Bold').fontSize(9).fillColor(ink).text('Independent AI automation projects', left, document.y, { continued: true });
document.font('Helvetica').fontSize(8).fillColor(muted).text('  |  2023 - Present');
addBullet('Design and build workflow prototypes for lead intake, qualification, messaging, email, CRM updates, and data handling.');
addBullet('Connect services with APIs and webhooks; add input checks, decision branches, notifications, and review steps.');
addBullet('Test normal and exception paths, document workflow behavior, and keep consequential AI-generated actions reviewable.');

addSection('Selected workflow projects');
addProject(
  'AI lead generation and qualification',
  'Prototype',
  'Collect and validate lead details, apply AI-assisted classification, and prepare a structured record and follow-up route. Tools noted in the project: Make.com, OpenAI, Google Sheets, Apify, Apollo, and Hunter.'
);
addProject(
  'WhatsApp AI chatbot',
  'Prototype',
  'Connect incoming messages to intent handling and an AI-assisted response path using WhatsApp API, webhooks, OpenAI, and Make.com.'
);
addProject(
  'AI email personalizer',
  'Prototype',
  'Prepare context-aware outreach drafts from lead information and pass them to a reviewable Gmail workflow using OpenAI, Google Sheets, and Make.com.'
);
addProject(
  'Voice AI assistant',
  'Experimental',
  'Explore a voice intake and response flow using Retell AI, OpenAI, and API integrations; treated as an experimental workflow, not a production deployment.'
);

addSection('Technical skills');
document.font('Helvetica-Bold').fontSize(8).fillColor(ink).text('Automation: ', left, document.y, { continued: true });
document.font('Helvetica').fillColor(muted).text('n8n, Make.com, workflow design, webhooks, conditional routing, validation, testing');
document.font('Helvetica-Bold').fontSize(8).fillColor(ink).text('AI and integrations: ', left, document.y + 3, { continued: true });
document.font('Helvetica').fillColor(muted).text('OpenAI API, AI agents, WhatsApp API, CRM workflows, Google Sheets, Gmail, Google Calendar');
document.font('Helvetica-Bold').fontSize(8).fillColor(ink).text('Web and tooling: ', left, document.y + 3, { continued: true });
document.font('Helvetica').fillColor(muted).text('JavaScript, React, REST APIs, Git, GitHub, Vercel');

addSection('Education and continued learning');
document.font('Helvetica').fontSize(8.3).fillColor(muted).text(
  'Self-directed learning in AI automation and workflow engineering, including ongoing study of n8n, Make.com, OpenAI integrations, and automation best practices.',
  left,
  document.y,
  { width: contentWidth, lineGap: 1.5 }
);

const completed = new Promise((resolve, reject) => {
  output.once('finish', resolve);
  output.once('error', reject);
  document.once('error', reject);
});

document.end();
await completed;
