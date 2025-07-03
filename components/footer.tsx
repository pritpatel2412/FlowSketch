"use client"

export function Footer() {
  return (
    <footer className="mt-16 py-8 text-center">
      <div className="relative">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl"></div>

        <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl py-6 px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <div className="text-slate-400">© 2025 FlowSketch PRO. All rights reserved.</div>
            <div className="flex items-center text-slate-400">
              <span>Created by</span>
              <a
                href="https://github.com/pritpatel2412"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
              >
                Prit Patel
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
