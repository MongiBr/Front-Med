import setLayoutAndViewportData from './setLayoutAndViewportData.js';

export default function setMPRLayout(
  displaySet,
  viewportPropsArray,
  numRows = 1,
  numColumns = 1
) {
  return new Promise((resolve, reject) => {
    const viewports = [];
    const numViewports = numRows * numColumns;

    if (viewportPropsArray && viewportPropsArray.length !== numViewports) {
      reject(
        new Error(
          'viewportProps is supplied but its length is not equal to numViewports'
        )
      );
    }

    const viewportSpecificData = {};


      viewports.push({});
      viewportSpecificData[0] = displaySet;
      viewportSpecificData[0].plugin = 'vtk';


    const apis = [];
    viewports.forEach((viewport, index) => {
      apis[index] = null;
      const viewportProps = viewportPropsArray[index];
      viewports[index] = Object.assign({}, viewports[index], {
        vtk: {
          mode: 'mpr', // TODO: not used
          afterCreation: api => {
            apis[index] = api;

            if (apis.every(a => !!a)) {
              resolve(apis);
            }
          },
          ...viewportProps,
        },
      });
    });

    setLayoutAndViewportData(
      {
        numRows,
        numColumns,
        viewports,
      },
      viewportSpecificData
    );
  });
}
