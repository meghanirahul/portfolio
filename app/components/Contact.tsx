import React, { useState } from "react";
import emailjs from "@emailjs/browser";

type StatusType = "idle" | "submitting" | "success" | "error";

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        serviceType: "Shopify Theme Development",
        message: "",
    });

    const [status, setStatus] = useState<StatusType>("idle");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            await emailjs.send(
                // "YOUR_SERVICE_ID",
                // "YOUR_TEMPLATE_ID",
                // {
                //     name: formData.name,
                //     email: formData.email,
                //     serviceType: formData.serviceType,
                //     message: formData.message,
                // },
                // "YOUR_PUBLIC_KEY"
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    serviceType: formData.serviceType,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setStatus("success");

            setFormData({
                name: "",
                email: "",
                serviceType: "Shopify Theme Development",
                message: "",
            });

            setTimeout(() => setStatus("idle"), 4000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <section id="contact" className="py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">
                    Get In Touch
                </h2>

                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">

                    {status === "success" && (
                        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center">
                            ✅ Message sent successfully!
                        </div>
                    )}

                    {status === "error" && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center">
                            ❌ Something went wrong. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white"
                            />

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white"
                            />
                        </div>

                        <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white"
                        >
                            <option>Shopify Theme Development</option>
                            <option>Shopify App Development</option>
                            <option>Fix Issue</option>
                            <option>Other</option>
                        </select>

                        <textarea
                            name="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project..."
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white"
                        />

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full bg-green-600 text-white font-bold py-4 rounded-lg disabled:opacity-70"
                        >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
}
