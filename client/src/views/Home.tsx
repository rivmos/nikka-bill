import { ArrowRight, Receipt, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Navigation */}
      <nav className="px-12 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Nikka-Bill
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">Features</button>
            {/* <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
            </button> */}
            <Link to={'/sign-in'} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col justify-center px-12">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Simplify Your
            </span>
            <br />
            <span className="text-gray-900">Billing Process</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Create professional invoices, track payments, and manage your billing workflow 
            with our elegant solution.
          </p>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all">
              Learn More
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex space-x-4 mt-12">
            {[
              { icon: <Zap className="h-5 w-5" />, text: "Lightning Fast" },
              { icon: <Shield className="h-5 w-5" />, text: "Secure" },
              { icon: <Receipt className="h-5 w-5" />, text: "Professional" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full shadow-sm"
              >
                <div className="text-indigo-600">
                  {feature.icon}
                </div>
                <span className="text-gray-600 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Abstract Design */}
        <div className="w-1/2 relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Decorative circles */}
            <div className="relative w-96 h-96">
              <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              {/* Mock Invoice Card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">#INV-2024</div>
                    <div className="text-sm text-gray-500">Due in 7 days</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-2 bg-gray-100 rounded w-32"></div>
                      <div className="h-2 bg-gray-100 rounded w-16"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold text-gray-900">Total Amount</div>
                    <div className="text-xl font-bold text-indigo-600">$2,450.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;