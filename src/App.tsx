import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GARDEN_STAGES } from './types/garden';
import type { StageId, PlantedFlower } from './types/garden';
import { AmbientCanvas } from './components/AmbientCanvas';
import { WelcomeStage } from './components/stages/WelcomeStage';
import { GardenStage } from './components/stages/GardenStage';
import { WishesStage } from './components/stages/WishesStage';
import { SecretNoteStage } from './components/stages/SecretNoteStage';
import { FinalSurpriseStage } from './components/stages/FinalSurpriseStage';
import { StagePlaceholder } from './components/stages/StagePlaceholder';
import { NavigationDock } from './components/NavigationDock';

const MAX_GARDEN_FLOWERS = 20;

export function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('welcome');
  const [plantedFlowers, setPlantedFlowers] = useState<PlantedFlower[]>([]);
  const [unlockedStages, setUnlockedStages] = useState<StageId[]>(['welcome']);

  const currentIndex = GARDEN_STAGES.findIndex((s) => s.id === currentStage);
  const activeStageMeta = GARDEN_STAGES[currentIndex] || GARDEN_STAGES[0];

  const unlockStage = useCallback((stageId: StageId) => {
    setUnlockedStages((prev) =>
      prev.includes(stageId) ? prev : [...prev, stageId]
    );
  }, []);

  // Automatically unlock 'wishes' as soon as 20 flowers are planted
  useEffect(() => {
    if (plantedFlowers.length >= MAX_GARDEN_FLOWERS) {
      unlockStage('wishes');
    }
  }, [plantedFlowers.length, unlockStage]);

  // Safety guard: prevent accessing post-garden stages if fewer than 20 flowers exist
  useEffect(() => {
    const requiresCompletedGarden =
      currentStage === 'wishes' ||
      currentStage === 'secret-note' ||
      currentStage === 'final-surprise';

    if (requiresCompletedGarden && plantedFlowers.length < MAX_GARDEN_FLOWERS) {
      setCurrentStage('garden');
    }
  }, [currentStage, plantedFlowers.length]);

  const goToStage = useCallback(
    (stageId: StageId) => {
      if (!unlockedStages.includes(stageId)) return;
      setCurrentStage(stageId);
    },
    [unlockedStages]
  );

  const advanceToStage = useCallback((stageId: StageId) => {
    setUnlockedStages((prev) =>
      prev.includes(stageId) ? prev : [...prev, stageId]
    );
    setCurrentStage(stageId);
  }, []);

  const goToNextStage = useCallback(() => {
    if (currentIndex < GARDEN_STAGES.length - 1) {
      const nextId = GARDEN_STAGES[currentIndex + 1].id;
      advanceToStage(nextId);
    }
  }, [currentIndex, advanceToStage]);

  const goToPreviousStage = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentStage(GARDEN_STAGES[currentIndex - 1].id);
    }
  }, [currentIndex]);

  const handlePlantFlower = useCallback((newFlower: PlantedFlower) => {
    setPlantedFlowers((prev) => {
      if (prev.length >= MAX_GARDEN_FLOWERS) {
        return prev;
      }
      return [...prev, newFlower];
    });
  }, []);

  const handleResetGarden = useCallback(() => {
    setPlantedFlowers([]);
    setUnlockedStages(['welcome', 'garden']);
    setCurrentStage('garden');
  }, []);

  return (
    <div className="garden-app">
      <div className="ambient-aura ambient-aura--top" aria-hidden="true" />
      <div className="ambient-aura ambient-aura--bottom" aria-hidden="true" />

      <AmbientCanvas />

      <header className="garden-header">
        <div className="brand-mark">
          <span className="brand-dot" />
          <span>Happy Vietnamese Women's Day · 20.10</span>
        </div>
        <div className="stage-indicator-pill">
          {activeStageMeta.stepNumber} / 05 · {activeStageMeta.label}
        </div>
      </header>

      <main
        className={`stage-viewport ${
          currentStage === 'garden' ? 'stage-viewport--wide' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          {currentStage === 'welcome' ? (
            <WelcomeStage
              key="welcome"
              onEnterGarden={() => advanceToStage('garden')}
            />
          ) : currentStage === 'garden' ? (
            <GardenStage
              key="garden"
              flowers={plantedFlowers}
              onPlantFlower={handlePlantFlower}
              onContinue={() => advanceToStage('wishes')}
            />
          ) : currentStage === 'wishes' ? (
            <WishesStage
              key="wishes"
              onNext={() => advanceToStage('secret-note')}
              onBack={() => setCurrentStage('garden')}
            />
          ) : currentStage === 'secret-note' ? (
            <SecretNoteStage
              key="secret-note"
              onNext={() => advanceToStage('final-surprise')}
              onBack={() => setCurrentStage('wishes')}
            />
          ) : currentStage === 'final-surprise' ? (
            <FinalSurpriseStage
              key="final-surprise"
              plantedFlowers={plantedFlowers}
              onRestartGarden={handleResetGarden}
              onBack={() => setCurrentStage('secret-note')}
            />
          ) : (
            <StagePlaceholder
              key={activeStageMeta.id}
              stage={activeStageMeta}
              onBack={goToPreviousStage}
              onNext={
                currentIndex < GARDEN_STAGES.length - 1
                  ? goToNextStage
                  : undefined
              }
            />
          )}
        </AnimatePresence>
      </main>

      <NavigationDock
        currentStage={currentStage}
        unlockedStages={unlockedStages}
        onSelectStage={goToStage}
      />
    </div>
  );
}

export default App;