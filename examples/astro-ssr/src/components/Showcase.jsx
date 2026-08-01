import React from "react";
import { Button, Card, Heading, Stack, Text } from "@lightleaplabs/ui/react";

export default function Showcase() {
  return (
    <Card padding="lg">
      <Stack gap="md">
        <Heading size="xl">Rendered on the server</Heading>
        <Text>
          View the HTML response to find the inert custom-element markup.
        </Text>
        <Button appearance="outline">Hydrated in the browser</Button>
      </Stack>
    </Card>
  );
}
