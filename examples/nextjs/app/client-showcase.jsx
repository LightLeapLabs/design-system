"use client";

import { useState } from "react";
import { Button, Card, Heading, Stack, Text } from "@lightleaplabs/ui/react";

export function ClientShowcase() {
  const [count, setCount] = useState(0);

  return (
    <Card padding="lg">
      <Stack gap="md">
        <Heading size="xl">Next.js App Router</Heading>
        <Text>
          The page is a Server Component. This interactive showcase is the
          client boundary that imports and hydrates the LightLeap wrappers.
        </Text>
        <Button
          appearance="solid"
          onClick={() => setCount((value) => value + 1)}
        >
          Clicks: {count}
        </Button>
      </Stack>
    </Card>
  );
}
