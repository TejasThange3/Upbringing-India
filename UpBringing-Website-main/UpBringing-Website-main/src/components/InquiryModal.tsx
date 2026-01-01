import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { submitToZohoCRM } from "../services/zohoService";
import { Loader2, X } from "lucide-react";

interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  brandName?: string;
}

export function InquiryModal({ isOpen, onClose, productName, brandName }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    designation: "",
    industryName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.industryName.trim()) newErrors.industryName = "Industry Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    else if (!/^\d{7,}$/.test(formData.phoneNumber.replace(/[\s\-()]/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const response = await submitToZohoCRM({
          fullName: formData.fullName,
          companyName: formData.companyName,
          designation: formData.designation,
          email: formData.email,
          industryName: formData.industryName,
          location: formData.location || "Not specified",
          phoneNumber: formData.phoneNumber,
          productName: productName || "",
          brandName: brandName || "",
        });

        if (response.success) {
          alert("Thank you for your inquiry! We will get back to you soon.");
          handleClose();
        } else {
          setSubmitError(response.message || "Failed to submit inquiry. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting inquiry:", error);
        setSubmitError("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setFormData({
      fullName: "",
      companyName: "",
      designation: "",
      industryName: "",
      email: "",
      phoneNumber: "",
      location: "",
    });
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" style={{ 
    position: 'fixed', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}  >
      {/* Background Overlay */}
      <div className="absolute inset-0" onClick={handleClose}></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200 max-w-2xl w-full mx-4 relative z-10" style={{ height: '-webkit-fill-available', margin: '10px', overflow: 'auto' }} >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-slate-500 hover:text-slate-700" />
        </button>

        {/* Header */}
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h2 className="text-2xl text-slate-900 font-bold">Product Inquiry</h2>
          <p className="text-slate-600 mt-2">Please fill in the form below to send us your inquiry</p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {productName && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-slate-600">
                Inquiring about: <span className="font-semibold text-blue-600">{productName}</span>
              </p>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Full Name
            </label>
            <Input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full ${errors.fullName ? "border-red-500" : ""}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Company Name
            </label>
            <Input
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full ${errors.companyName ? "border-red-500" : ""}`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Designation
            </label>
            <Input
              type="text"
              name="designation"
              placeholder="Enter your designation"
              value={formData.designation}
              onChange={handleChange}
              className={`w-full ${errors.designation ? "border-red-500" : ""}`}
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
            )}
          </div>

          {/* Industry Name */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Industry Name
            </label>
            <Input
              type="text"
              name="industryName"
              placeholder="Enter your industry"
              value={formData.industryName}
              onChange={handleChange}
              className={`w-full ${errors.industryName ? "border-red-500" : ""}`}
            />
            {errors.industryName && (
              <p className="text-red-500 text-xs mt-1">{errors.industryName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Email ID
            </label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              <span className="text-red-500">*</span> Phone Number
            </label>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full ${errors.phoneNumber ? "border-red-500" : ""}`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Location
            </label>
            <Input
              type="text"
              name="location"
              placeholder="Enter your location (optional)"
              value={formData.location}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          {/* Error Message */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <Button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
