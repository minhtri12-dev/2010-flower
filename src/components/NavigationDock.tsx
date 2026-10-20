import { GARDEN_STAGES } from '../types/garden';
import type { StageId } from '../types/garden';

interface NavigationDockProps {
  currentStage: StageId;
  unlockedStages: StageId[];
  onSelectStage: (stage: StageId) => void;
}

export function NavigationDock({
  currentStage,
  unlockedStages,
  onSelectStage,
}: NavigationDockProps) {
  return (
    <nav className="nav-dock-wrapper" aria-label="Garden journey stages">
      <div className="nav-dock">
        {GARDEN_STAGES.map((stage) => {
          const isActive = stage.id === currentStage;
          const isUnlocked = unlockedStages.includes(stage.id);

          return (
            <button
              key={stage.id}
              type="button"
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  onSelectStage(stage.id);
                }
              }}
              className={`nav-step-btn ${isActive ? 'is-active' : ''} ${
                !isUnlocked ? 'is-locked' : ''
              }`}
              aria-current={isActive ? 'step' : undefined}
              aria-disabled={!isUnlocked}
              title={
                isUnlocked
                  ? stage.label
                  : `${stage.label} (Complete the current step to unlock)`
              }
            >
              {isUnlocked ? (
                <span className="nav-step-dot" />
              ) : (
                <svg
                  className="nav-lock-icon"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              )}
              <span className="nav-step-label">{stage.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}