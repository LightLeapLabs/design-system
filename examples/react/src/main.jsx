import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Card, Heading, Stack, Text } from "@ds-gn/ui/react";
import "@ds-gn/tokens/public";
import "@ds-gn/tokens/theme";
import "@ds-gn/tokens/properties";
import "./style.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Card padding="lg">
        <Heading slot="heading" heading-size="h3">
          React wrappers
        </Heading>
        <Stack slot="footer" gap="md">
          <Text>
            The wrapper forwards properties, children, refs, and custom events.
          </Text>
          <Button
            appearance="outline"
            onClick={() => setCount((value) => value + 1)}
          >
            Clicks: {count}
          </Button>
        </Stack>
      </Card>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
