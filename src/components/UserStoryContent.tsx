import { Button, CircularProgress } from '@mui/material';
import {
  RadioButton,
  RadioGroup,
  Stack,
  Text1,
  Text3,
} from '@telefonica/mistica';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import ValidationErrorSnackbar from './ValidationErrorComponent';
import { API_BASE_URL, getApiHeaders } from '../config/api';
import { convertSuggestedEquivalenceClasses } from './equiv-classes/suggestedEquivalenceClasses';

const USER_STORY_PLACEHOLDER = `Example:
As a customer, I want to reset my password so that I can regain access to my account.

Acceptance Criteria:
Given I am on the password reset page
When I enter a registered email and submit the form
Then the system should send a password reset link to my email`;

export default function UserStoryContent(props: {
  setMethods: any;
  showMethodsListContent: any;
  userStory: string;
  setUserStory: any;
  selectedIA: string;
  setSelectedIA: any;
  setBackendActive: (active: boolean) => void;
}) {
  const {
    setMethods,
    showMethodsListContent,
    userStory: initialUserStory,
    setUserStory: setParentUserStory,
    selectedIA,
    setSelectedIA,
    setBackendActive,
  } = props;
  const [userStory, setUserStory] = useState(initialUserStory);
  const [language, setLanguage] = useState('pt');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showValidationError, setShowValidationError] = useState(false);
  const [validationErrorMsg, setValidationErrorMsg] = useState('');

  useEffect(() => {
    setParentUserStory(userStory);
  }, [setParentUserStory, userStory]);

  // const showValidationSnackbar = ValidationErrorSnackbar

  function validateUserStory() {
    const isValid = userStory !== '';

    if (!isValid) {
      setShowValidationError(true);
      setValidationErrorMsg('Please provide a User Story');
      // showValidationSnackbar({open: true, message: validationErrorMsg})
      // <ValidationErrorSnackbar open={true} message={validationErrorMsg} />
    }

    return isValid;
  }

  function generateMethods(userStory: string, language: string) {
    console.log('Generating methods...');
    setBackendActive(true);

    axios
      .post(
        `${API_BASE_URL}/api/process_user_story`,
        {
          lang: language,
          userStory,
          selectedIA,
        },
        {
          headers: getApiHeaders(),
        },
      )
      .then((response) => {
        console.log('response=', response.data);

        const convertedMethods = response.data.map((item: any) => {
          const parameters = item.parametros.map((p: any) => ({
            identifier: uuidv1(),
            name: p.nome,
            type: p.tipo,
          }));

          return {
            identifier: uuidv1(),
            name: item.nome,
            className: item.nomeClasse,
            returnType: item.tipoRetorno,
            equivClasses: convertSuggestedEquivalenceClasses(
              item.classesEquivalencia,
              parameters,
              item.tipoRetorno,
            ),
            parameters,
          };
        });

        setMethods(convertedMethods);
        showMethodsListContent();
      })
      .catch((error) => {
        setShowError(true);
        setErrorMessage(
          `${error.code}: ${
            error.response?.data ? error.response.data : error.message
          }`,
        );
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
        setBackendActive(false);
      });
  }

  return (
    <div style={{ width: '100%', color: 'white' }}>
      <ValidationErrorSnackbar
        open={showValidationError}
        message={validationErrorMsg}
        changeOpenState={() => setShowValidationError(!showValidationError)}
      />

      {isLoading ? (
        <div
          style={{
            width: '100%',
            height: '560px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      ) : showError ? (
        <div
          style={{
            width: '100%',
            height: '560px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ color: 'black' }}>
            A error occurred while requesting AutomTest&apos;s backend:
            <br />
            <br />
            <br />
            <p style={{ color: 'red' }}>{errorMessage}</p>
            <br />
            <br />
            <br />
            <Button
              disableElevation
              variant="outlined"
              style={{ marginLeft: '120px' }}
              onClick={() => setShowError(false)}
            >
              Try again
            </Button>
          </div>
        </div>
      ) : (
        <Stack space={24}>
          <Text3 regular color="black">
            Insert a User Story with its Acceptance Criteria. <br />
            Then, select the language and LLM to start the automated generation
            process.
          </Text3>
          <textarea
            id="multilineTextInput"
            value={userStory}
            placeholder={USER_STORY_PLACEHOLDER}
            onChange={(event) => {
              setUserStory(event.target.value);
            }}
            rows={20}
            cols={71}
            style={{
              borderRadius: '5px',
              color: 'black',
              fontFamily: 'inherit',
              fontSize: '16px',
              // backgroundColor: '#1b1f24'
              backgroundColor: 'transparent',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              marginTop: '24px',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <RadioGroup
                name="radio-group"
                onChange={setLanguage}
                defaultValue="pt"
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, auto)',
                    columnGap: '8px',
                    rowGap: '8px',
                    alignItems: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <RadioButton value="pt">
                    <Text1 regular color="black">
                      Português
                    </Text1>
                  </RadioButton>
                  <RadioButton value="en">
                    <Text1 regular color="black">
                      English
                    </Text1>
                  </RadioButton>
                </div>
              </RadioGroup>

              <RadioGroup
                name="radio-ia"
                onChange={setSelectedIA}
                defaultValue={selectedIA}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, auto)',
                    columnGap: '8px',
                    rowGap: '8px',
                    alignItems: 'center',
                    marginBottom: '14px',
                  }}
                >
                  <RadioButton value="gemini">
                    <Text1 regular color="black">
                      Gemini
                    </Text1>
                  </RadioButton>
                  <RadioButton value="gpt">
                    <Text1 regular color="black">
                      ChatGPT
                    </Text1>
                  </RadioButton>
                  <RadioButton value="claude">
                    <Text1 regular color="black">
                      Claude
                    </Text1>
                  </RadioButton>
                </div>
              </RadioGroup>
            </div>

            <Button
              variant="contained"
              disableElevation
              style={{
                minWidth: 120,
                backgroundColor: '#2d516f',
                color: 'white',
                padding: '10px',
                marginRight: '12px',
              }}
              onClick={() => {
                if (validateUserStory()) {
                  setIsLoading(true);
                  generateMethods(userStory, language);
                }
              }}
            >
              Submit
            </Button>
          </div>
        </Stack>
      )}
    </div>
  );
}
