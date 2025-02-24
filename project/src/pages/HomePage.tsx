"use client";
import { Boxes } from "../components/ui/background-boxes";
import { ArrowRight } from 'lucide-react';

import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";


interface HomePageProps {
  onStartChat: () => void;
}

function HomePage({ onStartChat }: HomePageProps) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/chat" replace />;
  }
  return (
    <div className="overflow-hidden bg-[url('/public/bg.jpg')] bg-cover">
    <Boxes />
      {/* Hero Section */}
      <div className="lg:h-screen z-50 relative">
        <div className="lg:h-auto max-w-7xl px-6 pb-24 sm:pb-3 lg:flex lg:py-4 z-50">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 mt-5 lg:mt-0 pb-16 lg:max-w-xl lg:pt-8 lg:ml-20 pl-5 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Latest Update
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>New Study Materials Available</span>
                  <ArrowRight className="h-5 w-5 text-gray-500" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your AI-Powered Medical Education Assistant
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Enhance your medical studies with personalized learning, instant answers to complex medical questions, and comprehensive study resources - all powered by advanced AI.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <button
                onClick={onStartChat}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 flex items-center gap-2"
              >
                Start Learning Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-blue-400">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;