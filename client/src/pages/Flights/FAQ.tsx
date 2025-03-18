import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from "../../data/FAQ";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 bg-gray-50" id="faq">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 mt-4 text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <button
                                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-medium text-gray-900">{item.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 bg-gray-50">
                                    <p className="text-gray-600">{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;