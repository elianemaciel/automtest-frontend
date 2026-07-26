import { ButtonPrimary, Stack, Text3 } from '@telefonica/mistica';
import { useState } from 'react';

export enum MenuButton {
  ABOUT = 'About AutomTest',
  USER_STORY = 'Insert User Story',
  METHOD_INFO = 'Methods Info',
  EQUIVALENCE_CLASS = 'Equivalence Classes',
  GENERATE_TEST = 'Generate Tests',
}

export type MenuButtonState = {
  menuButton: MenuButton;
  enabled: boolean;
  isCurrentlyActive: boolean;
};

export default function ApplicationMenu(props: {
  buttonsState: MenuButtonState[];
  selectButton: (bt: MenuButton) => void;
}) {
  // console.log('buttonsState', props.buttonsState)

  const [currentMenuButton, setCurrentMenuButton] = useState();

  const selectedButtonColor = '#173f5f';
  const unselectedButtonColor = '#20689b';

  function showButtons(buttonsState: MenuButtonState[]) {
    return buttonsState.map((state) => menuButton(state));
  }

  function menuButton(buttonState: MenuButtonState) {
    return (
      <ButtonPrimary
        style={{
          width: 250,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80px',
          fontWeight: 'bold',
          color: 'white',
          backgroundColor: buttonState.isCurrentlyActive
            ? selectedButtonColor
            : unselectedButtonColor,
        }}
        onPress={() => props.selectButton(buttonState.menuButton)}
        disabled={!buttonState.enabled}
      >
        {buttonState.menuButton}
      </ButtonPrimary>
    );
  }

  return (
    <div>
      <Stack space={40}>{showButtons(props.buttonsState)}</Stack>
    </div>
  );
}
