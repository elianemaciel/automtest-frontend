// import path from 'path';
// import { app } from 'electron';
// eslint-disable-next-line camelcase
import logo_automtest from '../../assets/logo-automtest.png';

export default function AboutPage() {
  // const RESOURCES_PATH = app.isPackaged
  // ? path.join(process.resourcesPath, 'assets')
  // : path.join(__dirname, '../../assets');

  // const getAssetPath = (...paths: string[]): string => {
  //     return path.join(RESOURCES_PATH, ...paths);
  // };

  return (
    <div style={{ fontSize: '16px', textAlign: 'justify', color: 'black' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          // eslint-disable-next-line camelcase
          src={logo_automtest}
          alt="AutomTest logo"
          style={{ width: '50px', marginRight: '15px' }}
        />
        <p
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#385075',
            fontFamily: 'monospace',
          }}
        >
          Welcome to AutomTest
        </p>
      </div>
      <p>
        AutomTest supports the generation of unit tests from software
        requirements described as <b>User Stories</b>, following a structured
        and automated process.
      </p>
      <ol>
        <li>
          <p>
            <b>1. Insert a User Story</b>: Provide a User Story with clear
            Acceptance Criteria, preferably using the <b>Given/When/Then</b>{' '}
            format.
          </p>
          <p>
            <b>Example:</b>
          </p>
          <ul>
            <li>
              <p>
                <i>
                  As a bank customer, I want to view my account balance so that
                  I can keep track of my finances.
                </i>
              </p>
            </li>
            <li>
              <b>Given</b> an active bank account,
            </li>
            <li>
              <b>When</b> the customer requests the balance,
            </li>
            <li>
              <b>Then</b> the system should return the current balance.
            </li>
          </ul>
        </li>

        <li>
          <p>
            <b>2. Automatic Method Extraction</b>: After the User Story is
            submitted, AutomTest automatically uses an LLM to identify the
            methods required to represent the described behavior.
          </p>
        </li>

        <li>
          <p>
            <b>3. Automatic Equivalence Class Generation</b>: Based on the User
            Story, Acceptance Criteria, and extracted methods, AutomTest
            automatically generates Equivalence Classes representing relevant
            valid and invalid test scenarios.
          </p>
        </li>

        <li>
          <p>
            <b>4. Generate Unit Tests</b> : Finally, AutomTest generates unit
            tests using the User Story, extracted methods, and generated
            Equivalence Classes.
          </p>
        </li>
      </ol>
    </div>
  );
}
