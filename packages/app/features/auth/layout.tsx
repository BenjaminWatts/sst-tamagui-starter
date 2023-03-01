//packages/app/features/login/layout.tsx

import { Button, H1, XStack, YStack } from "@my/ui";
import React from "react";

type LoginScreenProps = {
  title: string;
  children: React.ReactNode;
};

export const AuthScreenLayout: React.FC<LoginScreenProps> = ({ children, title }) => {
  return (
    // <YStack height='100%'>
    <XStack flex={1} jc='center' ai='center'  >
      <YStack
        maxWidth={500}
        jc="center"
        ai='center'
        flex={1}
        space
        >
        <H1 ta="center">{title}</H1>

          <YStack
            width="90%"
            >
            {children}
          </YStack>

      </YStack>
    </XStack>
    // </YStack>
  );
};
