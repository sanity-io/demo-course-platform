import React, { useEffect, useState, useRef } from "react";
import { SanityDocumentLike } from "sanity";
import {
  Box,
  Flex,
  Text,
  Button,
  ThemeProvider,
  Card,
  Spinner,
} from "@sanity/ui";
import { UndoIcon, CopyIcon, LeaveIcon, MobileDeviceIcon } from "@sanity/icons";

import { useCopyToClipboard } from "usehooks-ts";

type Size = "desktop" | "mobile";

type SizeProps = {
  [key in Size]: {
    width: string | number;
    height: string | number;
    maxHeight: string | number;
  };
};

const sizes: SizeProps = {
  desktop: {
    width: `100%`,
    height: `100%`,
    maxHeight: `100%`,
  },
  mobile: {
    width: 414,
    height: `100%`,
    maxHeight: 736,
  },
};

export type IframeOptions = {
  url: string | ((document: SanityDocumentLike) => unknown);
  defaultSize?: Size;
  reload?: {
    revision?: boolean;
    button?: boolean;
  };
};

export type IframeProps = {
  document: {
    displayed: SanityDocumentLike;
  };
  options: IframeOptions;
};

const DEFAULT_SIZE = `desktop`;

function Iframe(props: IframeProps) {
  const { document: sanityDocument, options } = props;
  const { url, defaultSize = DEFAULT_SIZE, reload } = options;
  const [displayUrl, setDisplayUrl] = useState(
    url && typeof url === "string" ? url : ``
  );
  const [iframeSize, setIframeSize] = useState(
    sizes?.[defaultSize] ? defaultSize : DEFAULT_SIZE
  );
  const input = useRef<HTMLTextAreaElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);
  const { displayed } = sanityDocument;
  const [, copy] = useCopyToClipboard();

  function handleCopy() {
    if (!input?.current?.value) return;

    copy(input.current.value);
  }

  function handleReload() {
    if (!iframe?.current) {
      return;
    }

    // Funky way to reload an iframe without CORS issuies
    // eslint-disable-next-line no-self-assign
    iframe.current.src = iframe.current.src;
  }

  // Reload on new revisions
  useEffect(() => {
    if (reload?.revision) {
      handleReload();
    }
  }, [displayed._rev, reload?.revision]);

  // Set initial URL and refresh on new revisions
  useEffect(() => {
    const getUrl = async () => {
      const resolveUrl = typeof url === "function" ? await url(displayed) : ``;

      // Only update state if URL has changed
      if (
        resolveUrl !== displayUrl &&
        resolveUrl &&
        typeof resolveUrl === "string"
      ) {
        setDisplayUrl(resolveUrl);
      }
    };

    if (typeof url === "function") {
      getUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed._rev]);

  if (!displayUrl || typeof displayUrl !== "string") {
    return (
      <ThemeProvider>
        <Flex padding={5} align="center" justify="center">
          <Spinner />
        </Flex>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <textarea
        style={{ position: `absolute`, pointerEvents: `none`, opacity: 0 }}
        ref={input}
        value={displayUrl}
        readOnly
        tabIndex={-1}
      />
      <Flex direction="column" style={{ height: `100%` }}>
        <Card padding={2} borderBottom>
          <Flex align="center" gap={2}>
            <Flex align="center" gap={1}>
              <Button
                fontSize={[1]}
                padding={2}
                tone="primary"
                mode={iframeSize === "mobile" ? "default" : "ghost"}
                icon={MobileDeviceIcon}
                onClick={() =>
                  setIframeSize(iframeSize === "mobile" ? "desktop" : "mobile")
                }
              />
            </Flex>
            <Box flex={1}>
              <Text size={0} textOverflow="ellipsis">
                {displayUrl}
              </Text>
            </Box>
            <Flex align="center" gap={1}>
              {reload?.button ? (
                <Button
                  fontSize={[1]}
                  padding={2}
                  icon={UndoIcon}
                  title="Reload"
                  aria-label="Reload"
                  onClick={() => handleReload()}
                />
              ) : null}
              <Button
                fontSize={[1]}
                icon={CopyIcon}
                padding={[2]}
                title="Copy"
                aria-label="Copy"
                onClick={() => handleCopy()}
              />
              <Button
                fontSize={[1]}
                icon={LeaveIcon}
                padding={[2]}
                text="Open"
                tone="primary"
                onClick={() => window.open(displayUrl)}
              />
            </Flex>
          </Flex>
        </Card>
        <Card
          tone="transparent"
          padding={iframeSize === "mobile" ? 2 : 0}
          style={{ height: `100%` }}
        >
          <Flex align="center" justify="center" style={{ height: `100%` }}>
            <iframe
              ref={iframe}
              title="preview"
              style={sizes[iframeSize]}
              frameBorder="0"
              src={displayUrl}
            />
          </Flex>
        </Card>
      </Flex>
    </ThemeProvider>
  );
}

export default Iframe;
