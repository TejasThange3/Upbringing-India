import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { submitToZohoCRM } from "../services/zohoService";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await submitToZohoCRM({
        fullName: formData.name,
        companyName: "Contact Us Form", // Default value for required field
        designation: "Contact", // Default value for required field
        email: formData.email,
        industryName: "General Inquiry", // Default value for required field
        location: "Not specified",
        phoneNumber: formData.phone,
        productName: "",
        brandName: "",
        message: formData.message, // Include the message field
      });

      if (response.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError(response.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              
              <div className="flex gap-4 mb-6">
                <Phone className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <a href="tel:+91-20-25468111" className="text-slate-600 hover:text-red-500">
                    +91-20-25468111
                  </a>
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <Mail className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <a href="mailto:beckerupb@gmail.com" className="text-slate-600 hover:text-red-500">
                    beckerupb@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Address</p>
                  <p className="text-slate-600">Pune, India</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                  <textarea
                    placeholder="Your message..."
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm font-semibold">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
