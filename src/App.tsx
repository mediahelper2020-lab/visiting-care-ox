/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronRight, Trophy, RefreshCw, AlertCircle, BookOpen, Info } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  answer: boolean;
  explanation: string;
  page?: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "평가예정통보서는 기관 방문 7일 전까지 발송해야 한다.",
    answer: true,
    explanation: "평가자는 평가예정통보서를 7일 전까지 발송하고 기관 방문 전에 유선으로 방문시간을 안내해야 합니다.",
    page: 6
  },
  {
    id: 2,
    text: "평가자는 방문 전 유선으로 방문 시간을 안내할 의무가 없다.",
    answer: false,
    explanation: "기관 방문 전에 반드시 유선으로 방문시간을 안내해야 합니다.",
    page: 6
  },
  {
    id: 3,
    text: "평가 자료는 평가 당일 종료 시까지 확인된 자료만 인정하는 것이 원칙이다.",
    answer: true,
    explanation: "평가 당일 종료 시까지 확인된 자료만 인정합니다. 단, 유선만족도 등 일부 지표는 예외입니다.",
    page: 9
  },
  {
    id: 4,
    text: "평가일 현재 수급자가 3인 미만인 경우에는 평가 불가 기관으로 처리한다.",
    answer: true,
    explanation: "수급자 자료 표본 선정 기준에 따라 3인 미만은 평가불가 기관으로 처리됩니다.",
    page: 11
  },
  {
    id: 5,
    text: "직원회의를 격월로 1회 이상 실시하면 '보통' 점수(1.5점)를 받는다.",
    answer: true,
    explanation: "격월 1회 이상 실시 시 '보통'이며, 매월 1회 이상 실시하고 결과를 반영해야 '우수'입니다.",
    page: 25
  },
  {
    id: 6,
    text: "요양보호사 보수교육 이수율이 95% 이상이어야 4점 만점을 받을 수 있다.",
    answer: true,
    explanation: "대상자의 95% 이상이 이수해야 4점, 75% 이상이면 3점입니다.",
    page: 28
  },
  {
    id: 7,
    text: "직전 평가결과 가산금을 직원 처우개선에 사용하지 않아도 감점이 없다.",
    answer: false,
    explanation: "직전 평가 가산금의 80% 이상을 직원 처우개선에 사용해야 해당 점수(0.5점)를 충족합니다.",
    page: 37
  },
  {
    id: 8,
    text: "모든 직원은 결핵검진을 포함한 건강검진을 매년 실시해야 한다.",
    answer: true,
    explanation: "모든 직원은 매년 결핵검진을 포함한 건강검진을 실시해야 하며, 신규직원은 입사 전 1년 이내 결과를 제출해야 합니다.",
    page: 51
  },
  {
    id: 9,
    text: "급여제공지침 12개 항목은 직원이 열람 가능한 장소에 비치만 하면 된다.",
    answer: false,
    explanation: "비치뿐만 아니라 모든 직원이 내용을 숙지하고 있어야 하며, 교육도 정기적으로 실시해야 합니다.",
    page: 30
  },
  {
    id: 10,
    text: "욕구사정은 신규 수급자의 경우 급여제공 시작일까지 실시해야 한다.",
    answer: true,
    explanation: "모든 수급자의 욕구사정을 연 1회 이상 정기적으로 실시하며, 신규 수급자는 급여제공 시작일까지 완료해야 합니다.",
    page: 69
  },
  {
    id: 11,
    text: "사례관리 회의 결과는 30일 이내에 급여 등에 반영해야 한다.",
    answer: true,
    explanation: "사례관리 계획에 따라 회의 다음날부터 30일 이내에 급여 등에 반영하고 평가를 실시해야 합니다.",
    page: 93
  },
  {
    id: 12,
    text: "수급자 상태변화 기록은 주 1회 이상 충실하게 작성해야 한다.",
    answer: true,
    explanation: "급여제공직원은 수급자의 상태변화를 주 1회 이상 충실하게 기록해야 합니다.",
    page: 95
  },
  {
    id: 13,
    text: "평가 자료 제출을 거부하면 최하위 등급으로 조정될 수 있다.",
    answer: true,
    explanation: "정당한 사유 없이 평가를 거부하거나 거짓 자료를 제출할 경우 행정처분 및 최하위 등급 조정 대상입니다.",
    page: 10
  },
  {
    id: 14,
    text: "직원 상담은 문자나 SNS로 실시한 경우도 공식적으로 인정된다.",
    answer: false,
    explanation: "상담은 대면 또는 유선인 경우만 인정하며 문자, SNS 등은 인정하지 않습니다.",
    page: 23
  },
  {
    id: 15,
    text: "사무직 직원은 매년 건강검진을 할 필요 없이 2년마다 실시해도 된다.",
    answer: true,
    explanation: "산업안전보건법에 따라 사무직 직원은 2년마다 건강검진을 실시할 수 있습니다.",
    page: 51
  },
  {
    id: 16,
    text: "개인정보 관련 자료 보관함은 반드시 잠금장치가 되어 있어야 한다.",
    answer: true,
    explanation: "수급자 등의 개인정보 보호를 위해 보관함에는 반드시 잠금장치가 필요합니다.",
    page: 66
  },
  {
    id: 17,
    text: "낙상위험도 평가는 연 1회만 실시하면 만점이다.",
    answer: false,
    explanation: "낙상, 욕창, 인지기능 평가는 모든 수급자에 대해 반기별 1회 이상 실시해야 합니다.",
    page: 71
  },
  {
    id: 18,
    text: "급여제공계획은 수립 후 반드시 공단에 통보해야 한다.",
    answer: true,
    explanation: "급여제공계획을 수립하고 수급자/보호자 서명을 받은 후 급여제공 시작일까지 공단에 통보해야 합니다.",
    page: 73
  },
  {
    id: 19,
    text: "직원이 바뀌었을 때 인계인수를 받는 것은 평가 항목이다.",
    answer: true,
    explanation: "급여제공직원이 바뀌는 경우 급여제공 전 인계인수를 받는 것이 평가 항목에 포함되어 있습니다.",
    page: 81
  },
  {
    id: 20,
    text: "응급상황 대응 방법 숙지 여부는 주로 면담을 통해 확인한다.",
    answer: true,
    explanation: "응급상황 대응 방법 숙지 여부는 평가자가 상황을 제시하고 면담을 통해 확인합니다.",
    page: 83
  }
];

