import { useState, useEffect } from 'react';
import './index.css';
import { initAudioContext } from './utils/sound';

import Navbar from './components/Navbar';
import PrimaryButton from './components/PrimaryButton';
import Popup from './components/Popup';

import WelcomeScreen from './screens/WelcomeScreen';
import LevelSelectionScreen from './screens/LevelSelectionScreen';
import DashboardScreen from './screens/DashboardScreen';
import FlashcardScreen from './screens/FlashcardScreen';
import LearnedPhrasesScreen from './screens/LearnedPhrasesScreen';
import CompletionScreen from './screens/CompletionScreen';

import phrasesA1 from './data/phrases_a1.json';
import phrasesA2 from './data/phrases_a2.json';
import phrasesB1 from './data/phrases_b1.json';

const ALL_PHRASES = { A1: phrasesA1, A2: phrasesA2, B1: phrasesB1 };
const LS_KEY = 'fluency_state';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

export default function App() {
  const saved = loadPersistedState();

  const [selectedLevel, setSelectedLevel] = useState(() => saved?.selectedLevel ?? null);
  const [completedLevels, setCompletedLevels] = useState(() => saved?.completedLevels ?? []);
  const [learnedPhrases, setLearnedPhrases] = useState(() => saved?.learnedPhrases ?? { A1: [], A2: [], B1: [] });

  const [screen, setScreen] = useState('welcome');
  const [popup, setPopup] = useState(null); // null | 'oops' | 'holdon'
  const [pendingNav, setPendingNav] = useState(null);

  const [sessionPhrases, setSessionPhrases] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [sessionLikedCount, setSessionLikedCount] = useState(0);
  const [sessionLearnedIds, setSessionLearnedIds] = useState([]);
  const [completionType, setCompletionType] = useState('session');

  const isPracticeActive = screen === 'flashcard';

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ selectedLevel, completedLevels, learnedPhrases }));
  }, [selectedLevel, completedLevels, learnedPhrases]);

  useEffect(() => {
    window.addEventListener('pointerdown', initAudioContext, { once: true });
    return () => window.removeEventListener('pointerdown', initAudioContext);
  }, []);

  const activeTab = screen === 'welcome' ? 'WELCOME'
    : screen === 'level' ? 'LEVEL'
    : 'PRACTICE';

  // ── Navigation ────────────────────────────────────────────────────────────

  function handleNavClick(tab) {
    if (popup) return; // already showing a popup, ignore
    if (isPracticeActive) {
      setPendingNav(tab);
      setPopup('holdon');
      return;
    }
    if (tab === 'PRACTICE' && !selectedLevel) {
      setPopup('oops');
      return;
    }
    navigateTo(tab);
  }

  function navigateTo(tab) {
    if (tab === 'WELCOME') setScreen('welcome');
    else if (tab === 'LEVEL') setScreen('level');
    else if (tab === 'PRACTICE') setScreen('dashboard');
  }

  // ── Popup handlers ────────────────────────────────────────────────────────

  function handleOopsAction() {  // SELECT → go to level selection
    setPopup(null);
    setScreen('level');
  }

  function handleHoldOnKeep() {  // KEEP PRACTICING → dismiss
    setPopup(null);
    setPendingNav(null);
  }

  function handleHoldOnExit() {  // EXIT → cancel practice, navigate
    setPopup(null);
    const target = pendingNav;
    setPendingNav(null);
    navigateTo(target);
  }

  // ── Screen transitions ────────────────────────────────────────────────────

  function handleWelcomeStart() {
    setScreen(selectedLevel ? 'dashboard' : 'level');
  }

  function handleLevelContinue() {
    setScreen('dashboard');
  }

  function handleStartPractice() {
    const level = selectedLevel;
    const remaining = ALL_PHRASES[level].filter(p => !learnedPhrases[level].includes(p.id));

    if (remaining.length === 0) {
      // All already learned — jump straight to completion
      determineAndShowCompletion(0, learnedPhrases[level], learnedPhrases);
      return;
    }

    setSessionPhrases(shuffle(remaining));
    setCardIndex(0);
    setSessionLikedCount(0);
    setSessionLearnedIds([]);
    setScreen('flashcard');
  }

  function handleLike() {
    const phrase = sessionPhrases[cardIndex];
    const newLearnedIds = [...sessionLearnedIds, phrase.id];
    const newLikedCount = sessionLikedCount + 1;
    setSessionLearnedIds(newLearnedIds);
    setSessionLikedCount(newLikedCount);

    if (cardIndex + 1 >= sessionPhrases.length) {
      applyLikesAndComplete(newLearnedIds, newLikedCount);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

  function handleDislike() {
    if (cardIndex + 1 >= sessionPhrases.length) {
      applyLikesAndComplete(sessionLearnedIds, sessionLikedCount);
    } else {
      setCardIndex(cardIndex + 1);
    }
  }

  function handleFinish() {
    applyLikesAndComplete(sessionLearnedIds, sessionLikedCount);
  }

  function applyLikesAndComplete(likedIds, likedCount) {
    const level = selectedLevel;
    const updatedForLevel = [...learnedPhrases[level], ...likedIds];
    const updatedAll = { ...learnedPhrases, [level]: updatedForLevel };
    setLearnedPhrases(updatedAll);
    determineAndShowCompletion(likedCount, updatedForLevel, updatedAll);
  }

  function determineAndShowCompletion(likedCount, nowLearnedForLevel, allLearned) {
    const level = selectedLevel;
    const levelTotal = ALL_PHRASES[level].length;

    const allLevelsDone = Object.keys(ALL_PHRASES).every(lvl => {
      const learned = lvl === level ? nowLearnedForLevel : allLearned[lvl];
      return learned.length >= ALL_PHRASES[lvl].length;
    });

    if (allLevelsDone) {
      setCompletionType('all');
    } else if (nowLearnedForLevel.length >= levelTotal) {
      setCompletionType('level');
      setCompletedLevels(prev => prev.includes(level) ? prev : [...prev, level]);
    } else {
      setCompletionType('session');
    }

    setSessionLikedCount(likedCount);
    setScreen('completion');
  }

  function handleCompletionDone() {
    if (completionType === 'all') {
      setSelectedLevel(null);
      setCompletedLevels([]);
      setLearnedPhrases({ A1: [], A2: [], B1: [] });
      setScreen('welcome');
    } else if (completionType === 'level') {
      const LEVEL_ORDER = ['A1', 'A2', 'B1'];
      const nextIndex = LEVEL_ORDER.indexOf(selectedLevel) + 1;
      if (nextIndex < LEVEL_ORDER.length) {
        setSelectedLevel(LEVEL_ORDER[nextIndex]);
      }
      setScreen('level');
    } else {
      setScreen('dashboard');
    }
  }

  // ── Derived data ──────────────────────────────────────────────────────────

  const allLearnedPhrases = Object.entries(ALL_PHRASES).flatMap(([level, phrases]) => {
    const phraseMap = Object.fromEntries(phrases.map(p => [p.id, p]));
    return learnedPhrases[level].map(id => phraseMap[id]);
  }).reverse();

  // ── Render helpers ────────────────────────────────────────────────────────

  function renderCardArea() {
    if (popup === 'oops') {
      return <Popup type="oops" onClose={() => setPopup(null)} onAction={handleOopsAction} />;
    }
    if (popup === 'holdon') {
      return <Popup type="holdon" onClose={handleHoldOnKeep} onAction={handleHoldOnExit} />;
    }

    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'level':
        return (
          <LevelSelectionScreen
            selectedLevel={selectedLevel}
            completedLevels={completedLevels}
            onSelect={setSelectedLevel}
          />
        );
      case 'dashboard':
        return <DashboardScreen onOpenLibrary={() => setScreen('learned')} />;
      case 'flashcard':
        return sessionPhrases[cardIndex]
          ? <FlashcardScreen
              phrase={sessionPhrases[cardIndex]}
              onLike={handleLike}
              onDislike={handleDislike}
              learnedCount={learnedPhrases[selectedLevel].length + sessionLearnedIds.length}
            />
          : null;
      case 'learned':
        return <LearnedPhrasesScreen phrases={allLearnedPhrases} />;
      case 'completion':
        return (
          <CompletionScreen
            type={completionType}
            sessionLikedCount={sessionLikedCount}
            selectedLevel={selectedLevel}
          />
        );
      default:
        return null;
    }
  }

  function renderBottomButton() {
    // When a popup is active, show the current screen's button as disabled
    const isDisabledByPopup = !!popup;

    switch (screen) {
      case 'welcome':
        return <PrimaryButton onClick={handleWelcomeStart} disabled={isDisabledByPopup}>LET'S START</PrimaryButton>;
      case 'level':
        return <PrimaryButton onClick={handleLevelContinue} disabled={!selectedLevel || isDisabledByPopup}>CONTINUE</PrimaryButton>;
      case 'dashboard':
        return <PrimaryButton onClick={handleStartPractice} disabled={isDisabledByPopup}>START PRACTICE</PrimaryButton>;
      case 'flashcard':
        return <PrimaryButton onClick={handleFinish} disabled={isDisabledByPopup}>FINISH</PrimaryButton>;
      case 'learned':
        return <PrimaryButton onClick={() => setScreen('dashboard')} disabled={isDisabledByPopup}>BACK</PrimaryButton>;
      case 'completion':
        return <PrimaryButton onClick={handleCompletionDone} disabled={isDisabledByPopup}>DONE</PrimaryButton>;
      default:
        return null;
    }
  }

  return (
    <div className="app-shell">
      {/* Nav */}
      <div style={{ position: 'absolute', top: 56, left: 0, right: 0 }}>
        <Navbar activeTab={activeTab} onTabClick={handleNavClick} />
      </div>

      {/* Card content area */}
      <div style={{
        position: 'absolute',
        top: 182,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: screen === 'flashcard' ? 34 : 0,
      }}>
        {renderCardArea()}
      </div>

      {/* Bottom button zone */}
      <div style={{
        position: 'absolute',
        top: 719,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}>
        {renderBottomButton()}
      </div>
    </div>
  );
}
