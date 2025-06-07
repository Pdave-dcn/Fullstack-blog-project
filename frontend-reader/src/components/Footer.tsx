import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Send,
  Heart,
  Github,
  Instagram,
  Linkedin,
  BookOpen,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const basePath = import.meta.env.BASE_URL;

  const socialLinks = {
    instagram: "https://www.threads.com/@pdv_stack",
    github: "https://github.com/Pdave-dcn",
    linkedin: "https://www.linkedin.com/in/davidp919",
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="text-blue-400" size={28} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TextNode
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your premier destination for insightful articles,
              thought-provoking content, and engaging community discussions.
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <Github size={18} />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to={`${basePath}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`${basePath}/articles`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  to={`${basePath}/about`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Topics</h4>
            <ul className="space-y-3">
              <li className="text-gray-300">🚀 Development & Tech</li>
              <li className="text-gray-300">💡 Problem Solving</li>
              <li className="text-gray-300">📚 Learning & Growth</li>
              <li className="text-gray-300">🔧 Tools & Workflows</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Stay Updated
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to my newsletter for the latest articles and insights.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02]">
                <Send size={16} className="mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-300">
            <span>&copy; {currentYear} TextNode. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-300">
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={16} />
            <span>for readers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
