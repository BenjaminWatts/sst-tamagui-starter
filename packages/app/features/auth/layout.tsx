//packages/app/features/login/layout.tsx

import { Button, H1, XStack, YStack } from "@my/ui";
import React from "react";

type LoginScreenProps = {
  children: React.ReactNode;
};

export const AuthScreenLayout: React.FC<LoginScreenProps> = ({ children }) => {
  return (
    <YStack
      jc="center"
      flex={1}
      space
        >

      <H1 ta="center">Welcome</H1>
        <XStack
              jc="center"
              width={'100%'}
        >

        <YStack
          width={400}
          ai="center"
        // maxWidth={'${80}vw'}
          >
          {children}
        </YStack>
        </XStack>

    </YStack>
  );
};
