//packages/app/features/login/screen.tsx

import { Button, H1, YStack } from '@my/ui'
import React from 'react'

type LoginScreenProps = {
    login: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({login})  => {

  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Welcome</H1>
        <Button onPress={() => login()}>
            Login
        </Button>
      </YStack>
    </YStack>
  )
}


