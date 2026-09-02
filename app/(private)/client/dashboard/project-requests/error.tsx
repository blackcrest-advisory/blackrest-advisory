"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Client requests page error:", error);
  }, [error]);

  return (
    <Section>
      <Container>
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-foreground">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We couldn&apos;t load your project requests right now. Please try
              again.
            </p>

            <Button
              type="button"
              variant="primary"
              size="md"
              className="mt-6"
              onClick={() => reset()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
