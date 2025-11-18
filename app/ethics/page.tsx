"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "../../public/images/hero.jpg";

interface EthicsSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  subsections?: {
    title: string;
    points: string[];
  }[];
}

const ethicsSections: EthicsSection[] = [
  {
    id: "authorship",
    title: "Authorship & Accountability",
    icon: "👥",
    content: [
      "Authorship credit should be based on substantial contributions to conception and design, acquisition of data, analysis and interpretation of data, and drafting or critically revising the intellectual content.",
      "All authors must approve the final manuscript and take responsibility for the work.",
      "Authors should disclose roles clearly (corresponding author, first author, senior author, etc.).",
      "Honorary and guest authorship are not acceptable.",
    ],
    subsections: [
      {
        title: "Author Responsibilities",
        points: [
          "Ensuring all co-authors have agreed to authorship",
          "Confirming the work is original and has not been published elsewhere",
          "Disclosing all sources of funding and conflicts of interest",
          "Obtaining informed consent from human subjects where applicable",
          "Securing institutional approval for animal experiments",
        ],
      },
      {
        title: "Corresponding Author",
        points: [
          "Acts as the point of contact between authors and editorial office",
          "Ensures all co-authors have seen and approved the final version",
          "Takes responsibility for manuscript submission and publication process",
          "Manages all communications with reviewers and editors",
        ],
      },
    ],
  },
  {
    id: "plagiarism",
    title: "Originality & Plagiarism",
    icon: "🔍",
    content: [
      "Manuscripts must be original works not previously published or under consideration elsewhere.",
      "All sources must be properly cited using Vancouver style referencing.",
      "Self-plagiarism (reusing substantial portions of your own previously published work) is not permitted.",
      "We use Turnitin to detect potential plagiarism. Submissions with >15% similarity will require revision.",
    ],
    subsections: [
      {
        title: "Proper Attribution",
        points: [
          "Quote verbatim text in quotation marks with page numbers",
          "Paraphrase ideas while maintaining proper citations",
          "Include citations even when paraphrasing",
          "Properly credit figures, tables, and datasets from other sources",
        ],
      },
      {
        title: "Retraction & Corrections",
        points: [
          "Plagiarism discovered after publication will result in article retraction",
          "Author will be notified and given opportunity to respond",
          "Retraction notice will be published in the journal",
          "Serious violations may result in journal ban or institutional notification",
        ],
      },
    ],
  },
  {
    id: "research-integrity",
    title: "Research Integrity & Misconduct",
    icon: "⚖️",
    content: [
      "Research must be conducted according to established ethical guidelines and legal requirements.",
      "Data fabrication, falsification, and manipulation are serious offenses and will result in rejection and potential sanctions.",
      "All research involving human subjects must have ethical approval from an Institutional Review Board (IRB).",
      "Animal research must comply with institutional guidelines and international standards (ARRIVE guidelines).",
    ],
    subsections: [
      {
        title: "Data Management",
        points: [
          "Maintain original raw data for minimum of 7 years post-publication",
          "Be prepared to share data upon reasonable request",
          "Use appropriate statistical methods and reporting",
          "Disclose any data exclusions or outlier removal with justification",
        ],
      },
      {
        title: "Research Misconduct Consequences",
        points: [
          "Immediate manuscript rejection",
          "Notification to author's institution",
          "Potential reporting to relevant regulatory bodies",
          "Permanent ban from ATGHJ publishing",
          "Retraction of any published work found to involve misconduct",
        ],
      },
    ],
  },
  {
    id: "conflicts-of-interest",
    title: "Conflicts of Interest",
    icon: "💼",
    content: [
      "All authors must disclose potential conflicts of interest (financial, personal, or professional) that could influence the work.",
      "Conflicts do not necessarily disqualify a manuscript, but transparency is essential.",
      "Financial interests include funding, employment, stock ownership, honoraria, or patents.",
      "Personal relationships and academic competition should also be disclosed.",
    ],
    subsections: [
      {
        title: "Disclosure Requirements",
        points: [
          "Funding sources and financial support",
          "Employment relationships with relevant companies",
          "Consulting fees and honoraria",
          "Stock ownership or options",
          "Patents or patent applications related to the work",
          "Personal relationships with authors or organizations",
        ],
      },
      {
        title: "Editorial Response",
        points: [
          "Editors assess materiality of disclosed conflicts",
          "May assign specific reviewers without conflicts",
          "Publication statement includes conflict disclosure",
          "Reviewers also declare their conflicts of interest",
        ],
      },
    ],
  },
  {
    id: "informed-consent",
    title: "Informed Consent & Ethics Approval",
    icon: "📋",
    content: [
      "All research involving human subjects must have written informed consent obtained before enrollment.",
      "Participants must be informed of research purpose, procedures, risks, and benefits.",
      "Special protections apply for vulnerable populations (children, prisoners, cognitively impaired).",
      "Ethical approval documentation must be provided during submission.",
    ],
    subsections: [
      {
        title: "Human Research Requirements",
        points: [
          "IRB/REC approval obtained before data collection",
          "Written informed consent in language subjects understand",
          "Right to withdraw without penalty clearly stated",
          "Confidentiality and data protection measures described",
          "Approval number and date clearly documented",
        ],
      },
      {
        title: "Animal Research Requirements",
        points: [
          "Institutional Animal Care and Use Committee (IACUC) approval",
          "Adherence to ARRIVE guidelines in reporting",
          "Justification for animal use and sample size",
          "Minimization of pain and distress",
          "Euthanasia methods meet ethical standards",
        ],
      },
    ],
  },
  {
    id: "peer-review",
    title: "Peer Review Integrity",
    icon: "📖",
    content: [
      "ATGHJ uses double-blind peer review to ensure objectivity and fairness.",
      "Reviewer identities are confidential; author identities remain anonymous to reviewers.",
      "Reviewers must declare conflicts of interest and recuse themselves if necessary.",
      "Reviewers should provide constructive, evidence-based feedback.",
    ],
    subsections: [
      {
        title: "Reviewer Responsibilities",
        points: [
          "Maintain confidentiality of manuscript content",
          "Declare conflicts of interest promptly",
          "Provide timely, constructive reviews",
          "Base feedback on scientific merit, not personal bias",
          "Not share manuscript with unauthorized persons",
          "Not use manuscript information for personal benefit",
        ],
      },
      {
        title: "Reviewer Misconduct",
        points: [
          "Breach of confidentiality will result in removal from reviewer panel",
          "Biased or abusive reviews will be rejected",
          "Encouraging rejection for competitive reasons is unethical",
          "Excessive delays in review submission may result in replacement",
        ],
      },
    ],
  },
  {
    id: "duplicate-publication",
    title: "Duplicate Publication & Submissions",
    icon: "📑",
    content: [
      "Manuscripts must not be submitted simultaneously to multiple journals.",
      "Previously published work cannot be resubmitted as new research.",
      "Preprint publications are acceptable but must be disclosed.",
      "Secondary publications (translations, adaptations) require original journal permission and proper citation.",
    ],
    subsections: [
      {
        title: "Acceptable Reuse",
        points: [
          "Translation to another language with original journal permission",
          "Secondary analysis of existing dataset with new research questions",
          "Study protocols published separately from main findings",
          "Preprint posted prior to submission",
        ],
      },
      {
        title: "Unacceptable Reuse",
        points: [
          "Submitting same manuscript to multiple journals simultaneously",
          'Breaking up single study into multiple "salami" publications',
          "Redundant publication of same data with minor modifications",
          "Failing to cite or acknowledge earlier related work",
        ],
      },
    ],
  },
  {
    id: "editorial-independence",
    title: "Editorial Independence",
    icon: "🎯",
    content: [
      "ATGHJ maintains editorial independence and is not influenced by commercial, political, or personal interests.",
      "Editorial decisions are based solely on scientific merit, quality, and relevance to the journal scope.",
      "Editors declare conflicts of interest and recuse themselves from decisions involving their own work.",
      "The Editorial Board follows the Committee on Publication Ethics (COPE) guidelines.",
    ],
    subsections: [
      {
        title: "Editor Conduct",
        points: [
          "Fair and unbiased evaluation of all manuscripts",
          "Confidentiality of authors and reviewers maintained",
          "Timely communication with authors",
          "Transparent explanation of editorial decisions",
          "Appeals process available for authors",
        ],
      },
      {
        title: "Publisher Independence",
        points: [
          "Editorial decisions not influenced by advertising or revenue",
          "No interference in content decisions",
          "Support for correction of errors regardless of financial impact",
          "Commitment to open access values",
        ],
      },
    ],
  },
];

