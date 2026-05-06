import React from 'react';
import { CONTACT_INFO } from '../constants/data';

const WhatsAppButton = ({ productName, variant = 'primary', className = '' }) => {
  const message = productName 
    ? encodeURIComponent(`مرحباً، أريد طلب: ${productName}`) 
    : encodeURIComponent("مرحباً، أريد الاستفسار عن المنتجات");
  
  const link = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`;

  const baseStyles = "font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient shadow-ambient-hover transition-all duration-300 flex items-center space-x-reverse space-x-2";
  
  const variants = {
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary-container text-primary",
    outline: "bg-surface border border-primary text-primary hover:bg-primary/5"
  };

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="material-symbols-outlined text-[18px]">chat</span>
      <span>{productName ? "Order on WhatsApp" : "Contact on WhatsApp"}</span>
    </a>
  );
};

export default WhatsAppButton;
