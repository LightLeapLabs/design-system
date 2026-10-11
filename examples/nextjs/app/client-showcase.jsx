"use client";

import { useState } from "react";
import { Button, Card, Heading, Stack, Text } from "@ds-gn/ui/react";

export function ClientShowcase() {
  const [count, setCount] = useState(0);

  return (
    <Card padding="lg">
      <Heading slot="heading" heading-size="h3">
        Next.js App Router
      </Heading>
      <Stack slot="footer" gap="md">
        <Text>
          The page is a Server Component. This interactive showcase is the
          client boundary that imports and hydrates the DS-GN wrappers.
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
