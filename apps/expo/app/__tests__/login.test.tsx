require('__mocks__/cognito.js')

import {render, act} from '@testing-library/react-native'
import { Login } from "app/features/auth/screens";
import {ApolloClient, ApolloProvider as AP, InMemoryCache} from '@apollo/client'
import { Provider as P } from "app/provider";

const AC = (props: {children: any}) => <AP client={new ApolloClient({cache: new InMemoryCache()})}>
    <P>{props.children}</P>
</AP>


describe('LoginScreen', () => {

    const mockProvider = {
        clientProvider: {
            region: 'region'
        },
        ClientId: 'ClientId'
    }
    const mockLogout = jest.fn()
    const mockRegister = jest.fn()

    test('renders', async() => {
        render(
            <AC>
                <Login
                    provider={mockProvider}
                    onToken={mockLogout}
                    toForgotPassword={mockLogout}
                    toRegister={mockRegister}
                />
            </AC>
        )
    })
})