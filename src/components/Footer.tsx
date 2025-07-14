import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* All Departments */}
          <div>
            <h3 className="font-semibold mb-4">All Departments</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/electronics" className="hover:underline">Electronics</Link></li>
              <li><Link to="/category/home" className="hover:underline">Home & Garden</Link></li>
              <li><Link to="/category/clothing" className="hover:underline">Clothing</Link></li>
              <li><Link to="/category/grocery" className="hover:underline">Grocery</Link></li>
              <li><Link to="/category/auto" className="hover:underline">Auto & Tires</Link></li>
              <li><Link to="/category/pharmacy" className="hover:underline">Pharmacy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/grocery-pickup" className="hover:underline">Grocery Pickup</Link></li>
              <li><Link to="/services/delivery" className="hover:underline">Delivery</Link></li>
              <li><Link to="/services/installation" className="hover:underline">Installation & Services</Link></li>
              <li><Link to="/services/photo" className="hover:underline">Photo Services</Link></li>
              <li><Link to="/services/pharmacy" className="hover:underline">Pharmacy</Link></li>
              <li><Link to="/services/vision" className="hover:underline">Vision Center</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:underline">Help</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/returns" className="hover:underline">Returns</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
              <li><Link to="/track-order" className="hover:underline">Track Your Order</Link></li>
              <li><Link to="/feedback" className="hover:underline">Feedback</Link></li>
            </ul>
          </div>

          {/* Get to Know Us */}
          <div>
            <h3 className="font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Walmart</Link></li>
              <li><Link to="/careers" className="hover:underline">Careers</Link></li>
              <li><Link to="/news" className="hover:underline">News</Link></li>
              <li><Link to="/investors" className="hover:underline">Investors</Link></li>
              <li><Link to="/suppliers" className="hover:underline">Suppliers</Link></li>
              <li><Link to="/accessibility" className="hover:underline">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-walmart-blue-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-walmart-yellow text-walmart-yellow-foreground px-3 py-2 rounded-md font-bold text-xl">
                W
              </div>
              <span className="text-xl font-bold">Walmart</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms of Use</Link>
              <Link to="/notice" className="hover:underline">Notice at Collection</Link>
              <Link to="/ca-privacy" className="hover:underline">CA Privacy Rights</Link>
            </div>
          </div>
          
          <div className="text-center md:text-left mt-4 text-sm text-walmart-gray">
            © 2024 Walmart. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;