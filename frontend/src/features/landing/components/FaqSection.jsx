import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "You can book online through our patient portal by selecting a doctor, choosing an available time slot, and confirming your visit. Walk-in appointments are also available for emergency cases.",
  },
  {
    question: "Does the hospital accept insurance?",
    answer:
      "Yes, we accept most major insurance providers. You can verify your coverage during registration or contact our billing department for a full list of accepted plans.",
  },
  {
    question: "What should I do in a medical emergency?",
    answer:
      "Call our 24/7 emergency hotline at +20 100 000 0000 or proceed directly to the ER entrance at Gate 3, Ground Floor. Our trauma team is always on standby.",
  },
  {
    question: "How do I access my medical records?",
    answer:
      "Log in to the patient portal with your credentials to view prescriptions, lab results, imaging reports, and visit history. Records are updated in real time after each appointment.",
  },
  {
    question: "Can I consult a doctor online?",
    answer:
      "Yes, telehealth consultations are available for follow-ups, prescription renewals, and non-emergency cases. Book a virtual visit the same way you book an in-person appointment.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="landing-section bg-gradient-to-b from-white to-sky-50/40 px-4 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-sky-600">FAQ</p>
          <h2 className="font-heading mx-auto mt-2 max-w-[14ch] text-[2.2rem] leading-[1.12] font-medium tracking-tight text-[#24345c] sm:text-[2.8rem]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-500">
            Everything you need to know about appointments, insurance, and patient care.
          </p>
        </div>

        <Accordion
          defaultValue={["item-0"]}
          className="faq-item mt-12 space-y-3"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white px-6 shadow-[0_4px_20px_rgba(80,110,150,0.06)]"
            >
              <AccordionTrigger className="py-5 text-[15px] font-semibold text-[#24345c] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[14px] leading-relaxed text-slate-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
