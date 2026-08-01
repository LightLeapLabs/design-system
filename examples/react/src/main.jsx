import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Card, Heading, Stack, Text } from "@lightleaplabs/ui/react";
import "@lightleaplabs/tokens/public";
import "@lightleaplabs/tokens/theme";
import "./style.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Card padding="lg">
        <Stack gap="md">
          <Heading size="xl">React wrappers</Heading>
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
