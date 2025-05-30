import React from 'react';
import ActionButton from '../TablePane/components/Button/ActionButton';
import { VisualizationPane } from '@/store/visualizationStore/visualizationStore'; // Assuming this is the correct path for VisualizationPane type

interface VisualizationToggleProps {
  currentPane: VisualizationPane;
  setCurrentPane: (pane: VisualizationPane) => void;
}

const VisualizationToggle = ({
  currentPane,
  setCurrentPane,
}: VisualizationToggleProps) => {
  return (
    <div className="relative inline-flex rounded-md shadow-none py-8">
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
