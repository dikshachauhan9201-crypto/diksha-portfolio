import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const baseDir = globalThis.process?.cwd?.() ?? '.';
const publicDir = path.join(baseDir, 'public');
const pdfPath = path.join(publicDir, 'resume.pdf');
const pdfNamedPath = path.join(publicDir, 'Diksha_Chauhan_AI_Automation_Engineer_Resume.pdf');

const lines = {
  name: 'Diksha Chauhan',
  title: 'AI Automation Engineer',
  contact: [
    'Email: dikshachauhan9201@gmail.com',
    'Phone: +91 9217682198',
    'LinkedIn: linkedin.com/in/diksha-chauhan-465559403',
    'Portfolio: https://diksha-ai-portfolio.vercel.app/',
  ],
  summary:
    'AI Automation Engineer focused on designing and building practical workflows using n8n. Built 50+ automation workflows involving API integrations, webhooks, data processing, AI services, and business process automation. Also experienced in building responsive websites and connecting digital experiences with automation systems.',
  skills: [
    'Workflow Automation: n8n, Make.com, workflow orchestration, triggers, conditional routing, workflow validation',
    'APIs & Integrations: REST APIs, webhooks, HTTP requests, JSON data handling, API connectivity',
    'AI & LLM: AI-assisted workflows, LLM integrations, structured outputs, prompt-driven automation',
    'Databases & Storage: Supabase, spreadsheets, structured record storage, data mapping',
    'Web Development: React, JavaScript, HTML, CSS, responsive web design, landing pages, portfolio websites',
    'Reliability: debugging, validation, logging, error handling, fallback strategies',
  ],
  experience: [
    'Built and refined 50+ automation workflows using n8n and Make.com for lead intake, notifications, scheduling, routing, and AI-assisted decision flows.',
    'Connected APIs, webhooks, and data sources to move information across business processes, validate required fields, and handle edge cases and exceptions.',
    'Developed responsive website experiences and digital interfaces that connect user actions to automation workflows and practical business outcomes.',
  ],
  projects: [
    'AI Lead Qualification System — Classified inbound leads and routed the right follow-up path using webhook intake, AI classification, and automation logic.',
    'AI WhatsApp Chatbot — Connected incoming messages to intent processing and contextual responses, enabling a faster review and response flow.',
    'Appointment Booking Automation — Coordinated intake, validation, scheduling, confirmations, reminders, and follow-up steps across communication and calendar tools.',
    'Form Submission Automation — Validated incoming data, stored structured records, and triggered notifications for the correct next step.',
  ],
  education: [
    'Education: Verified academic details to be confirmed before formal submission.',
  ],
  certifications: [
    'Certifications: No verified certifications were identified in the current project materials available for this profile.',
  ],
};

const doc = new PDFDocument({
  size: 'A4',
  margin: 42,
  layouts: { default: { h: 0 } },
});

const stream = fs.createWriteStream(pdfPath);
doc.pipe(stream);

doc.font('Helvetica-Bold').fontSize(22).text(lines.name, { align: 'left' });
doc.moveDown(0.2);
doc.font('Helvetica').fontSize(12).text(lines.title, { color: '#1f2937' });

doc.moveDown(0.8);
doc.font('Helvetica').fontSize(9).text(lines.contact.join('   |   '), { align: 'left' });

doc.moveDown(1.2);
doc.font('Helvetica-Bold').fontSize(11).text('PROFESSIONAL SUMMARY');
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(10).text(lines.summary, { align: 'left', lineGap: 2 });

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).text('TECHNICAL SKILLS');
doc.moveDown(0.3);
for (const skill of lines.skills) {
  doc.font('Helvetica').fontSize(9).text(`• ${skill}`, { indent: 12, lineGap: 2 });
}

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).text('PROFESSIONAL EXPERIENCE');
doc.moveDown(0.3);
for (const item of lines.experience) {
  doc.font('Helvetica').fontSize(9).text(`• ${item}`, { indent: 12, lineGap: 2 });
}

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).text('SELECTED PROJECTS');
doc.moveDown(0.3);
for (const item of lines.projects) {
  doc.font('Helvetica').fontSize(9).text(`• ${item}`, { indent: 12, lineGap: 2 });
}

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).text('EDUCATION');
doc.moveDown(0.3);
for (const item of lines.education) {
  doc.font('Helvetica').fontSize(9).text(`• ${item}`, { indent: 12, lineGap: 2 });
}

doc.moveDown(0.8);
doc.font('Helvetica-Bold').fontSize(11).text('CERTIFICATIONS');
doc.moveDown(0.3);
for (const item of lines.certifications) {
  doc.font('Helvetica').fontSize(9).text(`• ${item}`, { indent: 12, lineGap: 2 });
}

doc.end();

fs.copyFileSync(pdfPath, pdfNamedPath);

console.log(`Resume PDF created at ${pdfPath}`);
console.log(`Named resume copy created at ${pdfNamedPath}`);
