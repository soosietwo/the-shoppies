import React from "react";
import {
  ResourceItem,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  ResourceList,
  SkeletonThumbnail,
  Stack,
} from "@shopify/polaris";

const Loader = ({ count }) => {
  return (
    <ResourceList
      items={[...Array(count).keys()]}
      renderItem={() => (
        <ResourceItem>
          <Stack>
            <SkeletonThumbnail size="large" />
            <Stack.Item fill>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </Stack.Item>
          </Stack>
        </ResourceItem>
      )}
    />
  );
};

export default Loader;