const YOUTUBE_ADS = [
  { id: "neL7FP6ZtW4", title: "심정지 응급처치 가이드" },
  { id: "KdOvsZk9S1o", title: "욕창 예방 및 관리" },
  { id: "9VijFvZRXmQ", title: "낙상 예방 체조" },
  { id: "wHZP00VeRsw", title: "치매 수급자 돌봄 요령" }
];

export default function App() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ id: number; correct: boolean; userChoice: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentChoice, setCurrentChoice] = useState<boolean | null>(null);

  const currentQuestion = QUESTIONS[currentIdx];

  const handleStart = () => {
    setScore(0);
    setCurrentIdx(0);
    setUserAnswers([]);
    setScreen('quiz');
    setShowExplanation(false);
    setCurrentChoice(null);
  };

  const handleAnswer = (choice: boolean) => {
    if (showExplanation) return;
    setCurrentChoice(choice);
    const isCorrect = choice === currentQuestion.answer;
    if (isCorrect) setScore(s => s + 1);
    
    setUserAnswers([...userAnswers, { id: currentQuestion.id, correct: isCorrect, userChoice: choice }]);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setShowExplanation(false);
      setCurrentChoice(null);
    } else {
      setScreen('result');
    }
  };

  const progress = ((currentIdx + (showExplanation ? 1 : 0)) / QUESTIONS.length) * 100;

  const AdsGallery = () => (
    <div className="mt-12 w-full pt-8 border-t border-white/5">
      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em] mb-6 text-center">Recommended Resources</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {YOUTUBE_ADS.map((ad) => (
          <a 
            key={ad.id}
            href={`https://www.youtube.com/watch?v=${ad.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative rounded-xl overflow-hidden aspect-video bg-black border border-white/5 hover:border-blue-500/50 transition-all shadow-lg"
          >
            <img 
              src={`https://img.youtube.com/vi/${ad.id}/mqdefault.jpg`}
              alt={ad.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05060b] text-slate-200 font-sans selection:bg-blue-500/30 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] opacity-40"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(circle_at_50%_120%,#1e3a8a,transparent)] opacity-20"></div>

      <div className="w-full max-w-4xl bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative z-10 my-8">
        
        {/* Header */}
        <header className="px-10 py-8 flex justify-between items-end border-b border-white/5 bg-slate-900/20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-1">
              {screen === 'quiz' ? 'Evaluation Module v2.6' : 'Learning System v1.0'}
            </p>
            <h1 className="text-3xl font-light tracking-tight text-white flex items-center gap-3">
              장기요양기관 평가 <span className="text-blue-500 font-medium">OX 퀴즈</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            {screen === 'quiz' && (
              <>
                <div className="flex gap-1 mb-2 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const threshold = (i + 1) * 20;
                    const isActive = progress >= threshold;
                    return (
                      <div 
                        key={i} 
                        className={`w-8 h-1 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' 
                            : 'bg-white/10'
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-slate-400 tracking-wide uppercase">
                  Question <span className="text-white font-mono">{String(currentIdx + 1).padStart(2, '0')}</span> / {QUESTIONS.length}
                </p>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-8 md:p-14 min-h-[500px]">
          <AnimatePresence mode="wait">
            {screen === 'start' && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="text-center w-full max-w-2xl px-6"
              >
                <div className="relative inline-block mb-10">
                  <div className="w-24 h-24 bg-blue-500/10 rounded-full border border-blue-500/30 flex items-center justify-center relative z-10">
                    <BookOpen className="w-10 h-10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                  />
                </div>
                
                <h2 className="text-4xl font-medium text-white mb-6 tracking-tight">학습 코스 로드 완료</h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md mx-auto">
                  2026년 장기요양기관(방문요양) 평가 매뉴얼의<br />
                  주요 지표와 변경 사항을 검증합니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                  {[
                    { label: 'Total Questions', val: '20 문항' },
                    { label: 'Required Score', val: '80%' },
                    { label: 'Active Version', val: '2026.01' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left">
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">{stat.label}</p>
                      <p className="text-white font-mono">{stat.val}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleStart}
                  className="px-12 py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-blue-400 hover:text-white transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] flex items-center justify-center gap-3 mx-auto group"
                >
                  Start Simulation
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {screen === 'quiz' && (
              <motion.div 
                key={`quiz-${currentIdx}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col h-full"
              >
                <div className="w-full mb-12 relative">
                  <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-12 rounded-[32px] shadow-xl relative overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-blue-500/50"></div>
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500/50"></div>
                    
                    <span className="inline-block bg-blue-500/20 text-blue-400 text-[10px] font-bold px-3 py-1 rounded border border-blue-500/30 uppercase tracking-[0.2em] mb-6">
                      SECTION 01 : Regulation & Compliance
                    </span>
                    
                    <h2 className="text-2xl md:text-3xl text-center font-medium text-white leading-[1.4] tracking-tight">
                      {currentQuestion.text}
                    </h2>
                  </div>
                </div>

                {!showExplanation ? (
                  <div className="grid grid-cols-2 gap-10 w-full max-w-3xl mx-auto">
                    <button 
                      onClick={() => handleAnswer(true)}
                      className="group relative h-56 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 flex flex-col items-center justify-center hover:bg-emerald-500/10 hover:border-emerald-500 transition-all overflow-hidden"
                    >
                      <div className="w-24 h-24 rounded-full border-[8px] border-emerald-400/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative z-10">
                         <div className="w-12 h-12 rounded-full border-[6px] border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]"></div>
                      </div>
                      <span className="text-xl font-bold tracking-[0.3em] text-emerald-400 relative z-10 uppercase">True</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <button 
                      onClick={() => handleAnswer(false)}
                      className="group relative h-56 rounded-3xl bg-rose-500/5 border border-rose-500/20 flex flex-col items-center justify-center hover:bg-rose-500/10 hover:border-rose-500 transition-all overflow-hidden"
                    >
                      <div className="w-24 h-24 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative z-10">
                         <div className="absolute w-16 h-2 bg-rose-400 rotate-45 rounded-full shadow-[0_0_15px_rgba(244,63,94,1)]"></div>
                         <div className="absolute w-16 h-2 bg-rose-400 -rotate-45 rounded-full shadow-[0_0_15px_rgba(244,63,94,1)]"></div>
                      </div>
                      <span className="text-xl font-bold tracking-[0.3em] text-rose-400 relative z-10 uppercase">False</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex flex-col gap-8 items-center"
                  >
                    <div className={`w-full p-8 rounded-3xl border ${currentChoice === currentQuestion.answer ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'} flex flex-col sm:flex-row items-center sm:items-start gap-6`}>
                      <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${currentChoice === currentQuestion.answer ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-rose-500 shadow-rose-500/30'}`}>
                        {currentChoice === currentQuestion.answer ? <Check className="w-8 h-8 text-white" /> : <AlertCircle className="w-8 h-8 text-white" />}
                      </div>
                      <div className="text-center sm:text-left flex-1 min-w-0">
                        <span className={`text-[10px] font-black uppercase tracking-[.3em] mb-2 inline-block ${currentChoice === currentQuestion.answer ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {currentChoice === currentQuestion.answer ? 'Validation Success' : 'Validation Failed'}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                          {currentChoice === currentQuestion.answer ? '정답입니다' : '오답입니다'}
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-4">
                          {currentQuestion.explanation}
                        </p>
                        {currentQuestion.page && (
                          <div className="flex items-center gap-2 opacity-50">
                            <Info className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[11px] font-mono tracking-widest uppercase truncate">Reference Index: P.{currentQuestion.page}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={handleNext}
                      className="w-full sm:w-auto px-16 py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-blue-400 hover:text-white transition-all flex items-center justify-center gap-3 group"
                    >
                      {currentIdx + 1 === QUESTIONS.length ? 'Show Analytics' : 'Continue Module'}
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {screen === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-2xl px-6"
              >
                <div className="mb-12 relative inline-flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full border-4 border-blue-500/20 flex items-center justify-center relative">
                      <Trophy className="w-14 h-14 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                   </div>
                   <div className="absolute -top-2 -right-2 bg-white text-black font-mono font-bold w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-slate-900 shadow-xl text-lg">
                      {Math.round((score / QUESTIONS.length) * 100)}
                   </div>
                </div>

                <h2 className="text-4xl font-medium text-white mb-4 tracking-tight">수료증 발급 완료</h2>
                <p className="text-slate-400 text-lg mb-12">
                  최종 결과: {QUESTIONS.length}분석 정보 중 <span className="text-blue-400 font-bold">{score}개</span>의 규칙을 통과했습니다.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 mb-12 text-left h-[250px] overflow-y-auto custom-grid-scrollbar backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.3em]">Module Error Log</span>
                  </div>
                  <div className="space-y-6">
                    {userAnswers.filter(a => !a.correct).length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 opacity-30">
                        <Check className="w-12 h-12 mb-2" />
                        <p className="font-mono text-sm">NO ERRORS DETECTED</p>
                      </div>
                    ) : (
                      userAnswers.filter(a => !a.correct).map((ans, i) => {
                        const q = QUESTIONS.find(q => q.id === ans.id);
                        return q ? (
                          <div key={i} className="group flex items-start gap-4">
                            <div className="w-1 h-12 bg-rose-500/40 rounded-full group-hover:bg-rose-500 transition-colors" />
                            <div>
                               <p className="text-slate-200 text-sm font-medium mb-1 leading-snug">{q.text}</p>
                               <div className="flex items-center gap-3">
                                 <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Expected: {q.answer ? 'True' : 'False'}</span>
                                 <span className="w-1 h-1 bg-white/10 rounded-full" />
                                 <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest underline underline-offset-4 decoration-rose-500/50">P.{q.page}</span>
                               </div>
                            </div>
                          </div>
                        ) : null;
                      })
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={handleStart}
                    className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-[.2em] shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group"
                  >
                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Restart Simulation
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AdsGallery />
        </main>

        <footer className="px-10 py-8 bg-black/40 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-blue-500 font-bold mb-1 tracking-[0.2em] italic">Developer Info</span>
                <div className="text-[11px] text-slate-400 font-medium space-y-1">
                  <p>개발 : 복지인사이트 | 대표 : 이창희</p>
                  <p>사업자번호 : 628-17-01237</p>
                  <p>문의 : mediahelper2020@gmail.com</p>
                </div>
              </div>
              <div className="w-[1px] h-12 bg-white/5 hidden md:block" />
              <div className="flex flex-col max-w-xs">
                <span className="text-[9px] uppercase text-slate-500 font-bold mb-1 tracking-widest">Manual Insight</span>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  평가 매뉴얼 지침은 2026년 시행 기준이며, 보건복지부 및 건강보험공단 최신 사업공고에 따라 변경될 수 있습니다.
                </p>
              </div>
           </div>
           <div className="text-center md:text-right">
              <p className="text-[9px] font-mono text-slate-600 tracking-[0.2em] mb-1 uppercase">Secure Learning Environment</p>
              <p className="text-xs font-mono text-white tracking-[0.3em] font-bold shadow-sm">V2.6-ALPHA</p>
           </div>
        </footer>
      </div>
      
      <style>{`
        .custom-grid-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-grid-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-grid-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-grid-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
