import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import api from './../../services/api';
import { Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText } from './styles';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
  };

  handleEmailChange = email => this.setState({ email });

  handlePasswordChange = password => this.setState({ password });

  handleCreateAccountPress = () => this.props.navigation.navigate('SignUp');

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'All field is required' }, () => false);
    } else {
      try {
        const response = await api.post('/login', {
          email: this.state.email,
          password: this.state.password,
        });

        await AsyncStorage.setItem('@AirBnbApp:token', response.data.token);

        const resetAction = StackActions.reset({
          index: 0,
          actions: [ NavigationActions.navigate({ routeName: 'Main' }) ],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        this.setState({ error: 'Error, please try again.' });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />

        <Logo source={require('./../../images/airbnb_logo.png')} resizeMode="contain" />

        <Input
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {this.state.error.lenght !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <Button onPress={this.handleSignInPress}>
          <ButtonText>Login</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Free SignUp</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}

export default SignIn;
