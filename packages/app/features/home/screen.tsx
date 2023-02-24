import {
  Anchor,
  Button,
  H1,
  Input,
  Paragraph,
  Separator,
  Sheet,
  Card,
  Spinner,
  XStack,
  YStack,
  ListItem,
  AlertDialog,
} from "@my/ui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { useLink } from "solito/link";
import { useQuery } from "@apollo/client";
import { RecentPostsDocument } from "app/g/graphql";

type HomeScreenProps = {
  logout: () => void;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ logout }) => {
  const { data, loading, error, refetch } = useQuery(RecentPostsDocument, {
    variables: {},
  });
  return (
    <YStack f={1} jc="center" ai="center" p="$4" space>
      <YStack space="$4" maw={600}>
        <H1 ta="center">Recent Posts</H1>

        {loading && <Spinner />}
        {data && data.recentPosts && (
          <Card>
            {data.recentPosts.map((x) => (
              <ListItem key={x?.id}>{x?.title}</ListItem>
            ))}

            <Card.Footer>
              <Button onPress={() => refetch()}>Update</Button>
            </Card.Footer>
          </Card>
        )}
        {error && (
          <AlertDialog>
            <AlertDialog.Content>
              <AlertDialog.Title>{error.name}</AlertDialog.Title>
              <AlertDialog.Description>{error.message}</AlertDialog.Description>
              <AlertDialog.Action>
                <Button onPress={() => refetch()}>Retry</Button>
              </AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog>
        )}
      </YStack>

      <XStack>
        <Button onPress={() => logout()}>Logout</Button>
      </XStack>

      <SheetDemo />
    </YStack>
  );
};

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai="center" jc="center">
          <Sheet.Handle />
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
