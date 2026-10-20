import { useState, useCallback } from 'react';
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

  const currentIndex = GARDEN_STAGES.findIndex((s) => s.id === currentStage);
  const activeStageMeta = GARDEN_STAGES[currentIndex] || GARDEN_STAGES[0];

  const goToStage = useCallback((stageId: StageId) => {
    setCurrentStage(stageId);
  }, []);

  const goToNextStage = useCallback(() => {
    if (currentIndex < GARDEN_STAGES.length - 1) {
      setCurrentStage(GARDEN_STAGES[currentIndex + 1].id);
    }
  }, [currentIndex]);

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

  return (
    <div className="garden-app">
      <div className="ambient-aura ambient-aura--top" aria-hidden="true" />
      <div className="ambient-aura ambient-aura--bottom" aria-hidden="true" />

      <AmbientCanvas />

      <header className="garden-header">
        <div className="brand-mark">
          <span className="brand-dot" />
          <span>Vietnamese Women's Day · 20.10.26</span>
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
              onEnterGarden={() => goToStage('garden')}
            />
          ) : currentStage === 'garden' ? (
            <GardenStage
              key="garden"
              flowers={plantedFlowers}
              onPlantFlower={handlePlantFlower}
              onContinue={() => goToStage('wishes')}
            />
          ) : currentStage === 'wishes' ? (
            <WishesStage
              key="wishes"
              onNext={() => goToStage('secret-note')}
              onBack={() => goToStage('garden')}
            />
          ) : currentStage === 'secret-note' ? (
            <SecretNoteStage
              key="secret-note"
              onNext={() => goToStage('final-surprise')}
              onBack={() => goToStage('wishes')}
            />
          ) : currentStage === 'final-surprise' ? (
            <FinalSurpriseStage
              key="final-surprise"
              onRestartGarden={() => goToStage('garden')}
              onBack={() => goToStage('secret-note')}
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
        onSelectStage={goToStage}
      />
    </div>
  );
}

export default App;