//packages/app/features/login/layout.tsx

import { Button, H1, XStack, YStack } from "@my/ui";
import React from "react";

type LoginScreenProps = {
  title: string;
  children: React.ReactNode;
};

export const AuthScreenLayout: React.FC<LoginScreenProps> = ({ children, title }) => {
  return (
    <YStack
      jc="center"
      flex={1}
      space
      >
      <H1 ta="center">{title}</H1>
        <XStack
          jc="center"
          width={'100%'}
        >
        <YStack
          width={400}
          ai="center"
          >
          {children}
        </YStack>
        </XStack>

    </YStack>
  );
};
