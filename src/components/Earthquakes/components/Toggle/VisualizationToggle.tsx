import React from 'react';
import ActionButton from '../TablePane/components/Button/ActionButton';
import { VisualizationPane } from '@/store/visualizationStore/visualizationStore';
import { cn } from '@/utils/utils';

interface VisualizationToggleProps {
  currentPane: VisualizationPane;
  setCurrentPane: (pane: VisualizationPane) => void;
  className?: string;
}

const VisualizationToggle = ({
  currentPane,
  setCurrentPane,
  className = '',
}: VisualizationToggleProps) => {
  return (
    <div
      className={cn(
        `relative inline-flex rounded-md shadow-none py-5 ${className}`,
      )}
    >
      <ActionButton
        onClick={() => setCurrentPane('plot')}
        active={currentPane === 'plot'}
        className="rounded-l-sm rounded-r-none border-r border-gray-300"
      >
        Plot
      </ActionButton>
      <ActionButton
        onClick={() => setCurrentPane('map')}
        active={currentPane === 'map'}
        className="rounded-r-sm rounded-l-none"
      >
        Map
      </ActionButton>
    </div>
  );
};

export default VisualizationToggle;
