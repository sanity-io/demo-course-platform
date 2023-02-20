import React from "react";

import { usePreview } from "../../lib/sanity.preview";
import ExitPreview from "../ExitPreview";
import Body from "./Body";

export default function PreviewBody(props) {
  const { layout, query, queryParams } = props;

  const data = usePreview(null, query, queryParams);

  return (
    <>
      <Body layout={layout} data={data} />
      <ExitPreview />
    </>
  );
}
