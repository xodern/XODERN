import React from 'react';
import Link from 'next/link';
import { Home, Users, ShoppingCart, MessageCircle, User } from 'lucide-react';

const MobileNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black text-white">
      <div className="h-px bg-white w-full"></div>
      <div className="flex justify-between items-center p-4">
        <NavItem href="/" icon={<Home size={24} />} label="HOME" />
        <NavItem href="/x-men" icon={<Users size={24} />} label="X-MEN" />
        <NavItem href="/shop" icon={<ShoppingCart size={24} />} label="SHOP" />
        <NavItem href="/chat" icon={<MessageCircle size={24} />} label="CHAT" />
        <NavItem href="/profile" icon={<User size={24} />} label="PROFILE" />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link href={href} className="flex flex-col items-center">
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default MobileNavbar;