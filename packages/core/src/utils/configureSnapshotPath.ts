/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export const configureSnapshotPath =
  (options?: {}) =>
  ({}: any, testInfo): any => {
    const originalSnapshotPath = testInfo.snapshotPath;

    testInfo.snapshotPath = (snapshotName) => {
      const result = originalSnapshotPath
        .apply(testInfo, [snapshotName])
        .replace('.txt', '.json')
        .replace('-chromium', '')
        .replace('-linux', '')
        .replace('-darwin', '');

      return result;
    };
  };
