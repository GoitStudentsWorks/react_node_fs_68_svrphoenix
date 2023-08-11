import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ErrorImagesContainer,
  ErrorImage,
  Heading,
  Button,
} from './NotFound.styled';

const NotFound = ({ history }) => {
  const handleBackToHome = () => {
    history.push('/');
  };

  return (
    <Container>
      <ErrorImagesContainer>
        <ErrorImage src="/images/4-4" alt="404 Error" />
        <ErrorImage src="/images/Gus" alt="404 Error" />
      </ErrorImagesContainer>
      <Heading>We're sorry, the page you requested could not be found.</Heading>
      <p>Please go back to the homepage.</p>
      <Button onClick={handleBackToHome}>Back to Home</Button>
    </Container>
  );
};

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NotFound;
