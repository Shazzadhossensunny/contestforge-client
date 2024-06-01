import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer footer-center px-10 py-12 lg:py-24 bg-[#1c1c1d]">
    <aside className="space-y-6">
    <Link to="/" className="text-2xl lg:text-4xl font-semibold text-white">
            ContestForge
          </Link>
      <p className="text-white">
        Copyright © 2024 <span className="text-[#00c1f1]">Sunny</span>. - All right reserved
      </p>
      <div  className="text-white">
        <h2 className="text-lg font-semibold mb-3">General Inquiries</h2>
        <p>

        <a href="mailto:contact@info.com" className="btn-link text-white">contact@info.com</a>
        </p>
        <p>

        <a href="tel:+985648274557" className="btn-link text-white">+985648274557</a>
        </p>
      </div>
      <div className="flex text-2xl gap-5 cursor-pointer text-white">
        <FaFacebookF ></FaFacebookF>
        <FaTwitter></FaTwitter>
        <FaLinkedinIn ></FaLinkedinIn>
      </div>
    </aside>
  </footer>
  )
}
