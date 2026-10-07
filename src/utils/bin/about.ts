import config from "../../../config.json";

export const about = (): string => `<div class="space-y-2">
	<div class="text-green-400 font-bold">${config.name}</div>
	<div class="text-green-400">${config.title}</div>
	<div><span class="text-yellow-400">Education:</span> ${config.education} (Sep 2023 - May 2027)</div>
	<div><span class="text-yellow-400">Location:</span> ${config.location}</div>
	<div><span class="text-yellow-400">Email:</span> <a class="text-green-400 underline" href="mailto:${config.email}">${config.email}</a></div>
	<div><span class="text-yellow-400">GitHub:</span> <a class="text-green-400 underline" href="https://github.com/${config.social.github}" target="_blank" rel="noreferrer">https://github.com/${config.social.github}</a></div>
	<div><span class="text-yellow-400">LinkedIn:</span> <a class="text-green-400 underline" href="${config.social.linkedin}" target="_blank" rel="noreferrer">${config.social.linkedin}</a></div>
	<div class="pt-2">Computer Science software development engineer focused on backend systems, AI/RAG platforms, and compiler development.</div>
	<div><span class="text-yellow-400">Experience:</span> Rang Technologies Software Development Intern</div>
	<div><span class="text-yellow-400">Projects:</span> OptiLang, ResearchPaper AI, AI Learning Management System, and ransomware detection research</div>
	<div class="pt-2">Type 'education' for detailed academic information.</div>
	<div>Type 'projects' to explore my work.</div>
</div>`;
