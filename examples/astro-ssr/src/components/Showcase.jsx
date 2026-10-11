import React from "react";
import { Button, Card, Heading, Stack, Text } from "@ds-gn/ui/react";

export default function Showcase() {
  return (
    <Card padding="lg">
      <Heading slot="heading" heading-size="h3">
        Rendered on the server
      </Heading>
      <Stack slot="footer" gap="md">
        <Text>
          View the HTML response to find the inert custom-element markup.
        </Text>
        <Button appearance="outline">Hydrated in the browser</Button>
      </Stack>
    </Card>
  );
}
