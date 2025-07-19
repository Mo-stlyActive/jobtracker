"use client";

import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstall(true);
    }

    function handleAppInstalled() {
      setShowInstall(false);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstall(false);
  }

  function handleDismiss() {
    setShowInstall(false);
  }

  if (!showInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="card shadow-lg">
        <div className="card-body p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-primary-600">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
                <rect x="4" y="17" width="16" height="4" rx="2" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Install JobTracker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Install JobTracker as an app for quick access and offline functionality.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstallClick}
                  className="btn-primary text-sm px-3 py-1"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="btn-ghost text-sm px-3 py-1"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Dismiss install prompt"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;