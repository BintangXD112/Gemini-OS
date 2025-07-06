/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React, {useCallback, useEffect, useState} from 'react';
import {GeneratedContent} from './components/GeneratedContent';
import {Icon} from './components/Icon';
import {ParametersPanel} from './components/ParametersPanel';
import {Window} from './components/Window';
import {Taskbar} from './components/Taskbar';
import {APP_DEFINITIONS_CONFIG, INITIAL_MAX_HISTORY_LENGTH} from './constants';
import {generateImage, streamAppContent} from './services/geminiService';
import {fileSystemService} from './services/fileSystemService';
import {themeService} from './services/themeService';
import {AppDefinition, InteractionData, WindowInstance, FileSystemState, Theme} from './types';

const DesktopView: React.FC<{
  onAppOpen: (app: AppDefinition) => void;
  theme: Theme;
}> = ({onAppOpen, theme}) => (
  <div 
    className="flex flex-wrap content-start p-4"
    style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
    {APP_DEFINITIONS_CONFIG.map((app) => (
      <Icon key={app.id} app={app} onInteract={() => onAppOpen(app)} />
    ))}
  </div>
);

const App: React.FC = () => {
  // Multi-window state
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [nextZIndex, setNextZIndex] = useState(1000);

  // File system state
  const [fileSystem, setFileSystem] = useState<FileSystemState>(() => 
    fileSystemService.loadFileSystem()
  );

  // Theme state
  const [theme, setTheme] = useState<Theme>(() => themeService.initialize());

  // Legacy state (for backward compatibility)
  const [activeApp, setActiveApp] = useState<AppDefinition | null>(null);
  const [previousActiveApp, setPreviousActiveApp] = useState<AppDefinition | null>(null);
  const [llmContent, setLlmContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [interactionHistory, setInteractionHistory] = useState<InteractionData[]>([]);
  const [isParametersOpen, setIsParametersOpen] = useState<boolean>(false);
  const [currentMaxHistoryLength, setCurrentMaxHistoryLength] = useState<number>(INITIAL_MAX_HISTORY_LENGTH);

  // Statefulness feature state
  const [isStatefulnessEnabled, setIsStatefulnessEnabled] = useState<boolean>(false);
  const [appContentCache, setAppContentCache] = useState<Record<string, string>>({});
  const [currentAppPath, setCurrentAppPath] = useState<string[]>([]);

  // Save file system when it changes
  useEffect(() => {
    fileSystemService.saveFileSystem(fileSystem);
  }, [fileSystem]);

  // Window management functions
  const createWindow = useCallback((app: AppDefinition): WindowInstance => {
    const windowId = `window_${nextWindowId}`;
    const newWindow: WindowInstance = {
      id: windowId,
      appId: app.id,
      title: app.name,
      position: { x: 100 + (nextWindowId * 50), y: 100 + (nextWindowId * 30) },
      size: { width: 800, height: 600 },
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      content: '',
      isLoading: false,
      error: null,
      interactionHistory: [],
      currentAppPath: [],
    };

    setNextWindowId(prev => prev + 1);
    setNextZIndex(prev => prev + 1);
    return newWindow;
  }, [nextWindowId, nextZIndex]);

  const focusWindow = useCallback((windowId: string) => {
    setWindows(prevWindows => {
      const windowIndex = prevWindows.findIndex(w => w.id === windowId);
      if (windowIndex === -1) return prevWindows;

      const newWindows = [...prevWindows];
      const focusedWindow = { ...newWindows[windowIndex], zIndex: nextZIndex };
      newWindows[windowIndex] = focusedWindow;
      setNextZIndex(prev => prev + 1);
      return newWindows;
    });
  }, [nextZIndex]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === windowId ? { ...window, isMinimized: true } : window
      )
    );
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === windowId ? { ...window, isMaximized: !window.isMaximized } : window
      )
    );
  }, []);

  const resizeWindow = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === windowId ? { ...window, size } : window
      )
    );
  }, []);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows => prevWindows.filter(window => window.id !== windowId));
  }, []);

  const internalHandleLlmRequest = useCallback(
    async (historyForLlm: InteractionData[], maxHistoryLength: number, windowId?: string) => {
      if (historyForLlm.length === 0) {
        setError('No interaction data to process.');
        return;
      }

      if (windowId) {
        setWindows(prevWindows =>
          prevWindows.map(window =>
            window.id === windowId ? { ...window, isLoading: true, error: null } : window
          )
        );
      } else {
        setIsLoading(true);
        setError(null);
      }

      let accumulatedContent = '';

      try {
        const stream = streamAppContent(historyForLlm, maxHistoryLength);
        for await (const chunk of stream) {
          accumulatedContent += chunk;
          if (windowId) {
            setWindows(prevWindows =>
              prevWindows.map(window =>
                window.id === windowId 
                  ? { ...window, content: window.content + chunk }
                  : window
              )
            );
          } else {
            setLlmContent((prev) => prev + chunk);
          }
        }
      } catch (e: any) {
        const errorMessage = 'Failed to stream content from the API.';
        if (windowId) {
          setWindows(prevWindows =>
            prevWindows.map(window =>
              window.id === windowId 
                ? { ...window, error: errorMessage, isLoading: false }
                : window
            )
          );
        } else {
          setError(errorMessage);
        }
        console.error(e);
        accumulatedContent = `<div class="p-4 text-red-600 bg-red-100 rounded-md">Error loading content.</div>`;
        if (windowId) {
          setWindows(prevWindows =>
            prevWindows.map(window =>
              window.id === windowId 
                ? { ...window, content: accumulatedContent, isLoading: false }
                : window
            )
          );
        } else {
          setLlmContent(accumulatedContent);
        }
      } finally {
        if (windowId) {
          setWindows(prevWindows =>
            prevWindows.map(window =>
              window.id === windowId ? { ...window, isLoading: false } : window
            )
          );
        } else {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  const handleInteraction = useCallback(
    async (interactionData: InteractionData, windowId?: string) => {
      if (interactionData.id === 'generate_new_photo') {
        const prompt = interactionData.value;
        if (!prompt) {
          setError('Please enter a prompt to generate an image.');
          return;
        }

        setIsGeneratingImage(true);
        setError(null);

        const imageUrl = await generateImage(prompt);
        setIsGeneratingImage(false);

        if (imageUrl) {
          const newInteractionForHistory: InteractionData = {
            id: 'system_image_generated',
            type: 'system_event',
            elementText: `Image generation for prompt: '${prompt}'`,
            value: imageUrl,
            appContext: activeApp?.id || null,
            elementType: 'system',
          };

          if (windowId) {
            setWindows(prevWindows =>
              prevWindows.map(window => {
                if (window.id === windowId) {
                  const newHistory = [
                    newInteractionForHistory,
                    ...window.interactionHistory.slice(0, currentMaxHistoryLength - 1),
                  ];
                  const newPath = [...window.currentAppPath, newInteractionForHistory.id];
                  return {
                    ...window,
                    interactionHistory: newHistory,
                    currentAppPath: newPath,
                    content: '',
                  };
                }
                return window;
              })
            );
          } else {
            const newHistory = [
              newInteractionForHistory,
              ...interactionHistory.slice(0, currentMaxHistoryLength - 1),
            ];
            setInteractionHistory(newHistory);
            const newPath = activeApp
              ? [...currentAppPath, newInteractionForHistory.id]
              : [newInteractionForHistory.id];
            setCurrentAppPath(newPath);
            setLlmContent('');
            internalHandleLlmRequest(newHistory, currentMaxHistoryLength);
          }
        } else {
          setError('Failed to generate the image. Please try again.');
        }
        return;
      }

      if (interactionData.id === 'app_close_button') {
        if (windowId) {
          closeWindow(windowId);
        } else {
          handleCloseAppView();
        }
        return;
      }

      if (windowId) {
        setWindows(prevWindows =>
          prevWindows.map(window => {
            if (window.id === windowId) {
              const newHistory = [
                interactionData,
                ...window.interactionHistory.slice(0, currentMaxHistoryLength - 1),
              ];
              const newPath = [...window.currentAppPath, interactionData.id];
              const cacheKey = newPath.join('__');

              if (isStatefulnessEnabled && appContentCache[cacheKey]) {
                return {
                  ...window,
                  interactionHistory: newHistory,
                  currentAppPath: newPath,
                  content: appContentCache[cacheKey],
                  isLoading: false,
                  error: null,
                };
              } else {
                return {
                  ...window,
                  interactionHistory: newHistory,
                  currentAppPath: newPath,
                  content: '',
                  isLoading: false,
                  error: null,
                };
              }
            }
            return window;
          })
        );

        const targetWindow = windows.find(w => w.id === windowId);
        if (targetWindow) {
          const newHistory = [
            interactionData,
            ...targetWindow.interactionHistory.slice(0, currentMaxHistoryLength - 1),
          ];
          const newPath = [...targetWindow.currentAppPath, interactionData.id];
          const cacheKey = newPath.join('__');

          if (isStatefulnessEnabled && appContentCache[cacheKey]) {
            setWindows(prevWindows =>
              prevWindows.map(window =>
                window.id === windowId
                  ? { ...window, content: appContentCache[cacheKey], isLoading: false }
                  : window
              )
            );
          } else {
            internalHandleLlmRequest(newHistory, currentMaxHistoryLength, windowId);
          }
        }
      } else {
        const newHistory = [
          interactionData,
          ...interactionHistory.slice(0, currentMaxHistoryLength - 1),
        ];
        setInteractionHistory(newHistory);

        const newPath = activeApp
          ? [...currentAppPath, interactionData.id]
          : [interactionData.id];
        setCurrentAppPath(newPath);
        const cacheKey = newPath.join('__');

        setLlmContent('');
        setError(null);

        if (isStatefulnessEnabled && appContentCache[cacheKey]) {
          setLlmContent(appContentCache[cacheKey]);
          setIsLoading(false);
        } else {
          internalHandleLlmRequest(newHistory, currentMaxHistoryLength);
        }
      }
    },
    [
      interactionHistory,
      internalHandleLlmRequest,
      activeApp,
      currentMaxHistoryLength,
      currentAppPath,
      isStatefulnessEnabled,
      appContentCache,
      windows,
      closeWindow,
    ],
  );

  const handleAppOpen = (app: AppDefinition) => {
    // Create new window for the app
    const newWindow = createWindow(app);
    const initialInteraction: InteractionData = {
      id: app.id,
      type: 'app_open',
      elementText: app.name,
      elementType: 'icon',
      appContext: app.id,
    };

    const windowWithContent = {
      ...newWindow,
      interactionHistory: [initialInteraction],
      currentAppPath: [app.id],
    };

    setWindows(prevWindows => [...prevWindows, windowWithContent]);
    focusWindow(newWindow.id);

    // Start loading content for the new window
    internalHandleLlmRequest([initialInteraction], currentMaxHistoryLength, newWindow.id);
  };

  const handleCloseAppView = () => {
    setActiveApp(null);
    setPreviousActiveApp(null);
    setLlmContent('');
    setInteractionHistory([]);
    setCurrentAppPath([]);
    setError(null);
  };

  const handleToggleParametersPanel = () => {
    setIsParametersOpen(!isParametersOpen);
  };

  const handleUpdateHistoryLength = (newLength: number) => {
    setCurrentMaxHistoryLength(newLength);
  };

  const handleSetStatefulness = (enabled: boolean) => {
    setIsStatefulnessEnabled(enabled);
  };

  const handleMasterClose = () => {
    setActiveApp(null);
    setPreviousActiveApp(null);
    setLlmContent('');
    setInteractionHistory([]);
    setCurrentAppPath([]);
    setError(null);
    setIsParametersOpen(false);
  };

  // Effect to cache content when loading finishes and statefulness is enabled
  useEffect(() => {
    if (
      !isLoading &&
      currentAppPath.length > 0 &&
      isStatefulnessEnabled &&
      llmContent
    ) {
      const cacheKey = currentAppPath.join('__');
      if (appContentCache[cacheKey] !== llmContent) {
        setAppContentCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: llmContent,
        }));
      }
    }
  }, [
    llmContent,
    isLoading,
    currentAppPath,
    isStatefulnessEnabled,
    appContentCache,
  ]);

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    const newTheme = themeService.toggleTheme(theme);
    setTheme(newTheme);
  }, [theme]);

  return (
    <div 
      className="min-h-screen relative"
      style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      {/* Desktop View */}
      {windows.length === 0 && (
        <DesktopView onAppOpen={handleAppOpen} theme={theme} />
      )}

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onResize={(size) => resizeWindow(window.id, size)}
          isAppOpen={true}
          appId={window.appId}
          onToggleParameters={handleToggleParametersPanel}
          onExitToDesktop={() => closeWindow(window.id)}
          isParametersPanelOpen={isParametersOpen}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          size={window.size}
          zIndex={window.zIndex}
          onFocus={() => focusWindow(window.id)}>
          <GeneratedContent
            content={window.content}
            isLoading={window.isLoading}
            error={window.error}
            onInteraction={(interactionData) => handleInteraction(interactionData, window.id)}
          />
        </Window>
      ))}

      {/* Legacy Single Window (for backward compatibility) */}
      {activeApp && windows.length === 0 && (
        <Window
          id="legacy-window"
          title={activeApp.name}
          onClose={handleCloseAppView}
          onMinimize={() => {}}
          onMaximize={() => {}}
          onResize={() => {}}
          isAppOpen={true}
          appId={activeApp.id}
          onToggleParameters={handleToggleParametersPanel}
          onExitToDesktop={handleCloseAppView}
          isParametersPanelOpen={isParametersOpen}
          zIndex={1000}
          onFocus={() => {}}>
          <GeneratedContent
            content={llmContent}
            isLoading={isLoading}
            error={error}
            onInteraction={handleInteraction}
          />
        </Window>
      )}

      {/* Parameters Panel */}
      {isParametersOpen && (
        <ParametersPanel
          isOpen={isParametersOpen}
          onClose={handleToggleParametersPanel}
          currentMaxHistoryLength={currentMaxHistoryLength}
          onUpdateHistoryLength={handleUpdateHistoryLength}
          isStatefulnessEnabled={isStatefulnessEnabled}
          onSetStatefulness={handleSetStatefulness}
          onMasterClose={handleMasterClose}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowFocus={focusWindow}
        onWindowMinimize={minimizeWindow}
        onWindowClose={closeWindow}
      />
    </div>
  );
};

export default App;
