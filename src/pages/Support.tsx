import React from 'react';
import { ArrowLeft, Heart, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Support: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Calculator
        </button>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Support the Developer</h1>
          </div>

          <div className="space-y-8">
            <section>
              <p className="text-gray-600 mb-6">
                If you find this GPA Calculator helpful, consider supporting its continued 
                development and maintenance. Your support helps keep the calculator free 
                and enables new features.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Support Options</h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-6 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">Mobile Money</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Support via mobile money transfer
                  </p>
                  <div className="text-sm text-gray-500">
                    Number: +23274960916
                  </div>
                </div>

                <div className="p-6 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-800">Bank Transfer</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    Support via bank transfer
                  </p>
                  <div className="text-sm text-gray-500">
                    For bank info please contact me on:<br />
                    What's App: +23231346862<br />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Thank You!</h2>
              <p className="text-gray-600">
                Your support helps maintain and improve the GPA Calculator. I appreciate 
                every contribution, no matter the size.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};