export default function PublicationEthicsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "authorship"
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200">
        <Image
          src={hero}
          alt="Ethics"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-accent/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Publication Ethics
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            ATGHJ is committed to upholding the highest standards of research
            integrity and publication ethics. We follow the guidelines
            established by the Committee on Publication Ethics (COPE),
            International Committee of Medical Journal Editors (ICMJE), and
            World Association of Medical Editors (WAME).
          </p>
          <div className="mt-4 flex gap-2 text-sm text-gray-500">
            <Link href="/" className="text-accent hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link href="/policy" className="text-accent hover:underline">
              Policy
            </Link>
            <span>/</span>
            <span>Publication Ethics</span>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🌍</span> Our Commitment
          </h2>
          <p className="text-gray-700 leading-relaxed">
            As an open-access journal bridging research, innovation, and health
            equity in Africa, ATGHJ maintains unwavering commitment to
            publication ethics. We ensure that all published research is
            original, scientifically sound, and conducted with appropriate
            ethical oversight. Our rigorous peer review process, combined with
            proactive plagiarism detection and misconduct investigation,
            protects the integrity of scientific publishing while advancing
            knowledge for global health benefit.
          </p>
        </div>
      </div>

      {/* Ethics Guidelines */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4">
          {ethicsSections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 text-left">
                  <span className="text-4xl">{section.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform flex-shrink-0 ${
                    expandedSection === section.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>

              {/* Section Content */}
              {expandedSection === section.id && (
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-6">
                  <div className="space-y-6">
                    {/* Main content points */}
                    <div className="space-y-3">
                      {section.content.map((paragraph, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span className="text-accent font-bold text-xl flex-shrink-0">
                            •
                          </span>
                          <p className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Subsections */}
                    {section.subsections && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                        {section.subsections.map((subsection, idx) => (
                          <div
                            key={idx}
                            className="bg-white p-5 rounded-lg border border-gray-200"
                          >
                            <h4 className="font-bold text-gray-900 mb-3 text-lg">
                              {subsection.title}
                            </h4>
                            <ul className="space-y-2">
                              {subsection.points.map((point, pointIdx) => (
                                <li
                                  key={pointIdx}
                                  className="flex gap-3 text-gray-700 text-sm"
                                >
                                  <span className="text-primary font-bold flex-shrink-0">
                                    ✓
                                  </span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Standards & Guidelines References */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Standards & Guidelines We Follow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                acronym: "COPE",
                name: "Committee on Publication Ethics",
                description: "International standards for publication ethics",
              },
              {
                acronym: "ICMJE",
                name: "International Committee of Medical Journal Editors",
                description: "Uniform requirements for manuscript preparation",
              },
              {
                acronym: "WAME",
                name: "World Association of Medical Editors",
                description: "Best practices in medical journal editing",
              },
              {
                acronym: "ARRIVE",
                name: "Animal Research: Reporting In Vivo Experiments",
                description: "Guidelines for animal research reporting",
              },
            ].map((standard, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl font-bold text-accent mb-2">
                  {standard.acronym}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {standard.name}
                </h3>
                <p className="text-sm text-gray-600">{standard.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What should I do if I discover plagiarism in a published article?",
                a: "Please contact us immediately with evidence. We will investigate and take appropriate action including retraction if necessary.",
              },
              {
                q: "Can I submit a manuscript that is under review elsewhere?",
                a: "No. Simultaneous submission to multiple journals violates publication ethics. Your manuscript must not be under consideration anywhere else.",
              },
              {
                q: "Do I need ethics approval for observational studies?",
                a: "Yes. All human research requires IRB/REC review, including observational studies, surveys, and secondary data analysis.",
              },
              {
                q: "How do you handle conflicts of interest?",
                a: "We require disclosure of all conflicts. Editors review and may assign specific reviewers. Published articles include conflict statements.",
              },
              {
                q: "What is considered research misconduct?",
                a: "Data fabrication, falsification, manipulation, and plagiarism are misconduct. These result in rejection and potential institutional notification.",
              },
              {
                q: "Can I publish the same research in different journals?",
                a: "No, except for legitimate secondary publications (translations, adaptations) with original journal permission and proper attribution.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reporting Misconduct */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reporting Ethical Concerns
            </h2>
            <p className="text-gray-700 mb-6">
              If you suspect a research misconduct or ethical violation, please
              report it confidentially to our Editorial Office. All reports are
              taken seriously and investigated thoroughly.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-red-900 mb-3">Report Misconduct</h3>
              <p className="text-red-900 text-sm mb-4">
                Email: <span className="font-mono">admin@atghj.africa</span>
              </p>
              <p className="text-red-900 text-sm mb-4">
                Include: Manuscript ID (if applicable), specific concerns, and
                supporting evidence
              </p>
              <p className="text-red-900 text-sm">
                Your report will be handled confidentially. We will acknowledge
                receipt and keep you informed of the investigation outcome.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Contact Ethics Committee
            </Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-accent to-accent/90 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Committed to Ethical Excellence
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              By publishing with ATGHJ, you join a community dedicated to
              research integrity, transparency, and advancing global health
              equity through ethical science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Learn About ATGHJ
              </Link>
              <Link
                href="/guidelines"
                className="inline-block border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Author Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
