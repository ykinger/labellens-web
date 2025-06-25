import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Globe, BarChart3, History, Smartphone } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "@/components/auth/login-modal";
import { SignupModal } from "@/components/auth/signup-modal";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Food Label Compliance
                  <span className="text-primary"> Made Simple</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Upload your food labels and get instant compliance reports. Ensure your products meet regulatory requirements across multiple regions with our AI-powered analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                    onClick={() => setShowSignup(true)}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold"
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556741533-411cf82e4e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Food compliance dashboard interface"
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-gray-900">Compliance Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Label Analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform checks your food labels against regulations from multiple countries and provides detailed compliance reports.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                    <Upload className="text-primary text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Upload</h3>
                  <p className="text-gray-600">
                    Upload label images or PDF documents with drag-and-drop functionality. Supports multiple file formats.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                    <CheckCircle className="text-success text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Compliance</h3>
                  <p className="text-gray-600">
                    Get immediate feedback on compliance status with color-coded indicators and detailed violation reports.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-warning bg-opacity-10 rounded-lg flex items-center justify-center mb-6">
                    <Globe className="text-warning text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Region Support</h3>
                  <p className="text-gray-600">
                    Check compliance across different countries and regions with region-specific regulatory requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <BarChart3 className="text-purple-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Reports</h3>
                  <p className="text-gray-600">
                    Generate comprehensive compliance reports with specific violations and recommended fixes.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                    <History className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Submission History</h3>
                  <p className="text-gray-600">
                    Track all your label submissions and compliance status in an organized dashboard interface.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <Smartphone className="text-green-600 text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Friendly</h3>
                  <p className="text-gray-600">
                    Access the platform on any device with fully responsive design optimized for mobile use.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Get compliance results in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Labels</h3>
                <p className="text-gray-600">
                  Upload your food label images or PDF documents through our secure platform.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Analysis</h3>
                <p className="text-gray-600">
                  Our AI engine analyzes your labels against relevant food safety regulations.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Results</h3>
                <p className="text-gray-600">
                  Receive detailed compliance reports with actionable recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Ensure Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of food industry professionals who trust Label Lens for their compliance needs.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg"
              onClick={() => setShowSignup(true)}
            >
              Start Your Free Trial
            </Button>
          </div>
        </section>
      </div>

      <LoginModal
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        open={showSignup}
        onOpenChange={setShowSignup}
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}
