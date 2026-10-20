import { GARDEN_STAGES } from '../types/garden';
import type { StageId } from '../types/garden';

interface NavigationDockProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
}

export function NavigationDock({
  currentStage,
  onSelectStage,
}: NavigationDockProps) {
  return (
    <nav className="nav-dock-wrapper" aria-label="Garden journey stages">
      <div className="nav-dock">
        {GARDEN_STAGES.map((stage) => {
          const isActive = stage.id === currentStage;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(stage.id)}
              className={`nav-step-btn ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
              title={stage.label}
            >
              <span className="nav-step-dot" />
              <span className="nav-step-label">{stage.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}