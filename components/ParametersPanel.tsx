/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React, {useEffect, useState} from 'react';
import { Theme } from '../types';

interface ParametersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentMaxHistoryLength: number;
  onUpdateHistoryLength: (newLength: number) => void;
  isStatefulnessEnabled: boolean;
  onSetStatefulness: (enabled: boolean) => void;
  onMasterClose: () => void;
  theme: Theme;
  onThemeToggle: () => void;
}

export const ParametersPanel: React.FC<ParametersPanelProps> = ({
  isOpen,
  onClose,
  currentMaxHistoryLength,
  onUpdateHistoryLength,
  isStatefulnessEnabled,
  onSetStatefulness,
  onMasterClose,
  theme,
  onThemeToggle,
}) => {
  // Local state for pending changes
  const [localHistoryLengthInput, setLocalHistoryLengthInput] =
    useState<string>(currentMaxHistoryLength.toString());
  const [localStatefulnessChecked, setLocalStatefulnessChecked] =
    useState<boolean>(isStatefulnessEnabled);

  // Update local state if props change (e.g., panel re-opened)
  useEffect(() => {
    setLocalHistoryLengthInput(currentMaxHistoryLength.toString());
  }, [currentMaxHistoryLength]);

  useEffect(() => {
    setLocalStatefulnessChecked(isStatefulnessEnabled);
  }, [isStatefulnessEnabled]);

  const handleHistoryLengthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocalHistoryLengthInput(event.target.value);
  };

  const handleStatefulnessCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLocalStatefulnessChecked(event.target.checked);
  };

  const handleApplyParameters = () => {
    // Apply history length
    const newLength = parseInt(localHistoryLengthInput, 10);
    if (!isNaN(newLength) && newLength >= 0 && newLength <= 10) {
      onUpdateHistoryLength(newLength);
    } else {
      alert('Please enter a number between 0 and 10 for history length.');
      setLocalHistoryLengthInput(currentMaxHistoryLength.toString());
      return;
    }

    // Apply statefulness if it has changed
    if (localStatefulnessChecked !== isStatefulnessEnabled) {
      onSetStatefulness(localStatefulnessChecked);
    }

    onClose();
  };

  const handleClose = () => {
    setLocalHistoryLengthInput(currentMaxHistoryLength.toString());
    setLocalStatefulnessChecked(isStatefulnessEnabled);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="p-6 h-full flex flex-col items-start pt-8"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      
      <h2 className="text-xl font-bold mb-6">Settings</h2>

      {/* Theme Section */}
      <div className="w-full max-w-md mb-6">
        <h3 className="text-lg font-semibold mb-3">Appearance</h3>
        <div className="llm-row items-center">
          <label className="llm-label whitespace-nowrap mr-3 flex-shrink-0">
            Theme Mode:
          </label>
          <button
            onClick={onThemeToggle}
            className="llm-button"
            style={{ backgroundColor: theme.primaryColor }}>
            {theme.mode === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>

      {/* System Section */}
      <div className="w-full max-w-md mb-6">
        <h3 className="text-lg font-semibold mb-3">System</h3>
        
        {/* Interaction History Row */}
        <div className="llm-row items-center mb-4">
          <label
            htmlFor="maxHistoryLengthInput"
            className="llm-label whitespace-nowrap mr-3 flex-shrink-0"
            style={{minWidth: '150px'}}>
            Max History Length:
          </label>
          <input
            type="number"
            id="maxHistoryLengthInput"
            value={localHistoryLengthInput}
            onChange={handleHistoryLengthInputChange}
            min="0"
            max="10"
            className="llm-input flex-grow"
            aria-describedby="historyLengthHelpText"
          />
        </div>

        {/* Statefulness Row */}
        <div className="llm-row items-center">
          <label
            htmlFor="statefulnessCheckbox"
            className="llm-label whitespace-nowrap mr-3 flex-shrink-0"
            style={{minWidth: '150px'}}>
            Enable Statefulness:
          </label>
          <input
            type="checkbox"
            id="statefulnessCheckbox"
            checked={localStatefulnessChecked}
            onChange={handleStatefulnessCheckboxChange}
            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            aria-describedby="statefulnessHelpText"
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="w-full max-w-md mb-6 text-sm opacity-75">
        <p id="historyLengthHelpText" className="mb-2">
          <strong>History Length:</strong> Controls how many previous interactions are remembered (0-10).
        </p>
        <p id="statefulnessHelpText">
          <strong>Statefulness:</strong> When enabled, app states are cached for faster navigation.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 w-full max-w-md flex justify-start gap-3">
        <button
          onClick={handleApplyParameters}
          className="llm-button"
          style={{ backgroundColor: theme.primaryColor }}
          aria-label="Apply all parameter settings and close">
          Apply Settings
        </button>
        <button
          onClick={handleClose}
          className="llm-button bg-gray-500 hover:bg-gray-600 active:bg-gray-700"
          aria-label="Close parameters panel without applying current changes">
          Cancel
        </button>
        <button
          onClick={onMasterClose}
          className="llm-button bg-red-500 hover:bg-red-600 active:bg-red-700"
          aria-label="Close all applications and return to desktop">
          Close All
        </button>
      </div>
    </div>
  );
};
