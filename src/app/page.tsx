import Quiz from '../components/Quiz';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fadeIn">
          <div className="inline-block mb-6">
            <span className="inline-block px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-semibold text-lg mb-4">
              Junior Developer Quiz
            </span>
          </div>
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 leading-tight">
            PHP & MySQL Interview
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Practice Quiz
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Test your knowledge with common interview questions for junior fullstack developers.
            Master the fundamentals of PHP and MySQL.
          </p>
        </header>
        <Quiz />
      </div>
    </main>
  );
}
