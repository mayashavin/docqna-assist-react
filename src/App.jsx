import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout/Layout';
// import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
// import { SignInButton } from './components/SignIn/SignIn';
// import { Text } from '@fluentui/react-components';

function App() {
  return (
    <Layout>
        {/* <AuthenticatedTemplate> */}
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
        {/* </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Text variant="medium">Please sign-in to trying out Doc Assistant</Text>
          <SignInButton />
        </UnauthenticatedTemplate> */}
      </Layout>
  )
}

export default App
