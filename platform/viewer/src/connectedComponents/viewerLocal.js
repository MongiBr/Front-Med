import React, { Component } from 'react';
import { metadata, utils } from '@ohif/core';

import ConnectedViewer from './ConnectedViewer.js';
import PropTypes from 'prop-types';
import { extensionManager } from './../App.js';
import filesToStudies from '../lib/filesToStudies';
import './ViewerLocalFileData.css';
import { withTranslation } from 'react-i18next';

import imagedcm from './image.png'
const { OHIFStudyMetadata } = metadata;
const { studyMetadataManager } = utils;


class ViewerLocal extends Component {
 
  state = {
    studies: null,
    loading: false,
    
    error: null,
  };


 


convertUrlToImageData = async (myImageUrl) => {
    try {
        let myBlob = await getBlobFromUrl(myImageUrl);
        console.log(myBlob)
        let myImageData = await getDataFromBlob(myBlob);
        console.log(myImageData)
        return myImageData;
    } catch (err) {
        console.log(err);
        return null;
    }
}



  

  updateStudies = studies => {
    // Render the viewer when the data is ready
    studyMetadataManager.purge();
console.log('my studies is ',studies)
    // Map studies to new format, update metadata manager?
    const updatedStudies = studies.map(study => {
      const studyMetadata = new OHIFStudyMetadata(
        study,
        study.StudyInstanceUID
      );
      console.log('my studies is ',study)
      const sopClassHandlerModules =
        extensionManager.modules['sopClassHandlerModule'];

      study.displaySets =
        study.displaySets ||
        studyMetadata.createDisplaySets(sopClassHandlerModules);

      studyMetadata.forEachDisplaySet(displayset => {
        displayset.localFile = true;
      });

      studyMetadataManager.add(studyMetadata);

      return study;
    });

    this.setState({
      studies: updatedStudies,
    });
  };


  render() {
  
    const file= {imagedcm}

  
   console.log('my fileee : ', file)
    const stud = filesToStudies(file);
      const updatedStudies = this.updateStudies(stud);

      this.setState({ studies: updatedStudies, loading: false });
      
    return (
          <div style={{ width: '100%', height: '100%' }}>
            {this.state.studies ? (
              <ConnectedViewer
                studies={this.state.studies}
                studyInstanceUIDs={
                  this.state.studies &&
                  this.state.studies.map(a => a.StudyInstanceUID)
                }
              />

            ) : ('No Dicom for this USER')}
          </div>
    );
  }
}

export default withTranslation('Common')(ViewerLocal);
